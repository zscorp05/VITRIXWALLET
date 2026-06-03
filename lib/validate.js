export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

export function validateAmount(amount) {
  const num = Number(amount)
  return !Number.isNaN(num) && num > 0 && num < 1_000_000
}

export function validateText(text, maxLength = 100) {
  return typeof text === 'string' && text.trim().length > 0 && text.length <= maxLength
}

export function sanitize(text) {
  return String(text || '').replace(/[<>]/g, '').trim()
}
