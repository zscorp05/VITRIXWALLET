import { supabase } from '@/lib/supabase'

export async function logAction(action, details = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('family_id')
      .eq('id', user.id)
      .single()

    await supabase.from('audit_logs').insert({
      user_id: user.id,
      family_id: profile?.family_id,
      action,
      details,
    })
  } catch (err) {
    console.error('Audit log error:', err)
  }
}
