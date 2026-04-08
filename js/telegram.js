const tg = window.Telegram.WebApp;

// Инициализируем и логируем данные
console.log('Current URL:', window.location.href);
console.log('Telegram WebApp initialized:', tg);
console.log('Platform:', tg.platform);
console.log('Version:', tg.version);
console.log('Init data:', tg.initData);
console.log('Init data unsafe:', tg.initDataUnsafe);

tg.ready();
tg.expand();
tg.disableVerticalSwipes();