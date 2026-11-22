import { timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const expected = Buffer.from(env.ADMIN_API_KEY);

export function requireApiKey(req, _res, next) {
  const provided = Buffer.from(req.get('x-api-key') ?? '');
  const ok = provided.length === expected.length && timingSafeEqual(provided, expected);
  return ok ? next() : next(ApiError.unauthorized('Invalid or missing API key'));
}
