/* ============================================
   SlaapTracker — app.js
   Service Worker registratie
   ============================================ */

// Service Worker voor offline support
// .catch zwijgt errors weg zodat app niet crasht als SW niet werkt
navigator.serviceWorker?.register('./sw.js').catch(() => {});
