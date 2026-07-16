# SentientOS™ AR Glasses Pre-Order Landing Page

A premium black-and-gold Next.js landing page for Sentient Connect™, SentientOS™, and AURA Genesis™.

## Included

- Official Sentient Connect logo lockup with the phoenix mark and “Powered by SentientOS™” tagline
- Animated AR-glasses hero section using the supplied product image
- MIND | BODY | SPIRIT Triangulation™ visualization
- AURA Genesis™ daily check-in demonstration
- Human Layer accountability flow
- Illustrative progress and follow-through charts
- $25 pre-order conversion section
- Mobile sticky CTA
- FAQ, disclosures, SEO metadata, Vercel Analytics, and scroll tracking
- Secure hosted-checkout handoff architecture

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Connect the live $25 checkout

1. Copy `.env.example` to `.env.local`.
2. Add the hosted checkout URL from Authorize.net or GoHighLevel:

```env
NEXT_PUBLIC_CHECKOUT_URL=https://your-secure-checkout-link
```

3. Optional: set `RESERVATION_WEBHOOK_URL` to send lead details to GoHighLevel, n8n, or another HTTPS webhook before redirecting to payment.

## Deploy to Vercel

Upload the project to GitHub, import the repository into Vercel, and add the same environment variables in Vercel Project Settings → Environment Variables.

## Important

The site labels all performance charts as illustrative and includes the required pre-order, price, subscription, and non-medical disclosures. Replace placeholder policy links in `components/footer.tsx` when the legal pages are published.
