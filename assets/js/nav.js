// nav.js — sticky shrink, mobile toggle, scroll-spy active anchor

export function initNav() {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (toggle && nav) {
    const openIcon = toggle.querySelector('.ico-open');
    const closeIcon = toggle.querySelector('.ico-close');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
      if (openIcon && closeIcon) {
        openIcon.style.display = open ? 'none' : '';
        closeIcon.style.display = open ? '' : 'none';
      }
    });

    nav.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (openIcon && closeIcon) {
          openIcon.style.display = '';
          closeIcon.style.display = 'none';
        }
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const targets = navLinks
    .map(a => {
      const id = a.getAttribute('href').slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            const match = a.getAttribute('href') === `#${id}`;
            a.classList.toggle('is-active', match);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    targets.forEach(t => observer.observe(t));
  }
}
