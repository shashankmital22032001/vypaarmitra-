import { trackCta } from '../../lib/analytics';
import { whatsappUrl } from '../../lib/whatsapp';
import { ArrowRight, WhatsAppIcon } from './Icons';
import styles from './Button.module.css';

const cx = (...c) => c.filter(Boolean).join(' ');

/**
 * Variants (from the brief):
 *  primary      gold bg, navy text          → hover deep gold
 *  outlineLight 2px navy border (on light)  → hover navy fill
 *  outlineDark  2px white border (on dark)  → hover white fill
 *  navy         navy bg, white text (only on the gold final CTA)
 */
export function Button({ href, variant = 'primary', arrow = false, block = false, className, children, ...rest }) {
  const classes = cx(styles.btn, styles[variant], block && styles.block, className);
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className={styles.arrow} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

/** Every audit / WhatsApp button: opens the right message and fires audit_cta_click. */
export function WhatsAppButton({ pkg = 'general', section, children, arrow = true, ...rest }) {
  return (
    <Button
      href={whatsappUrl(pkg)}
      target="_blank"
      rel="noopener noreferrer"
      arrow={arrow}
      onClick={() => trackCta(pkg, section)}
      {...rest}
    >
      <WhatsAppIcon className={styles.wa} />
      {children}
      <span className="visually-hidden"> (opens WhatsApp)</span>
    </Button>
  );
}
