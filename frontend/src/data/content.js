// All site copy, taken from "VypaarMitra Final Website Copy" (pan-India, no pricing, only free audit CTAs).
// Components only handle layout and behaviour.

export const topBar = 'India’s Ecommerce Growth Agency · Working With Businesses Across India';

export const hero = {
  badge: 'Ecommerce Growth Agency for Indian Businesses · Serving Clients Pan-India',
  headline: 'Your Shop. Now Selling',
  headlineAccent: 'All Over India.',
  subheading:
    'Every Indian business deserves customers beyond its own city. VypaarMitra helps brands, shops and manufacturers from every corner of India, from Kashmir to Kanyakumari and Surat to Guwahati, launch on Amazon, Flipkart, Meesho and their own website, in just 14 days.',
  primaryCta: 'Get My Free Audit',
  secondaryCta: 'See How It Works',
  trustLine: 'You handle your product. We handle everything online.',
  platforms: ['Amazon', 'Flipkart', 'Meesho', 'Your Own Website'],
};

// Places named in the copy, shown in the scrolling ribbon under the hero.
export const regions = ['Kashmir', 'Delhi', 'Jaipur', 'Surat', 'Guwahati', 'Kerala', 'Kanyakumari'];

export const problem = {
  heading: 'You Have A Great Product. But Online, Nobody Can Find It.',
  paragraph:
    'Your shop is doing well in your city. But customers in other cities and states don’t know you exist. You thought about selling on Meesho or Amazon, but then comes GST, listings, photos, packaging, returns and ads, and you stop. That’s why VypaarMitra exists.',
  cards: [
    {
      title: 'Don’t Know Where To Start?',
      text: 'Amazon? Flipkart? Meesho? Own website? We audit your product and tell you exactly what will work for your business.',
    },
    {
      title: 'Scared Of Technical Work?',
      text: 'Listings, payment, shipping, GST: we set up everything for you. You don’t need to learn anything.',
    },
    {
      title: 'No Time To Manage?',
      text: 'You run your shop. We manage your online store, orders and ads every month.',
    },
  ],
  cta: 'Get My Free Audit',
};

/**
 * List items are either a string or { title, text } (bold lead-in).
 * Groups with `collapsible: true` hide behind a toggle on mobile.
 */
export const packages = {
  heading: 'Choose How You Want To Start',
  subheading:
    'Every business is different. So we don’t give fixed prices on the website. We audit your product first, then give you a clear, honest plan for your business.',
  items: [
    {
      id: 'marketplace',
      number: 1,
      name: 'Marketplace Launch',
      bestFor: 'Shops selling online for the first time.',
      groups: [
        {
          label: 'You get',
          items: [
            'Meesho + Amazon / Flipkart Seller Account Setup',
            'Professional Product Listings',
            'Photos, Titles & Pricing Strategy',
            'GST, Bank & Shipping Setup Help',
            'Go-Live Support',
          ],
        },
      ],
      result: 'Your product live on India’s biggest marketplaces in 14 days.',
      cta: 'Get Free Audit For This Package',
    },
    {
      id: 'website',
      number: 2,
      name: 'Your Own Website',
      bestFor: 'Brands who want their own customers and more profit.',
      groups: [
        {
          label: 'You get',
          items: [
            'Your Own Shopify / WooCommerce Store',
            'Payment Gateway + Shipping Setup',
            'Instagram Shop + WhatsApp Order Button',
            'Professional Listings & Brand Pages',
            '30 Days Post-Launch Support',
          ],
        },
      ],
      result: 'Your own branded store that customers trust, not just a marketplace listing.',
      cta: 'Get Free Audit For This Package',
    },
    {
      id: 'growth',
      number: 3,
      name: 'Monthly Growth Partner',
      bestFor: 'Businesses already online but not getting enough orders.',
      groups: [
        {
          label: 'You get',
          items: [
            'Complete Account Management',
            'Meta + Marketplace Ads Management',
            'Reels, Posts & Content Every Month',
            'Listings, Returns & Pricing Optimization',
            'Simple Weekly WhatsApp Report: Orders, Sales, Profit',
          ],
        },
      ],
      result: 'Consistent orders every month without you managing the technical work.',
      cta: 'Get Free Audit For This Package',
    },
  ],
  toggleLabel: 'See everything we manage',
  footnote:
    'Not sure which package is right for you? Don’t worry. Book a Free Audit and we will recommend the right one for your product and budget.',
  footCta: 'Book My Free Audit',
};

export const howItWorks = {
  heading: 'Live In 14 Days. In 4 Simple Steps. From Anywhere In India.',
  steps: [
    {
      title: 'Free Audit Call (Day 1)',
      text: '30-minute phone or video call. We check your product, price and margin and tell you honestly: will it sell online, and on which platform?',
    },
    {
      title: 'Setup (Day 2-10)',
      text: 'We create your accounts, listings, website, payment and shipping. You just send us product photos and details on WhatsApp, no matter which city you are in.',
    },
    {
      title: 'Go Live (Day 11-14)',
      text: 'Your store goes live. We test your first order ourselves to make sure everything works perfectly.',
    },
    {
      title: 'Grow (Every Month)',
      text: 'We run ads, improve listings, and send you a simple WhatsApp report every Friday.',
    },
  ],
  cta: 'Start With My Free Audit',
};

