// ============================================
// BASE DE DATOS DE RECETAS (ACTUALIZADA)
// ============================================

// A. RECETAS POR 1000g DE PRODUCTO FINAL
let RECETAS_DB = JSON.parse(localStorage.getItem('RECETAS_DB')) || [
    // SOLO COPPA TIENE RECETA COMPLETA
    { id_jamon: 'COPPA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1833 },
    { id_jamon: 'COPPA', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'COPPA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'COPPA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 42 },
    { id_jamon: 'COPPA', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 110 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1 },
    { id_jamon: 'COPPA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 6 }

    // NOTA: Los otros productos no tienen receta (mensaje pendiente)
];

// B. TABLA DE COSTOS UNITARIOS (USD por Kg)
let COSTOS_DB = JSON.parse(localStorage.getItem('COSTOS_DB')) || {
    // Carnes y Base
    'Carne de cerdo': 3.5,
    'Pierna de Cerdo': 3.5,
    'Panceta de Cerdo': 3.5,
    'Lomo de Cerdo': 3.5,
    'Chuleta de Cerdo': 3.5,
    'Costilla de Cerdo': 3.5,
    'Lomo Adobado': 3.5,
    'Carne Magra Cerdo': 3.5,
    'Tocino': 3.5,
    'Rodilla de Cerdo': 3.5,

    // Sales y Conservantes
    'Sal': 1.3,
    'Sal Gruesa': 1.3,
    'Sal de cura': 10.0,
    'Sal Marina': 1.5,

    // Endulzantes
    'Azúcar': 2.0,
    'Azúcar Morena': 2.0,
    'Papelón': 2.5,
    'Miel': 9.0,

    // Especias y Condimentos
    'Pimentón dulce': 10.0,
    'Pimentón': 10.0,
    'Pimentón de La Vera': 10.0,
    'Pimentón Picante': 10.0,
    'Pimienta negra': 15.0,
    'Pimienta blanca': 20.0,
    'Pimienta N entera': 15.0,
    'Pimienta guayabita': 16.0,
    'Nuez moscada': 0.4,
    'Ajo': 10.0,
    'Ajo molido': 12.0,
    'Orégano': 20.0,
    'Clavo': 10.0,
    'Canela': 5.0,
    'Laurel': 17.0,
    'Tomillo': 13.3,
    'Romero': 20.0,
    'Eneldo': 12.0,
    'Hierbas Provence': 18.0,
    'Especias Mix': 15.0,
    'Especias Secretas': 15.0,
    'Hierbas': 15.0,
    'Comino': 12.0,

    // Otros
    'Harina de maíz': 1.3,
    'Aceite de Oliva': 12.0,
    'Salsa Barbacoa': 6.0,
    'Madera Ahumado': 3.5,
    'Cebolla': 1.2,
    'Whisky/Cognac': 40.0,
    'Vino Tinto': 7.0,
    'Cerveza': 1.0,
    'Malta': 5.0,
    'Mostaza': 3.0,
    'Fosfato': 8.0,
    'Eritorbato': 15.0,
    'Ácido ascórbico': 10.0,
    'Glutamato': 10.0
};

// C. CONFIGURACIÓN DE GASTOS
let OVERHEAD_CONFIG = JSON.parse(localStorage.getItem('OVERHEAD_CONFIG')) || {
    gasto_energia_100g: 0.05,      // USD por cada 100g de producto
    gasto_mano_obra_kg: 1.50,      // USD por kg de producto
    gasto_general_porcentaje: 10,  // % sobre costos de ingredientes
    gasto_otros_fijos: 0.00        // USD fijos
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================

// Selectores principales
const jamonSelect = document.getElementById('jamon-type');
const exchangeInput = document.getElementById('exchange-rate');

// Controles de cantidad (solo gramos ahora)
const quantityGramsInput = document.getElementById('quantity-grams');
const quantityGramsRange = document.getElementById('range-grams');
const quantityDisplay = document.getElementById('quantity-display');

// Elementos de resultados
const costIngredientsEl = document.getElementById('cost-ingredients');
const costOverheadEl = document.getElementById('cost-overhead');
const costTotalEl = document.getElementById('cost-total');
const priceUsdEl = document.getElementById('price-usd');
const profitUsdEl = document.getElementById('profit-usd');
const priceBsEl = document.getElementById('price-bs');

// Modales
const priceModal = document.getElementById('price-modal');
const recipeModal = document.getElementById('recipe-modal');
const overheadModal = document.getElementById('overhead-modal');

// Botones modales
const btnConfigPrices = document.getElementById('btn-config-prices');
const btnConfigRecipes = document.getElementById('btn-config-recipes');
const btnConfigOverhead = document.getElementById('btn-config-overhead');

// Botones cerrar
const btnClosePriceModal = document.getElementById('close-modal');
const btnCloseRecipeModal = document.getElementById('close-recipe-modal');
const btnCloseOverheadModal = document.getElementById('close-overhead-modal');

// Botones guardar
const btnSavePrices = document.getElementById('save-prices');
const btnSaveRecipe = document.getElementById('save-recipe');
const btnSaveOverhead = document.getElementById('save-overhead');

// Listas en modales
const pricesListEl = document.getElementById('prices-list');
const recipeListEl = document.getElementById('recipe-list');
const recipeModalTitle = document.getElementById('recipe-modal-title');

// ============================================
// EVENT LISTENERS
// ============================================

// Cambios que disparan cálculo
jamonSelect.addEventListener('change', calculate);
quantityGramsInput.addEventListener('input', updateQuantityFromInput);
quantityGramsRange.addEventListener('input', updateQuantityFromRange);
exchangeInput.addEventListener('input', calculate);
document.getElementById('profit-margin').addEventListener('input', calculate);

// Modal Precios
btnConfigPrices.addEventListener('click', openPriceModal);
btnClosePriceModal.addEventListener('click', () => priceModal.classList.add('hidden'));
btnSavePrices.addEventListener('click', savePrices);

// Modal Recetas
btnConfigRecipes.addEventListener('click', openRecipeModal);
btnCloseRecipeModal.addEventListener('click', () => recipeModal.classList.add('hidden'));
btnSaveRecipe.addEventListener('click', saveRecipe);

// Modal Gastos
btnConfigOverhead.addEventListener('click', openOverheadModal);
btnCloseOverheadModal.addEventListener('click', () => overheadModal.classList.add('hidden'));
btnSaveOverhead.addEventListener('click', saveOverhead);

// Cerrar modales al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target === priceModal) priceModal.classList.add('hidden');
    if (e.target === recipeModal) recipeModal.classList.add('hidden');
    if (e.target === overheadModal) overheadModal.classList.add('hidden');
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// Actualizar cantidad desde input numérico
function updateQuantityFromInput() {
    const grams = parseInt(quantityGramsInput.value) || 100;
    quantityGramsRange.value = grams;
    updateQuantityDisplay(grams);
    calculate();
}

// Actualizar cantidad desde range slider
function updateQuantityFromRange() {
    const grams = parseInt(quantityGramsRange.value) || 100;
    quantityGramsInput.value = grams;
    updateQuantityDisplay(grams);
    calculate();
}

// Mostrar cantidad en formato legible
function updateQuantityDisplay(grams) {
    if (grams >= 1000) {
        quantityDisplay.textContent = (grams / 1000).toFixed(1) + ' kg';
    } else {
        quantityDisplay.textContent = grams + ' g';
    }
}

// Función principal de cálculo
function calculate() {
    const selectedProductId = jamonSelect.value;
    const exchangeRate = parseFloat(exchangeInput.value) || 40.0;
    const marginPercent = parseFloat(document.getElementById('profit-margin').value) || 30;

    // Cantidad deseada en gramos
    const desiredGrams = parseFloat(quantityGramsInput.value) || 1000;

    // 1. Obtener receta del producto (si existe)
    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedProductId);

    // Verificar si el producto tiene receta
    const hasRecipe = ingredientes.length > 0;

    let totalIngredientsCost = 0;

    if (hasRecipe) {
        // 2. Calcular factor de escala
        const scaleFactor = desiredGrams / 1000; // Receta base es para 1000g

        // 3. Calcular costos de ingredientes escalados
        ingredientes.forEach(item => {
            const ingredienteName = item.ingrediente;
            const cantidadBase = item.cantidad; // gramos para 1000g de producto final
            const cantidadEscalada = cantidadBase * scaleFactor; // gramos para cantidad deseada

            // Convertir gramos a Kg para cálculo de costo
            const cantidadKg = cantidadEscalada / 1000;

            // Obtener precio por Kg
            const precioPorKg = COSTOS_DB[ingredienteName] || 0;

            // Calcular costo de este ingrediente
            const costoIngrediente = cantidadKg * precioPorKg;
            totalIngredientsCost += costoIngrediente;
        });
    }

    // 4. Calcular gastos asociados
    const gastosEnergia = (desiredGrams / 100) * OVERHEAD_CONFIG.gasto_energia_100g;
    const gastosManoObra = (desiredGrams / 1000) * OVERHEAD_CONFIG.gasto_mano_obra_kg;
    const gastosGenerales = totalIngredientsCost * (OVERHEAD_CONFIG.gasto_general_porcentaje / 100);

    const totalOverheadCost = gastosEnergia + gastosManoObra + gastosGenerales + OVERHEAD_CONFIG.gasto_otros_fijos;

    // 5. Calcular costos totales
    const totalProductionCost = totalIngredientsCost + totalOverheadCost;

    // 6. Calcular precio de venta con margen
    let totalSalesPriceUSD = 0;
    let totalProfitUSD = 0;

    if (marginPercent < 100 && totalProductionCost > 0) {
        const marginDecimal = marginPercent / 100;
        totalSalesPriceUSD = totalProductionCost / (1 - marginDecimal);
        totalProfitUSD = totalSalesPriceUSD - totalProductionCost;
    }

    // 7. Convertir a bolívares
    const totalSalesPriceBs = totalSalesPriceUSD * exchangeRate;

    // 8. Actualizar interfaz
    updateUI(totalIngredientsCost, totalOverheadCost, totalProductionCost,
        totalSalesPriceUSD, totalProfitUSD, totalSalesPriceBs,
        desiredGrams, hasRecipe);
}

// Actualizar interfaz de usuario
function updateUI(ingredients, overhead, total, salesUSD, profit, salesBs, grams, hasRecipe) {
    // Formatear valores monetarios
    costIngredientsEl.textContent = formatCurrency(ingredients);
    costOverheadEl.textContent = formatCurrency(overhead);
    costTotalEl.textContent = formatCurrency(total);

    priceUsdEl.textContent = formatCurrency(salesUSD);
    profitUsdEl.textContent = formatCurrency(profit);
    priceBsEl.textContent = formatCurrency(salesBs, 'Bs');

    // Calcular precios por porción (solo si hay receta)
    if (hasRecipe && grams > 0 && salesUSD > 0) {
        updatePortionPrices(salesUSD, grams);
    } else {
        resetPortionPrices();
    }
}

// Actualizar precios por porción
function updatePortionPrices(totalSalesPriceUSD, totalGrams) {
    const exchangeRate = parseFloat(exchangeInput.value) || 40.0;
    const pricePerGram = totalSalesPriceUSD / totalGrams;

    const portions = [
        { grams: 100, usdId: 'price-per-100g-usd', bsId: 'price-per-100g-bs' },
        { grams: 250, usdId: 'price-per-250g-usd', bsId: 'price-per-250g-bs' },
        { grams: 500, usdId: 'price-per-500g-usd', bsId: 'price-per-500g-bs' },
        { grams: 1000, usdId: 'price-per-kg-usd', bsId: 'price-per-kg-bs' }
    ];

    portions.forEach(portion => {
        const priceUSD = pricePerGram * portion.grams;
        const priceBs = priceUSD * exchangeRate;

        document.getElementById(portion.usdId).textContent = formatCurrency(priceUSD);
        document.getElementById(portion.bsId).textContent = formatCurrency(priceBs, 'Bs');
    });
}

// Resetear precios por porción cuando no hay receta
function resetPortionPrices() {
    const portions = [
        { usdId: 'price-per-100g-usd', bsId: 'price-per-100g-bs' },
        { usdId: 'price-per-250g-usd', bsId: 'price-per-250g-bs' },
        { usdId: 'price-per-500g-usd', bsId: 'price-per-500g-bs' },
        { usdId: 'price-per-kg-usd', bsId: 'price-per-kg-bs' }
    ];

    portions.forEach(portion => {
        document.getElementById(portion.usdId).textContent = '$0.00';
        document.getElementById(portion.bsId).textContent = 'Bs 0.00';
    });
}

// Formatear valores monetarios
function formatCurrency(amount, currency = 'USD') {
    if (isNaN(amount) || amount === 0) {
        return currency === 'USD' ? '$0.00' : 'Bs 0.00';
    }

    if (currency === 'USD') {
        return '$' + amount.toFixed(2);
    } else {
        return 'Bs ' + amount.toLocaleString('es-VE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}

// ============================================
// MODAL DE PRECIOS (CON BUSCADOR)
// ============================================

function openPriceModal() {
    pricesListEl.innerHTML = '';

    // Contenedor para resultados de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-results';
    searchContainer.id = 'search-results';
    pricesListEl.appendChild(searchContainer);

    // Contenedor para ingredientes
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.id = 'ingredients-container';
    pricesListEl.appendChild(ingredientsContainer);

    // Renderizar todos los ingredientes
    renderIngredients(Object.entries(COSTOS_DB));

    // Configurar buscador
    const searchInput = document.getElementById('price-search');
    searchInput.value = '';
    searchInput.addEventListener('input', handleSearch);

    priceModal.classList.remove('hidden');
}

function renderIngredients(ingredientsArray) {
    const container = document.getElementById('ingredients-container');
    const resultsInfo = document.getElementById('search-results');

    container.innerHTML = '';

    if (ingredientsArray.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron ingredientes</div>';
        resultsInfo.textContent = '0 resultados';
        return;
    }

    resultsInfo.textContent = `${ingredientsArray.length} ingrediente(s) encontrado(s)`;

    ingredientsArray.forEach(([ingrediente, precio]) => {
        const row = document.createElement('div');
        row.className = 'price-row';
        row.innerHTML = `
            <label>${ingrediente} (USD por Kg)</label>
            <div class="input-wrapper">
                <input type="number" class="price-input" data-ingrediente="${ingrediente}" value="${precio}" step="0.01" min="0">
                <span class="currency-label">$</span>
            </div>
        `;
        container.appendChild(row);
    });
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    const allIngredients = Object.entries(COSTOS_DB);

    if (searchTerm === '') {
        renderIngredients(allIngredients);
        return;
    }

    const filteredIngredients = allIngredients.filter(([ingrediente]) =>
        ingrediente.toLowerCase().includes(searchTerm)
    );

    renderIngredients(filteredIngredients);
}

function savePrices() {
    const inputs = document.querySelectorAll('.price-input');
    inputs.forEach(input => {
        const name = input.dataset.ingrediente;
        const val = parseFloat(input.value);
        if (!isNaN(val) && val >= 0) {
            COSTOS_DB[name] = val;
        }
    });

    localStorage.setItem('COSTOS_DB', JSON.stringify(COSTOS_DB));
    priceModal.classList.add('hidden');
    calculate();
    alert('Precios actualizados correctamente.');
}

// ============================================
// MODAL DE RECETAS
// ============================================

function openRecipeModal() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    recipeModalTitle.textContent = selectedOption.text;
    recipeListEl.innerHTML = '';

    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedProductId);

    if (ingredientes.length === 0) {
        // Mostrar mensaje "Pendiente por Receta" (sin cambios)
        recipeListEl.innerHTML = `
            <div class="recipe-pending">
                <p>📝 Receta pendiente para este producto</p>
                <p style="font-size: 0.8rem; margin-bottom: 20px;">
                    La receta se configura para 1000g de producto final.
                </p>
                <button class="btn-secondary" onclick="addNewRecipe()">
                    <span>➕</span> Agregar Receta
                </button>
            </div>
        `;
    } else {
        // OBTENER CANTIDAD ACTUAL SELECCIONADA
        const currentGrams = parseFloat(quantityGramsInput.value) || 1000;
        const scaleFactor = currentGrams / 1000;

        // Mostrar receta existente CON VALORES ESCALADOS
        ingredientes.forEach((item, index) => {
            const cantidadBase = item.cantidad;
            const cantidadEscalada = cantidadBase * scaleFactor;

            const row = document.createElement('div');
            row.className = 'price-row';
            row.innerHTML = `
                <label>${item.ingrediente}</label>
                <div style="font-size: 0.75rem; color: var(--text-light); margin-bottom: 4px;">
                    Base: ${cantidadBase}g para 1000g producto
                </div>
                <div class="input-wrapper">
                    <input type="number" class="recipe-input" 
                           data-ingrediente="${item.ingrediente}" 
                           value="${cantidadEscalada.toFixed(1)}" 
                           step="0.1" min="0">
                    <span class="currency-label">g</span>
                </div>
                <div style="font-size: 0.7rem; color: var(--primary); margin-top: 4px;">
                    Para ${currentGrams}g producto: <strong>${cantidadEscalada.toFixed(1)}g</strong>
                </div>
            `;
            recipeListEl.appendChild(row);
        });

        // NOTA IMPORTANTE: Los inputs mostrarán valores escalados
        // Pero al guardar, debemos guardar los valores BASE (para 1000g)

        // Botón para agregar nuevo ingrediente
        const addButtonRow = document.createElement('div');
        addButtonRow.className = 'price-row';
        addButtonRow.innerHTML = `
            <div style="text-align: center; padding: 10px 0; font-size: 0.8rem; color: var(--text-light);">
                Cantidad actual: <strong>${currentGrams}g</strong> de producto
            </div>
            <button class="btn-secondary" onclick="addNewIngredient()" style="width: 100%;">
                <span>➕</span> Agregar Ingrediente
            </button>
        `;
        recipeListEl.appendChild(addButtonRow);
    }

    recipeModal.classList.remove('hidden');
}

// Función para agregar nueva receta (desde mensaje pendiente)
function addNewRecipe() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    // Preguntar al usuario si quiere crear receta básica
    if (confirm(`¿Crear receta básica para ${selectedOption.text}?`)) {
        // Crear receta básica con ingrediente principal
        const basicIngredients = [
            { id_jamon: selectedProductId, ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1000 },
            { id_jamon: selectedProductId, ingrediente: 'Sal', unidad: 'g', cantidad: 20 }
        ];

        // Agregar a RECETAS_DB
        basicIngredients.forEach(ing => {
            RECETAS_DB.push(ing);
        });

        // Guardar
        localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));

        // Cerrar y reabrir modal
        recipeModal.classList.add('hidden');
        setTimeout(() => {
            openRecipeModal();
            calculate();
        }, 100);
    }
}

