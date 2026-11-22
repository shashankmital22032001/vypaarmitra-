import { ApiError } from '../utils/ApiError.js';

/**
 * Validates req[source] against a Zod schema and stores the parsed result
 * on req.valid[source] (Express 5 makes req.query read-only).
 */
export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source] ?? {});
    if (!result.success) {
      const details = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }));
      return next(ApiError.badRequest('Please check the highlighted fields', details));
    }
    req.valid = { ...req.valid, [source]: result.data };
    next();
  };
