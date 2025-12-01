// Service Worker para PWA - Calculadora Jamón Curado
// VERSIÓN ACTUALIZADA PARA FORZAR CACHE

const CACHE_VERSION = 'jamon-calc-v2'; // ⬅️ CAMBIAR VERSIÓN
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('🔄 Instalando Service Worker v2');
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('✅ Cache abierto v2');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Forzar activación inmediata
                return self.skipWaiting();
            })
    );
});

// Activación - ELIMINAR CACHES ANTIGUOS
self.addEventListener('activate', (event) => {
    console.log('🚀 Activando Service Worker v2');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // ELIMINAR TODAS LAS VERSIONES ANTERIORES
                    if (cacheName !== CACHE_VERSION) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Tomar control de todos los clients
            return self.clients.claim();
        })
    );
});

// Estrategia: Network First (para desarrollo)
self.addEventListener('fetch', (event) => {
    // Para archivos .html, .js, .css usar Network First
    if (event.request.url.includes('.html') ||
        event.request.url.includes('.js') ||
        event.request.url.includes('.css')) {

        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Si la red funciona, guardar en cache
                    const responseClone = response.clone();
                    caches.open(CACHE_VERSION)
                        .then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    return response;
                })
                .catch(() => {
                    // Si falla la red, usar cache
                    return caches.match(event.request);
                })
        );
    } else {
        // Para otros recursos, Cache First
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request);
                })
        );
    }
});