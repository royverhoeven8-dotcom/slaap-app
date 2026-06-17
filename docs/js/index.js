/* ============================================
   SlaapTracker — index.js
   Dashboard: gemiddelde, laatste nacht, recent
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
  if (!data.length) return;

  const sorted = [...data].sort((a, b) => b.datum.localeCompare(a.datum));
  const avg = (data.reduce((s, e) => s + e.uren, 0) / data.length).toFixed(1);
  const [last] = sorted;

  document.getElementById('avgSleep').textContent = `${avg}u`;
  Object.assign(document.getElementById('lastUren'), { textContent: `${last.uren}u` });
  Object.assign(document.getElementById('lastDatum'), { textContent: last.datum });
  Object.assign(document.getElementById('lastKwal'), { textContent: last.kwaliteit });

  sorted.slice(0, 5).forEach(e => {
    const div = document.createElement('div');
    div.className = 'card recent-item';
    div.innerHTML = `<span class="datum-box">${e.datum}</span><span class="mid-value">${e.uren}u</span><span class="kwal-box">${e.kwaliteit}</span>`;
    document.getElementById('recentList').appendChild(div);
  });
});
