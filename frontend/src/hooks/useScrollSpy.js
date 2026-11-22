import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently in the middle band of the viewport,
 * or '' when none is (e.g. at the top of the page, in the hero), so no menu link is highlighted.
 */
export function useScrollSpy(ids, enabled = true) {
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive('');
    if (!enabled) return undefined;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? '');
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
