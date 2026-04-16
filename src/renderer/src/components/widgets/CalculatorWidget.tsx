import { useState } from 'react'

const KEYS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function CalculatorWidget(): JSX.Element {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState<string | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [fresh, setFresh] = useState(false)

  const press = (key: string) => {
    if (key === 'C') { setDisplay('0'); setPrev(null); setOp(null); setFresh(false); return }
    if (key === '±') { setDisplay(d => String(-parseFloat(d))); return }
    if (key === '%') { setDisplay(d => String(parseFloat(d) / 100)); return }

    if (['÷', '×', '−', '+'].includes(key)) {
      setPrev(display); setOp(key); setFresh(true); return
    }

    if (key === '=') {
      if (!op || !prev) return
      const a = parseFloat(prev), b = parseFloat(display)
      const res = op === '÷' ? a / b : op === '×' ? a * b : op === '−' ? a - b : a + b
      setDisplay(String(parseFloat(res.toPrecision(10))))
      setPrev(null); setOp(null); setFresh(false)
      return
    }

    if (key === '.') {
      if (fresh) { setDisplay('0.'); setFresh(false); return }
      if (!display.includes('.')) setDisplay(d => d + '.')
      return
    }

    if (fresh) { setDisplay(key); setFresh(false) }
    else setDisplay(d => d === '0' ? key : d.length < 12 ? d + key : d)
  }

  const isOp = (k: string) => ['÷', '×', '−', '+'].includes(k)
  const isEq = (k: string) => k === '='

  return (
    <div className="widget-content" style={{ maxWidth: 320, margin: '0 auto' }}>
      <div style={{ background: 'rgba(0,0,0,0.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 16, textAlign: 'right' }}>
        {op && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{prev} {op}</div>}
        <div style={{ fontSize: 48, fontWeight: 200, letterSpacing: -1, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {display}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {KEYS.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: ri === 4 ? '2fr 1fr 1fr' : 'repeat(4, 1fr)', gap: 10 }}>
            {row.map(k => (
              <button
                key={k}
                onClick={() => press(k)}
                style={{
                  padding: '18px 0',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 20,
                  fontWeight: isOp(k) || isEq(k) ? 500 : 400,
                  background: isEq(k) ? '#FF9500' : isOp(k) ? 'rgba(255,149,0,0.15)' : k === 'C' || k === '±' || k === '%' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                  color: isEq(k) ? '#fff' : isOp(k) ? '#FF9500' : 'var(--text-primary)',
                  transition: 'opacity 0.1s',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
