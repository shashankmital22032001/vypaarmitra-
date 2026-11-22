import mongoose from 'mongoose';
import { PACKAGES, SECTIONS } from '../config/constants.js';

// Lightweight first-party record of every "audit_cta_click".
// Documents expire automatically after 365 days.
const ctaEventSchema = new mongoose.Schema(
  {
    event: { type: String, default: 'audit_cta_click', immutable: true },
    package: { type: String, enum: PACKAGES, required: true },
    section: { type: String, enum: SECTIONS, required: true },
    path: { type: String, maxlength: 200, default: '/' },
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 365 },
  },
  { versionKey: false },
);

ctaEventSchema.index({ package: 1, section: 1 });

export const CtaEvent = mongoose.model('CtaEvent', ctaEventSchema);
