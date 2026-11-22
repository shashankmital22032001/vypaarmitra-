import { useId, useState } from 'react';
import { faq } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import { VMark } from '../ui/Icons';
import styles from './Faq.module.css';

// FAQPage structured data for Google rich results (built once at module load).
const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(-1);
  const baseId = useId();

  return (
    <section id="faq" className="section section--cream" aria-labelledby="faq-title">
      <script type="application/ld+json">{faqSchema}</script>
      <div className={`container ${styles.wrap}`}>
        <h2 id="faq-title" className={styles.title} data-reveal>
          {faq.heading}
        </h2>

        <div className={styles.list}>
          {faq.items.map(({ q, a }, i) => {
            const open = openIndex === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={q} data-reveal data-reveal-delay={i * 70}>
                <div className={`${styles.item} ${open ? styles.open : ''}`}>
                  <h3 className={styles.question}>
                    <button
                      id={btnId}
                      type="button"
                      className={styles.trigger}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : i)}
                    >
                      <span>{q}</span>
                      <span className={styles.arrow} aria-hidden="true">
                        <VMark size={16} />
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel} inert={!open}>
                    <div className={styles.panelInner}>
                      <p className={styles.answer}>{a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.cta} data-reveal>
          <WhatsAppButton section="faq">{faq.cta}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
