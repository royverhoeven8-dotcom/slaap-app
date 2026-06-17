/* ============================================
   SlaapTracker — instellingen.js
   Doel opslaan, herinnering, data verwijderen
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const doelInput = document.getElementById('doelUren');
  const reminderCheck = document.getElementById('reminderCheck');
  const reminderTime = document.getElementById('reminderTime');
  const saveBtn = document.getElementById('saveDoelBtn');
  const verwijderBtn = document.getElementById('verwijderBtn');

  doelInput.value = localStorage.getItem('doelUren') || '';
  reminderCheck.checked = localStorage.getItem('reminderAan') === 'true';
  reminderTime.value = localStorage.getItem('reminderTime') || '22:00';

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('doelUren', doelInput.value);
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ Opgeslagen';
    setTimeout(() => saveBtn.textContent = originalText, 1500);
  });

  reminderCheck.addEventListener('change', e => localStorage.setItem('reminderAan', e.target.checked));
  reminderTime.addEventListener('change', e => localStorage.setItem('reminderTime', e.target.value));

  verwijderBtn.addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle slaapdata wilt verwijderen?')) {
      localStorage.removeItem('slaapdata');
      alert('✅ Alle gegevens zijn verwijderd.');
    }
  });
});
