import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { bootstrapUserProfile } from '@/lib/profile-bootstrap'

export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const profile = await bootstrapUserProfile(user)
    return NextResponse.json({ profile })
  } catch (err) {
    console.error('Profile bootstrap failed:', err)
    return NextResponse.json({ error: 'Profile setup failed' }, { status: 500 })
  }
}
