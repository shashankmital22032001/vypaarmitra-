import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const PACKAGE_LABELS = {
  general: 'Not sure yet',
  marketplace: 'Marketplace Launch',
  website: 'Your Own Website',
  growth: 'Monthly Growth Partner',
  founding: 'Founding Client',
  complete: 'Complete Partner (old)',
};

const enabled = Boolean(env.SMTP_USER && env.SMTP_PASS && env.LEAD_NOTIFY_TO);

const transporter = enabled
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  : null;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Checks the SMTP login once at start-up so a wrong password shows up immediately. */
export async function verifyMailer() {
  if (!enabled) {
    console.info('[notify] Email alerts off: set SMTP_USER, SMTP_PASS and LEAD_NOTIFY_TO in backend/.env');
    return;
  }
  try {
    await transporter.verify();
    console.info(`[notify] Email alerts on: new leads will be sent to ${env.LEAD_NOTIFY_TO}`);
  } catch (err) {
    console.error(`[notify] Email login failed (${env.SMTP_HOST}): ${err.message}`);
  }
}

/**
 * Emails the owner about a new lead. Fire-and-forget: never throws,
 * so a mail problem can't break the form.
 */
export async function notifyNewLead(lead) {
  if (!enabled) return;

  const pkg = PACKAGE_LABELS[lead.package] ?? lead.package;
  const rows = [
    ['Name', lead.name],
    ['WhatsApp', `+91 ${lead.phone}`],
    ['City', lead.city],
    ['Sells', lead.product],
    ['Package', pkg],
    ['Received', new Date(lead.createdAt ?? Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
  ];
  const waLink = `https://wa.me/91${lead.phone}`;

  const text = [
    'New free audit request from vypaarmitra.com',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    `Reply on WhatsApp: ${waLink}`,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px">
      <h2 style="color:#0f2a43;margin:0 0 12px">New free audit request</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#5a6472;width:110px">${k}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#0f2a43;font-weight:600">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <p style="margin:20px 0">
        <a href="${waLink}" style="background:#f5a623;color:#0f2a43;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">Reply on WhatsApp</a>
      </p>
      <p style="color:#999;font-size:12px">Sent automatically by vypaarmitra.com</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"VypaarMitra Website" <${env.SMTP_USER}>`,
      to: env.LEAD_NOTIFY_TO,
      subject: `New audit request: ${lead.name} (${lead.city}) · ${pkg}`,
      text,
      html,
    });
    console.info(`[notify] Email alert sent for lead from ${lead.city}`);
  } catch (err) {
    console.error(`[notify] Could not send email alert: ${err.message}`);
  }
}
