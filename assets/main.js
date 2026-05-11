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

  /* ---- Chatbot widget ---- */
  (function () {
    /* STATE */
    let chatHistory = [];
    let chatLoading = false;

    /* DOM refs */
    const chatPanel  = document.getElementById('chat-panel');
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose  = document.getElementById('chat-close');
    const chatInput  = document.getElementById('chat-input');
    const chatSend   = document.getElementById('chat-send');
    const chatMsgs   = document.getElementById('chat-messages');

    if (!chatPanel || !chatToggle || !chatClose || !chatInput || !chatSend || !chatMsgs) return;

    /* HELPER: append a message bubble */
    function appendMessage(role, text, extraClass) {
      const div = document.createElement('div');
      div.classList.add('chat-msg', role);
      if (extraClass) div.classList.add(extraClass);
      div.textContent = text;
      chatMsgs.appendChild(div);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
      return div;
    }

    /* HELPER: read active language from the DOM (setLang sets document.documentElement.lang) */
    function getActiveLang() {
      return document.documentElement.lang || 'fr';
    }

    /* HELPER: sync input placeholder with current language */
    function syncPlaceholder() {
      const lang = getActiveLang();
      const key = lang === 'en' ? 'placeholderEn' : 'placeholderFr';
      const value = chatInput.dataset[key] || chatInput.getAttribute('data-placeholder-' + lang);
      if (value) chatInput.placeholder = value;
    }

    /* INIT */
    syncPlaceholder();

    const welcomeFr = `Bonjour ! Je suis l'assistant IA de Pascal Hoguet. Je peux répondre à vos questions sur son parcours et ses compétences.`;
    const welcomeEn = `Hello! I'm Pascal Hoguet's AI assistant. I can answer questions about his background and skills.`;
    appendMessage('bot', getActiveLang() === 'en' ? welcomeEn : welcomeFr);

    /* OPEN / CLOSE */
    chatToggle.addEventListener('click', () => {
      const isOpen = chatPanel.classList.toggle('open');
      if (isOpen) chatInput.focus();
    });

    chatClose.addEventListener('click', () => {
      chatPanel.classList.remove('open');
    });

    /* SYNC PLACEHOLDER when lang toggle changes — second independent listener */
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        /* setLang() runs first (registered earlier), so currentLang is already updated */
        syncPlaceholder();
      });
    });

    /* SEND MESSAGE */
    async function sendChatMessage() {
      if (!chatInput || chatLoading) return;
      const userText = chatInput.value.trim();
      if (!userText) return;

      /* Session limit check */
      const count = parseInt(sessionStorage.getItem('chat_msg_count') || '0', 10);
      if (count >= 10) {
        appendMessage('bot', getActiveLang() === 'en'
          ? 'Session ended. For more information, contact Pascal directly.'
          : 'Session terminée. Pour en savoir plus, contactez Pascal directement.');
        chatSend.disabled = true;
        chatInput.disabled = true;
        return;
      }

      const lang = getActiveLang();

      /* Append user bubble */
      appendMessage('user', userText);
      chatInput.value = '';

      /* Set loading state */
      chatLoading = true;
      chatSend.disabled = true;

      /* Typing indicator */
      const typingDiv = appendMessage('bot', '…', 'typing');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            language: lang,
            history: chatHistory.slice(-6),
          }),
        });

        typingDiv.remove();

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            appendMessage('bot', data.reply);
            chatHistory.push({ role: 'user', content: userText });
            chatHistory.push({ role: 'assistant', content: data.reply });
            sessionStorage.setItem('chat_msg_count', String(count + 1));
          } else {
            throw new Error('no reply');
          }
        } else {
          if (typingDiv.parentNode) typingDiv.remove();
          const errMsg = res.status === 429
            ? (lang === ‘en’
                ? ‘Too many requests. Please try again in an hour.’
                : ‘Trop de requêtes. Réessayez dans une heure.’)
            : (lang === ‘en’
                ? ‘An error occurred. Please try again in a moment.’
                : "Une erreur s’est produite. Réessayez dans un instant.");
          appendMessage(‘bot’, errMsg);
          return;
        }
      } catch (_err) {
        /* Remove typing indicator if still present */
        if (typingDiv.parentNode) typingDiv.remove();
        const errMsg = lang === ‘en’
          ? ‘An error occurred. Please try again in a moment.’
          : "Une erreur s’est produite. Réessayez dans un instant.";
        appendMessage(‘bot’, errMsg);
      } finally {
        chatLoading = false;
        chatSend.disabled = false;
        chatMsgs.scrollTop = chatMsgs.scrollHeight;
      }
    }

    /* EVENT LISTENERS */
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendChatMessage();
      }
    });
  })();

})();
