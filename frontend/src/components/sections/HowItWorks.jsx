import { howItWorks } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import { VMark } from '../ui/Icons';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const last = howItWorks.steps.length - 1;

  return (
    <section id="how-it-works" className="section section--navy" aria-labelledby="how-title">
      <div className="container">
        <h2 id="how-title" className={styles.title} data-reveal>
          {howItWorks.heading}
        </h2>

        <ol className={styles.steps}>
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal data-reveal-delay={i * 150}>
              <span className={styles.circle} aria-hidden="true">
                {i + 1}
              </span>
              {i < last && (
                <span className={styles.connector} aria-hidden="true">
                  <VMark size={14} className={styles.joint} />
                </span>
              )}
              <div className={styles.text}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.cta} data-reveal>
          <WhatsAppButton section="how-it-works">{howItWorks.cta}</WhatsAppButton>
          {howItWorks.note && <p className={styles.note}>{howItWorks.note}</p>}
        </div>
      </div>
    </section>
  );
}
