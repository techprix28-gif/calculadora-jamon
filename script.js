// 1. Estructura de Datos (Backend Simulado)

// A. Tabla de Recetas (RECETAS_DB)
let RECETAS_DB = JSON.parse(localStorage.getItem('RECETAS_DB')) || [
    // Productos Ahumados
    { id_jamon: 'JAMON-A', ingrediente: 'Pierna de Cerdo', unidad: 'Kg', cantidad: 5.00 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.30 },
    { id_jamon: 'JAMON-A', ingrediente: 'Azúcar', unidad: 'Kg', cantidad: 0.10 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal de Cura', unidad: 'Kg', cantidad: 0.005 },
    { id_jamon: 'JAMON-A', ingrediente: 'Especias Mix', unidad: 'Kg', cantidad: 0.015 },
    { id_jamon: 'JAMON-A', ingrediente: 'Madera Ahumado', unidad: 'Kg', cantidad: 0.200 },

    { id_jamon: 'TOCINETA', ingrediente: 'Panceta de Cerdo', unidad: 'Kg', cantidad: 1.00 },
    { id_jamon: 'TOCINETA', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.05 },
    { id_jamon: 'TOCINETA', ingrediente: 'Azúcar', unidad: 'Kg', cantidad: 0.02 },
    { id_jamon: 'TOCINETA', ingrediente: 'Pimienta Negra', unidad: 'Kg', cantidad: 0.005 },
    { id_jamon: 'TOCINETA', ingrediente: 'Madera Ahumado', unidad: 'Kg', cantidad: 0.100 },

    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Lomo de Cerdo', unidad: 'Kg', cantidad: 2.00 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.08 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Ajo en Polvo', unidad: 'Kg', cantidad: 0.010 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Pimentón', unidad: 'Kg', cantidad: 0.015 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Madera Ahumado', unidad: 'Kg', cantidad: 0.150 },

    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Chuleta de Cerdo', unidad: 'Kg', cantidad: 1.50 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.06 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Hierbas Provence', unidad: 'Kg', cantidad: 0.008 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Aceite de Oliva', unidad: 'L', cantidad: 0.050 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Madera Ahumado', unidad: 'Kg', cantidad: 0.120 },

    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Costilla de Cerdo', unidad: 'Kg', cantidad: 2.50 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.10 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Salsa Barbacoa', unidad: 'L', cantidad: 0.200 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Miel', unidad: 'L', cantidad: 0.100 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Madera Ahumado', unidad: 'Kg', cantidad: 0.300 },

    // Productos Curados
    { id_jamon: 'COPPA', ingrediente: 'Lomo Adobado', unidad: 'Kg', cantidad: 3.00 },
    { id_jamon: 'COPPA', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.15 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta Negra', unidad: 'Kg', cantidad: 0.020 },
    { id_jamon: 'COPPA', ingrediente: 'Vino Tinto', unidad: 'L', cantidad: 0.100 },
    { id_jamon: 'COPPA', ingrediente: 'Ajo', unidad: 'Kg', cantidad: 0.015 },

    { id_jamon: 'PITINAS', ingrediente: 'Carne Magra Cerdo', unidad: 'Kg', cantidad: 1.20 },
    { id_jamon: 'PITINAS', ingrediente: 'Tocino', unidad: 'Kg', cantidad: 0.30 },
    { id_jamon: 'PITINAS', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.04 },
    { id_jamon: 'PITINAS', ingrediente: 'Pimentón Dulce', unidad: 'Kg', cantidad: 0.025 },
    { id_jamon: 'PITINAS', ingrediente: 'Ajo', unidad: 'Kg', cantidad: 0.008 },

    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Pierna de Cerdo', unidad: 'Kg', cantidad: 6.00 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.50 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Pimentón de La Vera', unidad: 'Kg', cantidad: 0.030 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Azúcar Morena', unidad: 'Kg', cantidad: 0.080 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Especias Secretas', unidad: 'Kg', cantidad: 0.025 },

    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Carne de Cerdo', unidad: 'Kg', cantidad: 1.80 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Tocino', unidad: 'Kg', cantidad: 0.20 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.05 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Pimentón Picante', unidad: 'Kg', cantidad: 0.035 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Ajo', unidad: 'Kg', cantidad: 0.012 },

    // Productos Frescos
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Carne de Cerdo', unidad: 'Kg', cantidad: 1.50 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Tocino', unidad: 'Kg', cantidad: 0.25 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.03 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Pimentón', unidad: 'Kg', cantidad: 0.020 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Comino', unidad: 'Kg', cantidad: 0.005 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Orégano', unidad: 'Kg', cantidad: 0.004 },

    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Rodilla de Cerdo', unidad: 'Kg', cantidad: 2.20 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.07 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Ajo', unidad: 'Kg', cantidad: 0.020 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Cebolla', unidad: 'Kg', cantidad: 0.100 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Hierbas', unidad: 'Kg', cantidad: 0.015 }
];

