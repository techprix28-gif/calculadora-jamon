// ============================================
// DETECCIÓN DE VERSIÓN Y LIMPIEZA DE CACHE
// ============================================

const APP_VERSION = '2.4.0'; // Actualizada versión por cambios
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

// ============================================
// BASE DE DATOS DE RECETAS (ACTUALIZADA)
// ============================================

// A. RECETAS POR 1000g DE PRODUCTO FINAL
let RECETAS_DB = JSON.parse(localStorage.getItem('RECETAS_DB')) || [
    // ========== RECETA COPPA ==========
    { id_jamon: 'COPPA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1833 },
    { id_jamon: 'COPPA', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'COPPA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'COPPA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 42 },
    { id_jamon: 'COPPA', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 110 },
    { id_jamon: 'COPPA', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1 },
    { id_jamon: 'COPPA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 6 },
    { id_jamon: 'COPPA', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 }, // AGREGADO

    // ========== RECETA PITINA ==========
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
    { id_jamon: 'PITINA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 5 },
    { id_jamon: 'PITINA', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 }, // AGREGADO

    // ========== RECETA JAMÓN NEGRO ==========
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1833 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 42 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 110 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 6 },
    { id_jamon: 'JAMON-NEGRO', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 }, // AGREGADO

    // ========== RECETA JAMÓN SELVA NEGRA/PIMENTÓN DULCE ==========
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 12 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Orégano mix', unidad: 'g', cantidad: 1 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Pimienta negra mix', unidad: 'g', cantidad: 2.5 },
    { id_jamon: 'JAMON-PIMENTON', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 },

    // ========== RECETA JAMÓN SELVA NEGRA CON MOSTAZA Y MIEL ==========
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Mostaza', unidad: 'ml', cantidad: 150 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Miel', unidad: 'ml', cantidad: 50 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Pimienta negra mix', unidad: 'g', cantidad: 1 },
    { id_jamon: 'JAMON-MOSTAZA', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 },

    // ========== RECETA COSTILLA AHUMADA (ACTUALIZADA CON 2 BOLSAS) ==========
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'COSTILLA-AHUMADA', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 2 }, // AGREGADO 2 BOLSAS

    // ========== RECETA CHULETA AHUMADA (ACTUALIZADA CON 2 BOLSAS) ==========
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'CHULETA-AHUMADA', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 2 }, // AGREGADO 2 BOLSAS

    // ========== RECETA TOCINETA ==========
    { id_jamon: 'TOCINETA', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'TOCINETA', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'TOCINETA', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'TOCINETA', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'TOCINETA', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'TOCINETA', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'TOCINETA', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'TOCINETA', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'TOCINETA', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'TOCINETA', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'TOCINETA', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'TOCINETA', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'TOCINETA', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'TOCINETA', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'TOCINETA', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'TOCINETA', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'TOCINETA', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },

    // ========== RECETA LOMO AHUMADO (ACTUALIZADA CON 10 BOLSAS) ==========
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'LOMO-AHUMADO', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 }, // AGREGADO 10 BOLSAS

    // ========== RECETA RODILLA DE CERDO ==========
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 2050 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Agua', unidad: 'ml', cantidad: 1710 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Hielo', unidad: 'g', cantidad: 828 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Sal', unidad: 'g', cantidad: 105 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 9 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Azúcar', unidad: 'g', cantidad: 30 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Nitrito', unidad: 'g', cantidad: 18 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Glutamato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Pimienta guayabita', unidad: 'g', cantidad: 23 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Orégano', unidad: 'g', cantidad: 12 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Romero', unidad: 'g', cantidad: 3 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 1.2 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Ajo', unidad: 'g', cantidad: 23 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Laurel', unidad: 'g', cantidad: 14 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 10 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Tomillo', unidad: 'g', cantidad: 10 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 12 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Orégano mix', unidad: 'g', cantidad: 1 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Pimienta negra mix', unidad: 'g', cantidad: 2.5 },
    { id_jamon: 'RODILLA-CERDO', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 1 },

    // ========== RECETA CHORIZO CURADO ==========
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1283 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Carne de res', unidad: 'g', cantidad: 367 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Tocino', unidad: 'g', cantidad: 183 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Sal', unidad: 'g', cantidad: 38.5 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Sal de cura', unidad: 'g', cantidad: 5.5 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Azúcar', unidad: 'g', cantidad: 18 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Eritorbato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Fosfato', unidad: 'g', cantidad: 9 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Vino tinto', unidad: 'ml', cantidad: 42 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Pimienta negra', unidad: 'g', cantidad: 2.8 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Pimentón dulce', unidad: 'g', cantidad: 3 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Pimienta blanca', unidad: 'g', cantidad: 1.5 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Ajo molido', unidad: 'g', cantidad: 8 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Nuez moscada', unidad: 'g', cantidad: 5 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Tripa de cerdo', unidad: 'm', cantidad: 4 },
    { id_jamon: 'CHORIZO-CURADO', ingrediente: 'Bolsas', unidad: 'unidad', cantidad: 10 },

    // ========== RECETA CHORIZO COLONIERO ==========
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Carne de cerdo', unidad: 'g', cantidad: 1000 },
    { id_jamon: 'CHORIZO-COLONIERO', ingrediente: 'Sal', unidad: 'g', cantidad: 20 }
];

