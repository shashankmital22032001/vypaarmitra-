import { site } from '../config/site';

let gaLoaded = false;

/** Loads GA4 after the page is idle so it never competes with first paint. */
export function initAnalytics() {
  if (gaLoaded || !site.gaId || typeof window === 'undefined') return;
  gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // GA4 expects the raw arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', site.gaId);

  const load = () => {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
    document.head.appendChild(s);
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 3000 });
  else setTimeout(load, 1500);
}

/**
 * Fires "audit_cta_click" to GA4 and to our own API.
 * sendBeacon survives the page switching to WhatsApp.
 */
export function trackCta(pkg, section) {
  const payload = { package: pkg, section, path: window.location.pathname };

  window.gtag?.('event', 'audit_cta_click', { package: pkg, section });

  const body = JSON.stringify(payload);
  const url = `${site.apiUrl}/api/events`;
  try {
    if (!navigator.sendBeacon?.(url, body)) {
      fetch(url, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
    }
  } catch {
    /* Tracking must never break a click. */
  }
}
