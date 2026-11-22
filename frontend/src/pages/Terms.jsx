import { Link } from 'react-router';
import { site } from '../config/site';
import LegalPage from './LegalPage';

// Draft text: have it reviewed by a legal professional before launch.
export default function Terms() {
  return (
    <LegalPage
      title="Terms"
      path="/terms"
      updated="21 November 2026"
      description="The terms for using the VypaarMitra website and services."
    >
      <p>
        These terms apply to your use of {site.domain}, run by VypaarMitra, {site.location}. By using the website you
        agree to them.
      </p>

      <h2>Our services</h2>
      <p>
        The website describes our ecommerce services: marketplace launch, own website, management and growth. We do not
        publish fixed prices. Every engagement starts with a free audit, and the exact scope, timeline and fees are agreed
        with you in writing before any work begins.
      </p>

      <h2>Free audit</h2>
      <p>
        The free audit is a no-commitment conversation. Our recommendations are honest estimates based on what you share
        with us. They are not a guarantee of sales, orders or profit.
      </p>

      <h2>Timelines</h2>
      <p>
        Timelines such as “about 14 days” depend on your GST registration, product photos, documents and marketplace
        approvals being ready. Delays caused by third parties (marketplaces, payment gateways, courier partners) are outside
        our control.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Provide accurate business, product and tax information.</li>
        <li>Make sure your products are legal to sell and that you own or may use the images and brand names you share with us.</li>
        <li>Fulfil orders, pack products and follow each marketplace’s seller policies.</li>
      </ul>

      <h2>Third-party platforms</h2>
      <p>
        Amazon, Flipkart, Meesho, Shopify, WooCommerce, Meta and WhatsApp are independent companies with their own terms
        and fees. VypaarMitra is not affiliated with them, and their decisions (such as listing approvals or account
        actions) are outside our control.
      </p>

      <h2>Website content</h2>
      <p>
        The VypaarMitra name, logo and website content belong to VypaarMitra. Please do not copy them without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We work hard to give accurate information, but the website is provided “as is”. To the extent allowed by law, we
        are not liable for indirect losses arising from use of the website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with courts in Punjab having jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or message us on
        WhatsApp or Instagram. See also our{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
