import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const sql = neon(process.env.DATABASE_URL);

    if (req.method === 'GET') {
        const { telegram_id } = req.query;

        if (!telegram_id) {
            return res.status(400).json({ error: 'telegram_id is required' });
        }

        try {
            const result = await sql`
                SELECT * FROM users WHERE telegram_id = ${telegram_id}
            `;

            if (result.length > 0) {
                return res.status(200).json({ registered: true, user: result[0] });
            } else {
                return res.status(200).json({ registered: false });
            }
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
    }

    if (req.method === 'POST') {
        const { telegram_id, username, first_name, last_name, city, user_type, phone } = req.body;

        if (!telegram_id || !city || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const existing = await sql`SELECT id FROM users WHERE telegram_id = ${telegram_id}`;
            if (existing.length > 0) {
                return res.status(400).json({ error: 'User already registered' });
            }

            const result = await sql`
                INSERT INTO users (telegram_id, username, first_name, last_name, city, user_type, phone, status)
                VALUES (${telegram_id}, ${username || null}, ${first_name || null}, ${last_name || null},
                        ${city}, null, ${phone}, 'pending')
                RETURNING *
            `;

            const user = result[0];

            // Отправляем заявку менеджеру
            await sendApprovalRequest(user);

            return res.status(201).json({ success: true, user });
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error', details: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

async function sendApprovalRequest(user) {
    const botToken = process.env.BOT_TOKEN;
    const managerChatId = process.env.MANAGER_CHAT_ID;

    if (!botToken || !managerChatId) {
        console.error('Missing BOT_TOKEN or MANAGER_CHAT_ID');
        return;
    }

    const typeLabels = { retail: 'Розничный', wholesale: 'Оптовый', distributor: 'Дистрибьютор' };
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || '—';

    const text =
        `📝 НОВАЯ ЗАЯВКА НА РЕГИСТРАЦИЮ\n\n` +
        `👤 Имя: ${fullName}\n` +
        `📱 Telegram: ${user.username ? '@' + user.username : '—'}\n` +
        `📞 Телефон: ${user.phone}\n` +
        `🏙 Город: ${user.city}\n` +
        `Выберите тип клиента или отклоните заявку:`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: managerChatId,
            text,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Розничный',    callback_data: `approve:retail:${user.telegram_id}` },
                        { text: '📦 Оптовый',      callback_data: `approve:wholesale:${user.telegram_id}` },
                    ],
                    [
                        { text: '🏭 Дистрибьютор', callback_data: `approve:distributor:${user.telegram_id}` },
                        { text: '❌ Отказать',      callback_data: `reject:${user.telegram_id}` },
                    ]
                ]
            }
        })
    });
}
