import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { initAnalytics } from './lib/analytics';
import { dismissLoader } from './lib/loader';
import './styles/tokens.css';
import './styles/base.css';

// Always open at the top. The browser would otherwise restore the old scroll position on reload,
// and a #section left in the URL by a menu click would jump there again. A shared link such as
// vypaarmitra.com/#faq still works on a fresh visit; only reloads drop the hash.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
const navigation = performance.getEntriesByType?.('navigation')[0];
if (navigation?.type === 'reload' && window.location.hash) {
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

dismissLoader();
initAnalytics();
