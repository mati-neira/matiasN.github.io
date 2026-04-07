/**
 * script.js — Portfolio Interactivo
 * Autor: Ing. Civil Informática & Telecomunicaciones · UDP
 *
 * Módulos incluidos:
 *  1. Cursor personalizado
 *  2. Navbar scroll / menú mobile
 *  3. Barra de progreso de scroll (footer)
 *  4. Generador de partículas flotantes
 *  5. Animación de escritura (typewriter) en Hero
 *  6. Reveal on scroll (Intersection Observer)
 *  7. Animación de barras de habilidades
 *  8. Glitch aleatorio en el avatar
 */

/* ══════════════════════════════════════════════════
   1. CURSOR PERSONALIZADO
══════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  // El punto sigue al cursor de forma instantánea
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // El anillo sigue con suavidad (lerp)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Efecto hover al pasar sobre links/botones
  const hoverTargets = document.querySelectorAll('a, button, .card, .hex-item, .tag');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();


/* ══════════════════════════════════════════════════
   2. NAVBAR — scroll effect + menú mobile
══════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav-links');

  // Clase .scrolled para fondo más opaco
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Toggle menú hamburguesa (mobile)
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();


/* ══════════════════════════════════════════════════
   3. BARRA DE PROGRESO DE SCROLL (footer)
══════════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.querySelector('.footer-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - window.innerHeight;
    const prog   = (window.scrollY / docH) * 100;
    bar.style.width = prog + '%';
  });
})();


/* ══════════════════════════════════════════════════
   4. PARTÍCULAS FLOTANTES EN HERO
══════════════════════════════════════════════════ */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 28;
  const colors = ['#00ff88', '#00bfff', '#bf5fff', '#ff4da6'];

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    // Posición horizontal aleatoria
    p.style.left     = Math.random() * 100 + '%';
    // Tamaño variable (1-4px)
    const size       = Math.random() * 3 + 1;
    p.style.width    = size + 'px';
    p.style.height   = size + 'px';
    // Color aleatorio del tema
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    // Duración y retraso aleatorios
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';

    container.appendChild(p);
  }
})();


/* ══════════════════════════════════════════════════
   5. EFECTO DE ESCRITURA (TYPEWRITER) — Hero
══════════════════════════════════════════════════ */
(function initTypewriter() {
  const el = document.getElementById('typedCmd');
  if (!el) return;

  // Secuencia de comandos para escribir
  const cmds = [
    'whoami',
    'cat README.md',
    'git log --oneline',
    'python3 main.py',
    'sudo make portfolio',
  ];

  let cmdIdx   = 0;
  let charIdx  = 0;
  let deleting = false;

  function type() {
    const current = cmds[cmdIdx];

    if (!deleting) {
      // Escribiendo
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;

      if (charIdx === current.length) {
        // Pausa al terminar de escribir
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80 + Math.random() * 40);
    } else {
      // Borrando
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        deleting = false;
        cmdIdx = (cmdIdx + 1) % cmds.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    }
  }

  // Iniciar con un pequeño retraso
  setTimeout(type, 800);
})();


/* ══════════════════════════════════════════════════
   6. REVEAL ON SCROLL — Intersection Observer
══════════════════════════════════════════════════ */
(function initReveal() {
  const sections = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Una vez visible, dejar de observar
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  sections.forEach(s => observer.observe(s));
})();


/* ══════════════════════════════════════════════════
   7. ANIMACIÓN DE BARRAS DE HABILIDADES
   Se activa cuando la sección entra en viewport
══════════════════════════════════════════════════ */
(function initSkillBars() {
  const skillSection = document.getElementById('habilidades');
  if (!skillSection) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;

      // Pequeño retraso escalonado por cada barra
      const bars = document.querySelectorAll('.skill-fill');
      bars.forEach((bar, i) => {
        setTimeout(() => {
          const target = bar.getAttribute('data-w');
          bar.style.width = target + '%';
        }, i * 120);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(skillSection);
})();


/* ══════════════════════════════════════════════════
   8. GLITCH ALEATORIO EN NOMBRE / NAV LOGO
   Dispara el efecto glitch aleatoriamente
══════════════════════════════════════════════════ */
(function initRandomGlitch() {
  const glitchEls = document.querySelectorAll('.glitch-text');

  // El CSS ya tiene animación, pero podemos forzar
  // un "reset" del ciclo de animación aleatoriamente
  function randomGlitch() {
    glitchEls.forEach(el => {
      // Breve pausa + reinicio de animación
      el.style.animation = 'none';
      requestAnimationFrame(() => {
        el.style.animation = '';
      });
    });

    // Siguiente disparo en 4–12 segundos
    const next = 4000 + Math.random() * 8000;
    setTimeout(randomGlitch, next);
  }

  setTimeout(randomGlitch, 5000);
})();


/* ══════════════════════════════════════════════════
   9. SMOOTH SCROLL CON OFFSET (para navbar fijo)
══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const offset = 70; // altura del navbar
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ══════════════════════════════════════════════════
   10. HOVER MAGNÉTICO en botones CTA
══════════════════════════════════════════════════ */
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-primary, .btn-secondary');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ══════════════════════════════════════════════════
   11. EASTER EGG — KONAMI CODE
   Activa modo "ultra glitch" al ingresar ↑↑↓↓←→←→BA
══════════════════════════════════════════════════ */
(function initKonami() {
  const code  = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === code[idx]) {
      idx++;
      if (idx === code.length) {
        idx = 0;
        activateUltraGlitch();
      }
    } else {
      idx = 0;
    }
  });

  function activateUltraGlitch() {
    document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
    console.log('%c🎮 KONAMI CODE ACTIVADO — Ultra Glitch Mode! 🎮',
      'color: #00ff88; font-family: monospace; font-size: 14px; font-weight: bold;');
    setTimeout(() => {
      document.body.style.filter = '';
    }, 2500);
  }
})();


/* ══════════════════════════════════════════════════
   12. CONSOLE WELCOME MESSAGE (guiño a reclutadores)
══════════════════════════════════════════════════ */
console.log('%c¡Hola, reclutador curioso! 👋', 'color:#00ff88; font-size:18px; font-weight:bold; font-family:monospace;');
console.log('%cEstas revisando el código fuente de mi portfolio.', 'color:#00bfff; font-family:monospace;');
console.log('%cEso ya dice mucho de ti — y de mí. 😄', 'color:#bf5fff; font-family:monospace;');
console.log('%c© Ing. Civil Informática & Telecomunicaciones · UDP', 'color:#6e7681; font-family:monospace;');
