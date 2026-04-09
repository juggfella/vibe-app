import { neon } from '@neondatabase/serverless';

const PAGE_SIZE = 8;

const STATUS_ICON  = { approved: '✅', pending: '⏳', rejected: '❌' };
const TYPE_LABEL   = { retail: 'Розничный', wholesale: 'Оптовый', distributor: 'Дистрибьютор' };
const TYPE_LABEL_FULL = {
    retail: 'Розничный покупатель',
    wholesale: 'Оптовый покупатель',
    distributor: 'Дистрибьютор'
};

// ── Строит текст + клавиатуру для страницы списка пользователей ──────────
function buildListPage(users, page) {
    const total = users.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const start = page * PAGE_SIZE;
    const pageUsers = users.slice(start, start + PAGE_SIZE);

    // Текст — компактная карточка на каждого пользователя
    let text = `👥 Клиенты • ${total} чел. • стр. ${page + 1}/${totalPages}\n\n`;
    pageUsers.forEach((u, i) => {
        const icon     = STATUS_ICON[u.status] || '❓';
        const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ') || '—';
        const tg       = u.username ? `@${u.username}` : `id:${u.telegram_id}`;
        const type     = TYPE_LABEL[u.user_type] || u.user_type;
        text += `${icon} ${fullName} ${tg}\n`;
        text += `   📞 ${u.phone || '—'} | 🏙 ${u.city || '—'} | ${type}\n`;
        if (i < pageUsers.length - 1) text += '\n';
    });

    // Кнопки удаления — по 2 в ряд
    const deleteRows = [];
    for (let i = 0; i < pageUsers.length; i += 2) {
        const row = [];
        const makeLabel = (u) => {
            const name = u.first_name || u.username || String(u.telegram_id);
            return `🗑 ${name.slice(0, 15)}`;
        };
        row.push({ text: makeLabel(pageUsers[i]), callback_data: `del:${pageUsers[i].telegram_id}:${page}` });
        if (pageUsers[i + 1]) {
            row.push({ text: makeLabel(pageUsers[i + 1]), callback_data: `del:${pageUsers[i + 1].telegram_id}:${page}` });
        }
        deleteRows.push(row);
    }

    // Навигация + закрытие
    const navRow = [];
    if (page > 0)               navRow.push({ text: '← Пред.', callback_data: `list:${page - 1}` });
    navRow.push({ text: `${page + 1} / ${totalPages}`, callback_data: 'noop' });
    if (page < totalPages - 1)  navRow.push({ text: 'След. →', callback_data: `list:${page + 1}` });

    const closeRow = [{ text: '✖ Закрыть', callback_data: 'close' }];

    return {
        text,
        reply_markup: { inline_keyboard: [...deleteRows, navRow, closeRow] }
    };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const update = req.body;
        const botToken     = process.env.BOT_TOKEN;
        const managerChatId = String(process.env.MANAGER_CHAT_ID).trim();
        const sql          = neon(process.env.DATABASE_URL);

        // ── Текстовые команды (/list, /debug) ────────────────────────────
        if (update.message?.text) {
            const msg        = update.message;
            const fromChatId = String(msg.chat.id);
            const command    = msg.text.trim().split('@')[0];

            if (command === '/start' && msg.chat.type === 'private') {
                const firstName = msg.from?.first_name || 'друг';
                await tgApi(botToken, 'sendMessage', {
                    chat_id: fromChatId,
                    text: `Привет, ${firstName}! 👋\n\nДобро пожаловать в Hypreme Tobacco.\n\nНажмите кнопку ниже, чтобы открыть приложение 👇`,
                    reply_markup: {
                        inline_keyboard: [[{
                            text: '🛍 Открыть каталог',
                            web_app: { url: 'https://hypremeapp.vercel.app' }
                        }]]
                    }
                });
            }

            if (command === '/debug') {
                await tgApi(botToken, 'sendMessage', {
                    chat_id: fromChatId,
                    text: `fromChatId: ${fromChatId}\nmanagerChatId: ${managerChatId}\nmatch: ${fromChatId === managerChatId}`
                });
            }

            if (fromChatId === managerChatId && command === '/menu') {
                await tgApi(botToken, 'sendMessage', {
                    chat_id: managerChatId,
                    text: '📋 Панель менеджера',
                    reply_markup: {
                        keyboard: [[{ text: '📋 Список клиентов' }]],
                        resize_keyboard: true,
                        persistent: true
                    }
                });
            }

            if (fromChatId === managerChatId && (command === '/list' || msg.text.trim() === '📋 Список клиентов')) {
                const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;

                if (users.length === 0) {
                    await tgApi(botToken, 'sendMessage', {
                        chat_id: managerChatId,
                        text: 'База пользователей пуста.'
                    });
                } else {
                    const { text, reply_markup } = buildListPage(users, 0);
                    await tgApi(botToken, 'sendMessage', {
                        chat_id: managerChatId, text, reply_markup
                    });
                }
            }
        }

        // ── Нажатия кнопок ────────────────────────────────────────────────
        if (update.callback_query) {
            const query     = update.callback_query;
            const data      = query.data;
            const chatId    = query.message.chat.id;
            const messageId = query.message.message_id;

            await tgApi(botToken, 'answerCallbackQuery', { callback_query_id: query.id });

            // Пагинация: list:PAGE
            if (data.startsWith('list:')) {
                const page  = parseInt(data.split(':')[1]);
                const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;

                if (users.length === 0) {
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId, message_id: messageId,
                        text: 'База пользователей пуста.'
                    });
                } else {
                    const { text, reply_markup } = buildListPage(users, page);
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId, message_id: messageId, text, reply_markup
                    });
                }

            // Удаление: del:TELEGRAM_ID:PAGE
            } else if (data.startsWith('del:')) {
                const [, telegramId, pageStr] = data.split(':');
                const page = parseInt(pageStr);

                await sql`DELETE FROM users WHERE telegram_id = ${telegramId}`;

                // После удаления перерисовываем страницу (или предыдущую если она опустела)
                const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;
                if (users.length === 0) {
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId, message_id: messageId,
                        text: '👥 База пользователей пуста.'
                    });
                } else {
                    const totalPages = Math.ceil(users.length / PAGE_SIZE);
                    const safePage   = Math.min(page, totalPages - 1);
                    const { text, reply_markup } = buildListPage(users, safePage);
                    await tgApi(botToken, 'editMessageText', {
                        chat_id: chatId, message_id: messageId, text, reply_markup
                    });
                }

            // Одобрение: approve:TYPE:TELEGRAM_ID
            } else if (data.startsWith('approve:')) {
                const [, userType, telegramId] = data.split(':');

                await sql`
                    UPDATE users SET status = 'approved', user_type = ${userType}, updated_at = CURRENT_TIMESTAMP
                    WHERE telegram_id = ${telegramId}
                `;
                await tgApi(botToken, 'editMessageText', {
                    chat_id: chatId, message_id: messageId,
                    text: query.message.text + `\n\n✅ Одобрено как: ${TYPE_LABEL_FULL[userType]}`
                });
                await tgApi(botToken, 'sendMessage', {
                    chat_id: telegramId,
                    text: `✅ Ваша заявка одобрена!\n\nДобро пожаловать в Hypreme Tobacco! Откройте приложение, чтобы сделать заказ.`,
                    reply_markup: {
                        inline_keyboard: [[{
                            text: '🛍 Открыть каталог',
                            web_app: { url: 'https://hypremeapp.vercel.app' }
                        }]]
                    }
                });

            // Отказ: reject:TELEGRAM_ID
            } else if (data.startsWith('reject:')) {
                const telegramId = data.split(':')[1];

                await sql`
                    UPDATE users SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
                    WHERE telegram_id = ${telegramId}
                `;
                await tgApi(botToken, 'editMessageText', {
                    chat_id: chatId, message_id: messageId,
                    text: query.message.text + '\n\n❌ Заявка отклонена'
                });
                await tgApi(botToken, 'sendMessage', {
                    chat_id: telegramId,
                    text: '❌ К сожалению, ваша заявка была отклонена. Если вы считаете это ошибкой — свяжитесь с нами.'
                });
            }
            // Закрыть — удаляем сообщение
            } else if (data === 'close') {
                await tgApi(botToken, 'deleteMessage', {
                    chat_id: chatId,
                    message_id: messageId
                });

            // noop — кнопка текущей страницы, ничего не делаем
        }

        // ── web_app_data (отправка заказов через кнопку в боте) ──────────
        if (update.message?.web_app_data) {
            const orderText = update.message.web_app_data.data;
            await tgApi(botToken, 'sendMessage', { chat_id: process.env.CHAT_ID, text: orderText });
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
