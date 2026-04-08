handleSwipe(document.getElementById('fullImageModal'), closeFullImage, false); // false = нет прокрутки
handleSwipe(document.getElementById('aboutModal'), closeAbout, false); // false = нет прокрутки, свайп работает
handleSwipe(document.getElementById('cartModal'), closeCart, true); // true = есть прокрутка

renderCatalog();


const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] !== '7') {
                value = '7' + value;
            }
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(9, 11);
            }
            e.target.value = formatted;
        }
    });

    phoneInput.addEventListener('focus', function(e) {
        if (!e.target.value) {
            e.target.value = '+7 (';
        }
    });

    phoneInput.addEventListener('blur', function(e) {
        if (e.target.value === '+7 (') {
            e.target.value = '';
        }
    });
}

// Проверка регистрации при загрузке
console.log('About to call checkRegistration...');
checkRegistration();