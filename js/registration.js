function showPendingScreen(rejected = false) {
    const screen = document.getElementById('pendingScreen');
    if (rejected) {
        document.getElementById('pendingIcon').textContent = '❌';
        document.getElementById('pendingTitle').textContent = 'Заявка отклонена';
        document.getElementById('pendingMessage').textContent =
            'К сожалению, ваша заявка была отклонена. Если вы считаете это ошибкой — свяжитесь с нами.';
    }
    screen.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

async function checkRegistration() {
    console.log('checkRegistration called');
    const user = tg.initDataUnsafe?.user;
    console.log('User from Telegram:', user);

    if (!user?.id) {
        console.log('No user data from Telegram');
        return;
    }

    try {
        const response = await fetch(`https://hypremeapp.vercel.app/api/register?telegram_id=${user.id}`);
        const data = await response.json();
        console.log('Registration data:', data);

        if (!data.registered) {
            // Новый пользователь — показываем форму регистрации
            const modal = document.getElementById('registrationModal');
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
            }, 10);

            document.getElementById('registrationForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = {
                    telegram_id: user.id,
                    username: user.username,
                    first_name: document.getElementById('firstName').value,
                    last_name: document.getElementById('lastName').value,
                    city: document.getElementById('city').value,
                    user_type: document.getElementById('userType').value,
                    phone: document.getElementById('phone').value
                };

                try {
                    const response = await fetch('https://hypremeapp.vercel.app/api/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (data.success) {
                        document.getElementById('registrationModal').style.display = 'none';
                        window.currentUser = data.user;
                        // Заявка отправлена — показываем экран ожидания
                        showPendingScreen();
                    } else {
                        alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
                    }
                } catch (error) {
                    console.error('Error registering:', error);
                    alert('Ошибка регистрации: ' + error.message);
                }
            });

        } else {
            window.currentUser = data.user;
            const status = data.user.status;

            if (status === 'pending') {
                showPendingScreen();
            } else if (status === 'rejected') {
                showPendingScreen(true);
            }
            // status === 'approved' → ничего не делаем, каталог доступен
        }
    } catch (error) {
        console.error('Error checking registration:', error);
    }
}
