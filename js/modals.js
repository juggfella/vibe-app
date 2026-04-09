let modalOpenTime = 0;

function openModal(service) {
    modalOpenTime = Date.now();
    const modalImage = document.getElementById('modalImage');
    modalImage.src = service.image;
    modalImage.style.objectPosition = service.imagePosition || 'center center';
    document.getElementById('modalName').textContent = service.name;
    document.getElementById('modalDescription').innerHTML = (service.description || '').replace(/\n/g, '<br>');

    // Инициализируем выбранную граммовку если её нет
    if (service.weights && !selectedWeights[service.id]) {
        selectedWeights[service.id] = service.weights[0].grams;
    }

    const selectedWeight = service.weights ? (selectedWeights[service.id] || service.weights[0].grams) : null;
    const cartKey = selectedWeight ? getCartKey(service.id, selectedWeight) : service.id;

    // Рендерим выбор граммовки, цену и кнопку корзины
    const modalCartControl = document.getElementById('modalCartControl');

    let html = '<div data-service-id="' + service.id + '">';

    if (service.weights) {
        const priceData = service.weights.find(w => w.grams === selectedWeight);
        html += `
            <div class="product-price" style="font-size: 20px; margin-bottom: 12px;">${priceData.price} ₽</div>
            <div class="weight-selector" style="justify-content: center; margin-bottom: 16px;">
                ${service.weights.map(w => {
                    const wCartKey = getCartKey(service.id, w.grams);
                    const inCart = cart[wCartKey] ? 'in-cart' : '';
                    return `
                    <div class="weight-option ${w.grams === selectedWeight ? 'active' : ''} ${inCart}"
                         data-weight="${w.grams}"
                         onclick="selectWeight(${service.id}, ${w.grams})">
                        ${w.grams}г
                    </div>
                `}).join('')}
            </div>
        `;
    }

    html += '<div class="modal-button-container">';

    if (cart[cartKey]) {
        html += `
            <div class="cart-counter">
                <button class="cart-counter-btn" onclick="event.stopPropagation(); removeFromCart(${service.id}, ${selectedWeight}); return false;">−</button>
                <div class="cart-counter-value">${cart[cartKey].quantity}</div>
                <button class="cart-counter-btn" onclick="event.stopPropagation(); addToCart(${service.id}, ${selectedWeight}); return false;">+</button>
            </div>
        `;
    } else {
        html += `
            <button class="modal-contact-btn" onclick="event.stopPropagation(); addToCart(${service.id}${selectedWeight ? ', ' + selectedWeight : ''})">
                Добавить в корзину
            </button>
        `;
    }

    html += '</div></div>';
    modalCartControl.innerHTML = html;

    const modalElement = document.getElementById('modal');
    const modalCard = modalElement.querySelector('.modal-card');

    // Проверяем, есть ли прокрутка в контенте
    const hasScroll = modalCard.scrollHeight > window.innerHeight * 0.9;

    // Удаляем старые обработчики свайпа если есть
    if (modalElement._swipeHandlers) {
        modalElement._swipeHandlers.forEach(handler => {
            modalElement.removeEventListener(handler.event, handler.fn);
        });
    }

    // Добавляем новые обработчики
    modalElement._swipeHandlers = [];
    setupModalHandlers(modalElement, hasScroll);

    // Открываем модальное окно
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modalElement.classList.add('active');
    });
}


function setupModalHandlers(modalElement, hasScroll) {
    const closeHandler = (e) => {
        if (e.target === modalElement) closeModal();
    };
    const closeButtonHandler = () => closeModal();
    const cardClickHandler = (e) => e.stopPropagation();
    const imageClickHandler = () => { if (Date.now() - modalOpenTime > 500) openFullImage(); };

    modalElement.addEventListener('click', closeHandler);
    modalElement.querySelector('.modal-close').addEventListener('click', closeButtonHandler);
    modalElement.querySelector('.modal-card').addEventListener('click', cardClickHandler);
    modalElement.querySelector('#modalImage').addEventListener('click', imageClickHandler);

    // Предотвращаем скролл фона
    const touchMoveHandler = (e) => {
        const modalCard = modalElement.querySelector('.modal-card');
        if (!modalCard.contains(e.target)) {
            e.preventDefault();
        }
    };
    modalElement.addEventListener('touchmove', touchMoveHandler, { passive: false });

    modalElement._swipeHandlers = [
        { event: 'click', fn: closeHandler },
        { event: 'touchmove', fn: touchMoveHandler }
    ];

    handleSwipe(modalElement, closeModal, hasScroll);
}


function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
}


function openFullImage() {
    const modalImage = document.getElementById('modalImage');
    document.getElementById('fullImage').src = modalImage.src;
    document.getElementById('fullImageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}


function openFullImageFromCart(imageSrc) {
    document.getElementById('fullImage').src = imageSrc;
    document.getElementById('fullImageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeFullImage() {
    const modal = document.getElementById('fullImageModal');
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
}


function openAbout() {
    document.getElementById('aboutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeAbout() {
    document.getElementById('aboutModal').classList.remove('active');
    document.body.style.overflow = '';
}
