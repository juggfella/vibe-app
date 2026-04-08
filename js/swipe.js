let touchStartY = 0;
let touchEndY = 0;

function handleSwipe(element, closeFunction, hasScrollableContent = false) {
    let startY = 0;
    let userScrolled = false;
    let lastSwipeWasDown = false;
    let lastSwipeTime = 0;

    const modalCard = element.querySelector('.modal-card');

    element.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const delta = currentY - startY;

        // Если свайпнул вверх, отмечаем что пользователь скроллил
        if (delta < -10) {
            userScrolled = true;
        }

        // Если вернулись в самый верх скролла, сбрасываем флаг
        if (modalCard && modalCard.scrollTop === 0) {
            userScrolled = false;
        }
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const swipeDistance = endY - startY;
        const now = Date.now();

        // Свайп вниз больше 80px
        if (swipeDistance > 80) {
            if (!hasScrollableContent) {
                // Нет скролла - закрываем сразу
                e.preventDefault();
                e.stopPropagation();
                closeFunction();
                // Блокируем дальнейшие события на короткое время
                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    document.body.style.pointerEvents = '';
                }, 300);
            } else if (!userScrolled) {
                // Есть скролл, но пользователь не скроллил - закрываем сразу
                e.preventDefault();
                e.stopPropagation();
                closeFunction();
                document.body.style.pointerEvents = 'none';
                setTimeout(() => {
                    document.body.style.pointerEvents = '';
                }, 300);
            } else {
                // Пользователь скроллил - нужно два свайпа подряд
                const atTop = modalCard && modalCard.scrollTop === 0;

                if (atTop && lastSwipeWasDown && (now - lastSwipeTime < 1000)) {
                    // Второй свайп вниз в течение 1 секунды - закрываем
                    e.preventDefault();
                    e.stopPropagation();
                    closeFunction();
                    document.body.style.pointerEvents = 'none';
                    setTimeout(() => {
                        document.body.style.pointerEvents = '';
                    }, 300);
                } else if (atTop) {
                    // Первый свайп вниз в верху - запоминаем
                    lastSwipeWasDown = true;
                    lastSwipeTime = now;
                }
            }
        } else {
            // Не свайп вниз - сбрасываем счетчик
            lastSwipeWasDown = false;
        }
    }, { passive: false });
}
