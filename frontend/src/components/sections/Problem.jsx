import { problem } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import styles from './Problem.module.css';

export default function Problem() {
  return (
    <section className="section section--cream" aria-labelledby="problem-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="problem-title" data-reveal>
            {problem.heading}
          </h2>
          <p className="lead" data-reveal data-reveal-delay="80">
            {problem.paragraph}
          </p>
        </div>

        <ul className={styles.cards}>
          {problem.cards.map((card, i) => (
            <li key={card.title} className={styles.cell} data-reveal data-reveal-delay={i * 120}>
              <div className={styles.card} data-spotlight>
                <span className={styles.num} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className={styles.title}>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.cta} data-reveal>
          <WhatsAppButton section="problem">{problem.cta}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
