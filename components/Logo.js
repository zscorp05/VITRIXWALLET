/** Vitrix wordmark — frontend/public/vitrix_logo_v3.svg */
export const LOGO_SRC = '/vitrix_logo_v3.svg'

export default function Logo({ width = 160, framed = true, style = {} }) {
  const img = (
    <img
      src={LOGO_SRC}
      alt="Vitrix — Private Family Finance"
      width={width}
      height="auto"
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        ...style,
      }}
    />
  )

  if (!framed) return img

  return <div className="logo-frame">{img}</div>
}
