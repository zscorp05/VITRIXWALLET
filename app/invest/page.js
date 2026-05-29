'use client'
import { useState } from 'react'

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

const initStocks = [
  { symbol:'AAPL', name:'Apple', price:189.42, change:2.3 },
  { symbol:'GOOGL', name:'Google', price:172.15, change:-0.8 },
  { symbol:'TSLA', name:'Tesla', price:248.90, change:5.1 },
  { symbol:'MSFT', name:'Microsoft', price:415.30, change:1.2 },
  { symbol:'NVDA', name:'Nvidia', price:875.60, change:8.4 },
]

export default function Invest() {
  const [tab, setTab] = useState('market')
  const [portfolio, setPortfolio] = useState([])
  const [cash, setCash] = useState(1000)
  const [buying, setBuying] = useState(null)
  const [shares, setShares] = useState(1)

  function buy(stock) {
    const cost = stock.price * shares
    if (cost > cash) return alert('Not enough virtual cash!')
    setCash(c => c - cost)
    setPortfolio(prev => { const ex=prev.find(p=>p.symbol===stock.symbol); if(ex) return prev.map(p=>p.symbol===stock.symbol?{...p,shares:p.shares+shares}:p); return [...prev,{...stock,shares}] })
    setBuying(null); setShares(1)
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="/invest" />
      <div style={{ flex:1, padding:32 }}>
        <h1 style={{ color:'white', fontSize:24, fontWeight:700, margin:'0 0 4px' }}>Invest</h1>
        <p style={{ color:'#8B8FA8', fontSize:14, margin:'0 0 28px' }}>Learn to invest with virtual money — no risk, real stocks</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginBottom:28 }}>
          {[
            { label:'Portfolio value', value:`$${portfolio.reduce((s,p)=>s+p.price*p.shares,0).toFixed(2)}`, color:'#00D4AA' },
            { label:'Virtual cash', value:`$${cash.toFixed(2)}`, color:'#6C63FF' },
            { label:'Holdings', value:portfolio.length, color:'#FFB347' },
          ].map((s,i) => (
            <div key={i} style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:20 }}>
              <div style={{ fontSize:11, color:'#8B8FA8', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
              <div style={{ fontSize:26, fontWeight:700, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display:'inline-flex', background:'#1A1D2E', borderRadius:12, padding:4, marginBottom:24, gap:4 }}>
          {['market','portfolio','learn'].map(t => <button key={t} onClick={()=>setTab(t)} style={{ padding:'8px 20px', borderRadius:8, border:'none', background:tab===t?'#6C63FF':'transparent', color:tab===t?'white':'#8B8FA8', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'Inter, sans-serif', textTransform:'capitalize' }}>{t}</button>)}
        </div>
        {tab==='market' && (
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', background:'rgba(0,212,170,0.1)', borderRadius:10, marginBottom:20, fontSize:13, color:'#00D4AA' }}>🎮 Virtual mode — $1,000 virtual cash. No real money.</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {initStocks.map(stock => (
                <div key={stock.symbol} style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'18px 22px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:'#222640', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#6C63FF' }}>{stock.symbol}</div>
                    <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:14, color:'white' }}>{stock.name}</div><div style={{ fontSize:12, color:'#8B8FA8' }}>{stock.symbol}</div></div>
                    <div style={{ textAlign:'right', marginRight:16 }}><div style={{ fontWeight:700, fontSize:16, color:'white' }}>${stock.price.toFixed(2)}</div><div style={{ fontSize:13, color:stock.change>0?'#00D4AA':'#FF6B6B' }}>{stock.change>0?'↑':'↓'} {Math.abs(stock.change)}%</div></div>
                    <button onClick={()=>setBuying(buying?.symbol===stock.symbol?null:stock)} style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'9px 18px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Buy</button>
                  </div>
                  {buying?.symbol===stock.symbol && (
                    <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:12, alignItems:'center' }}>
                      <div><label style={{ fontSize:12, color:'#8B8FA8', display:'block', marginBottom:6 }}>Shares</label><input type="number" min="1" value={shares} onChange={e=>setShares(Number(e.target.value))} style={{ width:80, background:'#222640', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, color:'white', padding:'8px 10px', fontSize:13, fontFamily:'Inter, sans-serif', outline:'none' }}/></div>
                      <div><div style={{ fontSize:12, color:'#8B8FA8' }}>Total</div><div style={{ fontSize:18, fontWeight:700, color:'#6C63FF' }}>${(stock.price*shares).toFixed(2)}</div></div>
                      <button onClick={()=>buy(stock)} style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'10px 20px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Confirm</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==='portfolio' && (
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
            <h3 style={{ color:'white', fontSize:16, fontWeight:700, margin:'0 0 20px' }}>My holdings</h3>
            {portfolio.length===0 ? <div style={{ textAlign:'center', padding:'40px 20px', color:'#8B8FA8' }}>No holdings yet. Buy your first stock in the Market tab!</div> : portfolio.map(p => (
              <div key={p.symbol} style={{ display:'flex', alignItems:'center', gap:14, padding:14, background:'#222640', borderRadius:12, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:'#1A1D2E', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, color:'#6C63FF' }}>{p.symbol}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:13, color:'white' }}>{p.name}</div><div style={{ fontSize:12, color:'#8B8FA8' }}>{p.shares} shares</div></div>
                <div style={{ textAlign:'right' }}><div style={{ fontWeight:700, color:'white' }}>${(p.price*p.shares).toFixed(2)}</div><div style={{ fontSize:12, color:p.change>0?'#00D4AA':'#FF6B6B' }}>{p.change>0?'+':''}{p.change}%</div></div>
              </div>
            ))}
          </div>
        )}
        {tab==='learn' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
            {[
              { title:'What is a stock?', emoji:'📈', content:'A stock is a tiny piece of ownership in a company. When you buy Apple stock, you own a small part of Apple. If Apple grows, your stock grows too.', level:'Beginner' },
              { title:'Compound interest', emoji:'🔄', content:'Earning interest on your interest. $100 at 10%/yr becomes $110 after year 1. Year 2 you earn 10% on $110. It snowballs massively over decades.', level:'Beginner' },
              { title:'Index funds', emoji:'🏦', content:'Instead of picking one company, you own a tiny piece of 500 companies at once. Less risk, steady growth. Most experts recommend this over picking stocks.', level:'Intermediate' },
              { title:'Dollar-cost averaging', emoji:'📅', content:'Invest a fixed amount every month regardless of price. You buy more shares when cheap, fewer when expensive. Removes emotion from investing.', level:'Intermediate' },
              { title:'Diversification', emoji:'⚖️', content:"Don't put all your eggs in one basket. Spread investments across sectors so one company failing won't wipe you out.", level:'Beginner' },
              { title:'P/E ratio', emoji:'📊', content:'Price-to-Earnings ratio shows how much you pay per dollar of profit. Used to judge if a stock is cheap or expensive compared to its earnings.', level:'Advanced' },
            ].map((l,i) => (
              <div key={i} style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:22 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontSize:28 }}>{l.emoji}</span>
                  <span style={{ fontSize:11, background:l.level==='Beginner'?'rgba(0,212,170,0.15)':l.level==='Intermediate'?'rgba(255,179,71,0.15)':'rgba(255,107,107,0.15)', color:l.level==='Beginner'?'#00D4AA':l.level==='Intermediate'?'#FFB347':'#FF6B6B', padding:'3px 10px', borderRadius:6, fontWeight:600 }}>{l.level}</span>
                </div>
                <h4 style={{ color:'white', fontWeight:700, fontSize:14, margin:'0 0 8px' }}>{l.title}</h4>
                <p style={{ fontSize:13, color:'#8B8FA8', lineHeight:1.6, margin:0 }}>{l.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
