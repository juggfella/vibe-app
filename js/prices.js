async function loadPrices(telegramId) {
    const response = await fetch(`https://hypremeapp.vercel.app/api/prices?telegram_id=${telegramId}`);
    const data = await response.json();
    if (!data.prices) throw new Error('No prices returned');

    // Инжектируем цены в глобальный массив categories
    // Граммовки без цены (недоступные для данного тарифа) — фильтруем
    categories.forEach(category => {
        const priceMap = data.prices[category.priceKey];
        if (!priceMap) return;
        category.services.forEach(service => {
            service.weights = service.weights
                .filter(w => priceMap[w.grams] !== undefined)
                .map(w => ({ grams: w.grams, price: priceMap[w.grams] }));
        });
    });
}
