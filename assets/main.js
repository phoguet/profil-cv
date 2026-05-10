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

  setLang('fr');

  /* ---- Scroll progress bar ---- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / docHeight * 100) + '%';
  }, { passive: true });

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

  /* ---- Animated counters ---- */
  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 2800;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-number').forEach(el => {
    if (/^\d+/.test(el.textContent.trim())) {
      counterObserver.observe(el);
    }
  });

  /* ---- Hero particles ---- */
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const COUNT = 50;
    let particles = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.3 + 0.12,
      };
    }

    function initParticles() {
      resize();
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        /* outer glow halo */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.shadowBlur = 18;
        ctx.shadowColor = 'rgba(59,130,246,0.8)';
        ctx.fillStyle = `rgba(59,130,246,${p.alpha * 0.22})`;
        ctx.fill();

        /* bright core */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(191,219,254,0.9)';
        ctx.fillStyle = `rgba(226,239,255,${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        if (p.y < -4) p.y = canvas.height + 4;
        if (p.y > canvas.height + 4) p.y = -4;
      });
      requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', initParticles, { passive: true });
    initParticles();
    drawParticles();
  }

  /* ---- 3D tilt on photo ---- */
  const photoWrap = document.querySelector('.hero-photo-wrap');
  if (photoWrap) {
    const MAX_TILT = 16;

    photoWrap.addEventListener('mousemove', (e) => {
      const rect = photoWrap.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      photoWrap.style.transition = 'transform 0.08s ease-out';
      photoWrap.style.transform =
        `perspective(600px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg) scale(1.05)`;
    });

    photoWrap.addEventListener('mouseleave', () => {
      photoWrap.style.transition = 'transform 0.5s ease-out';
      photoWrap.style.transform = '';
    });
  }

})();
