/* ============================================
   SlaapTracker — invoer.js
   Slaapdata invoeren en opslaan in LocalStorage
   ============================================ */

let selectedKwal = ''; // Welke kwaliteit is geselecteerd?

document.addEventListener('DOMContentLoaded', () => {
  // Datum standaard op vandaag
  document.getElementById('datum').valueAsDate = new Date();

  // Kwaliteit buttons - radio-achtig gedrag
  document.querySelectorAll('.kwal-btn').forEach(btn => btn.addEventListener('click', function() {
    document.querySelectorAll('.kwal-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedKwal = this.dataset.val; // Opslaan welke geselecteerd is
  }));

  // Opslaan button
  document.getElementById('saveBtn').addEventListener('click', () => {
    const datum = document.getElementById('datum').value;
    const uren = parseFloat(document.getElementById('aantalUren').value);
    // Check: datum ingevuld, uren tussen 0-24, kwaliteit geselecteerd
    const isValid = datum && !isNaN(uren) && uren >= 0 && uren <= 24 && selectedKwal;
    const errMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    errMsg.classList.toggle('hidden', isValid); // Foutbericht alleen tonen als niet valid
    successMsg.classList.toggle('hidden', !isValid);

    if (!isValid) return; // Niet opslaan als fout

    // Entry toevoegen aan array en terugsave naar localStorage
    const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
    data.push({ datum, uren, kwaliteit: selectedKwal });
    localStorage.setItem('slaapdata', JSON.stringify(data));
    
    successMsg.classList.remove('hidden');
    // Even wachten zodat user het succes ziet
    setTimeout(() => window.location.href = 'index.html', 1000);
  });
});
