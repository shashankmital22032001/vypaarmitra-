import { Lead } from '../models/Lead.js';
import { notifyNewLead } from '../services/notify.js';

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

// POST /api/leads
export async function createLead(req, res) {
  const { website: _honeypot, ...data } = req.valid.body;

  // Bots fill the hidden field: pretend success so they don't retry.
  if (_honeypot) return res.status(201).json({ success: true, message: 'Thanks! We will contact you soon.' });

  // Same phone within 10 minutes: treat as a double submit, not a new lead.
  const recent = await Lead.exists({
    phone: data.phone,
    createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
  });

  if (!recent) {
    const lead = await Lead.create({
      ...data,
      source: { ip: req.ip, userAgent: req.get('user-agent')?.slice(0, 300) },
    });
    // Don't make the visitor wait for WhatsApp; notifyNewLead never throws.
    void notifyNewLead(lead);
  }

  res.status(201).json({
    success: true,
    message: 'Thanks! We will contact you on WhatsApp within one working day.',
  });
}

// GET /api/leads  (admin, requires x-api-key)
export async function listLeads(req, res) {
  const { page, limit, status } = req.valid.query;
  const filter = status ? { status } : {};

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
  });
}
