import { rateLimit } from 'express-rate-limit';

const base = {
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again in a few minutes.' },
};

export const apiLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 300 });

// Form submissions: generous enough for typos, strict enough to stop spam.
export const leadLimiter = rateLimit({ ...base, windowMs: 60 * 60 * 1000, limit: 5 });

// Chatbot: plenty for a real conversation, caps API spend from a single visitor.
export const chatLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: { success: false, message: 'You’ve sent a lot of messages. Please wait a few minutes, or ask us on WhatsApp.' },
});

export const eventLimiter = rateLimit({ ...base, windowMs: 60 * 1000, limit: 60 });
