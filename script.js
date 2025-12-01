// ============================================
// BASE DE DATOS DE RECETAS (ACTUALIZADA)
// ============================================

// ============================================
// DETECCIÓN DE VERSIÓN Y LIMPIEZA DE CACHE
// ============================================

const APP_VERSION = '2.0.0';
const VERSION_KEY = 'app_version';

// Verificar si es nueva versión
const currentVersion = localStorage.getItem(VERSION_KEY);
if (currentVersion !== APP_VERSION) {
    console.log('🆕 Nueva versión detectada:', APP_VERSION);

    // Limpiar todo el localStorage
    localStorage.clear();

    // Guardar nueva versión
    localStorage.setItem(VERSION_KEY, APP_VERSION);

    // Forzar recarga si es PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
            // Recargar página
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
        });
    }
}

// A. RECETAS POR 1000g DE PRODUCTO FINAL
let RECETAS_DB = JSON.parse(localStorage.getItem('RECETAS_DB')) || [
    // RECETA COPPA (COMPLETA)
    { id_jamon: 'COPPA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1833 },
    { id_jamon: 'COPPA', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'COPPA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'COPPA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 42 },
    { id_jamon: 'COPPA', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 110 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1 },
    { id_jamon: 'COPPA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 6 },

    // RECETA PITINA (COMPLETA)
    { id_jamon: 'PITINA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1283 },
    { id_jamon: 'PITINA', ingrediente: 'Carne de res', unidad: 'g', cantidad: 367 },
    { id_jamon: 'PITINA', ingrediente: 'Tocino', unidad: 'g', cantidad: 183 },
    { id_jamon: 'PITINA', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'PITINA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'PITINA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'PITINA', ingrediente: 'Eritorbato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'PITINA', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'PITINA', ingrediente: 'Vino tinto', unidad: 'ml', cantidad: 42 },
    { id_jamon: 'PITINA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 2.8 },
    { id_jamon: 'PITINA', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 3 },
    { id_jamon: 'PITINA', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1.5 },
    { id_jamon: 'PITINA', ingrediente: 'Ajo molido', unidad: 'g', cantidad: 8 },
    { id_jamon: 'PITINA', ingrediente: 'Harina de maíz', unidad: 'g', cantidad: 183 },
    { id_jamon: 'PITINA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 5 }
];

// B. TABLA DE COSTOS UNITARIOS (USD por Kg/L)
let COSTOS_DB = JSON.parse(localStorage.getItem('COSTOS_DB')) || {
    // Carnes y Base
    'Carne de cerdo': 3.5,
    'Carne de res': 4.0,
    'Tocino': 3.5,
    'Pierna de Cerdo': 3.5,
    'Panceta de Cerdo': 3.5,
    'Lomo de Cerdo': 3.5,
    'Chuleta de Cerdo': 3.5,
    'Costilla de Cerdo': 3.5,
    'Lomo Adobado': 3.5,
    'Carne Magra Cerdo': 3.5,
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

    // Aditivos y Conservantes
    'Eritorbato': 15.0,
    'Fosfato': 8.0,
    'Ácido ascórbico': 10.0,
    'Glutamato': 10.0,

    // Líquidos
    'Vino tinto': 7.0,
    'Cerveza': 1.0,
    'Malta': 5.0,
    'Mostaza': 3.0,

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
    'Ajo molido': 12.0,
    'Ajo': 10.0,
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
    'Whisky/Cognac': 40.0
};

// C. CONFIGURACIÓN DE GASTOS
let OVERHEAD_CONFIG = JSON.parse(localStorage.getItem('OVERHEAD_CONFIG')) || {
    gasto_energia_100g: 0.05,
    gasto_mano_obra_kg: 1.50,
    gasto_general_porcentaje: 10,
    gasto_otros_fijos: 0.00
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const jamonSelect = document.getElementById('jamon-type');
const exchangeInput = document.getElementById('exchange-rate');
const quantityGramsInput = document.getElementById('quantity-grams');
const quantityGramsRange = document.getElementById('range-grams');
const quantityDisplay = document.getElementById('quantity-display');
const costIngredientsEl = document.getElementById('cost-ingredients');
const costOverheadEl = document.getElementById('cost-overhead');
const costTotalEl = document.getElementById('cost-total');
const priceUsdEl = document.getElementById('price-usd');
const profitUsdEl = document.getElementById('profit-usd');
const priceBsEl = document.getElementById('price-bs');
const priceModal = document.getElementById('price-modal');
const recipeModal = document.getElementById('recipe-modal');
const overheadModal = document.getElementById('overhead-modal');
const btnConfigPrices = document.getElementById('btn-config-prices');
const btnConfigRecipes = document.getElementById('btn-config-recipes');
const btnConfigOverhead = document.getElementById('btn-config-overhead');
const btnClosePriceModal = document.getElementById('close-modal');
const btnCloseRecipeModal = document.getElementById('close-recipe-modal');
const btnCloseOverheadModal = document.getElementById('close-overhead-modal');
const btnSavePrices = document.getElementById('save-prices');
const btnSaveRecipe = document.getElementById('save-recipe');
const btnSaveOverhead = document.getElementById('save-overhead');
const pricesListEl = document.getElementById('prices-list');
const recipeListEl = document.getElementById('recipe-list');
const recipeModalTitle = document.getElementById('recipe-modal-title');

// ============================================
// FUNCIONES PRINCIPALES - CÁLCULO
// ============================================

function updateQuantityFromInput() {
    const grams = parseInt(quantityGramsInput.value) || 100;
    quantityGramsRange.value = grams;
    updateQuantityDisplay(grams);
    calculate();
}

function updateQuantityFromRange() {
    const grams = parseInt(quantityGramsRange.value) || 100;
    quantityGramsInput.value = grams;
    updateQuantityDisplay(grams);
    calculate();
}

function updateQuantityDisplay(grams) {
    if (grams >= 1000) {
        quantityDisplay.textContent = (grams / 1000).toFixed(1) + ' kg';
    } else {
        quantityDisplay.textContent = grams + ' g';
    }
}

// FUNCIÓN PRINCIPAL DE CÁLCULO
function calculate() {
    const selectedProductId = jamonSelect.value;

    // VERIFICAR SI NO HAY PRODUCTO SELECCIONADO
    if (!selectedProductId) {
        // Mostrar todos los valores en $0.00
        resetAllValues();

        // Deshabilitar botón de recetas
        toggleRecipeButton(false);

        return; // Detener ejecución
    }

    // Si hay producto seleccionado, habilitar botón
    toggleRecipeButton(true);

    const exchangeRate = parseFloat(exchangeInput.value) || 247.0;
    const marginPercent = parseFloat(document.getElementById('profit-margin').value) || 30;
    const desiredGrams = parseFloat(quantityGramsInput.value) || 1000;

    // 1. Obtener receta del producto
    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedProductId);
    const hasRecipe = ingredientes.length > 0;

    let totalIngredientsCost = 0;

    if (hasRecipe) {
        // 2. Calcular factor de escala
        const scaleFactor = desiredGrams / 1000;

        // 3. Calcular costos de ingredientes escalados
        ingredientes.forEach(item => {
            const ingredienteName = item.ingrediente;
            const cantidadBase = item.cantidad;
            const unidad = item.unidad;
            const cantidadEscalada = cantidadBase * scaleFactor;
            const precioPorUnidad = COSTOS_DB[ingredienteName] || 0;

            let costoIngrediente = 0;

            if (unidad === 'g') {
                const cantidadKg = cantidadEscalada / 1000;
                costoIngrediente = cantidadKg * precioPorUnidad;
            } else if (unidad === 'ml') {
                const cantidadL = cantidadEscalada / 1000;
                costoIngrediente = cantidadL * precioPorUnidad;
            } else {
                costoIngrediente = cantidadEscalada * (precioPorUnidad / 1000);
            }

            totalIngredientsCost += costoIngrediente;
        });
    }

    // 4. Calcular gastos asociados
    const gastosEnergia = (desiredGrams / 100) * OVERHEAD_CONFIG.gasto_energia_100g;
    const gastosManoObra = (desiredGrams / 1000) * OVERHEAD_CONFIG.gasto_mano_obra_kg;
    const gastosGenerales = totalIngredientsCost * (OVERHEAD_CONFIG.gasto_general_porcentaje / 100);
    const totalOverheadCost = gastosEnergia + gastosManoObra + gastosGenerales + OVERHEAD_CONFIG.gasto_otros_fijos;

    // 5. Costos totales
    const totalProductionCost = totalIngredientsCost + totalOverheadCost;

    // 6. Precio de venta con margen
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

function resetAllValues() {
    costIngredientsEl.textContent = '$0.00';
    costOverheadEl.textContent = '$0.00';
    costTotalEl.textContent = '$0.00';
    priceUsdEl.textContent = '$0.00';
    profitUsdEl.textContent = '$0.00';
    priceBsEl.textContent = 'Bs 0.00';
    resetPortionPrices();
}

function toggleRecipeButton(enabled) {
    const recipeBtn = document.getElementById('btn-config-recipes');
    recipeBtn.disabled = !enabled;
    recipeBtn.style.opacity = enabled ? '1' : '0.5';
    recipeBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
}

function updateUI(ingredients, overhead, total, salesUSD, profit, salesBs, grams, hasRecipe) {
    costIngredientsEl.textContent = formatCurrency(ingredients);
    costOverheadEl.textContent = formatCurrency(overhead);
    costTotalEl.textContent = formatCurrency(total);
    priceUsdEl.textContent = formatCurrency(salesUSD);
    profitUsdEl.textContent = formatCurrency(profit);
    priceBsEl.textContent = formatCurrency(salesBs, 'Bs');

    if (hasRecipe && grams > 0 && salesUSD > 0) {
        updatePortionPrices(salesUSD, grams);
    } else {
        resetPortionPrices();
    }
}

function updatePortionPrices(totalSalesPriceUSD, totalGrams) {
    const exchangeRate = parseFloat(exchangeInput.value) || 247.0;
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
// MODAL DE PRECIOS
// ============================================

function openPriceModal() {
    pricesListEl.innerHTML = '';

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-results';
    searchContainer.id = 'search-results';
    pricesListEl.appendChild(searchContainer);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.id = 'ingredients-container';
    pricesListEl.appendChild(ingredientsContainer);

    renderIngredients(Object.entries(COSTOS_DB));

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
            <label>${ingrediente} (USD por Kg/L)</label>
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
    alert('✅ Precios actualizados correctamente.');
}

// ============================================
// MODAL DE RECETAS
// ============================================

function openRecipeModal() {
    const selectedProductId = jamonSelect.value;

    // Verificar si hay producto seleccionado
    if (!selectedProductId) {
        alert('⚠️ Por favor, seleccione un producto primero.');
        return;
    }

    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    recipeModalTitle.textContent = selectedOption.text;
    recipeListEl.innerHTML = '';

    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedProductId);

    if (ingredientes.length === 0) {
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
        const currentGrams = parseFloat(quantityGramsInput.value) || 1000;
        const scaleFactor = currentGrams / 1000;

        ingredientes.forEach((item) => {
            const cantidadBase = item.cantidad;
            const unidad = item.unidad;
            const cantidadEscalada = cantidadBase * scaleFactor;
            const unidadDisplay = unidad === 'ml' ? 'ml' : 'g';

            const row = document.createElement('div');
            row.className = 'price-row';
            row.innerHTML = `
                <label>${item.ingrediente} (${unidadDisplay})</label>
                <div style="font-size: 0.75rem; color: var(--text-light); margin-bottom: 4px;">
                    Base: ${cantidadBase}${unidadDisplay} para 1000g producto
                </div>
                <div class="input-wrapper">
                    <input type="number" class="recipe-input" 
                           data-ingrediente="${item.ingrediente}" 
                           data-unidad="${unidad}"
                           value="${cantidadEscalada.toFixed(1)}" 
                           step="0.1" min="0">
                    <span class="currency-label">${unidadDisplay}</span>
                </div>
                <div style="font-size: 0.7rem; color: var(--primary); margin-top: 4px;">
                    Para ${currentGrams}g producto: <strong>${cantidadEscalada.toFixed(1)}${unidadDisplay}</strong>
                </div>
            `;
            recipeListEl.appendChild(row);
        });

        const infoRow = document.createElement('div');
        infoRow.className = 'price-row';
        infoRow.innerHTML = `
            <div style="text-align: center; padding: 10px 0; font-size: 0.8rem; color: var(--text-light);">
                <div>📊 Cantidad actual: <strong>${currentGrams}g</strong> de producto</div>
                <div style="font-size: 0.7rem; margin-top: 4px;">
                    Los valores se muestran escalados. Al guardar, se convertirán a valores base para 1000g.
                </div>
            </div>
        `;
        recipeListEl.appendChild(infoRow);

        const addButtonRow = document.createElement('div');
        addButtonRow.className = 'price-row';
        addButtonRow.innerHTML = `
            <button class="btn-secondary" onclick="addNewIngredient()" style="width: 100%;">
                <span>➕</span> Agregar Ingrediente
            </button>
        `;
        recipeListEl.appendChild(addButtonRow);
    }

    recipeModal.classList.remove('hidden');
}

function saveRecipe() {
    const selectedProductId = jamonSelect.value;
    const currentGrams = parseFloat(quantityGramsInput.value) || 1000;
    const scaleFactor = currentGrams / 1000;

    const inputs = document.querySelectorAll('.recipe-input');

    inputs.forEach(input => {
        const ingredienteName = input.dataset.ingrediente;
        const unidad = input.dataset.unidad;
        const valorEscalado = parseFloat(input.value);

        if (!isNaN(valorEscalado) && valorEscalado >= 0) {
            const valorBase = valorEscalado / scaleFactor;

            const itemIndex = RECETAS_DB.findIndex(r =>
                r.id_jamon === selectedProductId &&
                r.ingrediente === ingredienteName
            );

            if (itemIndex !== -1) {
                RECETAS_DB[itemIndex].cantidad = valorBase;
            } else {
                RECETAS_DB.push({
                    id_jamon: selectedProductId,
                    ingrediente: ingredienteName,
                    unidad: unidad,
                    cantidad: valorBase
                });
            }
        }
    });

    localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));
    recipeModal.classList.add('hidden');
    calculate();

    alert('✅ Receta actualizada correctamente.\nLos valores se guardaron para 1000g de producto.');
}

function addNewRecipe() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    if (confirm(`¿Crear receta básica para ${selectedOption.text}?`)) {
        const basicIngredients = [
            { id_jamon: selectedProductId, ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1000 },
            { id_jamon: selectedProductId, ingrediente: 'Sal', unidad: 'g', cantidad: 20 }
        ];

        basicIngredients.forEach(ing => {
            RECETAS_DB.push(ing);
        });

        localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));
        recipeModal.classList.add('hidden');
        setTimeout(() => {
            openRecipeModal();
            calculate();
        }, 100);
    }
}

function addNewIngredient() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    const ingredienteName = prompt('Nombre del nuevo ingrediente:');
    if (!ingredienteName) return;

    const unidad = prompt(`Unidad para ${ingredienteName} (g o ml):`, 'g');
    if (!['g', 'ml'].includes(unidad)) {
        alert('Unidad no válida. Use "g" o "ml".');
        return;
    }

    const cantidad = prompt(`${ingredienteName} (${unidad}) para 1000g de ${selectedOption.text}:`);
    if (!cantidad || isNaN(parseFloat(cantidad))) return;

    RECETAS_DB.push({
        id_jamon: selectedProductId,
        ingrediente: ingredienteName,
        unidad: unidad,
        cantidad: parseFloat(cantidad)
    });

    localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));
    recipeModal.classList.add('hidden');
    setTimeout(() => {
        openRecipeModal();
        calculate();
    }, 100);
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
    alert('✅ Gastos asociados actualizados.');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Eventos para cálculo
jamonSelect.addEventListener('change', calculate);
quantityGramsInput.addEventListener('input', updateQuantityFromInput);
quantityGramsRange.addEventListener('input', updateQuantityFromRange);
exchangeInput.addEventListener('input', calculate);
document.getElementById('profit-margin').addEventListener('input', calculate);

// Eventos modales
btnConfigPrices.addEventListener('click', openPriceModal);
btnClosePriceModal.addEventListener('click', () => priceModal.classList.add('hidden'));
btnSavePrices.addEventListener('click', savePrices);

btnConfigRecipes.addEventListener('click', openRecipeModal);
btnCloseRecipeModal.addEventListener('click', () => recipeModal.classList.add('hidden'));

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
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateQuantityDisplay(1000);

    // Inicializar con valores en $0.00
    resetAllValues();

    // Deshabilitar botón de recetas inicialmente
    toggleRecipeButton(false);

    // Establecer tasa de cambio predeterminada
    exchangeInput.value = '247.00';
});