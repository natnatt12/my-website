/* ─── HERO ENTRANCE (staggered on load) ─── */
document.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero .fade-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 120 + i * 130);
  });
});

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => navObserver.observe(s));

/* ─── MOBILE NAV TOGGLE ─── */
const toggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
});

navLinksEl.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

/* ─── SMOOTH SCROLL (fallback for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── STAGGER REVEAL FOR SIBLING GROUPS ─── */
const staggerGroups = [
  '.grid-images .placeholder-img',
  '.slides-row .placeholder-img',
  '.skills-grid .skill-col',
  '.contact-list .contact-item',
];

staggerGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });
});
