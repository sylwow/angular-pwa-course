const VERSION = 'v8';

log('Installing serviceWorker');

self.addEventListener('install',
    (event) => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {
    try {

        log('new serviceWorker is Started');

        const request = new Request('offline.html');
        const response = await fetch(request);

        log(response);

        if (response.status !== 200) {
            throw new Error('could not load offline page');
        }

        const cache = await caches.open('app-cache');
        cache.put(request, response)

        log('new serviceWorker is loaded');
    } catch (error) {
        log(error);
    }

}

self.addEventListener('activate', () => {
    log('new serviceWorker is active');
});

self.addEventListener('fetch', event => event.respondWith(showOfflineIfError(event)));

async function showOfflineIfError(event) {
    let response;
    try {
        log('call network' + event.request.url)
        response = await fetch(event.request);

    } catch (error) {
        log('call network error' + error);

        const cache = await caches.open('app-cache');

        response = await cache.match('offline.html');
    }
    return response;
}

function log(message, ...data) {
    console.log(VERSION, message, ...data);
}