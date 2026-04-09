// Block body scroll while the registration gate is visible
document.body.style.overflow = 'hidden';

function hideRegistrationGate() {
    const modal = document.getElementById('registrationModal');
    modal.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.6, 1)';
    modal.style.transform = 'translateY(100%)';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.transform = '';
        modal.style.transition = '';
        document.body.style.overflow = '';
    }, 450);
}

function showApprovedAndHide() {
    // Убираем полноэкранный баннер сразу
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';

    // Маленький тост снизу
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(120px);
        background: #1a1a1a;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 16px;
        padding: 14px 28px;
        text-align: center;
        z-index: 3000;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        white-space: nowrap;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    `;
    toast.innerHTML = `
        <div style="font-size:22px; margin-bottom:4px;">✅</div>
        <div style="font-size:15px; font-weight:500; color:#fff;">Вы авторизованы</div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }));

    setTimeout(() => {
        toast.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.6, 1)';
        toast.style.transform = 'translateX(-50%) translateY(120px)';
        setTimeout(() => toast.remove(), 350);
    }, 1000);
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

                const btn = e.target.querySelector('button[type="submit"]');
                if (btn.disabled) return;
                btn.disabled = true;
                btn.textContent = 'Отправка...';

                const formData = {
                    telegram_id: user.id,
                    username: user.username,
                    first_name: document.getElementById('firstName').value,
                    last_name: document.getElementById('lastName').value,
                    city: document.getElementById('city').value,
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
                        btn.disabled = false;
                        btn.textContent = 'Зарегистрироваться';
                    }
                } catch (error) {
                    console.error('Error registering:', error);
                    alert('Ошибка регистрации: ' + error.message);
                    btn.disabled = false;
                    btn.textContent = 'Зарегистрироваться';
                }
            });

        } else {
            window.currentUser = data.user;
            const status = data.user.status;

            if (status === 'approved') {
                showApprovedAndHide();
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
