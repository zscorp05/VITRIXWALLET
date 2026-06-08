# Vitrix

Next.js App Router budgeting app using Supabase Auth/Data and Stripe Checkout.

## Run Locally

```bash
npm install
npm run dev
```

## Supabase Auth Setup

In Supabase Dashboard > Authentication > URL Configuration:

- Site URL: your production URL, for example `https://your-app.vercel.app`
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://your-app.vercel.app/auth/callback`

The app uses `/auth/callback` to exchange Supabase email confirmation codes for a real session, then redirects to `/dashboard`.

Required environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. It is used by `/api/profile/bootstrap` to create the user's `families` and `profiles` rows after login while keeping Row Level Security strict.

## Stripe Setup

The app already has a server Checkout route at `/api/checkout` and pricing buttons at `/pricing`.

1. In Stripe Dashboard, create Products and recurring Prices for Family and Premium.
2. Add these variables in Vercel and local `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_FAMILY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

3. Deploy to Vercel and test from `/pricing`.

Stripe Checkout Sessions use `mode: 'subscription'` and Price IDs, matching Stripe's hosted Checkout subscription flow.
