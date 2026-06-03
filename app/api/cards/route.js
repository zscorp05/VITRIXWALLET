import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { rateLimit } from '@/lib/rateLimit'

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!rateLimit(ip, 20, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { cardId, locked, familyId } = await req.json()
  if (!cardId || typeof locked !== 'boolean' || !familyId) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { error } = await supabase
    .from('cards')
    .update({ locked })
    .eq('id', cardId)
    .eq('family_id', familyId)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true, locked })
}

export async function GET(req) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const familyId = new URL(req.url).searchParams.get('family_id')
  if (!familyId) return NextResponse.json({ error: 'family_id required' }, { status: 400 })

  const { data, error } = await supabase.from('cards').select('*').eq('family_id', familyId)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ cards: data })
}
