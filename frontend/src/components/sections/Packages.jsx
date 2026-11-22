import { packages } from '../../data/content';
import { WhatsAppButton } from '../ui/Button';
import PackageCard from './PackageCard';
import styles from './Packages.module.css';

export default function Packages() {
  return (
    <section id="packages" className="section section--white" aria-labelledby="packages-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="packages-title" data-reveal>
            {packages.heading}
          </h2>
          <p className="lead" data-reveal data-reveal-delay="80">
            {packages.subheading}
          </p>
        </div>

        <ul className={styles.grid}>
          {packages.items.map((pkg, i) => (
            <li key={pkg.id} className={styles.cell} data-reveal data-reveal-delay={i * 100}>
              <PackageCard pkg={pkg} toggleLabel={packages.toggleLabel} />
            </li>
          ))}
        </ul>

        <div className={styles.foot} data-reveal>
          <p>{packages.footnote}</p>
          <WhatsAppButton section="packages">{packages.footCta}</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
