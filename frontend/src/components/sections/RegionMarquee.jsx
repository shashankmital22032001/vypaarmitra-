import { hero, regions } from '../../data/content';
import { VMark } from '../ui/Icons';
import styles from './RegionMarquee.module.css';

const items = [...regions, ...hero.platforms];

/**
 * Infinite ribbon of the regions and platforms named in the hero copy.
 * Decorative (the same words are in the hero text), so hidden from screen readers.
 */
export default function RegionMarquee() {
  const row = items.map((item) => (
    <li key={item} className={styles.item}>
      <VMark size={14} />
      {item}
    </li>
  ));

  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        <ul className={styles.row}>{row}</ul>
        <ul className={styles.row}>{row}</ul>
      </div>
    </div>
  );
}
