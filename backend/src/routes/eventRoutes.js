import express, { Router } from 'express';
import { ctaSummary, trackCtaClick } from '../controllers/eventController.js';
import { eventLimiter } from '../middleware/rateLimiters.js';
import { requireApiKey } from '../middleware/requireApiKey.js';
import { validate } from '../middleware/validate.js';
import { ctaEventSchema } from '../validators/eventValidator.js';

const router = Router();

// sendBeacon posts JSON as text/plain, so parse that type here too.
router.post(
  '/',
  eventLimiter,
  express.json({ type: ['application/json', 'text/plain'], limit: '2kb' }),
  validate(ctaEventSchema),
  trackCtaClick,
);

router.get('/summary', requireApiKey, ctaSummary);

export default router;
