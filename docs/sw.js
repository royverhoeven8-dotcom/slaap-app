/* ============================================
   SlaapTracker — sw.js
   Service Worker: cache-first strategie
   ============================================ */

const CACHE = 'slaap-v2';

const BESTANDEN = [
  '/slaap-app/index.html',
  '/slaap-app/invoer.html',
  '/slaap-app/overzicht.html',
  '/slaap-app/instellingen.html',
  '/slaap-app/css/style.css',
  '/slaap-app/js/app.js',
  '/slaap-app/js/i18n.js',
  '/slaap-app/js/index.js',
  '/slaap-app/js/invoer.js',
  '/slaap-app/js/overzicht.js',
  '/slaap-app/js/instellingen.js',
  '/slaap-app/locales/nl.json',
  '/slaap-app/locales/en.json',
  '/slaap-app/manifest.json',
  '/slaap-app/images/house.png',
  '/slaap-app/images/settings.png',
  '/slaap-app/images/chart-column-increasing.png',
  '/slaap-app/images/pen.png',
];

/* Installatie: alle bestanden in cache plaatsen */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(BESTANDEN))
  );
  self.skipWaiting();
});

/* Activatie: oude caches verwijderen */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch: cache first, dan netwerk */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/slaap-app/index.html');
        }
      });
    })
  );
});
