/* ============================================
   SlaapTracker — invoer.js
   Slaapdata invoeren en opslaan in LocalStorage
   ============================================ */

let selectedKwal = '';

document.addEventListener('DOMContentLoaded', () => {
  // Datum standaard op vandaag
  document.getElementById('datum').valueAsDate = new Date();

  // Kwaliteit knoppen
  document.querySelectorAll('.kwal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.kwal-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedKwal = btn.dataset.val;
    });
  });

  // Opslaan knop
  document.getElementById('saveBtn').addEventListener('click', () => {
    const datum = document.getElementById('datum').value;
    const uren = parseFloat(document.getElementById('aantalUren').value);
    const errMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    // Validatie
    if (!datum || isNaN(uren) || uren < 0 || uren > 24 || !selectedKwal) {
      errMsg.textContent = '❌ Vul alle velden correct in.';
      errMsg.classList.remove('hidden');
      successMsg.classList.add('hidden');
      return;
    }

    errMsg.classList.add('hidden');

    // Opslaan in LocalStorage
    const entry = { datum, uren, kwaliteit: selectedKwal };
    const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
    data.push(entry);
    localStorage.setItem('slaapdata', JSON.stringify(data));
    console.log('Opgeslagen:', data);

    // Succes tonen en doorsturen naar index
    successMsg.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
});
