import { useState, useEffect } from 'react'

interface Stat { label: string; value: number; color: string; unit: string }

const jitter = (base: number, range: number) => Math.min(100, Math.max(0, base + (Math.random() - 0.5) * range))

export default function SystemWidget(): JSX.Element {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'CPU',    value: 34, color: '#30D158', unit: '%' },
    { label: 'RAM',    value: 61, color: '#007AFF', unit: '%' },
    { label: 'GPU',    value: 18, color: '#BF5AF2', unit: '%' },
    { label: 'Disk',   value: 72, color: '#FF9500', unit: '%' },
    { label: 'Network', value: 22, color: '#FF2D55', unit: 'Mbps' },
  ])

  useEffect(() => {
    const id = setInterval(() => {
      setStats(s => s.map((stat, i) => ({
        ...stat,
        value: Math.round(jitter(stat.value, i < 3 ? 20 : 5)),
      })))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="widget-content">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Model', value: 'Apple M2 Pro' },
          { label: 'OS', value: 'macOS Sequoia' },
          { label: 'Uptime', value: '3d 14h 22m' },
          { label: 'Cores', value: '10 (6P + 4E)' },
        ].map(i => (
          <div key={i.label} className="glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-secondary)', marginBottom: 4 }}>{i.label}</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{i.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
              <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>{s.value}{s.unit}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
              <div style={{ height: '100%', background: s.color, borderRadius: 3, width: `${s.value}%`, transition: 'width 1.2s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