// B. Tabla de Costos Unitarios (COSTOS_DB) - ACTUALIZADA
let COSTOS_DB = JSON.parse(localStorage.getItem('COSTOS_DB')) || {
    // Carnes y Base
    'Pierna de Cerdo': 3.5,
    'Panceta de Cerdo': 3.5,
    'Lomo de Cerdo': 3.5,
    'Chuleta de Cerdo': 3.5,
    'Costilla de Cerdo': 3.5,
    'Lomo Adobado': 3.5,
    'Carne Magra Cerdo': 3.5,
    'Carne de Cerdo': 3.5,
    'Tocino': 3.5,
    'Rodilla de Cerdo': 3.5,

    // Sales y Conservantes
    'Sal Gruesa': 1.3,
    'Sal de Cura': 10.0,
    'Sal Marina': 1.5,

    // Endulzantes
    'Azúcar': 2.0,
    'Azúcar Morena': 2.0,
    'Papelón': 2.5,
    'Miel': 9.0,

    // Aditivos
    'Fosfato': 8.0,
    'Eritorbato': 15.0,
    'Ácido ascórbico': 10.0,
    'Glutamato': 10.0,

    // Líquidos
    'Vino Tinto': 7.0,
    'Cerveza': 1.0,
    'Malta': 5.0,
    'Mostaza': 3.0,

    // Especias y Condimentos
    'Pimentón': 10.0,
    'Pimentón Dulce': 10.0,
    'Pimentón de La Vera': 10.0,
    'Pimentón Picante': 10.0,
    'Orégano': 20.0,
    'Pimienta Negra': 15.0,
    'Pimienta N entera': 15.0,
    'Pimienta blanca': 20.0,
    'Pimienta guayabita': 16.0,
    'Ajo': 10.0,
    'Ajo molido': 12.0,
    'Nuez moscada': 0.4,
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

// C. Tabla de Configuración y Gastos (OVERHEAD_CONFIG)
let OVERHEAD_CONFIG = JSON.parse(localStorage.getItem('OVERHEAD_CONFIG')) || {
    gasto_energia_pieza: 0.50,
    gasto_mano_obra_kg: 1.50,
    gasto_general_porcentaje: 10,
    gasto_otros_fijos: 0.00
};

// 2. Lógica de la Aplicación

// Elementos del DOM
const jamonSelect = document.getElementById('jamon-type');
const exchangeInput = document.getElementById('exchange-rate');

// Unit Toggles & Inputs
const unitRadios = document.getElementsByName('unit-type');
const groupPieces = document.getElementById('group-pieces');
const groupGrams = document.getElementById('group-grams');
const quantityPiecesSelect = document.getElementById('quantity-pieces');
const quantityGramsInput = document.getElementById('quantity-grams');
const quantityGramsRange = document.getElementById('range-grams');

// Results
const costIngredientsEl = document.getElementById('cost-ingredients');
const costOverheadEl = document.getElementById('cost-overhead');
const costTotalEl = document.getElementById('cost-total');
const priceUsdEl = document.getElementById('price-usd');
const profitUsdEl = document.getElementById('profit-usd');
const priceBsEl = document.getElementById('price-bs');

// Price Modal Elements
const priceModal = document.getElementById('price-modal');
const btnConfigPrices = document.getElementById('btn-config-prices');
const btnClosePriceModal = document.getElementById('close-modal');
const btnSavePrices = document.getElementById('save-prices');
const pricesListEl = document.getElementById('prices-list');

// Recipe Modal Elements
const recipeModal = document.getElementById('recipe-modal');
const btnConfigRecipes = document.getElementById('btn-config-recipes');
const btnCloseRecipeModal = document.getElementById('close-recipe-modal');
const btnSaveRecipe = document.getElementById('save-recipe');
const recipeListEl = document.getElementById('recipe-list');
const recipeModalTitle = document.getElementById('recipe-modal-title');

// Overhead Modal Elements
const overheadModal = document.getElementById('overhead-modal');
const btnConfigOverhead = document.getElementById('btn-config-overhead');
const btnCloseOverheadModal = document.getElementById('close-overhead-modal');
const btnSaveOverhead = document.getElementById('save-overhead');

// --- Event Listeners ---

// Toggle Units
unitRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'pieces') {
            groupPieces.classList.remove('hidden');
            groupGrams.classList.add('hidden');
        } else {
            groupPieces.classList.add('hidden');
            groupGrams.classList.remove('hidden');
        }
        calculate();
    });
});

