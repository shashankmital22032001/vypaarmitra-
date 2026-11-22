import { Link } from 'react-router';
import { site } from '../config/site';
import LegalPage from './LegalPage';

// Draft text: have it reviewed by a legal professional before launch.
export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="21 November 2026"
      description="How VypaarMitra collects, uses and protects the information you share with us."
    >
      <p>
        VypaarMitra (“we”, “us”) is an ecommerce growth agency based in {site.location}. This policy explains what
        information we collect when you use {site.domain} or contact us, and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Details you give us in the free audit form: your name, WhatsApp number, city, product and the package you are interested in.</li>
        <li>Messages you send us on WhatsApp, Instagram or by phone.</li>
        <li>Basic, anonymous usage data, such as which buttons are clicked and pages visited, to improve the website.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To contact you about your free audit and the services you asked about.</li>
        <li>To prepare proposals and deliver the services you choose.</li>
        <li>To understand which parts of the website are useful, so we can improve it.</li>
      </ul>
      <p>We do not sell your information, and we do not send you marketing messages you did not ask for.</p>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers who help us run our business (for example website hosting,
        analytics and WhatsApp), and only as much as they need. When you become a client, we may use your details to set
        up accounts on marketplaces and platforms you approve.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We may use Google Analytics to understand how visitors use the website. It uses cookies that do not identify you
        personally. You can block cookies in your browser settings.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details for as long as needed to respond and follow up, and client details for as long as we work
        together and as required by law.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to see, correct or delete your information at any time by emailing{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>, or by messaging us on WhatsApp or Instagram{' '}
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
          {site.instagram.handle}
        </a>
        .
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The latest version will always be on this page. See also our{' '}
        <Link to="/terms">Terms</Link>.
      </p>
    </LegalPage>
  );
}
