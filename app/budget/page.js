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
          <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', background: active === item.href ? 'rgba(108,99,255,0.15)' : 'transparent', color: active === item.href ? '#6C63FF' : '#8B8FA8', fontSize: 14, fontWeight: active === item.href ? 600 : 400 }}>
            <span>{item.e}</span>{item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

const initial = [
  { category: 'Food', spent: 412, limit: 600, color: '#00D4AA' },
  { category: 'Entertainment', spent: 143, limit: 150, color: '#6C63FF' },
  { category: 'Transport', spent: 187, limit: 300, color: '#FFB347' },
  { category: 'Shopping', spent: 312, limit: 400, color: '#FF6B6B' },
  { category: 'Gaming', spent: 45, limit: 50, color: '#60A5FA' },
]

export default function Budget() {
  const [budgets, setBudgets] = useState(initial)
  const [show, setShow] = useState(false)
  const [newB, setNewB] = useState({ category: 'Food', limit: '', period: 'monthly', block: true })
  const inp = { background: '#222640', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'white', padding: '10px 12px', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F1117', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar active="/budget" />
      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Budget</h1>
            <p style={{ color: '#8B8FA8', fontSize: 14, margin: 0 }}>Set spending limits and rules for your family</p>
          </div>
          <button onClick={() => setShow(!show)} style={{ background: 'linear-gradient(135deg, #6C63FF, #8B84FF)', color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add rule</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total budget', value: `$${budgets.reduce((s,b)=>s+b.limit,0)}`, color: '#6C63FF' },
            { label: 'Total spent', value: `$${budgets.reduce((s,b)=>s+b.spent,0)}`, color: '#FF6B6B' },
            { label: 'Remaining', value: `$${budgets.reduce((s,b)=>s+(b.limit-b.spent),0)}`, color: '#00D4AA' },
            { label: 'Categories', value: budgets.length, color: '#FFB347' },
          ].map((s,i) => (
            <div key={i} style={{ background: '#1A1D2E', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#8B8FA8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {show && (
          <div style={{ background: '#1A1D2E', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h4 style={{ color: 'white', margin: '0 0 16px' }}>New budget rule</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14, marginBottom: 16 }}>
              <div><label style={{ fontSize: 12, color: '#8B8FA8', display: 'block', marginBottom: 6 }}>Category</label>
                <select value={newB.category} onChange={e => setNewB({...newB, category: e.target.value})} style={inp}>
                  {['Food','Entertainment','Transport','Shopping','Gaming','Health','Education','Utilities'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={{ fontSize: 12, color: '#8B8FA8', display: 'block', marginBottom: 6 }}>Limit ($)</label>
                <input type="number" placeholder="500" value={newB.limit} onChange={e => setNewB({...newB, limit: Number(e.target.value)})} style={inp} />
              </div>
              <div><label style={{ fontSize: 12, color: '#8B8FA8', display: 'block', marginBottom: 6 }}>Period</label>
                <select value={newB.period} onChange={e => setNewB({...newB, period: e.target.value})} style={inp}>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div><label style={{ fontSize: 12, color: '#8B8FA8', display: 'block', marginBottom: 6 }}>Action</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[true,false].map(v => (
                    <button key={String(v)} onClick={() => setNewB({...newB, block: v})} style={{ flex: 1, padding: '9px', background: newB.block===v ? 'rgba(108,99,255,0.2)' : '#222640', border: newB.block===v ? '1px solid #6C63FF' : '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: newB.block===v ? '#6C63FF' : '#8B8FA8', cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                      {v ? '🔒 Block' : '🔔 Alert'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { if(!newB.limit) return; const colors=['#00D4AA','#6C63FF','#FFB347','#FF6B6B','#60A5FA']; setBudgets([...budgets,{...newB,spent:0,color:colors[budgets.length%colors.length]}]); setShow(false); setNewB({category:'Food',limit:'',period:'monthly',block:true}) }} style={{ background: 'linear-gradient(135deg, #6C63FF, #8B84FF)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Save rule</button>
              <button onClick={() => setShow(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 20px', fontSize: 13, color: '#8B8FA8', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {budgets.map((b,i) => {
            const pct = b.spent/b.limit
            const status = pct>=1?'exceeded':pct>0.85?'warning':'ok'
            return (
              <div key={i} style={{ background: '#1A1D2E', border: `1px solid ${status==='exceeded'?'rgba(255,107,107,0.4)':status==='warning'?'rgba(255,179,71,0.3)':'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{b.category}</div>
                    <div style={{ fontSize: 12, color: '#8B8FA8' }}>{b.period||'monthly'} budget</div>
                  </div>
                  {b.block && <span style={{ fontSize: 11, background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>🔒 Block</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: b.color }}>${b.spent}</span>
                  <span style={{ fontSize: 14, color: '#8B8FA8', alignSelf: 'flex-end' }}>/ ${b.limit}</span>
                </div>
                <div style={{ height: 6, background: '#222640', borderRadius: 3, marginBottom: 8 }}>
                  <div style={{ height: '100%', borderRadius: 3, width: `${Math.min(pct*100,100)}%`, background: status==='exceeded'?'#FF6B6B':status==='warning'?'#FFB347':b.color }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#8B8FA8' }}>{Math.round(pct*100)}% used</span>
                  <span style={{ color: status==='exceeded'?'#FF6B6B':status==='warning'?'#FFB347':'#00D4AA' }}>{status==='exceeded'?'🚫 Exceeded':status==='warning'?'⚠ Near limit':`$${b.limit-b.spent} left`}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
