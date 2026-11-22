import { useEffect, useRef } from 'react';
import { hero } from '../../data/content';
import { Button, WhatsAppButton } from '../ui/Button';
import { VMark } from '../ui/Icons';
import { MTile } from '../ui/Logo';
import styles from './Hero.module.css';

/**
 * Pointer-driven depth for the hero: a gold spotlight follows the cursor and the
 * watermark, glow and platform cards drift at different speeds (parallax).
 * Only on devices with a fine pointer and when motion is allowed.
 */
function useHeroPointer(ref) {
  useEffect(() => {
    const el = ref.current;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !canHover || reduced) return undefined;

    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const rect = el.getBoundingClientRect();
      const x = last.clientX - rect.left;
      const y = last.clientY - rect.top;
      el.style.setProperty('--sx', `${x}px`);
      el.style.setProperty('--sy', `${y}px`);
      el.style.setProperty('--px', (x / rect.width - 0.5).toFixed(3));
      el.style.setProperty('--py', (y / rect.height - 0.5).toFixed(3));
    };

    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onEnter = () => el.classList.add(styles.pointerActive);
    const onLeave = () => {
      el.classList.remove(styles.pointerActive);
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}

export default function Hero() {
  const ref = useRef(null);
  useHeroPointer(ref);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.watermarkWrap} aria-hidden="true">
        <MTile outline size={720} className={styles.watermark} />
      </div>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.spot} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <span className={styles.dot} aria-hidden="true" />
            {hero.badge}
          </p>

          <h1 id="hero-title" className={styles.title}>
            {hero.headline} <span className={styles.accent}>{hero.headlineAccent}</span>
          </h1>

          <p className={styles.sub}>{hero.subheading}</p>

          <div className={styles.ctas}>
            <WhatsAppButton section="hero">{hero.primaryCta}</WhatsAppButton>
            <Button href="#how-it-works" variant="outlineDark" arrow>
              {hero.secondaryCta}
            </Button>
          </div>

          <p className={styles.trust}>
            <VMark size={16} /> {hero.trustLine}
          </p>
          {hero.note && <p className={styles.note}>{hero.note}</p>}
        </div>

        <div className={styles.platformsWrap}>
          <ul className={styles.platforms} aria-label="Platforms we launch you on">
            {hero.platforms.map((name, i) => (
              <li key={name} className={styles.card} style={{ '--i': i }} data-spotlight>
                <span className={styles.check}>
                  <VMark size={18} />
                </span>
                <span className={styles.platform}>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
