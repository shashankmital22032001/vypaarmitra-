import { trackCta } from '../../lib/analytics';
import { whatsappUrl } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/Icons';
import styles from './FloatingWhatsApp.module.css';

/** Desktop only: mobile uses the sticky bottom bar instead. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl('general')}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat on WhatsApp"
      onClick={() => trackCta('general', 'floating')}
    >
      <WhatsAppIcon mono size={28} />
      <span className={styles.tip} aria-hidden="true">
        Chat on WhatsApp
      </span>
    </a>
  );
}
