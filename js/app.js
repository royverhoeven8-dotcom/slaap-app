/* ============================================
   SlaapTracker — app.js
   Service Worker registratie
   ============================================ */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
