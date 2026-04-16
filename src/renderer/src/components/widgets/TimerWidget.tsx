import { useState, useEffect, useRef } from 'react'

const PRESETS = [
  { label: 'Focus',     seconds: 25 * 60 },
  { label: 'Short break', seconds: 5 * 60 },
  { label: 'Long break',  seconds: 15 * 60 },
]

export default function TimerWidget(): JSX.Element {
  const [total, setTotal] = useState(PRESETS[0].seconds)
  const [remaining, setRemaining] = useState(PRESETS[0].seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) { setRunning(false); return 0 }
          return r - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const reset = (secs: number) => { setRunning(false); setTotal(secs); setRemaining(secs) }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const progress = total ? (1 - remaining / total) : 0
  const r = 90, circ = 2 * Math.PI * r

  return (
    <div className="widget-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => reset(p.seconds)} style={{
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13,
            background: total === p.seconds ? '#FF6B35' : 'rgba(255,255,255,0.12)',
            color: total === p.seconds ? '#fff' : 'var(--text-primary)', fontWeight: 500,
          }}>{p.label}</button>
        ))}
      </div>

      <div style={{ position: 'relative', width: 220, height: 220 }}>
        <svg width={220} height={220} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={110} cy={110} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={8} />
          <circle cx={110} cy={110} r={r} fill="none" stroke="#FF6B35" strokeWidth={8}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.9s linear' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 200, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)', letterSpacing: -1 }}>{mm}:{ss}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{running ? 'Running' : remaining === 0 ? 'Done!' : 'Paused'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => setRunning(r => !r)} style={{
          padding: '14px 40px', borderRadius: 30, border: 'none', cursor: 'pointer',
          background: '#FF6B35', color: '#fff', fontSize: 16, fontWeight: 600,
        }}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={() => reset(total)} style={{
          padding: '14px 24px', borderRadius: 30, border: 'none', cursor: 'pointer',
          background: 'rgba(0,0,0,0.08)', color: 'var(--text-primary)', fontSize: 16,
        }}>Reset</button>
      </div>
    </div>
  )
}
