const requests = new Map()

export function rateLimit(ip, limit = 10, windowMs = 60_000) {
  const now = Date.now()
  const windowStart = now - windowMs
  const key = ip || 'unknown'

  const userRequests = (requests.get(key) || []).filter(time => time > windowStart)
  userRequests.push(now)
  requests.set(key, userRequests)

  return userRequests.length <= limit
}
