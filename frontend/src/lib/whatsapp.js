import { site, whatsappMessages } from '../config/site';

/** Builds a wa.me link with the pre-filled message for a package. */
export function whatsappUrl(pkg = 'general') {
  const text = encodeURIComponent(whatsappMessages[pkg] ?? whatsappMessages.general);
  // Without a configured number WhatsApp lets the user pick a contact instead of failing.
  return site.whatsappNumber ? `https://wa.me/91${site.whatsappNumber}?text=${text}` : `https://wa.me/?text=${text}`;
}
