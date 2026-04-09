function handleSwipe(element, closeFunction, hasScrollableContent = false) {
    const modalCard = element.querySelector('.modal-card');
    const listenTarget = (hasScrollableContent && modalCard) ? modalCard : element;

    let startY = 0;

    listenTarget.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    // Когда скролл в самом верху и тянем вниз — блокируем нативный скролл,
    // чтобы жест не поглощался браузером
    listenTarget.addEventListener('touchmove', (e) => {
        if (!hasScrollableContent || !modalCard) return;
        const dy = e.touches[0].clientY - startY;
        if (modalCard.scrollTop === 0 && dy > 0) {
            e.preventDefault();
        }
    }, { passive: false });

    listenTarget.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const swipeDistance = endY - startY;

        if (swipeDistance < 80) return;

        const atTop = !modalCard || modalCard.scrollTop === 0;
        if (!hasScrollableContent || atTop) {
            closeFunction();
        }
    }, { passive: true });
}
