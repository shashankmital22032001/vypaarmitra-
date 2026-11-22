import { whyUs } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import { VMark } from '../ui/Icons';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  return (
    <section id="why-us" className="section section--white" aria-labelledby="why-title">
      <div className="container">
        <h2 id="why-title" className={styles.title} data-reveal>
          {whyUs.heading}
        </h2>

        <ul className={styles.cards}>
          {whyUs.cards.map((card, i) => (
            <li key={card.title} className={styles.cell} data-reveal data-reveal-delay={i * 120}>
              <div className={styles.card} data-spotlight>
                <span className={styles.icon}>
                  <VMark size={26} />
                </span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.cta} data-reveal>
          <WhatsAppButton section="why-us">{whyUs.cta}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
