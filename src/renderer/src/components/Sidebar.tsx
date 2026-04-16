import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { WIDGETS } from '../data/widgets'
import { Widget } from '../types/widget'

interface SidebarItemProps {
  widget: Widget
  active: boolean
  onSelect: (id: string) => void
}

function SidebarItem({ widget, active, onSelect }: SidebarItemProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : undefined,
      }}
    >
      <div
        onClick={() => onSelect(widget.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 12px',
          borderRadius: 10,
          cursor: 'pointer',
          background: active ? `${widget.accent}18` : 'transparent',
          borderLeft: active ? `3px solid ${widget.accent}` : '3px solid transparent',
          transition: 'background 0.15s',
          userSelect: 'none',
        }}
      >
        <div
          {...attributes}
          {...listeners}
          style={{
            cursor: 'grab',
            color: 'rgba(0,0,0,0.2)',
            fontSize: 13,
            lineHeight: 1,
            flexShrink: 0,
            padding: '2px 2px 2px 0',
          }}
          onClick={e => e.stopPropagation()}
        >
          ⠿
        </div>
        <span style={{ fontSize: 16, flexShrink: 0 }}>{widget.icon}</span>
        <span style={{
          fontSize: 13,
          fontWeight: active ? 600 : 400,
          color: active ? widget.accent : 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {widget.name}
        </span>
      </div>
    </div>
  )
}

interface SidebarProps {
  order: string[]
  onOrderChange: (order: string[]) => void
  activeWidgetId: string | null
  onWidgetSelect: (id: string) => void
}

export default function Sidebar({ order, onOrderChange, activeWidgetId, onWidgetSelect }: SidebarProps): JSX.Element {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(String(active.id))
      const newIndex = order.indexOf(String(over.id))
      onOrderChange(arrayMove(order, oldIndex, newIndex))
    }
  }

  const orderedWidgets = order.map(id => WIDGETS.find(w => w.id === id)!).filter(Boolean)

  return (
    <aside style={{
      width: 190,
      flexShrink: 0,
      borderRight: '1px solid rgba(0,0,0,0.06)',
      padding: '16px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      overflowY: 'auto',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--text-secondary)', padding: '4px 12px 10px' }}>
        Widgets
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {orderedWidgets.map(widget => (
            <SidebarItem
              key={widget.id}
              widget={widget}
              active={activeWidgetId === widget.id}
              onSelect={onWidgetSelect}
            />
          ))}
        </SortableContext>
      </DndContext>
    </aside>
  )
}
