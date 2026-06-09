/* ============================================
   SlaapTracker — sw.js
   Service Worker: cache-first strategie
   ============================================ */

const CACHE = 'slaap-v1';

const BESTANDEN = [
  'index.html',
  'invoer.html',
  'overzicht.html',
  'instellingen.html',
  'css/style.css',
  'js/app.js',
  'js/i18n.js',
  'js/index.js',
  'js/invoer.js',
  'js/overzicht.js',
  'js/instellingen.js',
  'locales/nl.json',
  'locales/en.json',
  'manifest.json',
  'images/icon-192.png',
  'images/icon-512.png'
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
          return caches.match('index.html');
        }
      });
    })
  );
});
