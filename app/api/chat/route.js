import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!rateLimit(ip, 20, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured. Add OPENAI_API_KEY to .env.local' },
      { status: 500 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { messages, systemPrompt } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages array required' }, { status: 400 })
  }

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            systemPrompt ||
            'You are Vitrix AI, a friendly personal finance coach. Keep answers concise and practical.',
        },
        ...messages.filter(m => m.role === 'user' || m.role === 'assistant'),
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
  })

  const data = await openaiRes.json().catch(() => ({}))

  if (!openaiRes.ok) {
    const message =
      data?.error?.message || `OpenAI request failed (${openaiRes.status})`
    return NextResponse.json({ error: message }, { status: openaiRes.status })
  }

  return NextResponse.json(data)
}
