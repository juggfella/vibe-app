export default async function handler(req, res) {
    console.log('Create order button request');

    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, orderText } = req.body;

        if (!userId || !orderText) {
            return res.status(400).json({ error: 'userId and orderText are required' });
        }

        const botToken = process.env.BOT_TOKEN;

        if (!botToken) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Сохраняем заказ с уникальным ID
        const orderId = Date.now().toString();

        // В реальном приложении нужно сохранить в базу данных
        // Пока используем простое решение - отправляем сразу с кнопкой подтверждения

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: userId,
                text: `📋 Ваш заказ:\n\n${orderText.replace(/<[^>]*>/g, '')}\n\nНажмите кнопку ниже для подтверждения:`,
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: '✅ Подтвердить заказ',
                            callback_data: `confirm_order_${orderId}`
                        }
                    ]]
                }
            })
        });

        const data = await response.json();
        console.log('Telegram response:', data);

        if (data.ok) {
            return res.status(200).json({
                success: true,
                message: 'Order button created',
                orderId: orderId
            });
        } else {
            console.error('Telegram API error:', data);
            return res.status(500).json({ error: 'Failed to create order button' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
