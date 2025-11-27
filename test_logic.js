// Simulación de la lógica de cálculo para verificación
const RECETAS_DB = [
    { id_jamon: 'JAMON-A', ingrediente: 'Pierna de Cerdo', unidad: 'Kg', cantidad: 5.00 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal Gruesa', unidad: 'Kg', cantidad: 0.30 },
    { id_jamon: 'JAMON-A', ingrediente: 'Azúcar', unidad: 'Kg', cantidad: 0.10 },
    { id_jamon: 'JAMON-A', ingrediente: 'Sal de Cura', unidad: 'Kg', cantidad: 0.005 },
    { id_jamon: 'JAMON-A', ingrediente: 'Especias Mix', unidad: 'Kg', cantidad: 0.015 },
];

const COSTOS_DB = {
    'Pierna de Cerdo': 4.50,
    'Sal Gruesa': 0.80,
    'Azúcar': 1.20,
    'Sal de Cura': 12.00,
    'Especias Mix': 9.00,
    'Whisky/Cognac': 40.00
};

const GLOBAL_CONFIG = {
    tasa_cambio: 40.00,
    gasto_energia_pieza: 0.50,
    gasto_mano_obra_kg: 1.50,
};

// Parámetros de prueba
const selectedJamonId = 'JAMON-A';
const quantity = 1; // 1 Pieza
const marginPercent = 30; // 30%

// 1. Calcular Costo Ingredientes
let unitIngredientsCost = 0;
let unitWeight = 0;

const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedJamonId);

ingredientes.forEach(item => {
    const costPerUnit = COSTOS_DB[item.ingrediente] || 0;
    const costForItem = item.cantidad * costPerUnit;
    unitIngredientsCost += costForItem;

    if (item.ingrediente === 'Pierna de Cerdo') {
        unitWeight = item.cantidad;
    }
});

const totalIngredientsCost = unitIngredientsCost * quantity;

// 2. Calcular Gastos
const overheadPerPiece = GLOBAL_CONFIG.gasto_energia_pieza + (GLOBAL_CONFIG.gasto_mano_obra_kg * unitWeight);
const totalOverheadCost = overheadPerPiece * quantity;

// 3. Costo Total
const totalProductionCost = totalIngredientsCost + totalOverheadCost;

// 4. Precio Venta (Fórmula Margen)
const marginDecimal = marginPercent / 100;
const totalSalesPriceUSD = totalProductionCost / (1 - marginDecimal);
const totalProfitUSD = totalSalesPriceUSD - totalProductionCost;

console.log('--- RESULTADOS DE PRUEBA ---');
console.log(`Jamón: ${selectedJamonId}`);
console.log(`Costo Ingredientes: $${totalIngredientsCost.toFixed(2)}`);
console.log(`Gastos Asociados: $${totalOverheadCost.toFixed(2)}`);
console.log(`Costo Total Producción: $${totalProductionCost.toFixed(2)}`);
console.log(`Margen Deseado: ${marginPercent}%`);
console.log(`Precio Venta Calculado: $${totalSalesPriceUSD.toFixed(2)}`);
console.log(`Ganancia Calculada: $${totalProfitUSD.toFixed(2)}`);
console.log(`Verificación Margen: ${(totalProfitUSD / totalSalesPriceUSD * 100).toFixed(2)}%`);
