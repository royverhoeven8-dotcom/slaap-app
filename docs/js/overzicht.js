/* ============================================
   SlaapTracker — overzicht.js
   Statistieken en alle nachten weergeven
   ============================================ */

const CHART_LABELS = ['Slecht', 'Matig', 'Goed', 'Uitstekend'];
const CHART_COLORS = {
  Slecht: '#f25f5c',
  Matig: '#f4a261',
  Goed: '#2a9d8f',
  Uitstekend: '#264653'
};

function drawPieChart(canvas, counts) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const total = CHART_LABELS.reduce((sum, label) => sum + (counts[label] || 0), 0);

  if (total === 0) {
    ctx.fillStyle = '#888';
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Geen data beschikbaar', width / 2, height / 2);
    return;
  }

  let startAngle = -0.5 * Math.PI;
  const radius = Math.min(width, height) / 2 - 16;

  CHART_LABELS.forEach(label => {
    const value = counts[label] || 0;
    if (value === 0) return;
    const sliceAngle = (value / total) * Math.PI * 2;
    ctx.fillStyle = CHART_COLORS[label];
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(width / 2, height / 2, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();
    startAngle += sliceAngle;
  });

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, radius * 0.55, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1a1a2e';
  ctx.font = '700 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(total + ' nachten', width / 2, height / 2 + 8);
}

function renderLegend(container, counts, total) {
  container.innerHTML = '';
  CHART_LABELS.forEach(label => {
    const value = counts[label] || 0;
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    const item = document.createElement('div');
    item.className = 'chart-legend-item';
    item.innerHTML =
      '<span class="chart-legend-color" style="background:' + CHART_COLORS[label] + '"></span>' +
      '<span>' + label + ' — ' + value + 'x (' + percentage + '%)</span>';
    container.appendChild(item);
  });
}

function renderKwaliteitVerdeeld(data) {
  const telling = CHART_LABELS.reduce((obj, label) => {
    obj[label] = 0;
    return obj;
  }, {});
  data.forEach(entry => {
    if (CHART_LABELS.includes(entry.kwaliteit)) {
      telling[entry.kwaliteit] += 1;
    }
  });

  const verdelingEl = document.getElementById('kwalVerdeling');
  verdelingEl.innerHTML = '';
  const total = data.length;

  if (total === 0) {
    verdelingEl.innerHTML = '<div class="empty-state">Geen slaapdata beschikbaar</div>';
  } else {
    CHART_LABELS.forEach(label => {
      const value = telling[label];
      if (value === 0) return;
      const pct = Math.round((value / total) * 100);
      const div = document.createElement('div');
      div.className = 'verdeling-item';
      div.innerHTML =
        '<span class="kwal-box">' + label + '</span>' +
        '<span class="label-box">' + value + 'x (' + pct + '%)</span>';
      verdelingEl.appendChild(div);
    });
  }

  const canvas = document.getElementById('kwaliteitChart');
  drawPieChart(canvas, telling);

  const legend = document.getElementById('kwalLegenda');
  renderLegend(legend, telling, total);
}

function getSleepData() {
  const raw = localStorage.getItem('slaapdata');
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(entry => ({
      datum: entry.datum || '',
      uren: Number(entry.uren) || 0,
      kwaliteit: entry.kwaliteit || ''
    }));
  } catch (error) {
    console.warn('Ongeldige slaapdata in localStorage, reset naar lege lijst.', error);
    localStorage.removeItem('slaapdata');
    return [];
  }
}

function renderAlleNachten(data) {
  const alleEl = document.getElementById('alleNachten');
  alleEl.innerHTML = '';
  if (data.length === 0) {
    alleEl.innerHTML = '<div class="empty-state">Geen nachten om te tonen</div>';
    return;
  }

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
}

function updateOverview() {
  const data = getSleepData();

  document.getElementById('totaalNachten').textContent = data.length;
  document.getElementById('gemiddeldUren').textContent = data.length === 0
    ? '–'
    : (data.reduce((sum, entry) => sum + entry.uren, 0) / data.length).toFixed(1) + 'u';

  renderKwaliteitVerdeeld(data);
  renderAlleNachten(data);
}

document.addEventListener('DOMContentLoaded', () => {
  updateOverview();
});

window.addEventListener('storage', event => {
  if (event.key === 'slaapdata' || event.key === null) {
    updateOverview();
  }
});