// Función para agregar nuevo ingrediente a receta existente
function addNewIngredient() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    // Pedir nombre del ingrediente
    const ingredienteName = prompt('Nombre del nuevo ingrediente:');
    if (!ingredienteName) return;

    // Pedir cantidad
    const cantidad = prompt(`Gramos de ${ingredienteName} para 1000g de ${selectedOption.text}:`);
    if (!cantidad || isNaN(parseFloat(cantidad))) return;

    // Agregar a RECETAS_DB
    RECETAS_DB.push({
        id_jamon: selectedProductId,
        ingrediente: ingredienteName,
        unidad: 'g',
        cantidad: parseFloat(cantidad)
    });

    // Guardar
    localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));

    // Cerrar y reabrir modal
    recipeModal.classList.add('hidden');
    setTimeout(() => {
        openRecipeModal();
        calculate();
    }, 100);
}

function saveRecipe() {
    const selectedProductId = jamonSelect.value;
    const currentGrams = parseFloat(quantityGramsInput.value) || 1000;
    const scaleFactor = currentGrams / 1000;

    const inputs = document.querySelectorAll('.recipe-input');

    inputs.forEach(input => {
        const ingredienteName = input.dataset.ingrediente;
        const valorEscalado = parseFloat(input.value); // Valor mostrado (escalado)

        if (!isNaN(valorEscalado) && valorEscalado >= 0) {
            // CONVERTIR de valor escalado a valor base (para 1000g)
            const valorBase = valorEscalado / scaleFactor;

            // Buscar y actualizar ingrediente existente
            const itemIndex = RECETAS_DB.findIndex(r =>
                r.id_jamon === selectedProductId &&
                r.ingrediente === ingredienteName
            );

            if (itemIndex !== -1) {
                RECETAS_DB[itemIndex].cantidad = valorBase;
            }
        }
    });

    localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));
    recipeModal.classList.add('hidden');
    calculate();

    alert(`Receta actualizada correctamente.\nLos valores se guardaron para 1000g de producto.`);
}

