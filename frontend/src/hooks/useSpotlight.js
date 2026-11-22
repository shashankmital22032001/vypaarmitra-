import { useEffect } from 'react';

/**
 * One document-level listener that feeds the cursor position (--mx / --my) to the
 * hovered [data-spotlight] card, so a gold glow follows the pointer (see base.css).
 */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      const card = last?.target instanceof Element ? last.target.closest('[data-spotlight]') : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${last.clientX - rect.left}px`);
      card.style.setProperty('--my', `${last.clientY - rect.top}px`);
    };

    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
    };
  }, []);
}
