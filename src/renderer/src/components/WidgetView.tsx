import { lazy, Suspense } from 'react'
import { WIDGETS } from '../data/widgets'

const COMPONENTS: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  clock:      lazy(() => import('./widgets/ClockWidget')),
  weather:    lazy(() => import('./widgets/WeatherWidget')),
  notes:      lazy(() => import('./widgets/NotesWidget')),
  calculator: lazy(() => import('./widgets/CalculatorWidget')),
  tasks:      lazy(() => import('./widgets/TasksWidget')),
  timer:      lazy(() => import('./widgets/TimerWidget')),
  system:     lazy(() => import('./widgets/SystemWidget')),
  music:      lazy(() => import('./widgets/MusicWidget')),
}

interface WidgetViewProps {
  widgetId: string
  onBack: () => void
}

export default function WidgetView({ widgetId, onBack }: WidgetViewProps): JSX.Element {
  const widget = WIDGETS.find(w => w.id === widgetId)!
  const Component = COMPONENTS[widgetId]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '18px 32px 0',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: 8,
            padding: '6px 12px', cursor: 'pointer', fontSize: 13,
            color: 'var(--text-secondary)', fontFamily: 'inherit', fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <div style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{widget.icon}</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{widget.name}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 28px' }}>
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-secondary)', fontSize: 14 }}>
            Loading…
          </div>
        }>
          <Component />
        </Suspense>
      </div>
    </div>
  )
}
