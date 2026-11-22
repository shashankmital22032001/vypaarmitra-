import { WhatsAppButton } from '../ui/Button';
import styles from './MobileCtaBar.module.css';

/** Mobile only: one full-width gold WhatsApp button pinned to the bottom. */
export default function MobileCtaBar() {
  return (
    <div className={styles.bar}>
      <WhatsAppButton section="mobile-bar" block arrow={false}>
        Chat on WhatsApp
      </WhatsAppButton>
    </div>
  );
}
