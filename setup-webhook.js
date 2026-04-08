// Скрипт для настройки webhook
// Запустите: node setup-webhook.js YOUR_BOT_TOKEN

const BOT_TOKEN = process.argv[2] || process.env.BOT_TOKEN;
const WEBHOOK_URL = 'https://hypremeapp.vercel.app/api/telegram-webhook';

if (!BOT_TOKEN) {
    console.error('Usage: node setup-webhook.js YOUR_BOT_TOKEN');
    process.exit(1);
}

async function setupWebhook() {
    console.log('Setting up webhook...');

    // Проверяем текущий webhook
    const checkUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;
    const checkResponse = await fetch(checkUrl);
    const checkData = await checkResponse.json();

    console.log('Current webhook info:', JSON.stringify(checkData, null, 2));

    // Устанавливаем новый webhook
    const setUrl = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`;
    const setResponse = await fetch(setUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: WEBHOOK_URL })
    });

    const setData = await setResponse.json();
    console.log('Set webhook result:', JSON.stringify(setData, null, 2));
}

setupWebhook().catch(console.error);
