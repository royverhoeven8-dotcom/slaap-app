/* ============================================
   SlaapTracker — i18n.js
   Taalswitch NL / EN
   ============================================ */

// Taal opslaan in localStorage, standaard Nederlands
let currentLang = localStorage.getItem('lang') || 'nl';

const applyTranslations = async () => {
  // JSON laden van geselecteerde taal
  const t = await fetch(`/slaap-app/locales/${currentLang}.json`).then(r => r.json());
  
  // Alle elementen met data-i18n attribute vervangen met vertaalde tekst
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  
  // Taalknop updaten
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
};

// Bij laden: vertalingen toepassen
// Bij klik op taalknop: wisselen en opslaan
document.addEventListener('DOMContentLoaded', async () => {
  await applyTranslations();
  document.getElementById('langToggle')?.addEventListener('click', async () => {
    currentLang = currentLang === 'nl' ? 'en' : 'nl';
    localStorage.setItem('lang', currentLang);
    await applyTranslations();
  });
});
