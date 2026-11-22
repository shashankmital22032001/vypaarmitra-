import { usePageMeta } from '../hooks/usePageMeta';
import styles from './LegalPage.module.css';

/** Shared shell for Privacy Policy and Terms. */
export default function LegalPage({ title, description, path, updated, children }) {
  usePageMeta({ title: `${title} | VypaarMitra`, description, path });

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Legal</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Last updated: {updated}</p>
        </div>
      </section>
      <article className={`container ${styles.body}`}>{children}</article>
    </>
  );
}
