/* ============================================
   SlaapTracker — overzicht.js
   Statistieken en alle nachten weergeven
   ============================================ */

const CHART_LABELS = ['Slecht', 'Matig', 'Goed', 'Uitstekend'];
const CHART_COLORS = { Slecht: '#f25f5c', Matig: '#f4a261', Goed: '#2a9d8f', Uitstekend: '#264653' };

const drawPieChart = (canvas, counts) => {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const total = CHART_LABELS.reduce((sum, label) => sum + (counts[label] || 0), 0);
  ctx.clearRect(0, 0, width, height);

  if (!total) {
    ctx.fillStyle = '#888';
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Geen data beschikbaar', width / 2, height / 2);
    return;
  }

  let angle = -0.5 * Math.PI;
  const radius = Math.min(width, height) / 2 - 16;
  const cx = width / 2, cy = height / 2;

  CHART_LABELS.forEach(label => {
    const value = counts[label] || 0;
    if (!value) return;
    const sliceAngle = (value / total) * Math.PI * 2;
    ctx.fillStyle = CHART_COLORS[label];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    angle += sliceAngle;
  });

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1a2e';
  ctx.font = '700 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${total} nachten`, cx, cy + 8);
};

const renderLegend = (container, counts, total) => {
  container.innerHTML = CHART_LABELS.map(label => {
    const value = counts[label] || 0;
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return `<div class="chart-legend-item"><span class="chart-legend-color" style="background:${CHART_COLORS[label]}"></span><span>${label} — ${value}x (${pct}%)</span></div>`;
  }).join('');
};

const renderKwaliteitVerdeeld = data => {
  const total = data.length;
  const counts = Object.fromEntries(CHART_LABELS.map(l => [l, data.filter(e => e.kwaliteit === l).length]));
  document.getElementById('kwalVerdeling').innerHTML = CHART_LABELS.filter(l => counts[l]).map(l => 
    `<div class="verdeling-item"><span class="kwal-box">${l}</span><span class="label-box">${counts[l]}x (${Math.round((counts[l] / total) * 100)}%)</span></div>`
  ).join('');
  drawPieChart(document.getElementById('kwaliteitChart'), counts);
  renderLegend(document.getElementById('kwalLegenda'), counts, total);
};

const deleteDay = datum => {
  if (!confirm('Weet je zeker dat je deze dag wilt verwijderen?')) return;
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]').filter(e => e.datum !== datum);
  localStorage.setItem('slaapdata', JSON.stringify(data));
  updateOverview();
};

const renderAlleNachten = data => {
  document.getElementById('alleNachten').innerHTML = [...data]
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .map(e => `<div class="nacht-item"><span class="datum-box">${e.datum}</span><span class="mid-value">${e.uren}u</span><span class="kwal-box">${e.kwaliteit}</span><button class="delete-btn" onclick="deleteDay('${e.datum}')">✕</button></div>`)
    .join('');
};

const updateOverview = () => {
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
  const avg = data.length ? (data.reduce((s, e) => s + e.uren, 0) / data.length).toFixed(1) + 'u' : '–';
  document.getElementById('totaalNachten').textContent = data.length;
  document.getElementById('gemiddeldUren').textContent = avg;
  renderKwaliteitVerdeeld(data);
  renderAlleNachten(data);
};

document.addEventListener('DOMContentLoaded', updateOverview);
window.addEventListener('storage', updateOverview);
