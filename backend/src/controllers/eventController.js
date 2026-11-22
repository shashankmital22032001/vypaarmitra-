import { CtaEvent } from '../models/CtaEvent.js';

// POST /api/events
// Called with navigator.sendBeacon, so respond fast and never block the user.
export async function trackCtaClick(req, res) {
  await CtaEvent.create(req.valid.body);
  res.status(204).end();
}

// GET /api/events/summary  (admin): clicks grouped by package and section
export async function ctaSummary(_req, res) {
  const data = await CtaEvent.aggregate([
    { $group: { _id: { package: '$package', section: '$section' }, clicks: { $sum: 1 } } },
    { $project: { _id: 0, package: '$_id.package', section: '$_id.section', clicks: 1 } },
    { $sort: { clicks: -1 } },
  ]);
  res.json({ success: true, data });
}
