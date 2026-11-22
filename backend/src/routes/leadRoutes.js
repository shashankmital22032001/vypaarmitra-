import { Router } from 'express';
import { createLead, listLeads } from '../controllers/leadController.js';
import { leadLimiter } from '../middleware/rateLimiters.js';
import { requireApiKey } from '../middleware/requireApiKey.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, listLeadsQuerySchema } from '../validators/leadValidator.js';

const router = Router();

router
  .route('/')
  .post(leadLimiter, validate(createLeadSchema), createLead)
  .get(requireApiKey, validate(listLeadsQuerySchema, 'query'), listLeads);

export default router;