// Sync Grams Input & Range
quantityGramsInput.addEventListener('input', (e) => {
    quantityGramsRange.value = e.target.value;
    calculate();
});
quantityGramsRange.addEventListener('input', (e) => {
    quantityGramsInput.value = e.target.value;
    calculate();
});

jamonSelect.addEventListener('change', calculate);
quantityPiecesSelect.addEventListener('change', calculate);
exchangeInput.addEventListener('input', calculate);
document.getElementById('profit-margin').addEventListener('input', calculate);

// Price Modal Events
btnConfigPrices.addEventListener('click', openPriceModal);
btnClosePriceModal.addEventListener('click', () => priceModal.classList.add('hidden'));
btnSavePrices.addEventListener('click', savePrices);

// Recipe Modal Events
btnConfigRecipes.addEventListener('click', openRecipeModal);
btnCloseRecipeModal.addEventListener('click', () => recipeModal.classList.add('hidden'));
btnSaveRecipe.addEventListener('click', saveRecipe);

// Overhead Modal Events
btnConfigOverhead.addEventListener('click', openOverheadModal);
btnCloseOverheadModal.addEventListener('click', () => overheadModal.classList.add('hidden'));
btnSaveOverhead.addEventListener('click', saveOverhead);

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === priceModal) priceModal.classList.add('hidden');
    if (e.target === recipeModal) recipeModal.classList.add('hidden');
    if (e.target === overheadModal) overheadModal.classList.add('hidden');
});

// --- Funciones Principales ---

function calculate() {
    const selectedJamonId = jamonSelect.value;
    const exchangeRate = parseFloat(exchangeInput.value) || 0;

    // Determinar cantidad en "Piezas Equivalentes"
    let equivalentPieces = 0;
    const isPiecesMode = document.getElementById('unit-pieces').checked;

    // Encontrar el ingrediente principal (carne) para calcular el peso por pieza
    const meatIngredients = ['Pierna de Cerdo', 'Panceta de Cerdo', 'Lomo de Cerdo', 'Chuleta de Cerdo',
        'Costilla de Cerdo', 'Lomo Adobado', 'Carne Magra Cerdo', 'Carne de Cerdo',
        'Rodilla de Cerdo', 'Tocino'];

    const baseRecipe = RECETAS_DB.find(r => r.id_jamon === selectedJamonId && meatIngredients.includes(r.ingrediente));
    const weightPerPieceKg = baseRecipe ? baseRecipe.cantidad : 1.0;

    if (isPiecesMode) {
        equivalentPieces = parseFloat(quantityPiecesSelect.value);
    } else {
        const grams = parseFloat(quantityGramsInput.value) || 0;
        const kg = grams / 1000;
        equivalentPieces = kg / weightPerPieceKg;
    }

    // 1. Obtener ingredientes
    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedJamonId);

    // 2. Calcular Costos de Ingredientes
    let unitIngredientsCost = 0;
    let unitWeight = weightPerPieceKg;

    ingredientes.forEach(item => {
        const costPerUnit = COSTOS_DB[item.ingrediente] || 0;
        const costForItem = item.cantidad * costPerUnit;
        unitIngredientsCost += costForItem;
    });

    const totalIngredientsCost = unitIngredientsCost * equivalentPieces;
    const totalWeight = unitWeight * equivalentPieces;

    // 3. Gastos Asociados (ahora configurables)
    const overheadPerPiece = OVERHEAD_CONFIG.gasto_energia_pieza + (OVERHEAD_CONFIG.gasto_mano_obra_kg * unitWeight);
    const totalOverheadCost = (overheadPerPiece * equivalentPieces) + OVERHEAD_CONFIG.gasto_otros_fijos;

    // Agregar gastos generales como porcentaje
    const gastosGenerales = totalIngredientsCost * (OVERHEAD_CONFIG.gasto_general_porcentaje / 100);
    const totalOverheadWithGeneral = totalOverheadCost + gastosGenerales;

    // 4. Totales
    const totalProductionCost = totalIngredientsCost + totalOverheadWithGeneral;

    // 5. Ventas y Ganancias
    const marginPercent = parseFloat(document.getElementById('profit-margin').value) || 0;
    const marginDecimal = marginPercent / 100;

    let totalSalesPriceUSD = 0;
    if (marginDecimal < 1) {
        totalSalesPriceUSD = totalProductionCost / (1 - marginDecimal);
    } else {
        totalSalesPriceUSD = 0;
    }

    const totalProfitUSD = totalSalesPriceUSD - totalProductionCost;
    const totalSalesPriceBs = totalSalesPriceUSD * exchangeRate;

    updateUI(totalIngredientsCost, totalOverheadWithGeneral, totalProductionCost, totalSalesPriceUSD, totalProfitUSD, totalSalesPriceBs);
}

