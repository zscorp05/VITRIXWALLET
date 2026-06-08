import { createSupabaseAdminClient } from '@/lib/supabase-admin'

function initialsFor(name, email) {
  const source = name?.trim() || email?.split('@')[0] || 'Vitrix User'
  return source
    .split(/\s+/)
    .map(part => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

export async function bootstrapUserProfile(user) {
  if (!user?.id) return null

  const admin = createSupabaseAdminClient()
  const { data: existing, error: existingError } = await admin
    .from('profiles')
    .select('id, family_id')
    .eq('id', user.id)
    .maybeSingle()

  if (existingError) throw existingError
  if (existing?.family_id) return existing

  const metadata = user.user_metadata || {}
  const name = metadata.name?.trim() || user.email?.split('@')[0] || 'Vitrix User'
  const role = metadata.role || 'parent'
  const firstName = name.split(/\s+/)[0] || 'Vitrix'

  const { data: family, error: familyError } = await admin
    .from('families')
    .insert({ name: `${firstName}'s Family` })
    .select('id')
    .single()

  if (familyError) throw familyError

  const profile = {
    id: user.id,
    name,
    role,
    family_id: family.id,
    avatar: initialsFor(name, user.email),
  }

  const { data, error } = await admin
    .from('profiles')
    .upsert(profile, { onConflict: 'id' })
    .select('id, family_id')
    .single()

  if (error) throw error
  return data
}
