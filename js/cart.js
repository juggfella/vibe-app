function addToCart(serviceId, weight) {
    const service = categories.flatMap(c => c.services).find(s => s.id === serviceId);
    if (!service) return;

    // Если weight не передан, используем выбранную граммовку
    if (!weight && service.weights) {
        weight = selectedWeights[serviceId] || service.weights[0].grams;
    }

    const cartKey = weight ? getCartKey(serviceId, weight) : serviceId;
    const priceData = service.weights ? service.weights.find(w => w.grams === weight) : null;

    if (cart[cartKey]) {
        cart[cartKey].quantity++;
    } else {
        cart[cartKey] = {
            ...service,
            quantity: 1,
            selectedWeight: weight,
            selectedPrice: priceData ? priceData.price : null
        };
    }
    updateCartBadge();
    updateCartControl(serviceId, weight);

    // Обновляем индикаторы граммовок
    if (service.weights) {
        selectWeight(serviceId, selectedWeights[serviceId] || weight);
    }

    // Перерисовываем корзину если она открыта
    if (document.getElementById('cartModal').classList.contains('active')) {
        renderCart();
    }
}


function removeFromCart(serviceId, weight) {
    const cartKey = weight ? getCartKey(serviceId, weight) : serviceId;

    if (cart[cartKey]) {
        cart[cartKey].quantity--;
        if (cart[cartKey].quantity <= 0) {
            delete cart[cartKey];
        }
    }
    updateCartBadge();
    updateCartControl(serviceId, weight);

    // Обновляем индикаторы граммовок
    const service = categories.flatMap(c => c.services).find(s => s.id === serviceId);
    if (service && service.weights) {
        selectWeight(serviceId, selectedWeights[serviceId] || weight);
    }

    // Перерисовываем корзину если она открыта
    if (document.getElementById('cartModal').classList.contains('active')) {
        renderCart();
    }
}


function updateCartBadge() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}


function openCart() {
    renderCart();
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}


function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
}


function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const items = Object.values(cart);

    if (items.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        return;
    }

    // Группируем товары по категориям
    const groupedByCategory = {};
    items.forEach(item => {
        const category = categories.find(c => c.services.some(s => s.id === item.id));
        if (category) {
            if (!groupedByCategory[category.id]) {
                groupedByCategory[category.id] = {
                    name: category.name,
                    items: [],
                    totalPrice: 0
                };
            }
            groupedByCategory[category.id].items.push(item);
            // Считаем суммарную стоимость категории
            if (item.selectedPrice) {
                groupedByCategory[category.id].totalPrice += item.selectedPrice * item.quantity;
            }
        }
    });

    // Открываем все категории при рендере корзины
    Object.keys(groupedByCategory).forEach(catId => {
        openCartCategories[catId] = true;
    });

    cartItems.innerHTML = Object.entries(groupedByCategory).map(([catId, catData]) => `
        <div class="cart-category">
            <div class="cart-category-header" onclick="toggleCartCategory(${catId})">
                <span>${catData.name}</span>
                <span style="font-size: 14px; color: #aaa; margin-left: 8px;">${catData.totalPrice} ₽</span>
                <span class="cart-category-arrow" id="cart-arrow-${catId}" style="transform: ${openCartCategories[catId] ? 'rotate(180deg)' : 'rotate(0deg)'}">▼</span>
            </div>
            <div class="cart-category-content" id="cart-content-${catId}" style="display: ${openCartCategories[catId] ? 'block' : 'none'};">
                ${catData.items.map(item => {
                    const weight = item.selectedWeight;
                    const cartKey = weight ? getCartKey(item.id, weight) : item.id;
                    const totalPrice = item.selectedPrice ? item.selectedPrice * item.quantity : null;
                    return `
                    <div class="cart-item">
                        <img src="${item.image}" class="cart-item-image" alt="${item.name}" style="object-position: ${item.imagePosition || 'center center'}; cursor: pointer;" onclick="event.stopPropagation(); openFullImageFromCart(this.src)">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}${weight ? ' (' + weight + 'г)' : ''}</div>
                            ${totalPrice ? '<div style="font-size: 13px; color: #aaa; margin-bottom: 4px;">' + totalPrice + ' ₽</div>' : ''}
                            <div class="cart-item-controls">
                                <button class="cart-item-btn" onclick="event.stopPropagation(); removeFromCart(${item.id}, ${weight}); return false;">−</button>
                                <div class="cart-item-quantity">${item.quantity}</div>
                                <button class="cart-item-btn" onclick="event.stopPropagation(); addToCart(${item.id}, ${weight}); return false;">+</button>
                                <button class="cart-item-delete" onclick="event.stopPropagation(); deleteFromCart('${cartKey}'); return false;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `).join('');

    // Считаем общую итоговую сумму
    const grandTotal = Object.values(groupedByCategory).reduce((sum, catData) => sum + catData.totalPrice, 0);
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = `Итого: ${grandTotal} ₽`;
    }
}


function toggleCartCategory(categoryId) {
    openCartCategories[categoryId] = !openCartCategories[categoryId];
    const content = document.getElementById(`cart-content-${categoryId}`);
    const arrow = document.getElementById(`cart-arrow-${categoryId}`);

    if (openCartCategories[categoryId]) {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}


function deleteFromCart(cartKey) {
    delete cart[cartKey];
    updateCartBadge();

    // Извлекаем serviceId и weight из cartKey
    const parts = cartKey.split('_');
    const serviceId = parseInt(parts[0]);
    const weight = parts[1] ? parseInt(parts[1]) : null;

    // Обновляем контролы и индикаторы
    if (weight) {
        updateCartControl(serviceId, weight);
        const service = categories.flatMap(c => c.services).find(s => s.id === serviceId);
        if (service && service.weights) {
            selectWeight(serviceId, selectedWeights[serviceId] || weight);
        }
    }

    renderCart();
}
