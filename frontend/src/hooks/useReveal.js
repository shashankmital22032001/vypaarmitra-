import { useEffect } from 'react';

/**
 * Reveals every [data-reveal] element inside `ref` once it scrolls into view.
 * One IntersectionObserver per page; each element is unobserved after it appears.
 * Optional data-reveal-delay="120" staggers siblings.
 */
export function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('[data-reveal]:not(.is-visible)');
    targets.forEach((el) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past (e.g. landing on /#faq).
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}