// B. TABLA DE COSTOS UNITARIOS (USD por Kg/L) - ACTUALIZADA CON NUEVOS INGREDIENTES
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
    'Nitrito': 25.0,

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
    'Agua': 0.0,
    'Hielo': 0.0,
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

    // NUEVOS INGREDIENTES AGREGADOS
    'Pimienta negra mix': 15.0,      // $15/kg - NUEVO
    'Bolsas': 0.095,                 // $0.095/unidad - NUEVO
    'Orégano mix': 20.0,             // $20/kg - NUEVO
    'Tripa de cerdo': 3.3,           // $3.3/metro - NUEVO

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
            } else if (unidad === 'unidad') {
                // Para bolsas y otros por unidad
                costoIngrediente = cantidadEscalada * precioPorUnidad;
            } else if (unidad === 'm') {
                // Para tripa de cerdo por metro
                costoIngrediente = cantidadEscalada * precioPorUnidad;
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
            <label>${ingrediente} (USD por Kg/L/unidad)</label>
            <div class="input-wrapper">
                <input type="number" class="price-input" data-ingrediente="${ingrediente}" value="${precio}" step="0.001" min="0">
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

            // Determinar unidad de display
            let unidadDisplay = unidad;
            if (unidad === 'ml') unidadDisplay = 'ml';
            else if (unidad === 'unidad') unidadDisplay = 'unidad';
            else if (unidad === 'm') unidadDisplay = 'm';
            else unidadDisplay = 'g';

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

    const unidad = prompt(`Unidad para ${ingredienteName} (g, ml, unidad, m):`, 'g');
    if (!['g', 'ml', 'unidad', 'm'].includes(unidad)) {
        alert('Unidad no válida. Use "g", "ml", "unidad" o "m".');
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
// FUNCIONALIDAD PARA COMPARTIR CON OPCIONES
// ============================================

// NUEVA FUNCIÓN - Mostrar modal con opciones de compartir
function mostrarOpcionesCompartir() {
    const selectedProductId = jamonSelect.value;

    if (!selectedProductId) {
        alert('⚠️ Seleccione un producto primero.');
        return;
    }

    // Crear modal de opciones
    const modalHTML = `
        <div class="modal" id="share-modal">
            <div class="modal-content" style="max-width: 350px;">
                <div class="modal-header">
                    <h3>📤 Compartir Resultados</h3>
                    <button class="close-btn" onclick="cerrarModalCompartir()">&times;</button>
                </div>
                <div class="share-options" style="padding: 20px;">
                    <button class="share-option-btn whatsapp" onclick="compartirWhatsAppCompleto()" style="width: 100%; padding: 12px; margin-bottom: 10px; background: #25D366; color: white; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">💬</span>
                        WhatsApp Completo
                    </button>
                    <button class="share-option-btn whatsapp" onclick="compartirWhatsAppResumen()" style="width: 100%; padding: 12px; margin-bottom: 10px; background: #128C7E; color: white; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📊</span>
                        WhatsApp Resumen
                    </button>
                    <button class="share-option-btn" onclick="compartirSoloReceta()" style="width: 100%; padding: 12px; background: #805AD5; color: white; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">📝</span>
                        Solo Receta
                    </button>
                </div>
            </div>
        </div>
    `;

    // Agregar modal al body
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = modalHTML;
    document.body.appendChild(modalDiv);

    // Mostrar modal
    setTimeout(() => {
        document.getElementById('share-modal').classList.remove('hidden');
    }, 10);
}

function cerrarModalCompartir() {
    const modal = document.getElementById('share-modal');
    if (modal) {
        modal.classList.add('hidden');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Función para obtener datos para compartir
function obtenerDatosParaCompartir(productName) {
    const exchangeRate = parseFloat(exchangeInput.value) || 247.0;
    const marginPercent = parseFloat(document.getElementById('profit-margin').value) || 30;
    const desiredGrams = parseFloat(quantityGramsInput.value) || 1000;

    // Obtener valores actuales de la interfaz
    const datos = {
        producto: productName,
        cantidad: desiredGrams,
        tasaCambio: exchangeRate,
        margen: marginPercent,
        fecha: new Date().toLocaleDateString('es-VE'),
        hora: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),

        // Costos
        costoIngredientes: parseFloat(costIngredientsEl.textContent.replace('$', '') || 0),
        costoGastos: parseFloat(costOverheadEl.textContent.replace('$', '') || 0),
        costoTotal: parseFloat(costTotalEl.textContent.replace('$', '') || 0),

        // Precios
        precioVentaUSD: parseFloat(priceUsdEl.textContent.replace('$', '') || 0),
        gananciaUSD: parseFloat(profitUsdEl.textContent.replace('$', '') || 0),
        precioVentaBS: parseFloat(priceBsEl.textContent.replace('Bs ', '').replace(',', '') || 0),

        // Precios por porción
        precio100gUSD: parseFloat(document.getElementById('price-per-100g-usd').textContent.replace('$', '') || 0),
        precio250gUSD: parseFloat(document.getElementById('price-per-250g-usd').textContent.replace('$', '') || 0),
        precio500gUSD: parseFloat(document.getElementById('price-per-500g-usd').textContent.replace('$', '') || 0),
        precio1kgUSD: parseFloat(document.getElementById('price-per-kg-usd').textContent.replace('$', '') || 0),

        precio100gBS: parseFloat(document.getElementById('price-per-100g-bs').textContent.replace('Bs ', '').replace(',', '') || 0),
        precio250gBS: parseFloat(document.getElementById('price-per-250g-bs').textContent.replace('Bs ', '').replace(',', '') || 0),
        precio500gBS: parseFloat(document.getElementById('price-per-500g-bs').textContent.replace('Bs ', '').replace(',', '') || 0),
        precio1kgBS: parseFloat(document.getElementById('price-per-kg-bs').textContent.replace('Bs ', '').replace(',', '') || 0),

        // Gastos configurados
        gastos: { ...OVERHEAD_CONFIG },

        // Receta (si existe)
        receta: obtenerRecetaActual(productName, desiredGrams)
    };

    return datos;
}

// Obtener receta escalada actual
function obtenerRecetaActual(productName, grams) {
    const selectedProductId = jamonSelect.value;
    const ingredientes = RECETAS_DB.filter(item => item.id_jamon === selectedProductId);

    if (ingredientes.length === 0) return null;

    const scaleFactor = grams / 1000;
    const recetaEscalada = [];

    ingredientes.forEach(item => {
        const cantidadEscalada = item.cantidad * scaleFactor;
        recetaEscalada.push({
            ingrediente: item.ingrediente,
            cantidad: cantidadEscalada,
            unidad: item.unidad,
            precioUnitario: COSTOS_DB[item.ingrediente] || 0
        });
    });

    return recetaEscalada;
}

// Función para compartir COMPLETO (con toda la receta)
function compartirWhatsAppCompleto() {
    const datos = obtenerDatosParaCompartir(
        document.getElementById('jamon-type').options[document.getElementById('jamon-type').selectedIndex].text
    );

    let mensaje = `📋 *CALCULADORA DE CHARCUTERÍA*\n`;
    mensaje += `📅 ${datos.fecha} - ${datos.hora}\n\n`;

    mensaje += `🔸 *PRODUCTO:* ${datos.producto}\n`;
    mensaje += `🔸 *CANTIDAD:* ${datos.cantidad}g (${(datos.cantidad / 1000).toFixed(2)} kg)\n`;
    mensaje += `🔸 *TASA DE CAMBIO:* ${datos.tasaCambio} Bs/$\n`;
    mensaje += `🔸 *MARGEN DE GANANCIA:* ${datos.margen}%\n\n`;

    mensaje += `💵 *COSTOS DE PRODUCCIÓN*\n`;
    mensaje += `• Ingredientes: $${datos.costoIngredientes.toFixed(2)}\n`;
    mensaje += `• Gastos: $${datos.costoGastos.toFixed(2)}\n`;
    mensaje += `• *TOTAL COSTO: $${datos.costoTotal.toFixed(2)}*\n\n`;

    mensaje += `💰 *RENTABILIDAD*\n`;
    mensaje += `• Precio Venta USD: $${datos.precioVentaUSD.toFixed(2)}\n`;
    mensaje += `• Precio Venta Bs: Bs ${datos.precioVentaBS.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\n`;
    mensaje += `• *GANANCIA USD: $${datos.gananciaUSD.toFixed(2)}*\n\n`;

    mensaje += `📊 *PRECIOS POR PORCIÓN*\n`;
    mensaje += `• 100g: $${datos.precio100gUSD.toFixed(2)} | Bs ${datos.precio100gBS.toFixed(2)}\n`;
    mensaje += `• 250g: $${datos.precio250gUSD.toFixed(2)} | Bs ${datos.precio250gBS.toFixed(2)}\n`;
    mensaje += `• 500g: $${datos.precio500gUSD.toFixed(2)} | Bs ${datos.precio500gBS.toFixed(2)}\n`;
    mensaje += `• 1kg: $${datos.precio1kgUSD.toFixed(2)} | Bs ${datos.precio1kgBS.toFixed(2)}\n\n`;

    // RECETA COMPLETA - TODOS LOS INGREDIENTES
    if (datos.receta && datos.receta.length > 0) {
        mensaje += `📝 *RECETA COMPLETA (para ${datos.cantidad}g producto)*\n`;
        datos.receta.forEach(item => {
            mensaje += `• ${item.ingrediente}: ${item.cantidad.toFixed(1)}${item.unidad}\n`;
        });
        mensaje += `\n`;
    }

    mensaje += `⚙️ *GASTOS CONFIGURADOS*\n`;
    mensaje += `• Energía: $${datos.gastos.gasto_energia_100g} por 100g\n`;
    mensaje += `• Mano obra: $${datos.gastos.gasto_mano_obra_kg} por kg\n`;
    mensaje += `• Gastos generales: ${datos.gastos.gasto_general_porcentaje}%\n`;
    mensaje += `• Gastos fijos: $${datos.gastos.gasto_otros_fijos}\n\n`;

    mensaje += `📱 *Generado con: Calculadora de Charcutería PWA*`;

    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    // Cerrar modal
    cerrarModalCompartir();
}

// Función para compartir SOLO RESUMEN (sin receta)
function compartirWhatsAppResumen() {
    const datos = obtenerDatosParaCompartir(
        document.getElementById('jamon-type').options[document.getElementById('jamon-type').selectedIndex].text
    );

    let mensaje = `📊 *RESUMEN: ${datos.producto}*\n\n`;
    mensaje += `• Cantidad: ${datos.cantidad}g (${(datos.cantidad / 1000).toFixed(2)} kg)\n`;
    mensaje += `• Tasa de cambio: ${datos.tasaCambio} Bs/$\n`;
    mensaje += `• Margen: ${datos.margen}%\n`;
    mensaje += `• Costo total: $${datos.costoTotal.toFixed(2)}\n`;
    mensaje += `• Precio venta: $${datos.precioVentaUSD.toFixed(2)} | Bs ${datos.precioVentaBS.toFixed(2)}\n`;
    mensaje += `• Ganancia: $${datos.gananciaUSD.toFixed(2)}\n\n`;
    mensaje += `• Precio por kg: $${datos.precio1kgUSD.toFixed(2)} | Bs ${datos.precio1kgBS.toFixed(2)}\n`;
    mensaje += `• Precio por 100g: $${datos.precio100gUSD.toFixed(2)} | Bs ${datos.precio100gBS.toFixed(2)}\n\n`;
    mensaje += `📱 Calculadora de Charcutería PWA`;

    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    // Cerrar modal
    cerrarModalCompartir();
}

// Función para compartir SOLO RECETA
function compartirSoloReceta() {
    const selectedProductId = jamonSelect.value;
    const productSelect = document.getElementById('jamon-type');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const productName = selectedOption.text;

    const desiredGrams = parseFloat(quantityGramsInput.value) || 1000;
    const receta = obtenerRecetaActual(productName, desiredGrams);

    if (!receta || receta.length === 0) {
        alert('⚠️ Este producto no tiene receta configurada.');
        return;
    }

    let mensaje = `📝 *RECETA: ${productName}*\n`;
    mensaje += `*Para: ${desiredGrams}g de producto final*\n\n`;

    receta.forEach(item => {
        mensaje += `• ${item.ingrediente}: ${item.cantidad.toFixed(1)}${item.unidad}\n`;
    });

    mensaje += `\n📅 ${new Date().toLocaleDateString('es-VE')}`;
    mensaje += `\n📱 Generado con: Calculadora de Charcutería PWA`;

    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    // Cerrar modal
    cerrarModalCompartir();
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

    // Configurar botón compartir si existe
    const btnCompartir = document.getElementById('btn-compartir');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', mostrarOpcionesCompartir);
    }
});