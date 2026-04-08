import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const update = req.body;
        const botToken = process.env.BOT_TOKEN;
        const managerChatId = String(process.env.MANAGER_CHAT_ID).trim();

        // ── Команды менеджера (/list) ─────────────────────────────────────
        if (update.message?.text) {
            const msg = update.message;
            const fromChatId = String(msg.chat.id);
            const text = msg.text.trim();

            // Принимаем команды только из беседы менеджера
            // /debug — временная команда для диагностики (можно удалить после проверки)
            if (text.split('@')[0] === '/debug') {
                await tgApi(botToken, 'sendMessage', {
                    chat_id: fromChatId,
                    text: `fromChatId: ${fromChatId}\nmanagerChatId: ${managerChatId}\nmatch: ${fromChatId === managerChatId}`
                });
            }

            if (fromChatId === managerChatId) {
                // Убираем возможный @botname из команды: /list@hypremetobacco_bot → /list
                const command = text.split('@')[0];

                if (command === '/list') {
                    try {
                        const sql = neon(process.env.DATABASE_URL);
                        const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;

                        if (users.length === 0) {
                            await tgApi(botToken, 'sendMessage', {
                                chat_id: managerChatId,
                                text: 'База пользователей пуста.'
                            });
                            return res.status(200).json({ ok: true });
                        }

                        const statusIcon = { approved: '✅', pending: '⏳', rejected: '❌' };
                        const typeLabels = {
                            retail: 'Розничный',
                            wholesale: 'Оптовый',
                            distributor: 'Дистрибьютор'
                        };

                        for (const u of users) {
                            const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ') || '—';
                            const icon = statusIcon[u.status] || '❓';

                            await tgApi(botToken, 'sendMessage', {
                                chat_id: managerChatId,
                                text:
                                    `${icon} ${fullName}\n` +
                                    `📱 ${u.username ? '@' + u.username : '—'}\n` +
                                    `📞 ${u.phone || '—'}\n` +
                                    `🏙 ${u.city || '—'}\n` +
                                    `👤 ${typeLabels[u.user_type] || u.user_type}\n` +
                                    `🆔 ${u.telegram_id}`,
                                reply_markup: {
                                    inline_keyboard: [[
                                        { text: '🗑 Удалить из базы', callback_data: `delete:${u.telegram_id}` }
                                    ]]
                                }
                            });
                        }
                    } catch (err) {
                        await tgApi(botToken, 'sendMessage', {
                            chat_id: managerChatId,
                            text: `❌ Ошибка /list: ${err.message}`
                        });
                    }

                    return res.status(200).json({ ok: true });
                }
            }
        }

        // ── Нажатия кнопок менеджера ──────────────────────────────────────
        if (update.callback_query) {
            const query = update.callback_query;
            const data = query.data;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const originalText = query.message.text;

            const sql = neon(process.env.DATABASE_URL);
            const typeLabels = {
                retail: 'Розничный покупатель',
                wholesale: 'Оптовый покупатель',
                distributor: 'Дистрибьютор'
            };

            if (data.startsWith('approve:')) {
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
                const telegramId = data.split(':')[1];

                const deleted = await sql`
                    DELETE FROM users WHERE telegram_id = ${telegramId}
                    RETURNING first_name, last_name, username
                `;

                if (deleted.length > 0) {
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId,
                        message_id: messageId,
                        text: originalText + '\n\n🗑 Удалён из базы'
                    });
                }
            }

            // Снимаем loading с кнопки — всегда в конце
            await tgApi(botToken, 'answerCallbackQuery', {
                callback_query_id: query.id
            });

            return res.status(200).json({ ok: true });
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

    return res.status(200).json({ ok: true });
}

function tgApi(token, method, body) {
    return fetch(`https://api.telegram.org/bot${token}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}
