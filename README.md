# M Tech Group website
React + Vite + Three.js (react-three-fiber) + Framer Motion, with Stripe Checkout via a small Express server.

## Run
1. `npm install`
2. `cp .env.example .env` and add your Stripe secret key (dashboard.stripe.com/test/apikeys)
3. `npm run dev` then open http://localhost:5173
Test card: 4242 4242 4242 4242, any future date, any CVC.

## Structure
- `src/components` UI + 3D scene, `src/data/services.js` service list, `src/lib/checkout.js` API call
- `server/index.js` creates Stripe sessions; prices live ONLY here (edit `CATALOG` and `services.js` together)

## Deploy
`npm run build` gives a static `dist/`. Host `server/` on Render/Railway/Fly, set env vars, and route `/api` to it.
