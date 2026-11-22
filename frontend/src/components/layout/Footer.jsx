import { Link } from 'react-router';
import { navLinks, site } from '../../config/site';
import { footer } from '../../data/content';
import { trackCta } from '../../lib/analytics';
import { whatsappUrl } from '../../lib/whatsapp';
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../ui/Icons';
import { Logo } from '../ui/Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo onDark />
          <p className={`label ${styles.tagline}`}>{footer.tagline}</p>
          <p className={styles.description}>{footer.description}</p>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className={styles.heading}>
            Links
          </h2>
          <ul className={styles.list}>
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <Link to={{ pathname: '/', hash: `#${id}` }} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy-policy" className={styles.link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className={styles.link}>
                Terms
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a
                href={whatsappUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={() => trackCta('general', 'footer')}
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <InstagramIcon /> Instagram {site.instagram.handle}
              </a>
            </li>
            {site.phoneDisplay && (
              <li>
                <a href={`tel:+91${site.whatsappNumber}`} className={styles.link}>
                  <PhoneIcon /> Call {site.phoneDisplay}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className={styles.link}>
                <MailIcon /> {site.email}
              </a>
            </li>
            <li className={styles.link}>
              <PinIcon /> {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
