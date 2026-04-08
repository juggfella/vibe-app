import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Всегда отвечаем 200 — иначе Telegram будет повторять запрос
    res.status(200).json({ ok: true });

    try {
        const update = req.body;
        const botToken = process.env.BOT_TOKEN;
        const managerChatId = String(process.env.MANAGER_CHAT_ID);

        // ── Команды менеджера (/list) ────────────────────────────────────
        if (update.message?.text) {
            const msg = update.message;
            const fromChatId = String(msg.chat.id);
            const text = msg.text.trim();

            // Принимаем команды только из беседы менеджера
            if (fromChatId === managerChatId && text === '/list') {
                const sql = neon(process.env.DATABASE_URL);
                const users = await sql`
                    SELECT * FROM users ORDER BY created_at DESC
                `;

                if (users.length === 0) {
                    await tgApi(botToken, 'sendMessage', {
                        chat_id: managerChatId,
                        text: 'База пользователей пуста.'
                    });
                    return;
                }

                const statusIcon = { approved: '✅', pending: '⏳', rejected: '❌' };
                const typeLabels = {
                    retail: 'Розничный',
                    wholesale: 'Оптовый',
                    distributor: 'Дистрибьютор'
                };

                // Отправляем каждого пользователя отдельным сообщением с кнопкой удаления
                for (const u of users) {
                    const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ') || '—';
                    const icon = statusIcon[u.status] || '❓';
                    const userText =
                        `${icon} ${fullName}\n` +
                        `📱 ${u.username ? '@' + u.username : '—'}\n` +
                        `📞 ${u.phone || '—'}\n` +
                        `🏙 ${u.city || '—'}\n` +
                        `👤 ${typeLabels[u.user_type] || u.user_type}\n` +
                        `🆔 ${u.telegram_id}`;

                    await tgApi(botToken, 'sendMessage', {
                        chat_id: managerChatId,
                        text: userText,
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '🗑 Удалить из базы', callback_data: `delete:${u.telegram_id}` }
                            ]]
                        }
                    });
                }

                return;
            }
        }

        // ── Нажатия кнопок менеджера ─────────────────────────────────────
        if (update.callback_query) {
            const query = update.callback_query;
            const data = query.data;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const originalText = query.message.text;

            await tgApi(botToken, 'answerCallbackQuery', {
                callback_query_id: query.id
            });

            const sql = neon(process.env.DATABASE_URL);
            const typeLabels = {
                retail: 'Розничный покупатель',
                wholesale: 'Оптовый покупатель',
                distributor: 'Дистрибьютор'
            };

            if (data.startsWith('approve:')) {
                // Формат: approve:TYPE:TELEGRAM_ID
                const [, userType, telegramId] = data.split(':');

                await sql`
                    UPDATE users
                    SET status = 'approved', user_type = ${userType}, updated_at = CURRENT_TIMESTAMP
                    WHERE telegram_id = ${telegramId}
                `;

                await tgApi(botToken, 'editMessageText', {
                    chat_id: chatId,
                    message_id: messageId,
                    text: originalText + `\n\n✅ Одобрено как: ${typeLabels[userType]}`
                });

                await tgApi(botToken, 'sendMessage', {
                    chat_id: telegramId,
                    text:
                        `✅ Ваша заявка одобрена!\n\n` +
                        `Вы зарегистрированы как: ${typeLabels[userType]}\n\n` +
                        `Добро пожаловать в Hypreme Tobacco! Откройте приложение, чтобы сделать заказ.`
                });

            } else if (data.startsWith('reject:')) {
                // Формат: reject:TELEGRAM_ID
                const telegramId = data.split(':')[1];

                await sql`
                    UPDATE users
                    SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
                    WHERE telegram_id = ${telegramId}
                `;

                await tgApi(botToken, 'editMessageText', {
                    chat_id: chatId,
                    message_id: messageId,
                    text: originalText + '\n\n❌ Заявка отклонена'
                });

                await tgApi(botToken, 'sendMessage', {
                    chat_id: telegramId,
                    text: '❌ К сожалению, ваша заявка была отклонена. Если вы считаете это ошибкой — свяжитесь с нами.'
                });

            } else if (data.startsWith('delete:')) {
                // Формат: delete:TELEGRAM_ID
                const telegramId = data.split(':')[1];

                const deleted = await sql`
                    DELETE FROM users WHERE telegram_id = ${telegramId} RETURNING first_name, last_name, username
                `;

                if (deleted.length > 0) {
                    const u = deleted[0];
                    const name = [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || telegramId;

                    // Убираем кнопку удаления из сообщения
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId,
                        message_id: messageId,
                        text: originalText + '\n\n🗑 Удалён из базы'
                    });

                    await tgApi(botToken, 'answerCallbackQuery', {
                        callback_query_id: query.id,
                        text: `${name} удалён из базы`
                    });
                }
            }

            return;
        }

        // ── Старый обработчик web_app_data ───────────────────────────────
        if (update.message?.web_app_data) {
            const orderText = update.message.web_app_data.data;
            const chatId = process.env.CHAT_ID;

            await tgApi(botToken, 'sendMessage', { chat_id: chatId, text: orderText });
            await tgApi(botToken, 'sendMessage', {
                chat_id: update.message.from.id,
                text: '✅ Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.'
            });
        }

    } catch (error) {
        console.error('Webhook error:', error);
    }
}

function tgApi(token, method, body) {
    return fetch(`https://api.telegram.org/bot${token}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}
