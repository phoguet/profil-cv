/* CV Pascal Hoguet — Toggle FR/EN + Scroll Animations */

(function () {
  'use strict';

  /* ---- Language toggle ---- */
  let currentLang = 'fr';

  function setLang(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === lang ? '' : 'none';
    });

    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === lang);
    });

    document.documentElement.setAttribute('lang', lang);
  }

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.target));
  });

  /* Initial state: show FR, hide EN */
  setLang('fr');

  /* ---- Intersection Observer for reveal animations ---- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

})();
