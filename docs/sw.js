/* ============================================
   SlaapTracker â€” sw.js
   Service Worker: cache-first strategie
   ============================================ */

const CACHE = 'slaap-v5';

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
  'images/house.png',
  'images/settings.png',
  'images/chart-column-increasing.png',
  'images/pen.png',
  'images/mobileicon.png',
  'images/pcicon.png',
  'images/icoon mobiel.png'
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

/* Fetch: network first voor alles, cache als fallback (offline) */
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') return caches.match('index.html');
        });
      })
  );
});