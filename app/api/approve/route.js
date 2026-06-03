import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { rateLimit } from '@/lib/rateLimit'
import { validateEmail } from '@/lib/validate'

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!rateLimit(ip, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { transactionId, action, parentEmail, parentName, kidName, amount, description } = body

  if (!transactionId || !['approve', 'deny'].includes(action)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const status = action === 'approve' ? 'approved' : 'blocked'
  const { error } = await supabase.from('transactions').update({ status }).eq('id', transactionId)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action: `transaction_${action}`,
    details: { transactionId, amount, description, kidName },
  })

  if (process.env.RESEND_API_KEY && validateEmail(parentEmail)) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'Vitrix <onboarding@resend.dev>',
      to: parentEmail,
      subject: `${action === 'approve' ? 'Approved' : 'Denied'} — $${amount} ${description}`,
      html: `
        <div style="font-family:Georgia,serif;background:#080808;color:#F2EBE0;padding:32px;max-width:500px">
          <h2 style="color:${action === 'approve' ? '#E8C96A' : '#B86B5A'}">${action === 'approve' ? 'Purchase approved' : 'Purchase denied'}</h2>
          <p style="color:#B8A88A">Hi ${parentName || 'there'}, you ${action === 'approve' ? 'approved' : 'denied'} ${kidName || 'a family member'}'s $${amount} purchase at ${description}.</p>
          ${appUrl ? `<p><a href="${appUrl}/family" style="color:#C9A84C">View family activity</a></p>` : ''}
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
