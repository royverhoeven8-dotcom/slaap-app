/* ============================================
   SlaapTracker — i18n.js
   Taalswitch NL / EN
   ============================================ */

let currentLang = localStorage.getItem('lang') || 'nl';

const applyTranslations = async () => {
  const t = await fetch(`/slaap-app/locales/${currentLang}.json`).then(r => r.json());
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
};

document.addEventListener('DOMContentLoaded', async () => {
  await applyTranslations();
  document.getElementById('langToggle')?.addEventListener('click', async () => {
    currentLang = currentLang === 'nl' ? 'en' : 'nl';
    localStorage.setItem('lang', currentLang);
    await applyTranslations();
  });
});
