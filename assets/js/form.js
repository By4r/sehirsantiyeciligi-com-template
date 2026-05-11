// form.js — KVKK zorunlu validation, client-side. Faz 1'de submit no-op (mailto fallback).

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');

  function setFieldInvalid(input, invalid) {
    const field = input.closest('.field');
    if (field) field.classList.toggle('field--invalid', invalid);
  }

  function validate() {
    let firstInvalid = null;
    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
      let invalid = false;
      if (input.type === 'checkbox') {
        invalid = !input.checked;
      } else {
        invalid = !input.value.trim() || (input.checkValidity && !input.checkValidity());
      }
      setFieldInvalid(input, invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    });
    return firstInvalid;
  }

  form.addEventListener('input', (e) => {
    const t = e.target;
    if (t.matches('[required]')) {
      const field = t.closest('.field');
      if (field && field.classList.contains('field--invalid')) {
        let valid = false;
        if (t.type === 'checkbox') valid = t.checked;
        else valid = t.value.trim() && (!t.checkValidity || t.checkValidity());
        if (valid) field.classList.remove('field--invalid');
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'form__status';
    status.textContent = '';

    const invalid = validate();
    if (invalid) {
      status.className = 'form__status is-error';
      status.textContent = 'Lütfen zorunlu alanları kontrol edin.';
      invalid.focus();
      return;
    }

    // Faz 1: gerçek submit yok. mailto fallback ile e-posta uygulaması aç.
    const data = new FormData(form);
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (k === 'kvkk') continue;
      if (v) lines.push(`${k}: ${v}`);
    }
    const subject = encodeURIComponent('Şehir Şantiyeciliği — Bilgi Talebi');
    const body = encodeURIComponent(lines.join('\n'));
    const mailto = `mailto:info@sehirsantiyeciligi.com?subject=${subject}&body=${body}`;

    status.className = 'form__status is-success';
    status.textContent = 'Form alındı. E-posta uygulamanız açılıyor…';
    window.setTimeout(() => { window.location.href = mailto; }, 200);
  });
}
