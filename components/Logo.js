export default function Logo({ width = 160, framed = true, style = {} }) {
  const mark = (
    <span
      aria-label="Vitrix"
      className="vitrix-wordmark"
      style={{
        fontSize: Math.max(22, Math.round(width / 6)),
        ...style,
      }}
    >
      VITRIX
    </span>
  )

  if (!framed) return mark

  return <div className="logo-frame">{mark}</div>
}
