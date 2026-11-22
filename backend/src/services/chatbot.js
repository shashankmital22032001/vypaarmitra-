import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/env.js';
import { BASIC_ANSWERS, BASIC_FALLBACK, SYSTEM_PROMPT } from './chatKnowledge.js';

const MODEL = 'claude-opus-5-5';

// Only create a client when a key is configured; otherwise the bot runs in "basic" mode.
const client = env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 60_000 }) : null;

export const chatMode = client ? 'ai' : 'basic';

/** Keyword answer from the FAQ, used without an API key or when the API is unavailable. */
export function basicAnswer(messages) {
  const last = messages.findLast((m) => m.role === 'user')?.content.toLowerCase() ?? '';
  const words = new Set(last.split(/[^a-z0-9]+/));
  const hit = BASIC_ANSWERS.find(({ keywords }) =>
    keywords.some((k) => (k.includes(' ') ? last.includes(k) : words.has(k))),
  );
  return hit?.answer ?? BASIC_FALLBACK;
}

/**
 * Streams Claude's reply, calling onText(delta) for each chunk of text.
 * Throws Anthropic.APIError (or a connection error) so the caller can fall back.
 */
export async function streamAiReply(messages, onText, { signal } = {}) {
  const stream = client.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: 4000,
      // Chat answers are short and factual: low effort keeps replies fast and cheap.
      output_config: { effort: 'low' },
      // If the model declines a message, the API retries it on a suitable fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      // Stable system prompt, cached across visitors.
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    },
    { signal },
  );

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      onText(event.delta.text);
    }
  }

  const final = await stream.finalMessage();
  return { stopReason: final.stop_reason };
}
