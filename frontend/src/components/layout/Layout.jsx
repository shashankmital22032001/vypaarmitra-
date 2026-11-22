import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import ChatWidget from './ChatWidget';
import FloatingWhatsApp from './FloatingWhatsApp';
import Footer from './Footer';
import Header from './Header';
import { useSpotlight } from '../../hooks/useSpotlight';
import MobileCtaBar from './MobileCtaBar';
import ScrollProgress from './ScrollProgress';
import TopBar from './TopBar';
import styles from './Layout.module.css';

/** Scrolls to #hash after navigation (also across pages), otherwise to the top. */
function useScrollOnNavigate() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    let frame;
    let tries = 0;
    const id = decodeURIComponent(hash.slice(1));
    // The target may still be loading (lazy page), so retry for a few frames.
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
      else if (tries++ < 30) frame = requestAnimationFrame(attempt);
    };
    attempt();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
}

export default function Layout() {
  useScrollOnNavigate();
  useSpotlight();

  return (
    <div className={styles.shell}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Suspense fallback={<div className={styles.fallback} aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ChatWidget />
      <MobileCtaBar />
    </div>
  );
}
