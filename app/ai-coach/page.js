'use client'
import AppShell from '@/components/AppShell'
import { mockData } from '@/lib/supabase'
import { useState, useRef, useEffect } from 'react'

const systemPrompt = `You are Vitrix AI, a friendly and smart personal finance coach built into the Vitrix app. 
You help both adults and kids understand money, budgeting, investing, and credit scores.
For kids, explain things simply and encouragingly. For adults, be direct and data-driven.
Keep responses concise (2-4 sentences max unless asked for detail). Be warm but professional.
The user's data: ${JSON.stringify({ budgets: mockData.budgets, subscriptions: mockData.subscriptions, transactions: mockData.transactions.slice(0, 5) })}`

const suggestions = [
  'Where is my money going this month?',
  'Which subscriptions should I cancel?',
  'How can I save $200 more per month?',
  'Explain compound interest simply',
  'Am I on track with my budget?',
  'How do I improve my credit score?',
]

export default function AICoachPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Good day. I'm your Vitrix AI advisor. I have visibility into your spending data and I'm here to help you make smarter financial decisions. What would you like to work on?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send(text) {
    const msg = text || input
    if (!msg.trim()) return
    setInput('')
    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`)
      }
      const reply =
        data.choices?.[0]?.message?.content ||
        data.content?.[0]?.text ||
        "I couldn't generate a reply. Please try again."
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Connection issue — please try again.'
      setMessages([...newMessages, { role: 'assistant', content: message }])
    }
    setLoading(false)
  }

  return (
    <AppShell title="AI Coach">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20, height: 'calc(100vh - 160px)' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--bg)' }}>◆</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>Vitrix AI Advisor</div>
              <div style={{ fontSize: 11, color: 'var(--success)', letterSpacing: '0.04em' }}>● Online</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--bg)' }}>◆</div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '12px 16px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user' ? 'var(--gradient-gold)' : 'var(--bg3)',
                  color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
                  fontSize: 14, lineHeight: 1.65, fontWeight: m.role === 'user' ? 500 : 400,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--bg)' }}>◆</div>
                <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: 4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.2s ease-in-out infinite', animationDelay: `${i*0.2}s` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
            <input placeholder="Ask anything about your finances..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} />
            <button className="btn-primary" onClick={() => send()} style={{ padding: '10px 20px', fontSize: 13 }}>Send</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, margin: '0 0 14px' }}>Quick Questions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 9, padding: '10px 12px', color: 'var(--text2)',
                  fontSize: 12, cursor: 'pointer', textAlign: 'left', lineHeight: 1.45,
                  fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
                >{s}</button>
              ))}
            </div>
          </div>
          <div className="card-gold">
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>AI Summary</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
              Top opportunity: cut overlapping streaming services, saving ~$22/mo. Entertainment budget is 95% used with 6 days remaining.
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }`}</style>
    </AppShell>
  )
}