import { useEffect, useRef, useState } from 'react';
import { packages } from '../../data/content';
import { ApiError, submitLead } from '../../lib/api';
import { trackCta } from '../../lib/analytics';
import { Button } from '../ui/Button';
import { VMark } from '../ui/Icons';
import styles from './AuditForm.module.css';

const PACKAGE_OPTIONS = [
  { value: 'general', label: 'Not sure yet' },
  ...packages.items.map((p) => ({ value: p.id, label: p.name })),
];

const EMPTY = { name: '', phone: '', city: '', product: '', package: 'general', website: '' };

// Mirrors the backend rules so most errors show before a round trip.
function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name';
  const digits = v.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit mobile number';
  if (v.city.trim().length < 2) errors.city = 'Please enter your city';
  if (v.product.trim().length < 2) errors.product = 'Tell us what you sell';
  return errors;
}

export default function AuditForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const abortRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setStatus({ state: 'loading', message: '' });
    trackCta(values.package, 'final-cta');

    try {
      const message = await submitLead(values, { signal: abortRef.current.signal });
      setStatus({ state: 'success', message });
      setValues(EMPTY);
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (err instanceof ApiError) setErrors(err.fieldErrors);
      setStatus({ state: 'error', message: err.message });
    }
  };

  if (status.state === 'success') {
    return (
      <div className={`${styles.card} ${styles.success}`} role="status">
        <span className={styles.successIcon}>
          <VMark size={28} />
        </span>
        <p className={styles.successTitle}>Request received!</p>
        <p>{status.message}</p>
        <Button variant="outlineLight" onClick={() => setStatus({ state: 'idle', message: '' })}>
          Send another request
        </Button>
      </div>
    );
  }

  const field = (name, label, props = {}) => (
    <div className={styles.field}>
      <label htmlFor={`audit-${name}`}>{label}</label>
      <input
        id={`audit-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `audit-${name}-error` : undefined}
        required
        {...props}
      />
      {errors[name] && (
        <p id={`audit-${name}-error`} className={styles.error}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const loading = status.state === 'loading';

  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate aria-labelledby="audit-form-title">
      <p id="audit-form-title" className={styles.title}>
        Prefer a call back? Request your free audit
      </p>

      <div className={styles.row}>
        {field('name', 'Your name', { autoComplete: 'name', maxLength: 80 })}
        {field('phone', 'WhatsApp number', {
          type: 'tel',
          inputMode: 'tel',
          autoComplete: 'tel-national',
          placeholder: '98765 43210',
          maxLength: 16,
        })}
      </div>
      <div className={styles.row}>
        {field('city', 'City', { autoComplete: 'address-level2', maxLength: 60 })}
        {field('product', 'What do you sell?', { maxLength: 120 })}
      </div>

      <div className={styles.field}>
        <label htmlFor="audit-package">Package</label>
        <select id="audit-package" name="package" value={values.package} onChange={onChange}>
          {PACKAGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from people and screen readers, bots fill it. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="audit-website">Website</label>
        <input id="audit-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <Button type="submit" variant="navy" block disabled={loading} aria-busy={loading} arrow={!loading}>
        {loading ? 'Sending…' : 'Request My Free Audit'}
      </Button>

      <p className={styles.formError} role="alert">
        {status.state === 'error' ? status.message : ''}
      </p>
    </form>
  );
}
