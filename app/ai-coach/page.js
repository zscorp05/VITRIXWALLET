'use client'
import { useState, useRef, useEffect } from 'react'

const nav = [{href:'/dashboard',label:'Dashboard',e:'🏠'},{href:'/budget',label:'Budget',e:'📊'},{href:'/cards',label:'Cards',e:'💳'},{href:'/family',label:'Family',e:'👨‍👩‍👧'},{href:'/ai-coach',label:'AI Coach',e:'🤖'},{href:'/credit',label:'Credit Score',e:'⭐'},{href:'/invest',label:'Invest',e:'📈'},{href:'/feed',label:'Finance Feed',e:'📱'}]

function Sidebar({ active }) {
  return (
    <div style={{ width:220, background:'#1A1D2E', borderRight:'1px solid rgba(255,255,255,0.08)', padding:'24px 14px', display:'flex', flexDirection:'column', minHeight:'100vh', position:'sticky', top:0, flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg, #6C63FF, #00D4AA)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:16 }}>V</div>
        <span style={{ color:'white', fontWeight:800, fontSize:18 }}>VITRIX</span>
      </div>
      <nav style={{ display:'flex', flexDirection:'column', gap:4, flex:1 }}>
        {nav.map(item => (
          <a key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, textDecoration:'none', background:active===item.href?'rgba(108,99,255,0.15)':'transparent', color:active===item.href?'#6C63FF':'#8B8FA8', fontSize:14, fontWeight:active===item.href?600:400 }}>
            <span>{item.e}</span>{item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

const suggestions = ['Where is my money going?','Which subscriptions should I cancel?','How can I save $200 more per month?','Explain compound interest to a 12 year old','How do I improve my credit score?']

export default function AICoach() {
  const [messages, setMessages] = useState([{ role:'assistant', content:'Hi! I am your Vitrix AI coach. I am here to help you make smarter money decisions. What would you like to work on?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [keySet, setKeySet] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  async function send(text) {
    const msg = text || input
    if (!msg.trim() || !keySet) return
    setInput('')
    const updated = [...messages, { role:'user', content:msg }]
    setMessages(updated)
    setLoading(true)
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role:'system', content:'You are Vitrix AI, a friendly personal finance coach. Help with budgeting, saving, investing, and credit. Keep responses to 2-4 sentences. Be warm and encouraging.' },
            ...updated.map(m => ({ role:m.role, content:m.content }))
          ]
        })
      })
      const data = await res.json()
      console.log('AI:', data)
      setMessages([...updated, { role:'assistant', content: data.choices?.[0]?.message?.content || 'No response.' }])
    } catch(err) {
      console.log('Error:', err)
      setMessages([...updated, { role:'assistant', content:'Connection error.' }])
    }
    setLoading(false)
  }

  if (!keySet) {
    return (
      <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
        <Sidebar active="/ai-coach" />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:32, width:400 }}>
            <div style={{ fontSize:32, marginBottom:16, textAlign:'center' }}>🤖</div>
            <h3 style={{ color:'white', fontSize:18, fontWeight:700, margin:'0 0 8px', textAlign:'center' }}>Connect Vitrix AI</h3>
            <p style={{ color:'#8B8FA8', fontSize:13, margin:'0 0 20px', textAlign:'center', lineHeight:1.6 }}>Enter your OpenAI API key to enable AI coaching. Get one free at platform.openai.com</p>
            <input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              style={{ width:'100%', background:'#222640', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'white', padding:'12px 14px', fontSize:14, fontFamily:'Inter, sans-serif', outline:'none', boxSizing:'border-box', marginBottom:12 }}
            />
            <button
             onClick={() => { if(apiKey.startsWith('sk-')) { setKeySet(true) } else { alert('Key must start with sk-') } }}
              style={{ width:'100%', background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'12px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}
            >
              Connect AI
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="/ai-coach" />
      <div style={{ flex:1, display:'flex', gap:20, padding:32 }}>
        <div style={{ flex:1, background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg, #6C63FF, #00D4AA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🤖</div>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:'white' }}>Vitrix AI</div>
              <div style={{ fontSize:12, color:'#00D4AA' }}>Online · Powered by OpenAI</div>
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:16 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:'flex', gap:10, flexDirection:m.role==='user'?'row-reverse':'row', alignItems:'flex-end' }}>
                {m.role==='assistant' && <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg, #6C63FF, #00D4AA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>🤖</div>}
                <div style={{ maxWidth:'75%', padding:'12px 16px', borderRadius:m.role==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px', background:m.role==='user'?'linear-gradient(135deg, #6C63FF, #8B84FF)':'#222640', color:'white', fontSize:14, lineHeight:1.6 }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', gap:10, alignItems:'flex-end' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg, #6C63FF, #00D4AA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>🤖</div>
                <div style={{ padding:'12px 16px', background:'#222640', borderRadius:'16px 16px 16px 4px', display:'flex', gap:4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#6C63FF', animation:'pulse 1.2s ease-in-out infinite', animationDelay:`${i*0.2}s` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding:'16px 24px', borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', gap:10 }}>
            <input placeholder="Ask anything about your finances..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} style={{ flex:1, background:'#222640', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'white', padding:'12px 14px', fontSize:14, fontFamily:'Inter, sans-serif', outline:'none' }} />
            <button onClick={()=>send()} style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'12px 20px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Send</button>
          </div>
        </div>
        <div style={{ width:240 }}>
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 }}>
            <h4 style={{ color:'white', fontWeight:700, fontSize:14, margin:'0 0 14px' }}>Quick questions</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {suggestions.map((s,i) => <button key={i} onClick={()=>send(s)} style={{ background:'#222640', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'10px 12px', color:'#8B8FA8', fontSize:12, cursor:'pointer', textAlign:'left', lineHeight:1.4, fontFamily:'Inter, sans-serif' }}>{s}</button>)}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
    </div>
  )
}