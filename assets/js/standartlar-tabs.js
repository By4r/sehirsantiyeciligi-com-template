// standartlar-tabs.js — desktop vertical tab, mobile accordion

export function initStandards() {
  const root = document.getElementById('standards');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.standards__tab'));
  const panels = Array.from(root.querySelectorAll('.standards__panel'));
  const mql = window.matchMedia('(max-width: 1024px)');

  function activateTab(targetId) {
    tabs.forEach(t => {
      const isMatch = t.dataset.target === targetId;
      t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      t.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
    });
    panels.forEach(p => {
      const isMatch = p.id === targetId;
      p.classList.toggle('is-active', isMatch);
      p.classList.toggle('is-open', isMatch);
    });
  }

  function toggleAccordion(targetId) {
    const tab = tabs.find(t => t.dataset.target === targetId);
    const panel = panels.find(p => p.id === targetId);
    if (!tab || !panel) return;
    const open = tab.getAttribute('aria-expanded') === 'true';
    tab.setAttribute('aria-expanded', open ? 'false' : 'true');
    panel.classList.toggle('is-open', !open);
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (mql.matches) {
        toggleAccordion(targetId);
      } else {
        activateTab(targetId);
      }
    });

    tab.addEventListener('keydown', (e) => {
      if (mql.matches) return;
      let nextIdx = null;
      if (e.key === 'ArrowDown') nextIdx = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowUp') nextIdx = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIdx = 0;
      else if (e.key === 'End') nextIdx = tabs.length - 1;
      if (nextIdx !== null) {
        e.preventDefault();
        tabs[nextIdx].focus();
        activateTab(tabs[nextIdx].dataset.target);
      }
    });
  });

  function syncForBreakpoint() {
    if (mql.matches) {
      panels.forEach(p => {
        p.classList.remove('is-active');
        p.classList.remove('is-open');
      });
      tabs.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.setAttribute('aria-selected', 'false');
      });
    } else {
      const first = tabs[0];
      if (first) activateTab(first.dataset.target);
    }
  }
  mql.addEventListener('change', syncForBreakpoint);
  syncForBreakpoint();
}
