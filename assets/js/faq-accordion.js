// faq-accordion.js — ARIA, klavye, prefers-reduced-motion uyumlu

export function initFaq() {
  const root = document.getElementById('faq');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.faq__item'));
  const questions = items.map(it => it.querySelector('.faq__q'));

  function toggle(q) {
    const open = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', open ? 'false' : 'true');
    const ansId = q.getAttribute('aria-controls');
    const ans = document.getElementById(ansId);
    if (ans) ans.classList.toggle('is-open', !open);
  }

  questions.forEach((q, idx) => {
    q.addEventListener('click', () => toggle(q));
    q.addEventListener('keydown', (e) => {
      let nextIdx = null;
      if (e.key === 'ArrowDown') nextIdx = (idx + 1) % questions.length;
      else if (e.key === 'ArrowUp') nextIdx = (idx - 1 + questions.length) % questions.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = questions.length - 1;
      if (nextIdx !== null) {
        e.preventDefault();
        questions[nextIdx].focus();
      }
    });
  });
}
