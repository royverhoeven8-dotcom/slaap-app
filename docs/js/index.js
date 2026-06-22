/* ============================================
   SlaapTracker — index.js
   Dashboard: gemiddelde, laatste nacht, recent
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Data laden uit localStorage
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');

  if (!data.length) {
    // Geen data: nette lege-staat tonen i.p.v. niets doen
    document.getElementById('avgSleep').textContent = '–';
    document.getElementById('lastUren').textContent = '–';
    document.getElementById('lastDatum').textContent = '–';
    document.getElementById('lastKwal').textContent = '–';
    document.getElementById('recentList').innerHTML =
      '<div class="card"><span class="label-box">Nog geen slaapdata. Voeg je eerste nacht toe via Invoer.</span></div>';
    return;
  }

  // Nieuwste eerst (omgekeerde volgorde)
  const sorted = [...data].sort((a, b) => b.datum.localeCompare(a.datum));
  const [last] = sorted; // Eerste item destructuren
  const avg = (data.reduce((s, e) => s + e.uren, 0) / data.length).toFixed(1);

  // Dashboard info vullen
  document.getElementById('avgSleep').textContent = `${avg}u`;
  document.getElementById('lastUren').textContent = `${last.uren}u`;
  document.getElementById('lastDatum').textContent = last.datum;
  document.getElementById('lastKwal').textContent = last.kwaliteit;

  // Recente nachten lijst (max 5)
  document.getElementById('recentList').innerHTML = sorted.slice(0, 5)
    .map(e => `<div class="card recent-item"><span class="datum-box">${e.datum}</span><span class="mid-value">${e.uren}u</span><span class="kwal-box">${e.kwaliteit}</span></div>`)
    .join('');
});