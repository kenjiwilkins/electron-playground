const FORECAST = [
  { day: 'Mon', icon: '☀️',  high: 24, low: 16 },
  { day: 'Tue', icon: '⛅', high: 21, low: 14 },
  { day: 'Wed', icon: '🌧',  high: 17, low: 12 },
  { day: 'Thu', icon: '🌩',  high: 15, low: 11 },
  { day: 'Fri', icon: '🌤',  high: 20, low: 13 },
]

export default function WeatherWidget(): JSX.Element {
  return (
    <div className="widget-content">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 80, lineHeight: 1 }}>⛅</div>
        </div>
        <div>
          <div style={{ fontSize: 72, fontWeight: 200, letterSpacing: -2, lineHeight: 1, color: 'var(--text-primary)' }}>22°</div>
          <div style={{ fontSize: 18, color: 'var(--text-secondary)', marginTop: 4 }}>Partly Cloudy</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>San Francisco, CA</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Humidity: 68%</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Wind: 14 km/h SW</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>UV Index: 4</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {FORECAST.map(f => (
          <div key={f.day} className="glass-card" style={{ padding: '14px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-secondary)', marginBottom: 8 }}>{f.day}</div>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{f.high}°</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.low}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
