'use client'

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

const score = 724
const change = 12
const history = [688,695,701,710,708,715,718,724]
const factors = [
  { name:'Payment history', status:'good', value:98, impact:'High' },
  { name:'Credit utilization', status:'fair', value:34, impact:'High' },
  { name:'Credit age', status:'good', value:72, impact:'Medium' },
  { name:'New inquiries', status:'good', value:90, impact:'Low' },
  { name:'Credit mix', status:'fair', value:55, impact:'Low' },
]

export default function Credit() {
  const pct = (score-300)/(850-300)
  const color = score>=740?'#00D4AA':score>=670?'#FFB347':'#FF6B6B'
  const label = score>=740?'Very Good':score>=670?'Good':'Fair'

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="/credit" />
      <div style={{ flex:1, padding:32 }}>
        <h1 style={{ color:'white', fontSize:24, fontWeight:700, margin:'0 0 4px' }}>Credit Score</h1>
        <p style={{ color:'#8B8FA8', fontSize:14, margin:'0 0 28px' }}>Track and improve your credit health</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'2.5rem', textAlign:'center' }}>
            <div style={{ fontSize:13, color:'#8B8FA8', marginBottom:20, textTransform:'uppercase', letterSpacing:'0.06em' }}>Your credit score</div>
            <svg viewBox="0 0 200 110" width="200" height="110" style={{ margin:'0 auto 20px', display:'block' }}>
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#222640" strokeWidth="16" strokeLinecap="round" />
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${pct*251.2} 251.2`} />
              <text x="100" y="82" textAnchor="middle" fill="white" fontSize="32" fontWeight="700" fontFamily="Inter">{score}</text>
              <text x="100" y="102" textAnchor="middle" fill={color} fontSize="12" fontWeight="600" fontFamily="Inter">{label}</text>
            </svg>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', background:'rgba(0,212,170,0.1)', borderRadius:20, color:'#00D4AA', fontWeight:600, fontSize:14 }}>↑ +{change} this month</div>
          </div>
          <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
            <h3 style={{ color:'white', fontSize:16, fontWeight:700, margin:'0 0 20px' }}>Score history</h3>
            <svg viewBox="0 0 300 160" width="100%" height="160">
              {[0,1,2,3].map(i=><line key={i} x1="0" y1={i*40} x2="300" y2={i*40} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
              {history.map((s,i) => { const x=(i/(history.length-1))*280+10; const y=140-((s-650)/100)*120; const next=history[i+1]; const nx=((i+1)/(history.length-1))*280+10; const ny=140-((next-650)/100)*120; return next?<line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>:null })}
              {history.map((s,i) => { const x=(i/(history.length-1))*280+10; const y=140-((s-650)/100)*120; return <g key={i}><circle cx={x} cy={y} r="4" fill={color}/><text x={x} y={y-10} textAnchor="middle" fill="#8B8FA8" fontSize="10" fontFamily="Inter">{s}</text></g> })}
            </svg>
          </div>
        </div>
        <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24, marginBottom:20 }}>
          <h3 style={{ color:'white', fontSize:16, fontWeight:700, margin:'0 0 20px' }}>Score factors</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:14 }}>
            {factors.map((f,i) => {
              const fc = f.status==='good'?'#00D4AA':'#FFB347'
              return (
                <div key={i} style={{ padding:16, background:'#222640', borderRadius:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                    <span style={{ fontSize:13, fontWeight:500, color:'white' }}>{f.name}</span>
                    <span style={{ fontSize:11, background:f.status==='good'?'rgba(0,212,170,0.15)':'rgba(255,179,71,0.15)', color:fc, padding:'2px 8px', borderRadius:6, fontWeight:600 }}>{f.status}</span>
                  </div>
                  <div style={{ height:6, background:'#0F1117', borderRadius:3, marginBottom:6 }}><div style={{ height:'100%', borderRadius:3, width:`${f.value}%`, background:fc }}/></div>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#8B8FA8' }}><span>{f.impact} impact</span><span>{f.value}%</span></div>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ background:'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,212,170,0.06))', border:'1px solid rgba(108,99,255,0.2)', borderRadius:16, padding:24 }}>
          <h3 style={{ color:'white', fontSize:16, fontWeight:700, margin:'0 0 16px' }}>How to improve</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
            {[
              { tip:'Keep utilization below 30%', impact:'+20-40 pts', note:'Currently at 34%' },
              { tip:'Never miss a payment', impact:'+10-20 pts', note:'98% on-time ✓' },
              { tip:'Keep oldest accounts open', impact:'+5-15 pts', note:'Good history ✓' },
              { tip:'Avoid new credit inquiries', impact:'+5-10 pts', note:'No recent pulls ✓' },
            ].map((t,i) => (
              <div key={i} style={{ padding:14, background:'#1A1D2E', borderRadius:10, border:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize:13, fontWeight:500, color:'white', marginBottom:6 }}>{t.tip}</div>
                <div style={{ fontSize:12, color:'#00D4AA', marginBottom:4 }}>Potential: {t.impact}</div>
                <div style={{ fontSize:11, color:'#8B8FA8' }}>{t.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
