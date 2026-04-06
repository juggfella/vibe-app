export default async function handler(req, res) {
    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обрабатываем preflight запрос
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderText } = req.body;

        if (!orderText) {
            return res.status(400).json({ error: 'Order text is required' });
        }

        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        if (!botToken || !chatId) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: orderText,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true, message: 'Order sent successfully' });
        } else {
            console.error('Telegram API error:', data);
            return res.status(500).json({ error: 'Failed to send order', details: data });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
