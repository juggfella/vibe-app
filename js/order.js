function sendToTelegram(orderText) {
    console.log('=== Sending order ===');
    console.log('Order text:', orderText);

    const apiUrl = 'https://hypremeapp.vercel.app/api/send-order';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderText: orderText })
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.success) {
            alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
            cart = {};
            updateCartBadge();
            renderCart();
            closeCart();
        } else {
            alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка отправки: ' + error.message);
    });
}

// Экранирование HTML для Telegram

function checkoutCart() {
    const items = Object.values(cart);
    if (items.length === 0) return;

    const u = window.currentUser;
    const tgUser = tg.initDataUnsafe?.user;

    const userTypeLabels = {
        retail: 'Розничный покупатель',
        wholesale: 'Оптовый покупатель',
        distributor: 'Дистрибьютор'
    };

    let message = '🛒 НОВЫЙ ЗАКАЗ\n\n';

    // Блок заказчика — данные из БД (регистрация)
    message += '👤 Заказчик:\n';
    if (u) {
        const fullName = [u.first_name, u.last_name].filter(Boolean).join(' ');
        if (fullName)                 message += `Имя: ${fullName}\n`;
        if (u.phone)                  message += `Телефон: ${u.phone}\n`;
        if (u.city)                   message += `Город: ${u.city}\n`;
        if (u.user_type)              message += `Тип: ${userTypeLabels[u.user_type] || u.user_type}\n`;
        if (u.username)               message += `Telegram: @${u.username}\n`;
    } else if (tgUser) {
        // Фолбэк — только Telegram данные если регистрация не прошла
        const fullName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ');
        if (fullName)                 message += `Имя: ${fullName}\n`;
        if (tgUser.username)          message += `Telegram: @${tgUser.username}\n`;
    }
    message += '\n';

    // Товары, сгруппированные по линейкам
    message += '📦 Состав заказа:\n';

    const grouped = {};
    items.forEach(item => {
        const category = categories.find(c => c.services.some(s => s.id === item.id));
        const catName = category ? category.name : 'Прочее';
        if (!grouped[catName]) grouped[catName] = [];
        grouped[catName].push(item);
    });

    let totalPrice = 0;

    Object.entries(grouped).forEach(([catName, catItems]) => {
        message += `\n— ${catName} —\n`;
        catItems.forEach(item => {
            const itemTotal = item.selectedPrice ? item.selectedPrice * item.quantity : 0;
            totalPrice += itemTotal;
            const weight = item.selectedWeight ? ` (${item.selectedWeight}г)` : '';
            message += `${item.name}${weight} x${item.quantity}`;
            if (itemTotal > 0) message += ` — ${itemTotal} ₽`;
            message += '\n';
        });
    });

    message += `\nИТОГО: ${totalPrice} ₽`;

    sendToTelegram(message);
}
