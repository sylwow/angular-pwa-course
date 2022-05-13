const VERSION = 'v13';

log('Installing Service Worker');

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheName());

    return cache.addAll([
        '/',
        '/polyfills.js',
        '/styles.js',
        '/vendor.js',
        '/main.js',
        '/api/lessons',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
    ]);
}

function getCacheName() {
    return 'app-cache-' + VERSION;
}

self.addEventListener('activate', () => astivateSw());

self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));

async function astivateSw() {
    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    });
}

async function cacheThenNetwork(event) {
    const cache = await caches.open(getCacheName());

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        log('from cache: ' + event.request.url)
        return cachedResponse;
    } else {
        const networkResponse = await fetch(event.request);
        log('from network: ' + event.request.url);

        return networkResponse;
    }
}

function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(VERSION, message);
    }
}

















