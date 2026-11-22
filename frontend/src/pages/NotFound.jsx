import { Link } from 'react-router';
import { WhatsAppButton } from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icons';
import { MTile } from '../components/ui/Logo';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './NotFound.module.css';

export default function NotFound() {
  usePageMeta({
    title: 'Page not found | VypaarMitra',
    description: 'This page does not exist. Go back to the VypaarMitra home page.',
    path: '/404',
    noindex: true,
  });

  return (
    <section className={styles.page}>
      <MTile outline size={520} className={styles.watermark} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page went offline.</h1>
        <p className={styles.text}>The page you are looking for does not exist or has moved. Your shop doesn’t have to.</p>
        <div className={styles.actions}>
          <Link to="/" className={styles.home}>
            Back to home <ArrowRight />
          </Link>
          <WhatsAppButton section="not-found">Chat on WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
