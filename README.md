# M Tech website
React + Vite + Three.js (react-three-fiber) + Framer Motion, with Stripe Checkout via a small Express server.

## Run
1. `npm install`
2. `cp .env.example .env` and add your Stripe secret key (dashboard.stripe.com/test/apikeys)
3. `npm run dev` then open http://localhost:5173
Test card: 4242 4242 4242 4242, any future date, any CVC.

## Quote form → your inbox
The contact form emails every request to the address in `src/data/content.js` (`contact.email`, now m.techgroup@outlook.com) through [FormSubmit](https://formsubmit.co). It is free, needs no account, no API key and no server.

**One-time activation (do this once after the site is live):**
1. Open your live website and send one test quote request.
2. Check the m.techgroup@outlook.com inbox (and the Junk folder) for an email from FormSubmit asking you to confirm the form.
3. Click **Activate Form**. From then on, every request arrives in your inbox as a neat table. Press Reply to answer the visitor directly.

Optional: the activation email also gives you a random code. Paste it into `formAlias` in `content.js` to hide your email address from spam bots.

If the email address changes, activate again with the new address. If FormSubmit ever fails, the form opens the visitor's own email app with the request written out, so no lead is lost. Spam protection: a hidden honeypot field plus FormSubmit's own spam filter.

*Advanced alternative:* `server/index.js` also has a `/api/contact` endpoint that sends through Resend (`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` in `.env`). The website does not use it unless you switch the URL in `src/components/Contact.jsx`.

## Content and legal
- Testimonials, clients, team, stats, phone, WhatsApp and socials: `src/data/content.js` (empty = hidden on the live site).
- Privacy policy: `public/privacy.html`. Fill in the yellow fields and delete the notice box before going live.

## Structure
- `src/components` UI + 3D scene, `src/data/services.js` service list, `src/lib/checkout.js` API call
- `server/index.js` creates Stripe sessions; prices live ONLY here (edit `CATALOG` and `services.js` together)

## Deploy
`npm run build` gives a static `dist/`. Host `server/` on Render/Railway/Fly, set env vars, and route `/api` to it.
