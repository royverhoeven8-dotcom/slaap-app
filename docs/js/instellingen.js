/* ============================================
   SlaapTracker — instellingen.js
   Doel opslaan, herinnering, data verwijderen
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Alle inputs in instellingen
  const doelInput = document.getElementById('doelUren');
  const reminderCheck = document.getElementById('reminderCheck');
  const reminderTime = document.getElementById('reminderTime');
  const saveBtn = document.getElementById('saveDoelBtn');
  const verwijderBtn = document.getElementById('verwijderBtn');

  // Opgeslagen waardes laden
  doelInput.value = localStorage.getItem('doelUren') || '';
  reminderCheck.checked = localStorage.getItem('reminderAan') === 'true';
  reminderTime.value = localStorage.getItem('reminderTime') || '22:00';

  // Doel opslaan + feedback
  saveBtn.addEventListener('click', () => {
    localStorage.setItem('doelUren', doelInput.value);
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ Opgeslagen'; // Korte feedback dat het gelukt is
    setTimeout(() => saveBtn.textContent = originalText, 1500);
  });

  // Herinnering settings direct opslaan
  reminderCheck.addEventListener('change', e => localStorage.setItem('reminderAan', e.target.checked));
  reminderTime.addEventListener('change', e => localStorage.setItem('reminderTime', e.target.value));
  
  // Alles verwijderen (met bevestiging!)
  verwijderBtn.addEventListener('click', () => {
    if (confirm('Weet je zeker dat je alle slaapdata wilt verwijderen?')) {
      localStorage.removeItem('slaapdata');
      alert('✅ Alle gegevens zijn verwijderd.');
    }
  });
});
