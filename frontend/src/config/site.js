const number = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

if (import.meta.env.DEV && !/^\d{10}$/.test(number)) {
  console.warn('[VypaarMitra] Set VITE_WHATSAPP_NUMBER (10 digits) in frontend/.env so WhatsApp buttons reach you.');
}

export const site = Object.freeze({
  name: 'VypaarMitra',
  domain: 'vypaarmitra.com',
  url: 'https://vypaarmitra.com',
  tagline: 'Ecommerce Growth Agency for Indian Businesses',
  location: 'Serving clients across India',
  whatsappNumber: number,
  phoneDisplay: number.length === 10 ? `+91 ${number.slice(0, 5)} ${number.slice(5)}` : '',
  email: 's.mital@vypaarmitra.com',
  instagram: { handle: '@vypaarmitra', url: 'https://www.instagram.com/vypaarmitra' },
  // Google Analytics 4 measurement ID (public): property "vypaarmitra.com", stream "VypaarMitra Website".
  gaId: 'G-JE0RFGW2DR',
  apiUrl: (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, ''),
});

export const navLinks = Object.freeze([
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'packages', label: 'Packages' },
  { id: 'what-you-get', label: 'What You Get' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'faq', label: 'FAQ' },
]);

// Pre-filled WhatsApp messages, one per package (values match analytics "package").
export const whatsappMessages = Object.freeze({
  general: 'Hi VypaarMitra! I want a Free Audit. I sell [product] from [city, state].',
  marketplace: 'Hi VypaarMitra! I want a Free Audit for Marketplace Launch. I sell [product] from [city, state].',
  website: 'Hi VypaarMitra! I want a Free Audit for Own Website. I sell [product] from [city, state].',
  growth: 'Hi VypaarMitra! I want a Free Audit for Monthly Growth. I sell [product] from [city, state].',
  founding: 'Hi VypaarMitra! I want to become a Founding Client. I sell [product] from [city, state].',
});
