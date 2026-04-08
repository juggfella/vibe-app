function selectWeight(serviceId, weight) {
    selectedWeights[serviceId] = weight;

    // Обновляем UI выбора граммовки
    const service = categories.flatMap(c => c.services).find(s => s.id === serviceId);
    const weightButtons = document.querySelectorAll(`[data-service-id="${serviceId}"] .weight-option`);

    weightButtons.forEach(btn => {
        const btnWeight = parseInt(btn.dataset.weight);
        const cartKey = getCartKey(serviceId, btnWeight);

        // Активная граммовка
        if (btnWeight === weight) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        // Граммовка в корзине
        if (cart[cartKey]) {
            btn.classList.add('in-cart');
        } else {
            btn.classList.remove('in-cart');
        }
    });

    // Обновляем цену
    if (service && service.weights) {
        const priceData = service.weights.find(w => w.grams === weight);
        const priceElements = document.querySelectorAll(`[data-service-id="${serviceId}"] .product-price`);
        const cartKey = getCartKey(serviceId, weight);
        const totalPrice = cart[cartKey] ? priceData.price * cart[cartKey].quantity : null;

        priceElements.forEach(el => {
            if (totalPrice && cart[cartKey].quantity > 1) {
                el.innerHTML = `<span>${priceData.price} ₽</span> <span class="total-price">(${totalPrice} ₽)</span>`;
            } else {
                el.textContent = `${priceData.price} ₽`;
            }
        });
    }

    // Обновляем кнопку корзины для новой граммовки
    updateCartControl(serviceId, weight);
}


function updateCartControl(serviceId, weight) {
    const service = categories.flatMap(c => c.services).find(s => s.id === serviceId);
    if (!service) return;

    // Если weight не передан, используем выбранную граммовку
    if (!weight && service.weights) {
        weight = selectedWeights[serviceId] || service.weights[0].grams;
    }

    const cartKey = weight ? getCartKey(serviceId, weight) : serviceId;
    const controlElement = document.getElementById(`cart-control-${serviceId}`);
    const modalControlElement = document.getElementById('modalCartControl');

    // Обновляем контрол в списке товаров
    if (controlElement) {
        if (cart[cartKey]) {
            controlElement.innerHTML = `
                <div class="cart-counter">
                    <button class="cart-counter-btn" onclick="event.stopPropagation(); removeFromCart(${serviceId}, ${weight}); return false;">−</button>
                    <div class="cart-counter-value">${cart[cartKey].quantity}</div>
                    <button class="cart-counter-btn" onclick="event.stopPropagation(); addToCart(${serviceId}, ${weight}); return false;">+</button>
                </div>
            `;
        } else {
            controlElement.innerHTML = `
                <button class="contact-btn" onclick="event.stopPropagation(); addToCart(${serviceId}, ${weight})">
                    Добавить в корзину
                </button>
            `;
        }
    }

    // Обновляем только кнопку в модальном окне, не трогая граммовки
    if (modalControlElement && modalControlElement.querySelector('[data-service-id="' + serviceId + '"]')) {
        const modalContainer = modalControlElement.querySelector('[data-service-id="' + serviceId + '"]');

        // Находим или создаем контейнер для кнопки
        let buttonContainer = modalContainer.querySelector('.modal-button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'modal-button-container';
            modalContainer.appendChild(buttonContainer);
        }

        if (cart[cartKey]) {
            buttonContainer.innerHTML = `
                <div class="cart-counter">
                    <button class="cart-counter-btn" onclick="event.stopPropagation(); removeFromCart(${serviceId}, ${weight}); return false;">−</button>
                    <div class="cart-counter-value">${cart[cartKey].quantity}</div>
                    <button class="cart-counter-btn" onclick="event.stopPropagation(); addToCart(${serviceId}, ${weight}); return false;">+</button>
                </div>
            `;
        } else {
            buttonContainer.innerHTML = `
                <button class="modal-contact-btn" onclick="event.stopPropagation(); addToCart(${serviceId}, ${weight})">
                    Добавить в корзину
                </button>
            `;
        }
    }
}
