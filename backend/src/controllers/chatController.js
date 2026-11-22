import Anthropic from '@anthropic-ai/sdk';
import { basicAnswer, chatMode, streamAiReply } from '../services/chatbot.js';

const REFUSAL_REPLY =
  'Sorry, I can’t help with that here. For anything about selling online with VypaarMitra, ask me or tap "Book Free Audit on WhatsApp" to talk to our team.';
const ERROR_REPLY =
  'Sorry, I’m having trouble answering right now. Please try again in a moment, or tap "Book Free Audit on WhatsApp" to ask our team directly.';

// POST /api/chat  →  streams the reply as plain text chunks.
export async function chat(req, res) {
  const { messages } = req.valid.body;

  res.status(200).set({
    'Content-Type': 'text/plain; charset=utf-8',
    // no-transform stops compression() from buffering the stream.
    'Cache-Control': 'no-cache, no-transform',
    'X-Accel-Buffering': 'no',
    'X-Chat-Mode': chatMode,
  });
  res.flushHeaders();

  if (chatMode === 'basic') {
    res.end(basicAnswer(messages));
    return;
  }

  // Stop calling Claude if the visitor closes the chat mid-answer.
  const controller = new AbortController();
  res.on('close', () => {
    if (!res.writableEnded) controller.abort();
  });

  let wrote = false;
  try {
    const { stopReason } = await streamAiReply(
      messages,
      (text) => {
        wrote = true;
        res.write(text);
      },
      { signal: controller.signal },
    );
    if (stopReason === 'refusal' && !wrote) res.write(REFUSAL_REPLY);
  } catch (err) {
    if (controller.signal.aborted) return;
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('[chat] ANTHROPIC_API_KEY is invalid; answering from the FAQ instead');
    } else if (err instanceof Anthropic.RateLimitError) {
      console.error('[chat] Anthropic rate limit hit; answering from the FAQ instead');
    } else if (err instanceof Anthropic.APIError) {
      console.error(`[chat] Anthropic API error ${err.status}: ${err.message}`);
    } else {
      console.error(`[chat] ${err.message}`);
    }
    // Nothing sent yet: answer from the FAQ. Mid-answer: add a short apology.
    res.write(wrote ? `\n\n${ERROR_REPLY}` : basicAnswer(messages));
  }
  res.end();
}
