// Drag-to-scroll with velocity-based momentum (inertia)
// Pointer-based, framerate-independent. After a flick, the slider glides
// with exponential decay until friction kills the velocity.

// Tuned to match iOS / native momentum scrolling feel:
//   v(t) = v0 * exp(-k*t)   with k = FRICTION_PER_SEC
// At k=1.2 the velocity halves every ~580ms — long, natural glide.
const FRICTION_PER_SEC = 1.2;
const MIN_VELOCITY = 20;       // px/s — below this momentum stops
const SAMPLE_WINDOW = 150;     // ms window for velocity estimation
const VELOCITY_BOOST = 1.25;   // release kick for "snappier" feel
const MAX_VELOCITY = 6000;     // safety clamp px/s

const SELECTORS = [
  '.proj-slider',
  '.icon-strip',
  '.post-tags',
];

export function initDragSlider() {
  const seen = new Set();
  SELECTORS.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      initOne(el);
    });
  });
  document.querySelectorAll('.grid').forEach((el) => {
    if (seen.has(el)) return;
    if (el.querySelector(':scope > .proj-card, :scope > .doc-card, :scope > .card--problem')) {
      seen.add(el);
      initOne(el);
    }
  });
}

function initOne(slider) {
  // Short sliders (e.g. tag chips) feel snappier with a quicker decay
  // and a stronger release kick. Detected by total scrollable distance.
  const isCompact = slider.classList.contains('post-tags');
  const friction = isCompact ? 2.4 : FRICTION_PER_SEC;
  const boost = isCompact ? 1.5 : VELOCITY_BOOST;

  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let velocity = 0;          // px/s
  let moved = 0;
  let rafId = 0;
  let lastFrameT = 0;
  let samples = [];

  const cancelMomentum = () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
  };

  const step = (now) => {
    const dt = Math.min((now - lastFrameT) / 1000, 0.05); // cap to 50ms
    lastFrameT = now;
    slider.scrollLeft -= velocity * dt;
    // Exponential decay: v(t+dt) = v(t) * exp(-k*dt)
    velocity *= Math.exp(-friction * dt);

    // Stop at boundaries
    const max = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft <= 0 || slider.scrollLeft >= max) {
      slider.classList.remove('is-dragging');
      rafId = 0;
      return;
    }
    if (Math.abs(velocity) < MIN_VELOCITY) {
      slider.classList.remove('is-dragging');
      rafId = 0;
      return;
    }
    rafId = requestAnimationFrame(step);
  };

  slider.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    if (slider.scrollWidth <= slider.clientWidth + 2) return;
    cancelMomentum();
    isDown = true;
    moved = 0;
    startX = e.clientX;
    startScroll = slider.scrollLeft;
    samples = [{ x: e.clientX, t: performance.now() }];
    velocity = 0;
    slider.setPointerCapture(e.pointerId);
    slider.classList.add('is-dragging');
  });

  slider.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    moved = Math.abs(dx);
    slider.scrollLeft = startScroll - dx;

    const now = performance.now();
    samples.push({ x: e.clientX, t: now });
    while (samples.length > 2 && now - samples[0].t > SAMPLE_WINDOW) samples.shift();
  });

  const release = () => {
    if (!isDown) return;
    isDown = false;

    // Estimate release velocity from sample window (px/s)
    if (samples.length >= 2) {
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = last.t - first.t;
      if (dt > 8) {
        velocity = ((last.x - first.x) / dt) * 1000 * boost;
        if (velocity > MAX_VELOCITY) velocity = MAX_VELOCITY;
        if (velocity < -MAX_VELOCITY) velocity = -MAX_VELOCITY;
      }
    }

    if (moved > 6) {
      const blocker = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
      slider.addEventListener('click', blocker, { capture: true, once: true });
    }

    if (Math.abs(velocity) > MIN_VELOCITY) {
      lastFrameT = performance.now();
      rafId = requestAnimationFrame(step);
    } else {
      slider.classList.remove('is-dragging');
    }
  };

  slider.addEventListener('pointerup', release);
  slider.addEventListener('pointercancel', release);
  slider.addEventListener('pointerleave', release);
  slider.addEventListener('wheel', cancelMomentum, { passive: true });
}
