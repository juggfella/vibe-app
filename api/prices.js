import { neon } from '@neondatabase/serverless';

// Цены хранятся только на сервере — фронтенд получает только свой тариф
// Если граммовки нет в объекте — она не показывается клиенту
const PRICES = {
    retail: {
        redline:     { 40: 430,  100: 1090 },             // 200г недоступно для розницы
        blackline:   { 40: 430,  100: 1090 },
        special:     { 40: 430,  100: 1090 },
        specialalco: { 25: 430,  200: 2900 },
        mixline:     { 25: 290 }
    },
    wholesale: {
        redline:     { 40: 320,  100: 790,  200: 1490 },
        blackline:   { 40: 320,  100: 790,  200: 1490 },
        special:     { 40: 320,  100: 790,  200: 1490 },
        specialalco: { 25: 320,  200: 2300 },
        mixline:     { 25: 200 }
    },
    distributor: {
        redline:     { 40: 240,  100: 590,  200: 1040 },
        blackline:   { 40: 240,  100: 590,  200: 1040 },
        special:     { 40: 240,  100: 590,  200: 1040 },
        specialalco: { 25: 240,  200: 1800 },
        mixline:     { 25: 150 }
    }
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { telegram_id } = req.query;
    if (!telegram_id) return res.status(400).json({ error: 'telegram_id required' });

    const sql = neon(process.env.DATABASE_URL);
    try {
        const result = await sql`
            SELECT user_type FROM users
            WHERE telegram_id = ${telegram_id} AND status = 'approved'
        `;
        if (result.length === 0) return res.status(403).json({ error: 'Not authorized' });

        const userType = result[0].user_type;
        const prices = PRICES[userType];
        if (!prices) return res.status(400).json({ error: 'Unknown user type' });

        return res.status(200).json({ prices });
    } catch (error) {
        console.error('Prices error:', error);
        return res.status(500).json({ error: 'Database error' });
    }
}
