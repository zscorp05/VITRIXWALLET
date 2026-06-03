import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'
import { validateEmail } from '@/lib/validate'

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email alerts not configured' }, { status: 503 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { email, name, category, spent, limit, memberName } = body

  if (!validateEmail(email) || !category || spent == null || !limit) {
    return NextResponse.json({ error: 'Invalid alert payload' }, { status: 400 })
  }

  const pct = Math.round((spent / limit) * 100)

  await resend.emails.send({
    from: process.env.RESEND_FROM || 'Vitrix <onboarding@resend.dev>',
    to: email,
    subject: `Budget alert — ${category} is ${pct}% used`,
    html: `
      <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;background:#080808;color:#F2EBE0;padding:32px;border-radius:16px">
        <h2 style="color:#E8C96A;margin:0 0 16px">Budget alert</h2>
        <p style="color:#B8A88A;line-height:1.6">Hi ${name || 'there'},</p>
        <p style="color:#B8A88A;line-height:1.6">${memberName || 'A family member'} has used <strong style="color:#E8C96A">${pct}%</strong> of the <strong>${category}</strong> budget ($${spent} / $${limit}).</p>
        <p style="color:#8A8070;font-size:12px;margin-top:24px">— Vitrix Private Family Finance</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
