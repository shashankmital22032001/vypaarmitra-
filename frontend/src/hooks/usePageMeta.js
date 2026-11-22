import { useEffect } from 'react';
import { site } from '../config/site';

function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => (previous === null ? el.remove() : el.setAttribute(attr, previous));
}

/**
 * Per-page title, description, canonical and robots.
 * The home page keeps the static tags from index.html; other pages override them
 * and restore them when they unmount.
 */
export function usePageMeta({ title, description, path, noindex = false }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const restores = [
      setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', description),
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', `${site.url}${path}`),
    ];
    if (noindex) {
      restores.push(
        setTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }), 'content', 'noindex, follow'),
      );
    }

    return () => {
      document.title = prevTitle;
      restores.forEach((restore) => restore());
    };
  }, [title, description, path, noindex]);
}
