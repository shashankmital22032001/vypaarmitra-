import { topBar } from '../../data/content';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <p className="container">{topBar}</p>
    </div>
  );
}
