// Package values match the analytics spec in the website brief.
// 'complete' is the retired Package 3, kept so older leads/events stay valid.
export const PACKAGES = Object.freeze(['general', 'marketplace', 'website', 'complete', 'growth', 'founding']);

export const SECTIONS = Object.freeze([
  'header',
  'mobile-bar',
  'floating',
  'hero',
  'problem',
  'packages',
  'how-it-works',
  'weekly-report',
  'what-you-get',
  'chatbot',
  'why-us',
  'about',
  'faq',
  'final-cta',
  'footer',
  'not-found',
]);

export const LEAD_STATUSES = Object.freeze(['new', 'contacted', 'audit-booked', 'won', 'lost']);
