import { z } from 'zod';

const message = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(1000, 'Message is too long (max 1000 characters)'),
});

export const chatSchema = z.object({
  messages: z
    .array(message)
    .min(1)
    .max(40)
    // Keep only recent turns (cheaper, faster) and make sure the history starts with the visitor.
    .transform((list) => {
      const recent = list.slice(-12);
      while (recent.length && recent[0].role !== 'user') recent.shift();
      return recent;
    })
    .refine((list) => list.length > 0 && list.at(-1).role === 'user', 'The last message must be from the visitor'),
});
