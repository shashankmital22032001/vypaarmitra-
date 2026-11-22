import { finalCta } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import AuditForm from './AuditForm';
import styles from './FinalCta.module.css';

/** The only gold-background section on the site. */
export default function FinalCta() {
  return (
    <section id="free-audit" className={styles.section} aria-labelledby="final-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="final-title" data-reveal>
            {finalCta.heading}
          </h2>
          <p className={styles.paragraph} data-reveal data-reveal-delay="80">
            {finalCta.paragraph}
          </p>
          <div className={styles.cta} data-reveal data-reveal-delay="160">
            <WhatsAppButton section="final-cta" variant="navy">
              {finalCta.cta}
            </WhatsAppButton>
            <p className={styles.small}>{finalCta.smallLine}</p>
            <p className={styles.small}>{finalCta.tagLine}</p>
          </div>
        </div>

        <div data-reveal="right">
          <AuditForm />
        </div>
      </div>
    </section>
  );
}
