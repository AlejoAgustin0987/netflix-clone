/* ─────────────────────────────────────────
   NETFLIX CLONE – app.js
   ───────────────────────────────────────── */

// ── FAQ DATA ─────────────────────────────
const faqs = [
  {
    q: "¿Qué es Netflix?",
    a: "Netflix es un servicio de entretenimiento con suscripción que permite ver series de TV, películas y otros contenidos en dispositivos con conexión a internet. Tienes acceso ilimitado a contenido por una tarifa mensual fija."
  },
  {
    q: "¿Cuánto cuesta Netflix?",
    a: "Mira Netflix en tu smartphone, tablet, Smart TV, laptop o TV en streaming, todo por una tarifa mensual fija. Los planes van desde 7,99 € a 17,99 € al mes. Sin contratos adicionales ni compromisos."
  },
  {
    q: "¿Dónde puedo ver Netflix?",
    a: "Mira Netflix donde quieras, cuando quieras, en un número ilimitado de dispositivos. Inicia sesión con tu cuenta de Netflix en netflix.com desde tu ordenador o en cualquier dispositivo con internet e internet, incluyendo Smart TV, smartphones, tablets, reproductores de medios en streaming y videoconsolas."
  },
  {
    q: "¿Cómo puedo cancelar mi suscripción?",
    a: "Netflix es flexible. No hay contratos molestos y tampoco compromisos. Puedes cancelar tu cuenta fácilmente en línea con dos clics. No hay cargos por cancelación — puedes empezar o detener tu suscripción cuando quieras."
  },
  {
    q: "¿Qué se puede ver en Netflix?",
    a: "Netflix tiene un extenso catálogo de largometrajes, documentales, series de TV, anime, producciones originales de Netflix con premios y mucho más. Mira todo lo que quieras, cuando quieras."
  },
  {
    q: "¿Netflix es adecuado para los niños?",
    a: "La experiencia de Netflix para niños está incluida en tu suscripción para que los menores puedan disfrutar de series y películas de una manera segura desde tu cuenta. El control parental de Netflix te permite restringir el acceso a contenido para adultos."
  }
];

// ── BUILD FAQ ─────────────────────────────
function buildFAQ() {
  const list = document.getElementById('faqList');
  faqs.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        ${item.q}
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region">
        <div class="faq-answer-inner">${item.a}</div>
      </div>
    `;
    el.querySelector('.faq-question').addEventListener('click', () => toggleFAQ(el));
    list.appendChild(el);
  });
}

function toggleFAQ(el) {
  const isOpen = el.classList.contains('open');
  // close all
  document.querySelectorAll('.faq-item.open').forEach(item => {
    item.classList.remove('open');
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    el.classList.add('open');
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
  }
}

// ── CTA HANDLER ──────────────────────────
function handleCTA() {
  const emails = ['email', 'email2'].map(id => document.getElementById(id)).filter(Boolean);
  const email = emails.find(el => el.value.trim()) || emails[0];
  if (!email) return;

  const val = email.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  email.style.borderColor = valid ? 'rgba(255,255,255,.85)' : '#E50914';

  if (valid) {
    showToast(`¡Genial! Continuando con ${val}…`);
  } else {
    email.focus();
    showToast('Introduce un email válido.', 'error');
  }
}

// ── TOAST ─────────────────────────────────
function showToast(msg, type = 'success') {
  let toast = document.getElementById('netflix-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'netflix-toast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '32px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: type === 'error' ? '#E50914' : '#2d2d2d',
      color: '#fff', padding: '14px 28px',
      borderRadius: '6px', fontSize: '16px',
      fontWeight: '600', zIndex: '9999',
      boxShadow: '0 4px 24px rgba(0,0,0,.6)',
      opacity: '0', transition: 'all .25s ease',
      whiteSpace: 'nowrap', pointerEvents: 'none'
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = type === 'error' ? '#E50914' : '#2d2d2d';
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3000);
}

// ── NAV SCROLL EFFECT ─────────────────────
function initNavScroll() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(0,0,0,.95)';
      nav.style.transition = 'background .3s';
    } else {
      nav.style.background = 'transparent';
    }
  }, { passive: true });
}

// ── SCROLL REVEAL ─────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll('.feature, .faq-section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
}

// ── INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildFAQ();
  initNavScroll();
  initScrollReveal();
});
