import mongoose from 'mongoose';
import { LEAD_STATUSES, PACKAGES } from '../config/constants.js';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, match: /^[6-9]\d{9}$/ },
    city: { type: String, required: true, trim: true, maxlength: 60 },
    product: { type: String, required: true, trim: true, maxlength: 120 },
    package: { type: String, enum: PACKAGES, default: 'general' },
    message: { type: String, trim: true, maxlength: 1000, default: '' },
    status: { type: String, enum: LEAD_STATUSES, default: 'new', index: true },
    source: {
      ip: { type: String, select: false },
      userAgent: { type: String, select: false },
    },
  },
  { timestamps: true, versionKey: false },
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ phone: 1, createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);
