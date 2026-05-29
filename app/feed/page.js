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

const catColors = { Saving:'#00D4AA', Budgeting:'#6C63FF', Investing:'#FFB347', Debt:'#FF6B6B', Credit:'#60A5FA' }
const allPosts = [
  { id:1, author:'FinanceKing', avatar:'FK', content:'Pay yourself first. Before you spend anything, move 20% to savings automatically. Your future self will thank you.', likes:2840, category:'Saving', time:'2h ago' },
  { id:2, author:'MoneyMom', avatar:'MM', content:'The 50/30/20 rule changed my life. 50% needs, 30% wants, 20% savings. Simple. Powerful. Start today.', likes:1920, category:'Budgeting', time:'4h ago' },
  { id:3, author:'TeenInvestor', avatar:'TI', content:'Started investing at 16. $50/month in index funds. At 25 I had $12,000 from $5,400 invested. Compound interest is magic.', likes:4510, category:'Investing', time:'6h ago' },
  { id:4, author:'DebtFree Dave', avatar:'DD', content:'Paid off $34,000 in debt in 18 months using the avalanche method. Attack the highest interest rate first. Always.', likes:3200, category:'Debt', time:'8h ago' },
  { id:5, author:'CreditQueen', avatar:'CQ', content:'Your credit score is a game. Learn the rules. Pay on time, keep utilization under 30%, never close old accounts.', likes:1750, category:'Credit', time:'12h ago' },
  { id:6, author:'BudgetBoss', avatar:'BB', content:'$5/day coffee = $1,825/yr. Invested at 10% for 30 years = $330,000. That is just one habit.', likes:5120, category:'Saving', time:'1d ago' },
  { id:7, author:'IndexFundIan', avatar:'II', content:'Stop picking stocks. 90% of fund managers cannot beat the S&P 500. Just buy VTI every month and forget about it.', likes:8340, category:'Investing', time:'1d ago' },
  { id:8, author:'NoMoreDebt', avatar:'ND', content:'Emergency fund first. Before investing, before anything — 3-6 months of expenses in a high yield savings account.', likes:2890, category:'Budgeting', time:'2d ago' },
]

export default function Feed() {
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  const [filter, setFilter] = useState('All')
  const filters = ['All','Saving','Budgeting','Investing','Debt','Credit']
  const filtered = filter==='All' ? allPosts : allPosts.filter(p=>p.category===filter)

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#0F1117', fontFamily:'Inter, sans-serif' }}>
      <Sidebar active="/feed" />
      <div style={{ flex:1, padding:32 }}>
        <h1 style={{ color:'white', fontSize:24, fontWeight:700, margin:'0 0 4px' }}>Finance Feed</h1>
        <p style={{ color:'#8B8FA8', fontSize:14, margin:'0 0 24px' }}>Learn from the community. Share what you know.</p>
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {filters.map(f => <button key={f} onClick={()=>setFilter(f)} style={{ padding:'8px 18px', borderRadius:20, border:'none', background:filter===f?'#6C63FF':'#1A1D2E', color:filter===f?'white':'#8B8FA8', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>{f}</button>)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:16, marginBottom:24 }}>
          {filtered.map(post => (
            <div key={post.id} style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:22, display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg, ${catColors[post.category]||'#6C63FF'}, ${catColors[post.category]||'#6C63FF'}88)`, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:13 }}>{post.avatar}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14, color:'white' }}>{post.author}</div><div style={{ fontSize:11, color:'#8B8FA8' }}>{post.time}</div></div>
                <span style={{ fontSize:11, background:(catColors[post.category]||'#6C63FF')+'22', color:catColors[post.category]||'#6C63FF', padding:'3px 8px', borderRadius:6, fontWeight:600 }}>{post.category}</span>
              </div>
              <p style={{ fontSize:14, lineHeight:1.7, color:'white', margin:0 }}>{post.content}</p>
              <div style={{ display:'flex', gap:12, borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:12 }}>
                <button onClick={()=>setLiked(l=>({...l,[post.id]:!l[post.id]}))} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:liked[post.id]?'#FF6B6B':'#8B8FA8', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>{liked[post.id]?'❤️':'🤍'} {post.likes+(liked[post.id]?1:0)}</button>
                <button style={{ background:'none', border:'none', color:'#8B8FA8', fontSize:13, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>💬 Reply</button>
                <button onClick={()=>setSaved(s=>({...s,[post.id]:!s[post.id]}))} style={{ marginLeft:'auto', background:saved[post.id]?'rgba(108,99,255,0.1)':'none', border:saved[post.id]?'1px solid rgba(108,99,255,0.3)':'none', borderRadius:8, padding:'4px 10px', color:saved[post.id]?'#6C63FF':'#8B8FA8', fontSize:13, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>{saved[post.id]?'🔖 Saved':'🔖 Save'}</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'#1A1D2E', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24 }}>
          <h4 style={{ color:'white', fontWeight:700, fontSize:14, margin:'0 0 12px' }}>Share a finance tip</h4>
          <textarea placeholder="Share something you have learned about money..." rows={3} style={{ width:'100%', background:'#222640', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'white', padding:'12px 14px', fontSize:14, fontFamily:'Inter, sans-serif', outline:'none', boxSizing:'border-box', resize:'vertical', marginBottom:12 }}/>
          <button style={{ background:'linear-gradient(135deg, #6C63FF, #8B84FF)', color:'white', border:'none', borderRadius:10, padding:'11px 22px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'Inter, sans-serif' }}>Post tip</button>
        </div>
      </div>
    </div>
  )
}
