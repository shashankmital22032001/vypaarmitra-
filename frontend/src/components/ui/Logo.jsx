import { Link } from 'react-router';
import styles from './Logo.module.css';

/** The M monogram tile. `outline` draws the watermark version. */
export function MTile({ size = 40, outline = false, className, title }) {
  const labelled = Boolean(title);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : 'true'}
      focusable="false"
    >
      {outline ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
          <rect x="1" y="1" width="98" height="98" rx="24" />
          <path d="M28 30h6v38h-6zM66 30h6v38h-6zM34 30l16 22 16-22v10L50 62 34 40z" />
        </g>
      ) : (
        <>
          <rect width="100" height="100" rx="24" fill="#0F2A43" />
          <path d="M28 30h6v38h-6zM66 30h6v38h-6z" fill="#fff" />
          <path d="M34 30l16 22 16-22v10L50 62 34 40z" fill="#F5A623" />
        </>
      )}
    </svg>
  );
}

/** Header/footer logo: M tile + "vypaar" "mitra" wordmark. */
export function Logo({ onDark = false, onClick }) {
  return (
    <Link to="/" className={`${styles.logo} ${onDark ? styles.dark : ''}`} aria-label="VypaarMitra home" onClick={onClick}>
      <MTile size={40} title="VypaarMitra logo" />
      <span className={styles.wordmark} aria-hidden="true">
        <span className={styles.vypaar}>vypaar</span>
        <span className={styles.mitra}>mitra</span>
      </span>
    </Link>
  );
}
