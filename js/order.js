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

    // Получаем данные пользователя из Telegram WebApp
    console.log('Telegram WebApp:', tg);
    console.log('initDataUnsafe:', tg.initDataUnsafe);

    const user = tg.initDataUnsafe?.user;
    console.log('User data:', user);

    const username = user?.username ? `@${user.username}` : null;
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';
    const userId = user?.id || '';

    console.log('Parsed data:', { username, firstName, lastName, userId });

    // Формируем сообщение без HTML
    let message = '🛒 НОВЫЙ ЗАКАЗ\n\n';

    // Добавляем информацию о заказчике
    if (username || firstName) {
        message += '👤 Заказчик:\n';
        if (username) {
            message += `Username: ${username}\n`;
        }
        if (firstName || lastName) {
            message += `Имя: ${firstName} ${lastName}\n`.trim() + '\n';
        }
        if (userId) {
            message += `ID: ${userId}\n`;
        }
        message += '\n';
    }

    let totalPrice = 0;

    items.forEach(item => {
        const itemTotal = item.selectedPrice ? item.selectedPrice * item.quantity : 0;
        totalPrice += itemTotal;
        const weight = item.selectedWeight ? ` (${item.selectedWeight}г)` : '';
        message += `${item.name}${weight} x${item.quantity}`;
        if (itemTotal > 0) {
            message += ` — ${itemTotal} ₽`;
        }
        message += '\n';
    });

    message += `\nИТОГО: ${totalPrice} ₽`;

    // Отправляем заказ
    sendToTelegram(message);
}
