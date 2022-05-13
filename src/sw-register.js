
(async function () {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });
        console.log('registration completed');
    }
})();