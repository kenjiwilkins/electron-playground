import { useState } from 'react'
import Sidebar from './components/Sidebar'
import WidgetGrid from './components/WidgetGrid'
import WidgetView from './components/WidgetView'
import { WIDGETS } from './data/widgets'

export default function App(): JSX.Element {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null)
  const [sidebarOrder, setSidebarOrder] = useState<string[]>(WIDGETS.map(w => w.id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'transparent' }}>
      {/* macOS drag region */}
      <div style={{ height: 52, flexShrink: 0, WebkitAppRegion: 'drag' } as React.CSSProperties} />

      {/* Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          order={sidebarOrder}
          onOrderChange={setSidebarOrder}
          activeWidgetId={activeWidgetId}
          onWidgetSelect={setActiveWidgetId}
        />

        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeWidgetId ? (
            <WidgetView widgetId={activeWidgetId} onBack={() => setActiveWidgetId(null)} />
          ) : (
            <WidgetGrid onWidgetClick={setActiveWidgetId} />
          )}
        </main>
      </div>
    </div>
  )
}
