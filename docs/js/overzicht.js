/* ============================================
   SlaapTracker — overzicht.js
   Statistieken en alle nachten weergeven
   ============================================ */

// Kwaliteit labels en kleuren voor grafiek
const CHART_LABELS = ['Slecht', 'Matig', 'Goed', 'Uitstekend'];
const CHART_COLORS = { Slecht: '#f25f5c', Matig: '#f4a261', Goed: '#2a9d8f', Uitstekend: '#264653' };

// Taartdiagram tekenen met Canvas
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
  const cx = width / 2;
  const cy = height / 2;

  CHART_LABELS.forEach(label => {
    const value = counts[label] || 0;
    if (!value) return;
    const sliceAngle = (value / total) * 2 * Math.PI;
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
  ctx.arc(cx, cy, radius * 0.55, 0, 2 * Math.PI);
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
  const counts = Object.fromEntries(CHART_LABELS.map(label => [label, data.filter(entry => entry.kwaliteit === label).length]));

  document.getElementById('kwalVerdeling').innerHTML = CHART_LABELS.filter(label => counts[label]).map(label => 
    `<div class="verdeling-item"><span class="kwal-box">${label}</span><span class="label-box">${counts[label]}x (${Math.round((counts[label] / total) * 100)}%)</span></div>`
  ).join('');

  const canvas = document.getElementById('kwaliteitChart');
  const legend = document.getElementById('kwalLegenda');
  if (canvas && legend) {
    drawPieChart(canvas, counts);
    renderLegend(legend, counts, total);
  }
};

const deleteDay = datum => {
  if (!confirm('Weet je zeker dat je deze dag wilt verwijderen?')) return;
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]').filter(entry => entry.datum !== datum);
  localStorage.setItem('slaapdata', JSON.stringify(data));
  updateOverview();
};

const renderAlleNachten = data => {
  document.getElementById('alleNachten').innerHTML = [...data]
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .map(entry => `
      <div class="nacht-item">
        <div class="nacht-info">
          <span class="nacht-datum">${entry.datum}</span>
          <span class="nacht-uren">${entry.uren}u</span>
          <span class="nacht-kwal">${entry.kwaliteit}</span>
        </div>
        <button class="delete-btn" type="button" onclick="deleteDay('${entry.datum}')">Verwijderen</button>
      </div>
    `).join('');
};

const updateOverview = () => {
  const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
  const avg = data.length ? (data.reduce((sum, entry) => sum + entry.uren, 0) / data.length).toFixed(1) + 'u' : '–';

  document.getElementById('totaalNachten').textContent = data.length;
  document.getElementById('gemiddeldUren').textContent = avg;

  renderKwaliteitVerdeeld(data);
  renderAlleNachten(data);
};

document.addEventListener('DOMContentLoaded', updateOverview);
window.addEventListener('storage', updateOverview);
