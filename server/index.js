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
app.use(express.json());

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
