// Block body scroll while the registration gate is visible
document.body.style.overflow = 'hidden';

function hideRegistrationGate() {
    document.getElementById('registrationModal').style.display = 'none';
    document.body.style.overflow = '';
}

function showPendingScreen(rejected = false) {
    // Hide registration form, show pending/rejected screen instead
    document.getElementById('registrationModal').style.display = 'none';
    const screen = document.getElementById('pendingScreen');
    if (rejected) {
        document.getElementById('pendingIcon').textContent = '❌';
        document.getElementById('pendingTitle').textContent = 'Заявка отклонена';
        document.getElementById('pendingMessage').textContent =
            'К сожалению, ваша заявка была отклонена. Если вы считаете это ошибкой — свяжитесь с нами.';
    }
    screen.style.display = 'flex';
    // body.overflow stays 'hidden'
}

async function checkRegistration() {
    console.log('checkRegistration called');
    const user = tg.initDataUnsafe?.user;
    console.log('User from Telegram:', user);

    if (!user?.id) {
        console.log('No user data from Telegram');
        // Not inside Telegram — unlock and let through
        hideRegistrationGate();
        return;
    }

    try {
        const response = await fetch(`https://hypremeapp.vercel.app/api/register?telegram_id=${user.id}`);
        const data = await response.json();
        console.log('Registration data:', data);

        if (!data.registered) {
            // New user — registration form is already visible (shown by default)
            // Wire up form submit
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
                        window.currentUser = data.user;
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

            if (status === 'approved') {
                hideRegistrationGate(); // unlock the app
            } else if (status === 'rejected') {
                showPendingScreen(true);
            } else {
                // pending
                showPendingScreen();
            }
        }
    } catch (error) {
        console.error('Error checking registration:', error);
        // On network error, let the user through to avoid being permanently locked out
        hideRegistrationGate();
    }
}
