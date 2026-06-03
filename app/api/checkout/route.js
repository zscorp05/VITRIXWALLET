import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { rateLimit } from '@/lib/rateLimit'
import { validateEmail } from '@/lib/validate'

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Payments not configured' }, { status: 503 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { priceId, email } = await req.json()

  if (!priceId || !validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard?upgraded=true`,
    cancel_url: `${baseUrl}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
