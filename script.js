// 1. Estructura de Datos (Backend Simulado)

// A. Tabla de Recetas (RECETAS_DB)
const RECETAS_DB = [
    { id_jamon: 'JAMON-A', ingrediente: 'Pierna de Cerdo', unidad: 'Kg', cantidad: 5.00 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.30 },
    { id_jamon: 'JAMON-A', ingrediente: 'Azúcar', unidad: 'Kg', cantidad: 0.10 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal de Cura', unidad: 'Kg', cantidad: 0.005 },
    { id_jamon: 'JAMON-A', ingrediente: 'Especias Mix', unidad: 'Kg', cantidad: 0.015 },

    { id_jamon: 'JAMON-B', ingrediente: 'Pierna de Cerdo', unidad: 'Kg', cantidad: 1.90 },
    { id_jamon: 'JAMON-B', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 2.00 },
    { id_jamon: 'JAMON-B', ingrediente: 'Azúcar', unidad: 'Kg', cantidad: 0.20 },
    { id_jamon: 'JAMON-B', ingrediente: 'Sal de Cura', unidad: 'Kg', cantidad: 0.003 },
    { id_jamon: 'JAMON-B', ingrediente: 'Especias Mix', unidad: 'Kg', cantidad: 0.008 },
    { id_jamon: 'JAMON-B', ingrediente: 'Whisky/Cognac', unidad: 'L', cantidad: 0.050 }
];

// B. Tabla de Costos Unitarios (COSTOS_DB)
// Intentamos cargar de LocalStorage primero
let COSTOS_DB = JSON.parse(localStorage.getItem('COSTOS_DB')) || {
    'Pierna de Cerdo': 4.50,
    'Sal Gruesa': 0.80,
    'Azúcar': 1.20,
    'Sal de Cura': 12.00,
    'Especias Mix': 9.00,
    'Whisky/Cognac': 40.00
};

// C. Tabla de Configuración y Gastos (GLOBAL_CONFIG)
const GLOBAL_CONFIG = {
    tasa_cambio: 40.00,
    gasto_energia_pieza: 0.50, // USD / pieza
    gasto_mano_obra_kg: 1.50,  // USD / Kg
    precio_venta_sugerido: 12.00 // USD / Kg
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

// Modal Elements
const modal = document.getElementById('price-modal');
const btnConfigPrices = document.getElementById('btn-config-prices');
const btnCloseModal = document.getElementById('close-modal');
const btnSavePrices = document.getElementById('save-prices');
const pricesListEl = document.getElementById('prices-list');

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

// Modal Events
btnConfigPrices.addEventListener('click', openPriceModal);
btnCloseModal.addEventListener('click', closePriceModal);
btnSavePrices.addEventListener('click', savePrices);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closePriceModal();
});


// --- Funciones Principales ---

function calculate() {
    const selectedJamonId = jamonSelect.value;
    const exchangeRate = parseFloat(exchangeInput.value) || 0;

    // Determinar cantidad en "Piezas Equivalentes"
    let equivalentPieces = 0;
    const isPiecesMode = document.getElementById('unit-pieces').checked;

    // Obtener peso de una pieza base para conversiones
    // Asumimos que el peso de la pieza es la suma de la carne (Pierna de Cerdo)
    // O usamos el dato fijo si lo tuviéramos. Usaremos Pierna de Cerdo como referencia de peso base.
    const baseRecipe = RECETAS_DB.find(r => r.id_jamon === selectedJamonId && r.ingrediente === 'Pierna de Cerdo');
    const weightPerPieceKg = baseRecipe ? baseRecipe.cantidad : 5.0; // Fallback 5kg

    if (isPiecesMode) {
        equivalentPieces = parseFloat(quantityPiecesSelect.value);
    } else {
        const grams = parseFloat(quantityGramsInput.value) || 0;
        const kg = grams / 1000;
        equivalentPieces = kg / weightPerPieceKg;
    }

    // 1. Obtener ingredientes
    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedJamonId);

    // 2. Calcular Costos
    let unitIngredientsCost = 0;
    let unitWeight = 0;

    ingredientes.forEach(item => {
        const costPerUnit = COSTOS_DB[item.ingrediente] || 0;
        const costForItem = item.cantidad * costPerUnit;
        unitIngredientsCost += costForItem;

        if (item.ingrediente === 'Pierna de Cerdo') {
            unitWeight = item.cantidad;
        }
    });

    // Escalar por la cantidad de piezas (o fracción de pieza)
    const totalIngredientsCost = unitIngredientsCost * equivalentPieces;
    const totalWeight = unitWeight * equivalentPieces;

    // 3. Gastos Asociados
    // Fórmula: 0.50 USD/pieza + 1.50 USD/Kg
    // Nota: Si fabrico 0.1 piezas (500g), ¿el gasto por pieza es 0.50 o 0.05?
    // Asumiremos prorrateo lineal para "pieza" también, o cobramos el setup completo?
    // Para ser justos en costos variables, lo prorratearemos.
    const overheadPerPiece = GLOBAL_CONFIG.gasto_energia_pieza + (GLOBAL_CONFIG.gasto_mano_obra_kg * unitWeight);
    const totalOverheadCost = overheadPerPiece * equivalentPieces;

    // 4. Totales
    const totalProductionCost = totalIngredientsCost + totalOverheadCost;

    // 5. Ventas y Ganancias
    const totalSalesPriceUSD = GLOBAL_CONFIG.precio_venta_sugerido * totalWeight;
    const totalProfitUSD = totalSalesPriceUSD - totalProductionCost;
    const totalSalesPriceBs = totalSalesPriceUSD * exchangeRate;

    updateUI(totalIngredientsCost, totalOverheadCost, totalProductionCost, totalSalesPriceUSD, totalProfitUSD, totalSalesPriceBs);
}

function updateUI(ingredients, overhead, total, salesUSD, profit, salesBs) {
    costIngredientsEl.textContent = formatCurrency(ingredients);
    costOverheadEl.textContent = formatCurrency(overhead);
    costTotalEl.textContent = formatCurrency(total);

    priceUsdEl.textContent = formatCurrency(salesUSD);
    profitUsdEl.textContent = formatCurrency(profit);
    priceBsEl.textContent = formatCurrency(salesBs, 'Bs');

    if (profit < 0) {
        profitUsdEl.style.color = '#e63946';
    } else {
        profitUsdEl.style.color = '#2a9d8f';
    }
}

function formatCurrency(amount, currency = 'USD') {
    if (currency === 'USD') {
        return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        return 'Bs ' + amount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

// --- Modal Logic ---

function openPriceModal() {
    pricesListEl.innerHTML = '';

    for (const [ingrediente, precio] of Object.entries(COSTOS_DB)) {
        const row = document.createElement('div');
        row.className = 'price-row';
        row.innerHTML = `
            <label>${ingrediente}</label>
            <div class="input-wrapper">
                <input type="number" class="price-input" data-ingrediente="${ingrediente}" value="${precio}" step="0.01">
                <span class="currency-label">$</span>
            </div>
        `;
        pricesListEl.appendChild(row);
    }

    modal.classList.remove('hidden');
}

function closePriceModal() {
    modal.classList.add('hidden');
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

    // Guardar en LocalStorage
    localStorage.setItem('COSTOS_DB', JSON.stringify(COSTOS_DB));

    closePriceModal();
    calculate(); // Recalcular con nuevos precios
    alert('Precios actualizados correctamente.');
}

// Cálculo inicial
calculate();
