import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import apiRoutes from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.resolve(__dirname, '../../frontend/dist');
// Keep in sync with the routes in frontend/src/App.jsx.
const CLIENT_ROUTES = new Set(['/', '/privacy-policy', '/terms']);

export function createApp() {
  const app = express();

  // Behind one proxy (Nginx) so req.ip and rate limits use the real client IP.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          // Google Analytics 4 (per Google's CSP guide).
          'script-src': ["'self'", 'https://*.googletagmanager.com'],
          'connect-src': [
            "'self'",
            'https://*.google-analytics.com',
            'https://*.analytics.google.com',
            'https://*.googletagmanager.com',
          ],
          'img-src': ["'self'", 'data:', 'https://*.google-analytics.com', 'https://*.googletagmanager.com'],
        },
      },
    }),
  );
  app.use(
    cors({
      origin: (origin, cb) => cb(null, !origin || env.corsOrigins.includes(origin)),
      methods: ['GET', 'POST'],
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(morgan(env.isProd ? 'combined' : 'dev'));

  app.use('/api', apiLimiter, apiRoutes);
  app.use('/api', notFound);

  // Production: serve the built React app from the same origin.
  if (env.isProd && existsSync(clientDist)) {
    app.use(
      express.static(clientDist, {
        index: false,
        maxAge: '1y',
        immutable: true,
        setHeaders: (res, filePath) => {
          // HTML must always be revalidated so new deploys show up.
          if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
        },
      }),
    );
    // Real 404 status for unknown pages so search engines don't index them.
    app.get('/{*splat}', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.status(CLIENT_ROUTES.has(req.path) ? 200 : 404).sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
