/* ============================================
   SlaapTracker — overzicht.js
   Statistieken en alle nachten weergeven
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');

  // Totaal nachten
  document.getElementById('totaalNachten').textContent = data.length;

  if (data.length === 0) return;

  // Gemiddeld aantal uren
  const gem = (data.reduce((s, e) => s + e.uren, 0) / data.length).toFixed(1);
  document.getElementById('gemiddeldUren').textContent = gem + 'u';

  // Kwaliteit verdeling
  const telling = {};
  data.forEach(e => {
    telling[e.kwaliteit] = (telling[e.kwaliteit] || 0) + 1;
  });
  const verdelingEl = document.getElementById('kwalVerdeling');
  Object.entries(telling).forEach(([kwal, aantal]) => {
    const pct = Math.round((aantal / data.length) * 100);
    const div = document.createElement('div');
    div.className = 'verdeling-item';
    div.innerHTML =
      '<span class="kwal-box">' + kwal + '</span>' +
      '<span class="label-box">' + aantal + 'x (' + pct + '%)</span>';
    verdelingEl.appendChild(div);
  });

  // Alle nachten gesorteerd (nieuwste eerst)
  const alleEl = document.getElementById('alleNachten');
  [...data]
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .forEach(e => {
      const div = document.createElement('div');
      div.className = 'nacht-item';
      div.innerHTML =
        '<span class="datum-box">' + e.datum + '</span>' +
        '<span class="mid-value">' + e.uren + 'u</span>' +
        '<span class="kwal-box">' + e.kwaliteit + '</span>';
      alleEl.appendChild(div);
    });
});
