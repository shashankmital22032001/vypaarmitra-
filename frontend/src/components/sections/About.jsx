import { about } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import { MTile } from '../ui/Logo';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section section--navy" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="about-title" data-reveal>
            {about.heading}
          </h2>
          <div className={styles.paragraphs}>
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal data-reveal-delay={80 + i * 80}>
                {p}
              </p>
            ))}
          </div>
          <p className={styles.pill} data-reveal>
            {about.meaning}
          </p>
          <div className={styles.cta} data-reveal>
            <WhatsAppButton section="about">{about.cta}</WhatsAppButton>
          </div>
        </div>

        <div className={styles.visual} data-reveal="right">
          <div className={styles.tileFrame}>
            <MTile size={320} className={styles.tile} />
          </div>
        </div>
      </div>
    </section>
  );
}
