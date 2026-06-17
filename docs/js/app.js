/* ============================================
   SlaapTracker — app.js
   Service Worker registratie
   ============================================ */

navigator.serviceWorker?.register('./sw.js').catch(() => {});
