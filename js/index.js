/* ============================================
   SlaapTracker — index.js
   Dashboard: gemiddelde, laatste nacht, recent
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');

  if (data.length === 0) return;

  // Gemiddelde slaap
  const gem = (data.reduce((s, e) => s + e.uren, 0) / data.length).toFixed(1);
  document.getElementById('avgSleep').textContent = gem + 'u';

  // Meest recente nacht eerst
  const sorted = [...data].sort((a, b) => b.datum.localeCompare(a.datum));
  const last = sorted[0];
  document.getElementById('lastUren').textContent = last.uren + 'u';
  document.getElementById('lastDatum').textContent = last.datum;
  document.getElementById('lastKwal').textContent = last.kwaliteit;

  // Recente nachten lijst (max 5)
  const recentList = document.getElementById('recentList');
  sorted.slice(0, 5).forEach(e => {
    const div = document.createElement('div');
    div.className = 'card recent-item';
    div.innerHTML =
      '<span class="datum-box">' + e.datum + '</span>' +
      '<span class="mid-value">' + e.uren + 'u</span>' +
      '<span class="kwal-box">' + e.kwaliteit + '</span>';
    recentList.appendChild(div);
  });
});
