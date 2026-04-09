function handleSwipe(element, closeFunction, hasScrollableContent = false) {
    const modalCard = element.querySelector('.modal-card');
    const listenTarget = (hasScrollableContent && modalCard) ? modalCard : element;

    let startY = 0;
    let pendingClose = false;

    listenTarget.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    listenTarget.addEventListener('touchmove', (e) => {
        if (!hasScrollableContent || !modalCard) return;
        const dy = e.touches[0].clientY - startY;
        // Блокируем нативный скролл только если уже в самом верху и тянем вниз
        if (modalCard.scrollTop === 0 && dy > 0) {
            e.preventDefault();
        }
    }, { passive: false });

    listenTarget.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const swipeDistance = endY - startY;

        // Свайп вверх — сбрасываем ожидание
        if (swipeDistance < -30) {
            pendingClose = false;
            return;
        }

        if (swipeDistance < 80) return;

        // Свайп вниз
        if (!hasScrollableContent) {
            closeFunction();
            return;
        }

        if (modalCard.scrollTop === 0 || pendingClose) {
            // Наверху или уже был первый свайп — закрываем
            pendingClose = false;
            closeFunction();
        } else {
            // Контент ещё не доскроллил до верха — запоминаем первый свайп
            pendingClose = true;
        }
    }, { passive: true });
}
