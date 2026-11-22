import { Router } from 'express';
import mongoose from 'mongoose';
import chatRoutes from './chatRoutes.js';
import eventRoutes from './eventRoutes.js';
import leadRoutes from './leadRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  const dbUp = mongoose.connection.readyState === 1;
  res.status(dbUp ? 200 : 503).json({
    success: dbUp,
    status: dbUp ? 'ok' : 'degraded',
    db: dbUp ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
  });
});

router.use('/leads', leadRoutes);
router.use('/chat', chatRoutes);
router.use('/events', eventRoutes);

export default router;
