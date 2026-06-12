/* ============================================
   SlaapTracker — i18n.js
   Taalswitch NL / EN
   ============================================ */

let currentLang = localStorage.getItem('lang') || 'nl';

async function loadTranslations(lang) {
  const res = await fetch('./locales/' + lang + '.json');
  return await res.json();
}

async function applyTranslations() {
  const t = await loadTranslations(currentLang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'nl' ? 'en' : 'nl';
      localStorage.setItem('lang', currentLang);
      applyTranslations();
    });
  }
});