function updateUI(ingredients, overhead, total, salesUSD, profit, salesBs) {
    costIngredientsEl.textContent = formatCurrency(ingredients);
    costOverheadEl.textContent = formatCurrency(overhead);
    costTotalEl.textContent = formatCurrency(total);

    priceUsdEl.textContent = formatCurrency(salesUSD);
    profitUsdEl.textContent = formatCurrency(profit);
    priceBsEl.textContent = formatCurrency(salesBs, 'Bs');

    // ✅ ELIMINADO: No más cambio automático de color
    // ✅ La ganancia siempre se verá en color normal (negro/oscuro)

    // --- NUEVO: Calcular precios por porción ---
    updatePortionPrices(salesUSD);
}

// Nueva función para calcular precios por porción
// Nueva función para calcular precios por porción (ACTUALIZADA)
function updatePortionPrices(totalSalesPriceUSD) {
    const exchangeRate = parseFloat(exchangeInput.value) || 0;

    // Obtener la cantidad total en gramos
    let totalGrams = 0;
    const isPiecesMode = document.getElementById('unit-pieces').checked;

    if (isPiecesMode) {
        // Si está en modo piezas, convertir a gramos
        const selectedJamonId = jamonSelect.value;
        const meatIngredients = ['Pierna de Cerdo', 'Panceta de Cerdo', 'Lomo de Cerdo', 'Chuleta de Cerdo',
            'Costilla de Cerdo', 'Lomo Adobado', 'Carne Magra Cerdo', 'Carne de Cerdo',
            'Rodilla de Cerdo', 'Tocino'];

        const baseRecipe = RECETAS_DB.find(r => r.id_jamon === selectedJamonId && meatIngredients.includes(r.ingrediente));
        const weightPerPieceKg = baseRecipe ? baseRecipe.cantidad : 1.0;
        const pieces = parseFloat(quantityPiecesSelect.value);
        totalGrams = weightPerPieceKg * pieces * 1000;
    } else {
        // Si está en modo gramos, usar directamente
        totalGrams = parseFloat(quantityGramsInput.value) || 0;
    }

    // Calcular precio por gramo
    const pricePerGram = totalGrams > 0 ? totalSalesPriceUSD / totalGrams : 0;

    // Porciones a calcular
    const portions = [
        { grams: 100, usdId: 'price-per-100g-usd', bsId: 'price-per-100g-bs' },
        { grams: 250, usdId: 'price-per-250g-usd', bsId: 'price-per-250g-bs' },
        { grams: 500, usdId: 'price-per-500g-usd', bsId: 'price-per-500g-bs' },
        { grams: 1000, usdId: 'price-per-kg-usd', bsId: 'price-per-kg-bs' }
    ];

    // Actualizar todos los precios por porción
    portions.forEach(portion => {
        const priceUSD = pricePerGram * portion.grams;
        const priceBs = priceUSD * exchangeRate;

        document.getElementById(portion.usdId).textContent = formatCurrency(priceUSD);
        document.getElementById(portion.bsId).textContent = formatCurrency(priceBs, 'Bs');
    });
}

