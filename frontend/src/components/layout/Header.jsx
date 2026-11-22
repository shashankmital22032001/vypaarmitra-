import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { navLinks } from '../../config/site';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { WhatsAppButton } from '../ui/Button';
import { MenuIcon } from '../ui/Icons';
import { Logo } from '../ui/Logo';
import styles from './Header.module.css';

const sectionIds = navLinks.map((l) => l.id);
const DESKTOP_QUERY = '(min-width: 1024px)';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useScrollSpy(sectionIds, isHome);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Shadow once the page scrolls (one passive listener, state only changes at the threshold).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, Escape to close, close when resized to desktop.
  useEffect(() => {
    if (!open) return undefined;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onChange = (e) => e.matches && setOpen(false);

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  useEffect(close, [pathname, close]);

  const links = navLinks.map(({ id, label }) => (
    <li key={id}>
      <Link
        to={{ pathname: '/', hash: `#${id}` }}
        className={`${styles.link} ${active === id ? styles.active : ''}`}
        aria-current={active === id ? 'location' : undefined}
        onClick={close}
      >
        {label}
      </Link>
    </li>
  ));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Logo onClick={close} />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.list}>{links}</ul>
        </nav>

        <div className={styles.actions}>
          <WhatsAppButton section="header" arrow={false} className={styles.cta}>
            Get My Free Audit
          </WhatsAppButton>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        hidden={!open}
      >
        <nav className="container" aria-label="Mobile">
          <ul className={styles.mobileList}>{links}</ul>
          <WhatsAppButton section="header" block className={styles.panelCta}>
            Get My Free Audit
          </WhatsAppButton>
        </nav>
      </div>
      {open && <div className={styles.backdrop} onClick={close} aria-hidden="true" />}
    </header>
  );
}
