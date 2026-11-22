/**
 * Dismisses the start-up loader from index.html ("Dukaan se Desh tak").
 * Waits until the page and fonts are ready AND the route animation has played
 * (or the visitor presses "Skip intro" / Escape), then lifts the loader like a
 * shop shutter and removes it.
 */
const FULL_ANIMATION_MS = 5400;
const REDUCED_MOTION_MS = 1200;
const MAX_WAIT_MS = 8000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pageLoaded = () =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });

export function dismissLoader() {
  const el = document.getElementById('vm-loader');
  const root = document.documentElement;
  if (!el) {
    root.classList.remove('is-loading');
    return;
  }

  let finished = false;
  const onKey = (e) => e.key === 'Escape' && finish();

  function finish() {
    if (finished) return;
    finished = true;
    document.removeEventListener('keydown', onKey);
    el.classList.add('is-leaving');
    // Hero entrance animations are paused while this class is on <html>.
    root.classList.remove('is-loading');
    if (!window.location.hash) window.scrollTo(0, 0);
    window.setTimeout(() => el.remove(), 1400);
  }

  el.querySelector('.vml-skip')?.addEventListener('click', finish);
  document.addEventListener('keydown', onKey);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minMs = reduced ? REDUCED_MOTION_MS : FULL_ANIMATION_MS;
  const ready = Promise.race([Promise.all([pageLoaded(), document.fonts?.ready]), wait(MAX_WAIT_MS)]);
  const minimum = wait(Math.max(0, minMs - performance.now()));

  Promise.all([ready, minimum]).then(finish);
}
