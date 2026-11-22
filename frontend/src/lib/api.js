import { site } from '../config/site';

export class ApiError extends Error {
  constructor(message, fieldErrors = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

/**
 * POST /api/chat. Streams the assistant's reply: onText(chunk) is called as text arrives.
 * Resolves with { mode: 'ai' | 'basic' }.
 */
export async function streamChat(messages, onText, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${site.apiUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Could not reach our server. Please check your internet or message us on WhatsApp.');
  }

  if (!res.ok || !res.body) {
    const json = await res.json().catch(() => ({}));
    throw new ApiError(json.message || 'Something went wrong. Please try again.');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    if (text) onText(text);
  }
  const tail = decoder.decode();
  if (tail) onText(tail);
  return { mode: res.headers.get('X-Chat-Mode') || 'basic' };
}

/** POST /api/leads. Resolves with the server message or throws ApiError. */
export async function submitLead(data, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${site.apiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Could not reach our server. Please check your internet or message us on WhatsApp.');
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const fieldErrors = Object.fromEntries((json.errors ?? []).map((e) => [e.field, e.message]));
    throw new ApiError(json.message || 'Something went wrong. Please try again.', fieldErrors);
  }
  return json.message;
}
