import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        // Проверка, зарегистрирован ли пользователь
        const { telegram_id } = req.query;

        if (!telegram_id) {
            return res.status(400).json({ error: 'telegram_id is required' });
        }

        try {
            const result = await sql`
                SELECT * FROM users WHERE telegram_id = ${telegram_id}
            `;

            if (result.rows.length > 0) {
                return res.status(200).json({
                    registered: true,
                    user: result.rows[0]
                });
            } else {
                return res.status(200).json({ registered: false });
            }
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
    }

    if (req.method === 'POST') {
        // Регистрация нового пользователя
        const { telegram_id, username, first_name, last_name, city, user_type, phone } = req.body;

        // Валидация
        if (!telegram_id || !city || !user_type || !phone) {
            return res.status(400).json({
                error: 'Missing required fields: telegram_id, city, user_type, phone'
            });
        }

        if (!['retail', 'wholesale', 'distributor'].includes(user_type)) {
            return res.status(400).json({
                error: 'user_type must be: retail, wholesale, or distributor'
            });
        }

        try {
            // Проверяем, не зарегистрирован ли уже
            const existing = await sql`
                SELECT id FROM users WHERE telegram_id = ${telegram_id}
            `;

            if (existing.rows.length > 0) {
                return res.status(400).json({ error: 'User already registered' });
            }

            // Регистрируем пользователя
            const result = await sql`
                INSERT INTO users (telegram_id, username, first_name, last_name, city, user_type, phone)
                VALUES (${telegram_id}, ${username || null}, ${first_name || null}, ${last_name || null}, ${city}, ${user_type}, ${phone})
                RETURNING *
            `;

            return res.status(201).json({
                success: true,
                user: result.rows[0]
            });
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error', details: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
