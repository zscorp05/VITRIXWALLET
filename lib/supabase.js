import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Auth helpers ───────────────────────────────────────────────
export async function signUp(email, password, name, role) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role } }
  })
  return { data, error }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ─── Subscriptions ──────────────────────────────────────────────
export async function getSubscriptions(familyId) {
  return await supabase.from('subscriptions').select('*').eq('family_id', familyId)
}

export async function addSubscription(sub) {
  return await supabase.from('subscriptions').insert(sub)
}

export async function deleteSubscription(id) {
  return await supabase.from('subscriptions').delete().eq('id', id)
}

// ─── Transactions ───────────────────────────────────────────────
export async function getTransactions(familyId) {
  return await supabase.from('transactions').select('*').eq('family_id', familyId).order('date', { ascending: false })
}

export async function addTransaction(tx) {
  return await supabase.from('transactions').insert(tx)
}

// ─── Budget rules ───────────────────────────────────────────────
export async function getBudgetRules(familyId) {
  return await supabase.from('budget_rules').select('*').eq('family_id', familyId)
}

export async function addBudgetRule(rule) {
  return await supabase.from('budget_rules').insert(rule)
}

export async function deleteBudgetRule(id) {
  return await supabase.from('budget_rules').delete().eq('id', id)
}

// ─── Mock data for development ──────────────────────────────────
export const mockData = {
  user: { name: 'Erik Rodriguez', email: 'erik@vitrix.app', role: 'parent', avatar: 'ER' },
  family: [
    { id: 1, name: 'Erik Rodriguez', role: 'parent', avatar: 'ER', spent: 1240 },
    { id: 2, name: 'Sofia Rodriguez', role: 'child', avatar: 'SR', spent: 85, limit: 150 },
    { id: 3, name: 'Marco Rodriguez', role: 'child', avatar: 'MR', spent: 42, limit: 100 },
  ],
  subscriptions: [
    { id: 1, name: 'Netflix', amount: 15.99, category: 'Entertainment', billing_cycle: 'monthly', next_billing_date: '2026-06-01', color: '#E50914' },
    { id: 2, name: 'Spotify', amount: 9.99, category: 'Entertainment', billing_cycle: 'monthly', next_billing_date: '2026-06-05', color: '#1DB954' },
    { id: 3, name: 'Apple One', amount: 21.95, category: 'Entertainment', billing_cycle: 'monthly', next_billing_date: '2026-06-10', color: '#555' },
    { id: 4, name: 'Gym', amount: 39.99, category: 'Health', billing_cycle: 'monthly', next_billing_date: '2026-06-15', color: '#FF6B6B' },
    { id: 5, name: 'Adobe CC', amount: 54.99, category: 'Productivity', billing_cycle: 'monthly', next_billing_date: '2026-06-20', color: '#FF0000' },
    { id: 6, name: 'iCloud', amount: 2.99, category: 'Storage', billing_cycle: 'monthly', next_billing_date: '2026-06-25', color: '#007AFF' },
  ],
  transactions: [
    { id: 1, description: 'Whole Foods', amount: 87.43, category: 'Food', date: '2026-05-25', status: 'approved', user: 'Erik' },
    { id: 2, description: 'Shell Gas', amount: 62.10, category: 'Transport', date: '2026-05-24', status: 'approved', user: 'Erik' },
    { id: 3, description: 'Roblox', amount: 25.00, category: 'Gaming', date: '2026-05-24', status: 'blocked', user: 'Sofia' },
    { id: 4, description: 'Starbucks', amount: 7.85, category: 'Food', date: '2026-05-23', status: 'approved', user: 'Erik' },
    { id: 5, description: 'Amazon', amount: 34.99, category: 'Shopping', date: '2026-05-22', status: 'approved', user: 'Marco' },
    { id: 6, description: 'Netflix', amount: 15.99, category: 'Entertainment', date: '2026-05-21', status: 'approved', user: 'Erik' },
    { id: 7, description: 'Target', amount: 112.50, category: 'Shopping', date: '2026-05-20', status: 'approved', user: 'Erik' },
    { id: 8, description: 'Fortnite', amount: 19.99, category: 'Gaming', date: '2026-05-19', status: 'pending', user: 'Marco' },
  ],
  budgets: [
    { id: 1, category: 'Food', limit: 600, spent: 412, color: '#C9A84C', period: 'monthly' },
    { id: 2, category: 'Entertainment', limit: 150, spent: 143, color: '#A67C00', period: 'monthly' },
    { id: 3, category: 'Transport', limit: 300, spent: 187, color: '#E8C96A', period: 'monthly' },
    { id: 4, category: 'Shopping', limit: 400, spent: 312, color: '#B86B5A', period: 'monthly' },
    { id: 5, category: 'Gaming', limit: 50, spent: 45, color: '#D4A84A', period: 'monthly' },
    { id: 6, category: 'Health', limit: 200, spent: 89, color: '#8A7340', period: 'monthly' },
  ],
  creditScore: {
    score: 724,
    change: +12,
    history: [688, 695, 701, 710, 708, 715, 718, 724],
    factors: [
      { name: 'Payment history', impact: 'high', status: 'good', value: 98 },
      { name: 'Credit utilization', impact: 'high', status: 'fair', value: 34 },
      { name: 'Credit age', impact: 'medium', status: 'good', value: 72 },
      { name: 'New inquiries', impact: 'low', status: 'good', value: 90 },
      { name: 'Credit mix', impact: 'low', status: 'fair', value: 55 },
    ]
  },
  stocks: [
    { symbol: 'AAPL', name: 'Apple', price: 189.42, change: +2.3, owned: 2 },
    { symbol: 'GOOGL', name: 'Google', price: 172.15, change: -0.8, owned: 1 },
    { symbol: 'TSLA', name: 'Tesla', price: 248.90, change: +5.1, owned: 3 },
    { symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: +1.2, owned: 0 },
    { symbol: 'NVDA', name: 'Nvidia', price: 875.60, change: +8.4, owned: 1 },
  ],
  feed: [
    { id: 1, author: 'FinanceKing', avatar: 'FK', content: 'Pay yourself first. Before you spend anything, move 20% to savings automatically. Your future self will thank you.', likes: 2840, category: 'Saving', time: '2h ago' },
    { id: 2, author: 'MoneyMom', avatar: 'MM', content: 'The 50/30/20 rule changed my life. 50% needs, 30% wants, 20% savings. Simple. Powerful. Start today.', likes: 1920, category: 'Budgeting', time: '4h ago' },
    { id: 3, author: 'TeenInvestor', avatar: 'TI', content: 'Started investing at 16. $50/month in index funds. At 25 I had $12,000 from $5,400 invested. Compound interest is magic.', likes: 4510, category: 'Investing', time: '6h ago' },
    { id: 4, author: 'DebtFree Dave', avatar: 'DD', content: 'Paid off $34,000 in debt in 18 months using the avalanche method. Attack the highest interest rate first. Always.', likes: 3200, category: 'Debt', time: '8h ago' },
    { id: 5, author: 'CreditQueen', avatar: 'CQ', content: 'Your credit score is a game. Learn the rules. Pay on time, keep utilization under 30%, and never close old accounts.', likes: 1750, category: 'Credit', time: '12h ago' },
  ]
}
