export default async function handler(req, res) {
    console.log('Request method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);

    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Обрабатываем preflight запрос
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS preflight request');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        console.error('Invalid method:', req.method);
        return res.status(405).json({ error: 'Method not allowed', method: req.method });
    }

    try {
        // Поддерживаем как JSON так и form data
        let orderText;

        if (req.headers['content-type']?.includes('application/json')) {
            orderText = req.body?.orderText;
        } else {
            // Form data
            orderText = req.body?.orderText || req.body;
        }

        console.log('Received order request');
        console.log('Order text length:', orderText?.length);

        if (!orderText) {
            return res.status(400).json({ error: 'Order text is required' });
        }

        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Missing env variables:', {
                hasBotToken: !!botToken,
                hasChatId: !!chatId
            });
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        console.log('Sending to Telegram...');

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

        console.log('Telegram response:', data);

        if (data.ok) {
            return res.status(200).json({ success: true, message: 'Order sent successfully' });
        } else {
            console.error('Telegram API error:', data);
            return res.status(500).json({ error: 'Failed to send order to Telegram', details: data.description });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
