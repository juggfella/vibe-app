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

        // ── Обработка нажатий кнопок менеджера ─────────────────────────
        if (update.callback_query) {
            const query = update.callback_query;
            const data = query.data;
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const originalText = query.message.text;

            // Снимаем состояние загрузки с кнопки
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

                // Редактируем сообщение менеджера — убираем кнопки, добавляем итог
                await tgApi(botToken, 'editMessageText', {
                    chat_id: chatId,
                    message_id: messageId,
                    text: originalText + `\n\n✅ Одобрено как: ${typeLabels[userType]}`
                });

                // Уведомляем клиента
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
            }

            return;
        }

        // ── Старый обработчик web_app_data (не используется активно) ────
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
