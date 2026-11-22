import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  ADMIN_API_KEY: z.string().min(16, 'ADMIN_API_KEY must be at least 16 characters'),
  // Optional: enables AI answers in the website chatbot. Without it the bot answers from the FAQ.
  ANTHROPIC_API_KEY: z.string().trim().optional().default(''),
  // Optional email alert for new leads. Leave SMTP_USER / SMTP_PASS empty to disable.
  SMTP_HOST: z.string().trim().default('smtpout.secureserver.net'),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_USER: z.string().trim().optional().default(''),
  // Only leading/trailing spaces are trimmed: a real mailbox password may contain spaces.
  SMTP_PASS: z
    .string()
    .optional()
    .transform((v) => (v ?? '').trim()),
  LEAD_NOTIFY_TO: z
    .string()
    .trim()
    .optional()
    .default('')
    .refine((v) => v === '' || v.split(',').every((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())), {
      message: 'LEAD_NOTIFY_TO must be an email address (or a comma-separated list)',
    }),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  console.error('Copy backend/.env.example to backend/.env and fill in the values.');
  process.exit(1);
}

export const env = Object.freeze({
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === 'production',
  corsOrigins: parsed.data.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean),
});
