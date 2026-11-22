import { z } from 'zod';
import { LEAD_STATUSES, PACKAGES } from '../config/constants.js';

const text = (max, label) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(2, `${label} is too short`)
    .max(max, `${label} is too long`);

export const createLeadSchema = z.object({
  name: text(80, 'Name'),
  // Accept "+91 98765 43210", "098765-43210" etc. and normalise to 10 digits.
  phone: z
    .string({ error: 'Phone number is required' })
    .transform((v) => v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, ''))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')),
  city: text(60, 'City'),
  product: text(120, 'Product'),
  package: z.enum(PACKAGES).default('general'),
  message: z.string().trim().max(1000).optional().default(''),
  // Honeypot: real users never see or fill this field. The controller
  // silently discards submissions where it is filled.
  website: z.string().max(500).optional(),
});

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(LEAD_STATUSES).optional(),
});
