import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { chatLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';
import { chatSchema } from '../validators/chatValidator.js';

const router = Router();

router.post('/', chatLimiter, validate(chatSchema), chat);

export default router;
