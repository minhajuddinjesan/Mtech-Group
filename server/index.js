import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Source of truth for prices (in euro cents)
const CATALOG = {
  video: { name: 'Video Editing Package', amount: 14900 },
  website: { name: 'Website Development', amount: 49900 },
  app: { name: 'Mobile / Web App Development', amount: 149900 },
  support: { name: 'IT Support & Maintenance (monthly)', amount: 9900 },
};

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json({ limit: '20kb' }));
app.set('trust proxy', 1); // so req.ip is the visitor's address behind Render/Railway/Fly

// ── Quote requests → email ─────────────────────────────────────
// Sends the contact form to your inbox through Resend (resend.com, free tier).
// .env: RESEND_API_KEY (required), CONTACT_TO (your inbox), CONTACT_FROM (a sender on a domain verified in Resend)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_API_URL = process.env.RESEND_API_URL || 'https://api.resend.com/emails';
const CONTACT_TO = process.env.CONTACT_TO || 'm.techgroup@outlook.com';
const CONTACT_FROM = process.env.CONTACT_FROM || 'M Tech website <onboarding@resend.dev>';

// At most 5 requests per visitor every 15 minutes, to stop spam floods
const RATE_WINDOW = 15 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();
const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > RATE_MAX;
};

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

app.post('/api/contact', async (req, res) => {
  // Bots fill every field, including this hidden one. Pretend it worked so they don't retry.
  if (req.body.website) return res.json({ ok: true });

  if (rateLimited(req.ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes or email us directly.' });
  }

  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 200);
  const service = clean(req.body.service, 100) || 'Not specified';
  const budget = clean(req.body.budget, 100) || 'Not specified';
  const message = clean(req.body.message, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and a short message.' });
  }
  if (!RESEND_API_KEY) {
    // The website falls back to opening the visitor's email app when it sees this
    return res.status(503).json({ error: 'Email sending is not configured. Add RESEND_API_KEY to .env.' });
  }

  const rows = [['Name', name], ['Email', email], ['Service', service], ['Budget', budget]];
  try {
    const r = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email, // pressing Reply answers the visitor directly
        subject: `New quote request: ${service} from ${name}`,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`,
        html: `<h2>New quote request</h2><table>${rows
          .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
          .join('')}</table><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'Could not send your message right now.' });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Could not send your message right now.' });
  }
});

app.post('/api/checkout', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.' });
    }

    const item = CATALOG[req.body.serviceId];
    if (!item) return res.status(400).json({ error: 'Unknown service' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        quantity: 1,
        price_data: { currency: 'eur', unit_amount: item.amount, product_data: { name: item.name } },
      }],
      success_url: `${CLIENT_URL}/?status=success`,
      cancel_url: `${CLIENT_URL}/?status=cancelled#services`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create checkout session' });
  }
});

app.listen(process.env.PORT || 3001, () => console.log('API running'));
