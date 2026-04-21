import { useState, useEffect } from 'react'

const ZONES = [
  { label: 'Local',   tz: undefined },
  { label: 'New York', tz: 'America/New_York' },
  { label: 'London',  tz: 'Europe/London' },
  { label: 'Tokyo',   tz: 'Asia/Tokyo' },
]

export default function ClockWidget(): JSX.Element {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const fmt = (tz?: string) =>
    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz })

  const fmtDate = (tz?: string) =>
    now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: tz })

  return (
    <div className="widget-content">
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 72, fontWeight: 200, letterSpacing: -2, lineHeight: 1, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
          {fmt()}
        </div>
        <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 8 }}>
          {fmtDate()}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {ZONES.slice(1).map(z => (
          <div key={z.label} className="glass-card" style={{ padding: '16px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-secondary)', marginBottom: 6 }}>{z.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{fmt(z.tz)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{fmtDate(z.tz)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
