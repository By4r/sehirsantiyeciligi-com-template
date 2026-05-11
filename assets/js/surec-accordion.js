export function initSurecAccordion() {
  document.querySelectorAll('[data-process-accordion]').forEach((root) => {
    const steps = Array.from(root.querySelectorAll('.process__step'));
    steps.forEach((step) => {
      step.addEventListener('click', () => {
        steps.forEach((s) => s.removeAttribute('data-open'));
        step.setAttribute('data-open', 'true');
      });
    });
  });
}
