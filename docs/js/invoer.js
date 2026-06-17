/* ============================================
   SlaapTracker — invoer.js
   Slaapdata invoeren en opslaan in LocalStorage
   ============================================ */

let selectedKwal = '';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('datum').valueAsDate = new Date();

  document.querySelectorAll('.kwal-btn').forEach(btn => btn.addEventListener('click', function() {
    document.querySelectorAll('.kwal-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedKwal = this.dataset.val;
  }));

  document.getElementById('saveBtn').addEventListener('click', () => {
    const datum = document.getElementById('datum').value;
    const uren = parseFloat(document.getElementById('aantalUren').value);
    const [errMsg, successMsg] = [document.getElementById('errorMsg'), document.getElementById('successMsg')];
    const isValid = datum && !isNaN(uren) && uren >= 0 && uren <= 24 && selectedKwal;

    errMsg.classList.toggle('hidden', isValid);
    errMsg.textContent = '❌ Vul alle velden correct in.';
    successMsg.classList.toggle('hidden', !isValid);

    if (!isValid) return;

    const data = JSON.parse(localStorage.getItem('slaapdata') || '[]');
    data.push({ datum, uren, kwaliteit: selectedKwal });
    localStorage.setItem('slaapdata', JSON.stringify(data));
    
    successMsg.classList.remove('hidden');
    setTimeout(() => window.location.href = 'index.html', 1000);
  });
});