function formatCurrency(amount, currency = 'USD') {
    if (currency === 'USD') {
        return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        return 'Bs ' + amount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

// --- Modal Logic: Precios con Buscador ---

function openPriceModal() {
    pricesListEl.innerHTML = '';

    // Crear contenedor para los resultados
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-results';
    searchContainer.id = 'search-results';
    pricesListEl.appendChild(searchContainer);

    // Crear contenedor para los ingredientes
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.id = 'ingredients-container';
    pricesListEl.appendChild(ingredientsContainer);

    // Renderizar todos los ingredientes inicialmente
    renderIngredients(Object.entries(COSTOS_DB));

    // Configurar el buscador
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
            <label>${ingrediente}</label>
            <div class="input-wrapper">
                <input type="number" class="price-input" data-ingrediente="${ingrediente}" value="${precio}" step="0.01">
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

    const filteredIngredients = allIngredients.filter(([ingrediente, precio]) =>
        ingrediente.toLowerCase().includes(searchTerm)
    );

    renderIngredients(filteredIngredients);
}

function savePrices() {
    const inputs = document.querySelectorAll('.price-input');
    inputs.forEach(input => {
        const name = input.dataset.ingrediente;
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            COSTOS_DB[name] = val;
        }
    });

    localStorage.setItem('COSTOS_DB', JSON.stringify(COSTOS_DB));
    priceModal.classList.add('hidden');
    calculate();
    alert('Precios actualizados correctamente.');
}

// --- Modal Logic: Recetas ---

function openRecipeModal() {
    const selectedJamonId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    recipeModalTitle.textContent = selectedOption.text;
    recipeListEl.innerHTML = '';

    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedJamonId);

    if (ingredientes.length === 0) {
        recipeListEl.innerHTML = '<p>No hay receta configurada para este producto.</p>';
    } else {
        ingredientes.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'price-row';
            row.innerHTML = `
                <label>${item.ingrediente} (${item.unidad})</label>
                <div class="input-wrapper">
                    <input type="number" class="recipe-input" data-ingrediente="${item.ingrediente}" value="${item.cantidad}" step="0.001">
                </div>
            `;
            recipeListEl.appendChild(row);
        });
    }

    recipeModal.classList.remove('hidden');
}

function saveRecipe() {
    const selectedJamonId = jamonSelect.value;
    const inputs = document.querySelectorAll('.recipe-input');

    inputs.forEach(input => {
        const ingredienteName = input.dataset.ingrediente;
        const newVal = parseFloat(input.value);

        const itemIndex = RECETAS_DB.findIndex(r => r.id_jamon === selectedJamonId && r.ingrediente === ingredienteName);
        if (itemIndex !== -1 && !isNaN(newVal)) {
            RECETAS_DB[itemIndex].cantidad = newVal;
        }
    });

    localStorage.setItem('RECETAS_DB', JSON.stringify(RECETAS_DB));
    recipeModal.classList.add('hidden');
    calculate();

    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    alert(`Receta de ${selectedOption.text} actualizada.`);
}

// --- Modal Logic: Gastos Asociados ---

function openOverheadModal() {
    // Cargar valores actuales en los inputs
    document.getElementById('overhead-energy').value = OVERHEAD_CONFIG.gasto_energia_pieza;
    document.getElementById('overhead-labor').value = OVERHEAD_CONFIG.gasto_mano_obra_kg;
    document.getElementById('overhead-general').value = OVERHEAD_CONFIG.gasto_general_porcentaje;
    document.getElementById('overhead-other').value = OVERHEAD_CONFIG.gasto_otros_fijos;

    overheadModal.classList.remove('hidden');
}

function saveOverhead() {
    OVERHEAD_CONFIG.gasto_energia_pieza = parseFloat(document.getElementById('overhead-energy').value) || 0;
    OVERHEAD_CONFIG.gasto_mano_obra_kg = parseFloat(document.getElementById('overhead-labor').value) || 0;
    OVERHEAD_CONFIG.gasto_general_porcentaje = parseFloat(document.getElementById('overhead-general').value) || 0;
    OVERHEAD_CONFIG.gasto_otros_fijos = parseFloat(document.getElementById('overhead-other').value) || 0;

    localStorage.setItem('OVERHEAD_CONFIG', JSON.stringify(OVERHEAD_CONFIG));
    overheadModal.classList.add('hidden');
    calculate();
    alert('Gastos asociados actualizados correctamente.');
}

// Cálculo inicial
calculate();