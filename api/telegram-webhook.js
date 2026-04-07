export default async function handler(req, res) {
    console.log('Webhook received');
    console.log('Method:', req.method);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const update = req.body;

        // Проверяем, есть ли web_app_data
        if (update.message?.web_app_data) {
            const webAppData = update.message.web_app_data;
            const orderText = webAppData.data;

            console.log('Received web_app_data:', orderText);

            const botToken = process.env.BOT_TOKEN;
            const chatId = process.env.CHAT_ID;

            if (!botToken || !chatId) {
                console.error('Missing env variables');
                return res.status(500).json({ error: 'Server configuration error' });
            }

            // Отправляем заказ в чат менеджера
            const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: orderText
                })
            });

            const data = await response.json();
            console.log('Telegram response:', data);

            if (data.ok) {
                // Отправляем подтверждение пользователю
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: update.message.from.id,
                        text: '✅ Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.'
                    })
                });
            }
        }

        // Всегда возвращаем 200 для webhook
        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(200).json({ ok: true }); // Все равно возвращаем 200
    }
}