export const whatYouGet = {
  heading: 'We Don’t Talk About Views. We Talk About Orders.',
  subheading: 'Here’s exactly what you’ll have in your first 30 days with VypaarMitra.',
  items: [
    {
      when: 'Day 1',
      title: 'Honest Audit',
      text: 'A clear answer on whether your product will sell online, which platform suits it, and what price gives you a real profit.',
    },
    {
      when: 'Day 14',
      title: 'Live Store',
      text: 'Your products live on Meesho, Amazon, Flipkart or your own website, with professional photos, titles and pricing.',
    },
    {
      when: 'Day 14',
      title: 'First Test Order',
      text: 'We place and ship one order ourselves, so payment, packaging and delivery are proven before real customers arrive.',
    },
    {
      when: 'Every Friday',
      title: 'Your WhatsApp Report',
      text: 'One simple message with your orders, sales and profit for the week. No confusing dashboards.',
    },
    {
      when: 'Day 30',
      title: 'Growth Plan',
      text: 'What’s working, what to fix, and what to do next month to get more orders.',
    },
  ],
  offer: {
    label: 'Founding Client Offer',
    text: 'We’re taking only 5 founding clients this month. You get our full personal attention, founding-client pricing, and a seat with us from day one. In return, we’ll share your success story (with your permission).',
    cta: 'Become A Founding Client',
  },
};

export const whyUs = {
  heading: 'Why Businesses Across India Choose Us Over Big Agencies?',
  cards: [
    {
      title: 'Personal Attention, Wherever You Are',
      text: 'Whether you are in a metro or a small town, you get a dedicated person who knows your business, on call, video or WhatsApp. No call centres, no being passed around.',
    },
    {
      title: 'We Speak Your Language',
      text: 'Hindi and English. We talk the way you talk. No complicated English, no confusing terms.',
    },
    {
      title: 'We Show You Profit, Not Just Views',
      text: 'We don’t show you ‘likes’ and ‘reach’. We show you orders, sales, and profit every week on WhatsApp.',
    },
  ],
  cta: 'Talk To Us On WhatsApp',
};

export const about = {
  heading: 'India’s Ecommerce Partner. With A Personal Touch.',
  paragraphs: [
    'VypaarMitra is an ecommerce growth agency helping businesses across India sell online.',
    'Big agencies will charge you lakhs and never really know your business. We are different. We understand how Indian small businesses work, and we stay personally involved with every client.',
    'We work with only 4-5 businesses per month, so every brand gets our full attention, from first listing to first order to monthly growth.',
    'Whether you are a textile seller in Surat, a handicraft maker in Jaipur, a spice brand in Kerala, or a sports goods manufacturer in Jalandhar, VypaarMitra makes sure all of India can buy from you.',
  ],
  meaning: 'Vypaar = Business · Mitra = Partner',
  cta: 'Book My Free Audit',
};

export const faq = {
  heading: 'Questions Every Business Owner Asks Us',
  items: [
    {
      q: 'I have zero technical knowledge. Can I still sell online?',
      a: 'Yes. That’s exactly why we exist. You just need to know your product. We handle everything technical.',
    },
    {
      q: 'How much money do I need to start?',
      a: 'Apart from our setup fee, you need stock, packaging, and a small ad budget to test. We will give you a clear budget in your Free Audit, before you pay anything.',
    },
    {
      q: 'Do I need GST?',
      a: 'Yes, for Amazon/Flipkart you need GST. We will help you understand the process and connect you with a CA if needed.',
    },
    {
      q: 'How long before I get my first order?',
      a: 'Most clients get their first order within 7-15 days of going live, if pricing and photos are right. We will be honest with you about your product’s timeline in the audit.',
    },
    {
      q: 'I already have a shop, why do I need a website?',
      a: 'Marketplaces give you orders, your own website gives you brand and profit. We usually start you on marketplaces, then build your website once orders start coming.',
    },
    {
      q: 'I am not in your city. Can you still work with me?',
      a: 'Yes. We work with businesses all over India. Everything, from the audit to setup and monthly reports, happens over phone, video call and WhatsApp.',
    },
  ],
  cta: 'Ask Your Question On WhatsApp',
};

export const finalCta = {
  heading: 'Will Your Product Sell Online? Let’s Find Out For Free.',
  paragraph:
    'Book a free 30-minute audit. No commitment. We will tell you which platform is right for you, what price will work, and how much you can earn.',
  cta: 'Book My Free Audit On WhatsApp',
  smallLine: 'Limited to 4-5 businesses per month. Slots for this month are filling fast.',
  tagLine: 'India’s Ecommerce Growth Agency · Working With Businesses Across India',
};

export const footer = {
  tagline: 'Ecommerce Growth Agency for Indian Businesses',
  description: 'Serving clients across India. Helping businesses sell on Amazon, Flipkart, Meesho & Own Website.',
  copyright: '© VypaarMitra · vypaarmitra.com · Ecommerce Growth Agency, India',
};
