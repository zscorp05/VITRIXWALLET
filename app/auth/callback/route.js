import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { bootstrapUserProfile } from '@/lib/profile-bootstrap'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing-code', requestUrl.origin))
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL('/login?error=auth-callback', requestUrl.origin))
  }

  const { data: { user } } = await supabase.auth.getUser()

  try {
    await bootstrapUserProfile(user)
  } catch (err) {
    console.error('Profile bootstrap failed after auth callback:', err)
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
