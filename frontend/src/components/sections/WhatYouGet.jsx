import { whatYouGet } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import { StarIcon, VMark } from '../ui/Icons';
import styles from './WhatYouGet.module.css';

export default function WhatYouGet() {
  const { offer } = whatYouGet;

  return (
    <section id="what-you-get" className="section section--cream" aria-labelledby="wyg-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="wyg-title" data-reveal>
            {whatYouGet.heading}
          </h2>
          <p className="lead" data-reveal data-reveal-delay="80">
            {whatYouGet.subheading}
          </p>
        </div>

        <div className={styles.grid}>
          <ol className={styles.timeline} data-reveal>
            {whatYouGet.items.map((item, i) => (
              <li key={item.title} className={styles.item} style={{ '--i': i }}>
                <span className={styles.marker} aria-hidden="true">
                  <VMark size={14} />
                </span>
                <div className={styles.body} data-spotlight>
                  <p className={styles.when}>{item.when}</p>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className={styles.offerWrap} data-reveal="right" aria-labelledby="offer-title">
            <div className={styles.offer}>
              <p id="offer-title" className={styles.offerLabel}>
                <StarIcon /> {offer.label}
              </p>
              <p className={styles.offerText}>{offer.text}</p>
              <WhatsAppButton pkg="founding" section="what-you-get" block>
                {offer.cta}
              </WhatsAppButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
