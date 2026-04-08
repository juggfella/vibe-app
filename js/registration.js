async function checkRegistration() {
    console.log('checkRegistration called');
    const user = tg.initDataUnsafe?.user;
    console.log('User from Telegram:', user);

    if (!user?.id) {
        console.log('No user data from Telegram');
        return;
    }

    console.log('User ID:', user.id);

    try {
        console.log('Fetching registration status...');
        const response = await fetch(`https://hypremeapp.vercel.app/api/register?telegram_id=${user.id}`);
        console.log('Response received:', response.status);
        const data = await response.json();
        console.log('Registration data:', data);

        if (!data.registered) {
            console.log('User not registered, showing form');
            // Показываем форму регистрации
            const modal = document.getElementById('registrationModal');
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
            }, 10);

            // НЕ предзаполняем данные - оставляем поля пустыми
            // if (user.first_name) document.getElementById('firstName').value = user.first_name;
            // if (user.last_name) document.getElementById('lastName').value = user.last_name;

            // Добавляем обработчик формы
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
                        alert('Регистрация успешна!');
                        document.getElementById('registrationModal').style.display = 'none';
                        window.currentUser = data.user;
                    } else {
                        alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
                    }
                } catch (error) {
                    console.error('Error registering:', error);
                    alert('Ошибка регистрации: ' + error.message);
                }
            });
        } else {
            console.log('User already registered:', data.user);
            // Можно сохранить данные пользователя для использования (например, для цен)
            window.currentUser = data.user;
        }
    } catch (error) {
        console.error('Error checking registration:', error);
    }
}
