import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { trackCta } from '../../lib/analytics';
import { ApiError, streamChat } from '../../lib/api';
import { whatsappUrl } from '../../lib/whatsapp';
import { ChatIcon, CloseIcon, SendIcon, WhatsAppIcon } from '../ui/Icons';
import { MTile } from '../ui/Logo';
import styles from './ChatWidget.module.css';

const STORAGE_KEY = 'vm-chat';
const TEASER_KEY = 'vm-chat-teaser';
const GREETING =
  'Namaste! I’m Mitra, VypaarMitra’s assistant. Ask me anything about selling on Amazon, Flipkart, Meesho or your own website. Hindi or English, both are fine.';
const SUGGESTIONS = [
  'What packages do you offer?',
  'How much does it cost?',
  'Do I need GST?',
  'How soon will I get my first order?',
  'I’m not in your city. Can you help?',
];

const readSaved = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

/** "Mitra": floating chatbot that answers visitor questions instantly (POST /api/chat). */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(readSaved);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState('');
  const [teaser, setTeaser] = useState(false);

  const panelId = useId();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const abortRef = useRef(null);

  // Keep the conversation while the visitor browses (this tab only).
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage may be unavailable */
    }
  }, [messages]);

  // A small "Questions? Ask me" bubble, once per visit, after the visitor has looked around.
  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(TEASER_KEY));
    } catch {
      /* ignore */
    }
    if (seen) return undefined;
    const t = setTimeout(() => setTeaser(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  // Scroll to the newest message as text streams in.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  // Focus the input on open; Escape closes and returns focus to the button.
  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = async (text) => {
    const question = text.trim();
    if (!question || busy) return;

    const history = [...messages.filter((m) => !m.error), { role: 'user', content: question }];
    setMessages([...history, { role: 'assistant', content: '', pending: true }]);
    setInput('');
    setBusy(true);

    abortRef.current = new AbortController();
    const appendToReply = (chunk) =>
      setMessages((list) => {
        const next = list.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + chunk, pending: false };
        return next;
      });

    try {
      const result = await streamChat(
        history.map(({ role, content }) => ({ role, content })),
        appendToReply,
        { signal: abortRef.current.signal },
      );
      setMode(result.mode);
      setMessages((list) => list.map((m) => (m.pending ? { ...m, pending: false } : m)));
    } catch (err) {
      if (err.name === 'AbortError') return;
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setMessages((list) => [...list.slice(0, -1), { role: 'assistant', content: message, error: true }]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const toggle = () => {
    dismissTeaser();
    setOpen((o) => !o);
  };

  const showSuggestions = messages.length === 0;

  return (
    <>
      {teaser && !open && (
        <div className={styles.teaser} role="status">
          <button type="button" className={styles.teaserText} onClick={toggle}>
            Questions about selling online? <strong>Ask Mitra</strong>
          </button>
          <button type="button" className={styles.teaserClose} onClick={dismissTeaser} aria-label="Dismiss">
            <CloseIcon size={14} />
          </button>
        </div>
      )}

      <button
        ref={fabRef}
        type="button"
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close chat' : 'Ask Mitra, our assistant'}
        onClick={toggle}
      >
        {open ? <CloseIcon size={24} /> : <ChatIcon />}
      </button>

      <section
        id={panelId}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        role="dialog"
        aria-label="Chat with Mitra, VypaarMitra's assistant"
        hidden={!open}
      >
        <header className={styles.head}>
          <MTile size={38} />
          <div className={styles.headText}>
            <p className={styles.name}>Mitra</p>
            <p className={styles.status}>
              <span className={styles.online} aria-hidden="true" /> VypaarMitra assistant · replies instantly
            </p>
          </div>
          <button type="button" className={styles.close} onClick={toggle} aria-label="Close chat">
            <CloseIcon />
          </button>
        </header>

        <div ref={listRef} className={styles.list} aria-live="polite">
          <p className={`${styles.msg} ${styles.bot}`}>{GREETING}</p>

          {messages.map((m, i) => (
            <p
              key={i}
              className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.bot} ${m.error ? styles.error : ''}`}
            >
              {m.pending ? (
                <span className={styles.typing} aria-label="Mitra is typing">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                m.content
              )}
            </p>
          ))}

          {showSuggestions && (
            <div className={styles.chips} aria-label="Suggested questions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" className={styles.chip} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href={whatsappUrl('general')}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.wa}
          onClick={() => trackCta('general', 'chatbot')}
        >
          <WhatsAppIcon size={18} /> Book Free Audit on WhatsApp
        </a>

        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor={`${panelId}-input`} className="visually-hidden">
            Type your question
          </label>
          <input
            ref={inputRef}
            id={`${panelId}-input`}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            maxLength={500}
            autoComplete="off"
          />
          <button type="submit" className={styles.send} disabled={busy || !input.trim()} aria-label="Send">
            <SendIcon />
          </button>
        </form>
        <p className={styles.note}>
          {mode === 'ai' ? 'AI assistant: answers can be wrong. ' : ''}Don’t share passwords, OTPs or bank details.
        </p>
      </section>
    </>
  );
}
