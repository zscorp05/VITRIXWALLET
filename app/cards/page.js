'use client'
import { useState, useEffect } from 'react'
import AppShell from '@/components/AppShell'
import { supabase } from '@/lib/supabase'
import { logAction } from '@/lib/audit'
import { chartColors } from '@/lib/theme'

const demoCards = [
  { id: 'd1', name: "Erik's Visa", last4: '4821', locked: false, spend_limit: null, color: chartColors[0] },
  { id: 'd2', name: "Sofia's Card", last4: '9204', locked: false, spend_limit: 150, color: chartColors[1] },
  { id: 'd3', name: "Marco's Card", last4: '3317', locked: true, spend_limit: 100, color: chartColors[3] },
]

export default function Cards() {
  const [cards, setCards] = useState(demoCards)
  const [profile, setProfile] = useState(null)
  const [sel, setSel] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newLimit, setNewLimit] = useState('')
  const [editLimit, setEditLimit] = useState(false)
  const card = cards[sel]

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (!prof) {
        setLoading(false)
        return
      }
      setProfile(prof)
      const { data: c } = await supabase.from('cards').select('*').eq('family_id', prof.family_id)
      if (c?.length) {
        setCards(c.map((item, i) => ({ ...item, color: chartColors[i % chartColors.length], spendLimit: item.spend_limit })))
      } else {
        const { data: inserted } = await supabase.from('cards').insert({
          name: `${prof.name}'s Card`,
          last4: '0000',
          locked: false,
          family_id: prof.family_id,
          user_id: prof.id,
        }).select()
        if (inserted?.length) setCards(inserted.map((item, i) => ({ ...item, color: chartColors[i % chartColors.length], spendLimit: item.spend_limit })))
      }
      setLoading(false)
    }
    load()
  }, [])

  async function toggleLock(c) {
    const newLocked = !c.locked
    await logAction('card_lock_toggle', { cardId: c.id, locked: newLocked, cardName: c.name })
    if (profile?.family_id && c.id && !String(c.id).startsWith('d')) {
      await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: c.id, locked: newLocked, familyId: profile.family_id }),
      })
    }
    setCards(cards.map(x => (x.id === c.id ? { ...x, locked: newLocked } : x)))
  }

  async function updateLimit(c) {
    if (!newLimit) return
    if (profile?.family_id && c.id && !String(c.id).startsWith('d')) {
      await supabase.from('cards').update({ spend_limit: Number(newLimit) }).eq('id', c.id)
    }
    setCards(cards.map(x => (x.id === c.id ? { ...x, spend_limit: Number(newLimit), spendLimit: Number(newLimit) } : x)))
    setEditLimit(false)
    setNewLimit('')
  }

  if (loading) {
    return <AppShell title="Cards"><p style={{ color: 'var(--text2)' }}>Loading cards...</p></AppShell>
  }

  return (
    <AppShell title="Cards" subtitle="Manage and lock family cards">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {cards.map((c, i) => (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => setSel(i)}
              onKeyDown={e => e.key === 'Enter' && setSel(i)}
              style={{
                borderRadius: 20, padding: '28px 32px', cursor: 'pointer',
                background: `linear-gradient(135deg, ${c.color || chartColors[0]}CC, ${c.color || chartColors[0]}55)`,
                border: sel === i ? '2px solid var(--accent)' : '2px solid transparent',
                opacity: c.locked ? 0.65 : 1,
              }}
            >
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Vitrix</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', margin: '8px 0' }}>{c.name}</div>
              <div style={{ fontFamily: 'monospace', color: 'white', letterSpacing: '0.15em' }}>•••• •••• •••• {c.last4}</div>
              {c.locked && <span style={{ fontSize: 12, color: 'white', marginTop: 12, display: 'block' }}>LOCKED</span>}
            </div>
          ))}
        </div>

        {card && (
          <div className="card">
            <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 20px' }}>Card controls</h3>
            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>{card.name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: 14, background: 'var(--bg3)', borderRadius: 12 }}>
              <span>Card lock</span>
              <button type="button" onClick={() => toggleLock(card)} style={{
                width: 52, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative',
                background: card.locked ? 'var(--danger)' : 'var(--success)',
              }}>
                <div style={{ position: 'absolute', top: 4, left: card.locked ? 4 : 28, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
              </button>
            </div>
            {editLimit ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="number" value={newLimit} onChange={e => setNewLimit(e.target.value)} placeholder="150" />
                <button type="button" className="btn-primary" onClick={() => updateLimit(card)}>Set</button>
              </div>
            ) : (
              <button type="button" className="btn-ghost" onClick={() => setEditLimit(true)}>Edit spend limit</button>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
