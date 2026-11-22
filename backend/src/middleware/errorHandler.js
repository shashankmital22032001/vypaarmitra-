import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export function notFound(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  let status = err.statusCode ?? err.status ?? 500;
  let message = err.message || 'Something went wrong';
  let details = err.details;

  if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    message = 'Please check the highlighted fields';
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON body';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'Request body is too large';
  }

  if (status >= 500) {
    console.error(err);
    if (env.isProd) message = 'Something went wrong. Please try again.';
  }

  res.status(status).json({
    success: false,
    message,
    ...(details && { errors: details }),
    ...(!env.isProd && status >= 500 && { stack: err.stack }),
  });
}
