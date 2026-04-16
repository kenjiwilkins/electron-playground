import { useState, useEffect, useRef } from 'react'

const TRACKS = [
  { title: 'Neon Pulse',      artist: 'Synthwave Collective', duration: 213 },
  { title: 'Morning Static',  artist: 'Lo-Fi Dreams',          duration: 187 },
  { title: 'Glass Ceiling',   artist: 'Ambient Works',         duration: 256 },
  { title: 'Digital Rain',    artist: 'Chillhop Music',        duration: 198 },
]

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function MusicWidget(): JSX.Element {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const track = TRACKS[idx]

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= track.duration) { setPlaying(false); return 0 }
          return p + 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, track.duration])

  const go = (dir: number) => {
    setIdx(i => (i + dir + TRACKS.length) % TRACKS.length)
    setProgress(0)
    setPlaying(false)
  }

  const pct = (progress / track.duration) * 100

  return (
    <div className="widget-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ width: 160, height: 160, borderRadius: 24, background: 'linear-gradient(135deg, #BF5AF2, #5856D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, boxShadow: playing ? '0 20px 60px rgba(191,90,242,0.4)' : '0 8px 24px rgba(0,0,0,0.12)', transition: 'box-shadow 0.4s', transform: playing ? 'scale(1.02)' : 'scale(1)', transitionProperty: 'box-shadow, transform' }}>
        🎵
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>{track.title}</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{track.artist}</div>
      </div>

      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2, cursor: 'pointer' }}
          onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - r.left) / r.width) * track.duration)) }}>
          <div style={{ height: '100%', background: '#BF5AF2', borderRadius: 2, width: `${pct}%`, transition: 'width 0.9s linear' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          <span>{fmt(progress)}</span><span>{fmt(track.duration)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button onClick={() => go(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, color: 'var(--text-primary)', padding: 0, lineHeight: 1 }}>⏮</button>
        <button onClick={() => setPlaying(p => !p)} style={{ width: 60, height: 60, borderRadius: '50%', border: 'none', cursor: 'pointer', background: '#BF5AF2', color: '#fff', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {playing ? '⏸' : '▶'}
        </button>
        <button onClick={() => go(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, color: 'var(--text-primary)', padding: 0, lineHeight: 1 }}>⏭</button>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {TRACKS.map((t, i) => (
          <div key={i} onClick={() => { setIdx(i); setProgress(0); setPlaying(false) }}
            className="glass-card"
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', cursor: 'pointer', background: i === idx ? 'rgba(191,90,242,0.12)' : undefined, borderColor: i === idx ? 'rgba(191,90,242,0.3)' : undefined }}>
            <div style={{ fontSize: 16 }}>{i === idx && playing ? '🎵' : '♪'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: i === idx ? 600 : 400, color: 'var(--text-primary)' }}>{t.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.artist}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{fmt(t.duration)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
