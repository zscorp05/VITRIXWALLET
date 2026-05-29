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

const initMembers = [
  { id:1, name:'Erik Rodriguez', role:'parent', avatar:'ER', spent:1240, limit:null },
  { id:2, name:'Sofia Rodriguez', role:'child', avatar:'SR', spent:85, limit:150 },
  { id:3, name:'Marco Rodriguez', role:'child', avatar:'MR', spent:42, limit:100 },
]
const txs = [
  { id:1, description:'Whole Foods', amount:87.43, date:'2026-05-25', status:'approved', user:'Erik' },
  { id:2, description:'Roblox', amount:25.00, date:'2026-05-24', status:'blocked', user:'Sofia' },
  { id:3, description:'Amazon', amount:34.99, date:'2026-05-22', status:'approved', user:'Marco' },
  { id:4, description:'Fortnite', amount:19.99, date:'2026-05-19', status:'pending', user:'Marco' },
]

export default function Family() {
  const [members, setMembers] = useState(initMembers)
  const [show, setShow] = useState(false)
  const [newM, setNewM] = useState({ name:'', role:'child', limit:100 })
  const inp = { background:'#222640', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'white', padding:'10px 12px', fontSize:13, fontFamily:'Inter, sans-serif', outline:'none', width:'100%', boxSizing:'border-box' }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="/family" />
      <div style={{ flex:1, padding:32 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <h1 style={{ color:'white', fontSize:24, fontWeight:700, margin:'0 0 4px' }}>Family</h1>
            <p style={{ color:'#8B8FA8', fontSize:14, margin:0 }}>{members.length} members</p>
          </div>
          <button onClick={() => setShow(!show)} style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:12, padding:'11px 22px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>+ Add member</button>
        </div>
        {show && (
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(108,99,255,0.3)', borderRadius:16, padding:24, marginBottom:24 }}>
            <h4 style={{ color:'white', margin:'0 0 16px' }}>Add family member</h4>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:14, marginBottom:16 }}>
              <div><label style={{ fontSize:12, color:'#8B8FA8', display:'block', marginBottom:6 }}>Name</label><input placeholder="Full name" value={newM.name} onChange={e => setNewM({...newM,name:e.target.value})} style={inp} /></div>
              <div><label style={{ fontSize:12, color:'#8B8FA8', display:'block', marginBottom:6 }}>Role</label><select value={newM.role} onChange={e => setNewM({...newM,role:e.target.value})} style={inp}><option value="parent">Parent</option><option value="child">Child</option><option value="teen">Teen</option></select></div>
              {newM.role!=='parent' && <div><label style={{ fontSize:12, color:'#8B8FA8', display:'block', marginBottom:6 }}>Monthly limit ($)</label><input type="number" value={newM.limit} onChange={e => setNewM({...newM,limit:Number(e.target.value)})} style={inp} /></div>}
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => { if(!newM.name) return; const i=newM.name.split(' ').map(n=>n[0]).join('').toUpperCase(); setMembers([...members,{id:Date.now(),...newM,avatar:i,spent:0}]); setShow(false); setNewM({name:'',role:'child',limit:100}) }} style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'10px 20px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Add</button>
              <button onClick={() => setShow(false)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'10px 20px', fontSize:13, color:'#8B8FA8', cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Cancel</button>
            </div>
          </div>
        )}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16, marginBottom:28 }}>
          {members.map(m => {
            const isKid = m.role!=='parent'
            const pct = isKid&&m.limit ? m.spent/m.limit : 0
            return (
              <div key={m.id} style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:22 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:m.role==='parent'?'linear-gradient(135deg, #6C63FF, #00D4AA)':'linear-gradient(135deg, #FFB347, #FF6B6B)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:15, flexShrink:0 }}>{m.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:15, color:'white' }}>{m.name}</div>
                    <span style={{ fontSize:11, background:m.role==='parent'?'rgba(108,99,255,0.15)':'rgba(0,212,170,0.15)', color:m.role==='parent'?'#6C63FF':'#00D4AA', padding:'2px 8px', borderRadius:6, fontWeight:600 }}>{m.role}</span>
                  </div>
                  {isKid && <div style={{ textAlign:'right' }}><div style={{ fontSize:11, color:'#8B8FA8' }}>Spent</div><div style={{ fontSize:18, fontWeight:700, color:pct>0.8?'#FFB347':'white' }}>${m.spent}</div></div>}
                </div>
                {isKid&&m.limit && <>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#8B8FA8', marginBottom:6 }}><span>Monthly limit</span><span>${m.spent} / ${m.limit}</span></div>
                  <div style={{ height:6, background:'#222640', borderRadius:3, marginBottom:14 }}><div style={{ height:'100%', borderRadius:3, width:`${Math.min(pct*100,100)}%`, background:pct>0.9?'#FF6B6B':pct>0.7?'#FFB347':'#00D4AA' }} /></div>
                </>}
                <div style={{ display:'flex', gap:8 }}>
                  {isKid && <button style={{ flex:1, padding:'8px', background:'rgba(255,107,107,0.1)', border:'1px solid rgba(255,107,107,0.3)', borderRadius:8, color:'#FF6B6B', cursor:'pointer', fontSize:12, fontFamily:'Inter, sans-serif' }}>🔒 Lock card</button>}
                  <button style={{ flex:1, padding:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#8B8FA8', cursor:'pointer', fontSize:12, fontFamily:'Inter, sans-serif' }}>Edit</button>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
          <h3 style={{ color:'white', fontSize:16, fontWeight:700, margin:'0 0 20px' }}>Family activity</h3>
          {txs.map(t => (
            <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:10, marginBottom:4 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:t.status==='blocked'?'rgba(255,107,107,0.15)':'rgba(0,212,170,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{t.status==='blocked'?'🚫':t.status==='pending'?'⏳':'✓'}</div>
              <div style={{ flex:1 }}><span style={{ fontSize:13, fontWeight:500, color:'white' }}>{t.user}</span><span style={{ fontSize:13, color:'#8B8FA8' }}> — {t.description}</span></div>
              <div style={{ fontSize:13, fontWeight:600, color:t.status==='blocked'?'#FF6B6B':'white' }}>${t.amount}</div>
              <div style={{ fontSize:11, color:'#555870' }}>{t.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
