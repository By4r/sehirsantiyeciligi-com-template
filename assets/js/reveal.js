// reveal.js — IntersectionObserver based staggered fade-in.
// Stagger scoped per parent group (not globally), so cards in the same row
// animate with consistent timing regardless of scroll position.
// Honors prefers-reduced-motion.

export function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const SELECTOR = '.section-overline, .section-header h2, .section-header .lead, .card, .proj-card, .doc-card, .process__step, .blog-teaser, .ext-editorial, .ext-card, .hero__inner > *';
  const STAGGER_MS = 70;
  const STAGGER_CAP = 4;

  const targets = document.querySelectorAll(SELECTOR);
  targets.forEach((el) => {
    el.classList.add('reveal');
    const parent = el.parentElement;
    if (!parent) return;
    const siblings = Array.from(parent.children).filter(c => c.matches(SELECTOR));
    const idx = siblings.indexOf(el);
    if (idx > 0) {
      el.style.transitionDelay = `${Math.min(idx, STAGGER_CAP) * STAGGER_MS}ms`;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(t => observer.observe(t));
}
