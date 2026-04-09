function handleSwipe(element, closeFunction, hasScrollableContent = false) {
    let startY = 0;
    const modalCard = element.querySelector('.modal-card');

    element.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const swipeDistance = endY - startY;

        if (swipeDistance < 80) return;

        const atTop = !modalCard || modalCard.scrollTop === 0;

        if (!hasScrollableContent || atTop) {
            e.preventDefault();
            e.stopPropagation();
            closeFunction();
            document.body.style.pointerEvents = 'none';
            setTimeout(() => { document.body.style.pointerEvents = ''; }, 300);
        }
    }, { passive: false });
}
