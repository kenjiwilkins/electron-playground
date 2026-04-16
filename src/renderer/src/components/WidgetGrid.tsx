import { WIDGETS } from '../data/widgets'

interface WidgetGridProps {
  onWidgetClick: (id: string) => void
}

export default function WidgetGrid({ onWidgetClick }: WidgetGridProps): JSX.Element {
  return (
    <div style={{ padding: '28px 32px', height: '100%', overflowY: 'auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Playground</h1>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 28 }}>Select a widget to get started</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 14,
      }}>
        {WIDGETS.map(widget => (
          <div
            key={widget.id}
            onClick={() => onWidgetClick(widget.id)}
            className="widget-card"
            style={{ '--accent': widget.accent } as React.CSSProperties}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: `${widget.accent}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 14,
            }}>
              {widget.icon}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {widget.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {widget.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
