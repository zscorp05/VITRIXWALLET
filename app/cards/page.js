'use client'
import { useState } from 'react'

const nav = [{href:'/dashboard',label:'Dashboard',e:'🏠'},{href:'/budget',label:'Budget',e:'📊'},{href:'/cards',label:'Cards',e:'💳'},{href:'/family',label:'Family',e:'👨‍👩‍👧'},{href:'/ai-coach',label:'AI Coach',e:'🤖'},{href:'/credit',label:'Credit Score',e:'⭐'},{href:'/invest',label:'Invest',e:'📈'},{href:'/feed',label:'Finance Feed',e:'📱'}]
function Sidebar({ active }) {
  return (
    <div style={{ width: 220, background: '#1A1D2E', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '24px 14px', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'sticky', top: 0, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6C63FF, #00D4AA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16 }}>V</div>
        <span style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>VITRIX</span>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {nav.map(item => (
          <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', background: active===item.href?'rgba(108,99,255,0.15)':'transparent', color: active===item.href?'#6C63FF':'#8B8FA8', fontSize: 14, fontWeight: active===item.href?600:400 }}>
            <span>{item.e}</span>{item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

const initCards = [
  { id:1, name:"Erik's Visa", last4:'4821', balance:2840, limit:5000, locked:false, owner:'Erik', color:'#6C63FF', spendLimit:null },
  { id:2, name:"Sofia's Card", last4:'9204', balance:85, limit:150, locked:false, owner:'Sofia', color:'#00D4AA', spendLimit:150 },
  { id:3, name:"Marco's Card", last4:'3317', balance:42, limit:100, locked:true, owner:'Marco', color:'#FFB347', spendLimit:100 },
]

export default function Cards() {
  const [cards, setCards] = useState(initCards)
  const [sel, setSel] = useState(0)
  const [newLimit, setNewLimit] = useState('')
  const [editLimit, setEditLimit] = useState(false)
  const card = cards[sel]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F1117', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar active="/cards" />
      <div style={{ flex: 1, padding: 32 }}>
        <h1 style={{ color: 'white', fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Cards</h1>
        <p style={{ color: '#8B8FA8', fontSize: 14, margin: '0 0 28px' }}>Manage and lock family cards</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cards.map((c,i) => (
              <div key={c.id} onClick={() => setSel(i)} style={{ borderRadius: 20, padding: '28px 32px', cursor: 'pointer', background: `linear-gradient(135deg, ${c.color}CC, ${c.color}66)`, border: sel===i?'2px solid white':'2px solid transparent', opacity: c.locked?0.65:1, position: 'relative', overflow: 'hidden', transition: 'all 0.2s' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>VITRIX</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{c.name}</div>
                  </div>
                  {c.locked && <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 6, padding: '3px 10px', fontSize: 12, color: 'white', fontWeight: 600 }}>🔒 LOCKED</span>}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 18, color: 'white', letterSpacing: '0.15em', marginBottom: 20 }}>•••• •••• •••• {c.last4}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Balance</div><div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>${c.balance}</div></div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Owner</div><div style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{c.owner}</div></div>
                </div>
                {c.spendLimit && <div style={{ marginTop: 14 }}><div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}><div style={{ height: '100%', borderRadius: 2, width: `${Math.min((c.balance/c.spendLimit)*100,100)}%`, background: 'rgba(255,255,255,0.8)' }} /></div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Limit: ${c.spendLimit}/mo</div></div>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: 15, margin: '0 0 6px' }}>Card controls</h3>
              <p style={{ color: '#8B8FA8', fontSize: 13, margin: '0 0 20px' }}>Managing: <strong style={{ color: 'white' }}>{card.name}</strong></p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#222640', borderRadius: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Card lock</div>
                  <div style={{ fontSize: 12, color: '#8B8FA8' }}>Block all transactions instantly</div>
                </div>
                <button onClick={() => setCards(cards.map(c => c.id===card.id?{...c,locked:!c.locked}:c))} style={{ width: 52, height: 28, borderRadius: 14, background: card.locked?'#FF6B6B':'#00D4AA', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
                  <div style={{ position: 'absolute', top: 4, left: card.locked?4:28, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
                </button>
              </div>
              <div style={{ padding: '14px 16px', background: '#222640', borderRadius: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: editLimit?10:0 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Spend limit</div>
                    <div style={{ fontSize: 12, color: '#8B8FA8' }}>{card.spendLimit?`$${card.spendLimit}/mo`:'No limit set'}</div>
                  </div>
                  <button onClick={() => setEditLimit(!editLimit)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 12px', color: '#8B8FA8', cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Edit</button>
                </div>
                {editLimit && <div style={{ display: 'flex', gap: 8, marginTop: 10 }}><input type="number" placeholder="150" value={newLimit} onChange={e => setNewLimit(e.target.value)} style={{ flex: 1, background: '#0F1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'white', padding: '8px 10px', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' }} /><button onClick={() => { setCards(cards.map(c => c.id===card.id?{...c,spendLimit:Number(newLimit)}:c)); setEditLimit(false) }} style={{ background: '#6C63FF', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Set</button></div>}
              </div>
              <div style={{ padding: '14px 16px', background: '#222640', borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 12 }}>Alerts</div>
                {['Transaction over $50','Near limit (80%)','Declined transaction'].map((a,i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: i<2?10:0 }}>
                    <span style={{ fontSize: 13, color: '#8B8FA8' }}>{a}</span>
                    <div style={{ width: 36, height: 20, borderRadius: 10, background: '#6C63FF', position: 'relative' }}><div style={{ position: 'absolute', top: 2, left: 18, width: 16, height: 16, borderRadius: '50%', background: 'white' }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