// ============================================
// MODAL DE GASTOS ASOCIADOS
// ============================================

function openOverheadModal() {
    document.getElementById('overhead-energy').value = OVERHEAD_CONFIG.gasto_energia_100g;
    document.getElementById('overhead-labor').value = OVERHEAD_CONFIG.gasto_mano_obra_kg;
    document.getElementById('overhead-general').value = OVERHEAD_CONFIG.gasto_general_porcentaje;
    document.getElementById('overhead-other').value = OVERHEAD_CONFIG.gasto_otros_fijos;

    overheadModal.classList.remove('hidden');
}

function saveOverhead() {
    OVERHEAD_CONFIG.gasto_energia_100g = parseFloat(document.getElementById('overhead-energy').value) || 0;
    OVERHEAD_CONFIG.gasto_mano_obra_kg = parseFloat(document.getElementById('overhead-labor').value) || 0;
    OVERHEAD_CONFIG.gasto_general_porcentaje = parseFloat(document.getElementById('overhead-general').value) || 0;
    OVERHEAD_CONFIG.gasto_otros_fijos = parseFloat(document.getElementById('overhead-other').value) || 0;

    localStorage.setItem('OVERHEAD_CONFIG', JSON.stringify(OVERHEAD_CONFIG));
    overheadModal.classList.add('hidden');
    calculate();
    alert('Gastos asociados actualizados correctamente.');
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Cálculo inicial al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Configurar cantidad inicial
    updateQuantityDisplay(1000);

    // Calcular
    calculate();
});