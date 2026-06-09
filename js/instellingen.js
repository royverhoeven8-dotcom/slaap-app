/* ============================================
   SlaapTracker — instellingen.js
   Doel opslaan, herinnering, data verwijderen
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Doel uren laden
  const opgeslagenDoel = localStorage.getItem('doelUren');
  if (opgeslagenDoel) {
    document.getElementById('doelUren').value = opgeslagenDoel;
  }

  // Herinnering laden
  const reminderAan = localStorage.getItem('reminderAan') === 'true';
  const reminderTijd = localStorage.getItem('reminderTime') || '22:00';
  document.getElementById('reminderCheck').checked = reminderAan;
  document.getElementById('reminderTime').value = reminderTijd;

  // Doel opslaan
  document.getElementById('saveDoelBtn').addEventListener('click', () => {
    const val = document.getElementById('doelUren').value;
    localStorage.setItem('doelUren', val);
    const btn = document.getElementById('saveDoelBtn');
    btn.textContent = '✅ Opgeslagen';
    setTimeout(() => {
      btn.textContent = btn.getAttribute('data-i18n') === 'btn_opslaan_doel'
        ? (localStorage.getItem('lang') === 'en' ? 'Save' : 'Opslaan')
        : 'Opslaan';
    }, 1500);
  });

  // Herinnering opslaan bij wijziging
  document.getElementById('reminderCheck').addEventListener('change', e => {
    localStorage.setItem('reminderAan', e.target.checked);
  });
  document.getElementById('reminderTime').addEventListener('change', e => {
    localStorage.setItem('reminderTime', e.target.value);
  });

  // Verwijder alle gegevens
  document.getElementById('verwijderBtn').addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle slaapdata wilt verwijderen?')) {
      localStorage.removeItem('slaapdata');
      alert('✅ Alle gegevens zijn verwijderd.');
    }
  });
});
