import { memo, useId, useState } from 'react';
import { WhatsAppButton } from '../ui/Button';
import { StarIcon, VMark } from '../ui/Icons';
import styles from './PackageCard.module.css';

function FeatureList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.title;
        return (
          <li key={key} className={styles.item}>
            <VMark size={14} className={styles.bullet} />
            {typeof item === 'string' ? (
              <span>{item}</span>
            ) : (
              <span>
                <strong className={styles.itemTitle}>{item.title}</strong> {item.text}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PackageCard({ pkg, toggleLabel }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const featured = Boolean(pkg.featured);

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`} aria-labelledby={`${listId}-title`} data-spotlight>
      {pkg.ribbon && (
        <p className={styles.ribbon}>
          <StarIcon /> {pkg.ribbon}
        </p>
      )}

      <p className={styles.number}>Package {pkg.number}</p>
      <h3 id={`${listId}-title`} className={styles.name}>
        {pkg.name}
      </h3>
      <p className={styles.bestFor}>
        <strong>Best for:</strong> {pkg.bestFor}
      </p>

      <div className={styles.body}>
        {pkg.groups.map((group) =>
          group.collapsible ? (
            <div key={group.label} className={styles.group}>
              <p className={styles.groupLabel}>{group.label}</p>
              <div id={`${listId}-more`} className={`${styles.collapse} ${expanded ? styles.open : ''}`}>
                <div className={styles.collapseInner}>
                  <FeatureList items={group.items} />
                </div>
              </div>
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={expanded}
                aria-controls={`${listId}-more`}
                onClick={() => setExpanded((v) => !v)}
              >
                {toggleLabel}
                <VMark size={12} className={styles.toggleIcon} />
              </button>
            </div>
          ) : (
            <div key={group.label} className={styles.group}>
              <p className={styles.groupLabel}>{group.label}</p>
              <FeatureList items={group.items} />
            </div>
          ),
        )}

        {pkg.info && (
          <aside className={styles.info}>
            <p className={styles.infoTitle}>{pkg.info.title}</p>
            <p>{pkg.info.text}</p>
          </aside>
        )}
      </div>

      <p className={styles.result}>
        <strong>Result:</strong> <span className={styles.resultText}>{pkg.result}</span>
      </p>

      <WhatsAppButton
        pkg={pkg.id}
        section="packages"
        variant={featured ? 'primary' : 'outlineLight'}
        block
        className={styles.cta}
      >
        {pkg.cta}
      </WhatsAppButton>
    </article>
  );
}

export default memo(PackageCard);
