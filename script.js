document.addEventListener('DOMContentLoaded', function() {
    // Precios de los productos
    const prices = {
        'sopitos-picadillo': 20,
        'sopitos-pollo': 20,
        'enchiladas-picadillo': 20,
        'enchiladas-pollo': 20,
        'doradita-pollo': 20,
        'doradita-picadillo': 20,
        'agua-natural': 15,
        'coca-cola': 30,
        'refresco-mediano': 25,
        'refresco-chico': 15,
        'agua-fresca-lt': 40,
        'agua-fresca-medio': 25
    };
    
    // Iconos para los productos
    const productIcons = {
        'sopitos-picadillo': 'drumstick-bite',
        'sopitos-pollo': 'drumstick-bite',
        'enchiladas-picadillo': 'cheese',
        'enchiladas-pollo': 'cheese',
        'doradita-pollo': 'bread-slice',
        'doradita-picadillo': 'bread-slice',
        'agua-natural': 'tint',
        'coca-cola': 'cocktail',
        'refresco-mediano': 'wine-bottle',
        'refresco-chico': 'wine-bottle',
        'agua-fresca-lt': 'glass-cheers',
        'agua-fresca-medio': 'glass-cheers'
    };
    
    // Nombres para mostrar de los productos
    const productNames = {
        'sopitos-picadillo': 'Sopitos de Picadillo',
        'sopitos-pollo': 'Sopitos de Pollo',
        'enchiladas-picadillo': 'Enchiladas de Picadillo',
        'enchiladas-pollo': 'Enchiladas de Pollo',
        'doradita-pollo': 'Doradita de Pollo',
        'doradita-picadillo': 'Doradita de Picadillo',
        'agua-natural': 'Agua Natural',
        'coca-cola': 'Coca Cola',
        'refresco-mediano': 'Refresco de Sabor Mediano',
        'refresco-chico': 'Refresco Chico',
        'agua-fresca-lt': 'Agua Fresca de Lt',
        'agua-fresca-medio': 'Agua Fresca de 1/2 Litro'
    };

    // Obtener elementos del DOM
    const peopleCountInput = document.getElementById('people-count');
    const decreasePeopleBtn = document.getElementById('decrease-people');
    const increasePeopleBtn = document.getElementById('increase-people');
    const peopleSectionsContainer = document.getElementById('people-sections');
    const calculateBtn = document.getElementById('calculate-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const resetBtn = document.getElementById('reset-btn');
    const orderItemsContainer = document.getElementById('order-items');
    const totalAmountElement = document.getElementById('total-amount');

    // Variable para almacenar el número actual de personas
    let currentPeopleCount = 1;

    // Inicializar la aplicación
    initializePeopleSections();

    // Event listeners para los botones de cambio de número de personas
    decreasePeopleBtn.addEventListener('click', () => {
        if (currentPeopleCount > 1) {
            currentPeopleCount--;
            peopleCountInput.value = currentPeopleCount;
            updatePeopleSections();
        }
    });

    increasePeopleBtn.addEventListener('click', () => {
        if (currentPeopleCount < 5) {
            currentPeopleCount++;
            peopleCountInput.value = currentPeopleCount;
            updatePeopleSections();
        }
    });

    peopleCountInput.addEventListener('change', () => {
        let value = parseInt(peopleCountInput.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 5) {
            value = 5;
        }
        currentPeopleCount = value;
        peopleCountInput.value = currentPeopleCount;
        updatePeopleSections();
    });

    // Event listener para el botón de calcular
    calculateBtn.addEventListener('click', calculateTotal);

    // Event listener para el botón de WhatsApp
    whatsappBtn.addEventListener('click', sendWhatsApp);

    // Event listener para el botón de reiniciar
    resetBtn.addEventListener('click', resetAll);

    // Función para inicializar las secciones de personas
    function initializePeopleSections() {
        peopleSectionsContainer.innerHTML = '';
        for (let i = 1; i <= currentPeopleCount; i++) {
            createPersonSection(i);
        }
    }

    // Función para actualizar las secciones de personas
    function updatePeopleSections() {
        const existingSections = peopleSectionsContainer.querySelectorAll('.person-section');
        const existingCount = existingSections.length;

        if (currentPeopleCount > existingCount) {
            // Agregar secciones faltantes
            for (let i = existingCount + 1; i <= currentPeopleCount; i++) {
                createPersonSection(i);
            }
        } else if (currentPeopleCount < existingCount) {
            // Eliminar secciones sobrantes
            for (let i = existingCount; i > currentPeopleCount; i--) {
                peopleSectionsContainer.removeChild(existingSections[i - 1]);
            }
        }
    }

    // Función para crear una sección de persona
    function createPersonSection(personNumber) {
        const personSection = document.createElement('div');
        personSection.className = 'person-section';
        personSection.innerHTML = `
            <div class="person-header">
                <i class="fas fa-user"></i> Persona ${personNumber}
            </div>
            <div class="menu-category">
                <h3 class="category-title">Platos Fuertes ($20 c/u)</h3>
                ${createMenuItems('sopitos-picadillo', 'Sopitos de Picadillo', 'drumstick-bite', personNumber)}
                ${createMenuItems('sopitos-pollo', 'Sopitos de Pollo', 'drumstick-bite', personNumber)}
                ${createMenuItems('enchiladas-picadillo', 'Enchiladas de Picadillo', 'cheese', personNumber)}
                ${createMenuItems('enchiladas-pollo', 'Enchiladas de Pollo', 'cheese', personNumber)}
                ${createMenuItems('doradita-pollo', 'Doradita de Pollo', 'bread-slice', personNumber)}
                ${createMenuItems('doradita-picadillo', 'Doradita de Picadillo', 'bread-slice', personNumber)}
            </div>
            <div class="menu-category">
                <h3 class="category-title">Bebidas</h3>
                ${createMenuItems('agua-natural', 'Agua Natural', 'tint', personNumber, 15)}
                ${createMenuItems('coca-cola', 'Coca Cola', 'cocktail', personNumber, 30)}
                ${createMenuItems('refresco-mediano', 'Refresco de Sabor Mediano', 'wine-bottle', personNumber, 25)}
                ${createMenuItems('refresco-chico', 'Refresco Chico', 'wine-bottle', personNumber, 15)}
                ${createMenuItems('agua-fresca-lt', 'Agua Fresca de Lt', 'glass-cheers', personNumber, 40)}
                ${createMenuItems('agua-fresca-medio', 'Agua Fresca de 1/2 Litro', 'glass-cheers', personNumber, 25)}
            </div>
        `;
        peopleSectionsContainer.appendChild(personSection);

        // Agregar event listeners a los botones de cantidad de esta sección
        const quantityButtons = personSection.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const item = this.getAttribute('data-item');
                const person = this.getAttribute('data-person');
                const input = document.getElementById(`${item}-person-${person}`);
                let value = parseInt(input.value);
                
                if (action === 'increase' && value < 10) {
                    input.value = value + 1;
                } else if (action === 'decrease' && value > 0) {
                    input.value = value - 1;
                }
            });
        });
    }

    // Función para crear elementos del menú
    function createMenuItems(itemId, itemName, icon, personNumber, price = 20) {
        return `
            <div class="menu-item">
                <div class="item-info">
                    <div class="item-image">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <div class="item-details">
                        <div class="item-name">${itemName}</div>
                        <div class="item-price">$${price}.00</div>
                        <div class="max-limit">Máx: 10</div>
                    </div>
                </div>
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease" data-item="${itemId}" data-person="${personNumber}">-</button>
                    <input type="number" class="quantity-input" id="${itemId}-person-${personNumber}" value="0" min="0" max="10" readonly>
                    <button class="quantity-btn" data-action="increase" data-item="${itemId}" data-person="${personNumber}">+</button>
                </div>
            </div>
        `;
    }

    // Función para calcular el total
    function calculateTotal() {
        let total = 0;
        let orderItemsHTML = '';

        // Recorrer cada persona
        for (let person = 1; person <= currentPeopleCount; person++) {
            let personTotal = 0;
            let personItemsHTML = '';

            // Recorrer cada producto
            for (const item in prices) {
                const input = document.getElementById(`${item}-person-${person}`);
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    const itemTotal = prices[item] * quantity;
                    personTotal += itemTotal;
                    personItemsHTML += `
                        <div class="summary-item">
                            <span><i class="fas fa-${productIcons[item]}"></i> ${productNames[item]} x${quantity}</span>
                            <span>$${itemTotal.toFixed(2)}</span>
                        </div>
                    `;
                }
            }

            if (personTotal > 0) {
                orderItemsHTML += `
                    <div class="person-summary">
                        <div class="summary-item" style="font-weight: bold; color: var(--rojo);">
                            <span>Persona ${person}</span>
                            <span>$${personTotal.toFixed(2)}</span>
                        </div>
                        ${personItemsHTML}
                    </div>
                `;
                total += personTotal;
            }
        }

        if (orderItemsHTML === '') {
            orderItemsHTML = '<p class="empty-message">No hay productos en el pedido</p>';
        }

        orderItemsContainer.innerHTML = orderItemsHTML;
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
    }

    // Función para enviar por WhatsApp
    function sendWhatsApp() {
        let message = '¡Hola! Quiero hacer un pedido:\n\n';
        message += `Número de personas: ${currentPeopleCount}\n\n`;

        let total = 0;
        let hasItems = false;

        // Recorrer cada persona
        for (let person = 1; person <= currentPeopleCount; person++) {
            let personTotal = 0;
            let personItems = '';

            // Recorrer cada producto
            for (const item in prices) {
                const input = document.getElementById(`${item}-person-${person}`);
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    hasItems = true;
                    const itemTotal = prices[item] * quantity;
                    personTotal += itemTotal;
                    personItems += `${productNames[item]} x${quantity} - $${itemTotal.toFixed(2)}\n`;
                }
            }

            if (personTotal > 0) {
                message += `*Persona ${person}:*\n${personItems}Total: $${personTotal.toFixed(2)}\n\n`;
                total += personTotal;
            }
        }

        if (!hasItems) {
            alert('Por favor agrega al menos un producto a tu pedido.');
            return;
        }

        message += `*TOTAL GENERAL: $${total.toFixed(2)}*`;

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);

        // Abrir WhatsApp con el mensaje
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }

    // Función para reiniciar todo
    function resetAll() {
        currentPeopleCount = 1;
        peopleCountInput.value = currentPeopleCount;
        initializePeopleSections();
        orderItemsContainer.innerHTML = '<p class="empty-message">El resumen aparecerá aquí</p>';
        totalAmountElement.textContent = '$0.00';
    }
});