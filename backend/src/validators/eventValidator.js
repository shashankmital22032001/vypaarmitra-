import { z } from 'zod';
import { PACKAGES, SECTIONS } from '../config/constants.js';

export const ctaEventSchema = z.object({
  package: z.enum(PACKAGES),
  section: z.enum(SECTIONS),
  path: z.string().trim().max(200).default('/'),
});
