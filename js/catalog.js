function getWeightImage(baseImage, grams) {
    const lastSlash = baseImage.lastIndexOf('/');
    const dir = baseImage.substring(0, lastSlash);
    const file = baseImage.substring(lastSlash + 1);
    const dotIdx = file.lastIndexOf('.');
    const baseName = file.substring(0, dotIdx);
    const ext = file.substring(dotIdx);
    return `${dir}/packs/${baseName}-${grams}${ext}`;
}

function toggleCategory(categoryId) {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    const isOpening = !categoryElement.classList.contains('active');

    categoryElement.classList.toggle('active');

    if (isOpening) {
        // Если открываем категорию, скроллим к её заголовку после завершения анимации
        setTimeout(() => {
            // Для последних двух категорий (4 и 5) больший отступ
            const headerOffset = (categoryId === 4 || categoryId === 5) ? 120 : 20;
            const elementPosition = categoryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }, 100);
    } else {
        // Если закрываем категорию, скроллим к её заголовку медленнее
        setTimeout(() => {
            const elementPosition = categoryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 20;
            const currentPosition = window.pageYOffset;
            const distance = offsetPosition - currentPosition;
            const duration = 400;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = progress * (2 - progress); // easeOutQuad

                window.scrollTo(0, currentPosition + (distance * ease));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }, 50);
    }
}


function renderCatalog() {
    const catalog = document.getElementById('catalog');

    categories.forEach(category => {
        // Инициализируем количество видимых товаров для категории
        if (!categoryVisibleCount[category.id]) {
            categoryVisibleCount[category.id] = 10;
        }

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.id = `category-${category.id}`;

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.onclick = () => toggleCategory(category.id);
        categoryHeader.innerHTML = `
            <img src="${category.image}" loading="lazy" class="category-image" alt="${category.name}">
            <div class="category-info">
                <div class="category-name">${category.name}</div>
                <div class="category-description">${category.description || ''}</div>
                <div class="category-count">${category.services.length} ${getTasteWord(category.services.length)}</div>
            </div>
            <div class="category-arrow">▼</div>
        `;

        const categoryContent = document.createElement('div');
        categoryContent.className = 'category-content';
        categoryContent.id = `category-content-${category.id}`;

        // Показываем только первые N товаров
        const visibleServices = category.services.slice(0, categoryVisibleCount[category.id]);

        visibleServices.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openModal(service);

            // Инициализируем выбранную граммовку
            if (service.weights && !selectedWeights[service.id]) {
                selectedWeights[service.id] = service.weights[0].grams;
            }

            const defaultWeight = service.weights ? service.weights[0] : null;

            card.innerHTML = `
                <img id="card-image-${service.id}" src="${service.image}" loading="lazy" class="card-image" alt="${service.name}" style="object-position: ${service.imagePosition || 'center center'}">
                <div class="card-content" data-service-id="${service.id}">
                    <div class="card-name">${service.name}</div>
                    <div class="card-description">${service.description}</div>
                    ${service.weights ? `
                        <div class="product-price">${defaultWeight.price} ₽</div>
                        <div class="weight-selector" onclick="event.stopPropagation()">
                            ${service.weights.map((w, idx) => {
                                const cartKey = getCartKey(service.id, w.grams);
                                const inCart = cart[cartKey] ? 'in-cart' : '';
                                return `
                                <div class="weight-option ${idx === 0 ? 'active' : ''} ${inCart}"
                                     data-weight="${w.grams}"
                                     onclick="selectWeight(${service.id}, ${w.grams})">
                                    ${w.grams}г
                                </div>
                            `}).join('')}
                        </div>
                    ` : ''}
                    <div id="cart-control-${service.id}">
                        <button class="contact-btn" onclick="event.stopPropagation(); addToCart(${service.id}${service.weights ? ', ' + defaultWeight.grams : ''})">
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            `;
            categoryContent.appendChild(card);
        });

        // Добавляем кнопку "Показать еще" если есть еще товары
        if (categoryVisibleCount[category.id] < category.services.length) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'show-more-btn';
            showMoreBtn.textContent = 'Показать еще';
            showMoreBtn.onclick = (e) => {
                e.stopPropagation();
                showMoreItems(category.id);
            };
            categoryContent.appendChild(showMoreBtn);
        }

        categoryDiv.appendChild(categoryHeader);
        categoryDiv.appendChild(categoryContent);
        catalog.appendChild(categoryDiv);
    });
}


function showMoreItems(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    // Увеличиваем количество видимых товаров на 10
    categoryVisibleCount[categoryId] = Math.min(
        categoryVisibleCount[categoryId] + 10,
        category.services.length
    );

    // Перерисовываем содержимое категории
    const categoryContent = document.getElementById(`category-content-${categoryId}`);
    categoryContent.innerHTML = '';

    const visibleServices = category.services.slice(0, categoryVisibleCount[categoryId]);

    visibleServices.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openModal(service);

        if (service.weights && !selectedWeights[service.id]) {
            selectedWeights[service.id] = service.weights[0].grams;
        }

        const defaultWeight = service.weights ? service.weights[0] : null;
        const selectedWeight = selectedWeights[service.id] || (defaultWeight ? defaultWeight.grams : null);

        card.innerHTML = `
            <img id="card-image-${service.id}" src="${service.image}" loading="lazy" class="card-image" alt="${service.name}" style="object-position: ${service.imagePosition || 'center center'}">
            <div class="card-content" data-service-id="${service.id}">
                <div class="card-name">${service.name}</div>
                <div class="card-description">${service.description}</div>
                ${service.weights ? `
                    <div class="product-price">${defaultWeight.price} ₽</div>
                    <div class="weight-selector" onclick="event.stopPropagation()">
                        ${service.weights.map((w) => {
                            const cartKey = getCartKey(service.id, w.grams);
                            const inCart = cart[cartKey] ? 'in-cart' : '';
                            const active = w.grams === selectedWeight ? 'active' : '';
                            return `
                            <div class="weight-option ${active} ${inCart}"
                                 data-weight="${w.grams}"
                                 onclick="selectWeight(${service.id}, ${w.grams})">
                                ${w.grams}г
                            </div>
                        `}).join('')}
                    </div>
                ` : ''}
                <div id="cart-control-${service.id}">
                    <button class="contact-btn" onclick="event.stopPropagation(); addToCart(${service.id}${service.weights ? ', ' + selectedWeight : ''})">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        `;
        categoryContent.appendChild(card);

        // Обновляем контрол корзины после добавления карточки
        if (service.weights) {
            updateCartControl(service.id, selectedWeight);
        }
    });

    // Добавляем кнопку "Показать еще" если есть еще товары
    if (categoryVisibleCount[categoryId] < category.services.length) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.textContent = 'Показать еще';
        showMoreBtn.onclick = (e) => {
            e.stopPropagation();
            showMoreItems(categoryId);
        };
        categoryContent.appendChild(showMoreBtn);
    }
}


function openChat(username) {
    tg.openTelegramLink(`https://t.me/${username}`);
}
