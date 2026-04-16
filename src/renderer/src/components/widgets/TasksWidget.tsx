import { useState } from 'react'

interface Task { id: number; text: string; done: boolean }

const INITIAL: Task[] = [
  { id: 1, text: 'Build the playground UI', done: true },
  { id: 2, text: 'Add vibrancy to the window', done: true },
  { id: 3, text: 'Make the sidebar sortable', done: false },
  { id: 4, text: 'Ship to production', done: false },
]

export default function TasksWidget(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>(INITIAL)
  const [input, setInput] = useState('')

  const toggle = (id: number) =>
    setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const add = () => {
    if (!input.trim()) return
    setTasks(ts => [...ts, { id: Date.now(), text: input.trim(), done: false }])
    setInput('')
  }

  const remove = (id: number) => setTasks(ts => ts.filter(t => t.id !== id))

  const done = tasks.filter(t => t.done).length

  return (
    <div className="widget-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{done} of {tasks.length} completed</span>
        <div style={{ height: 4, flex: 1, background: 'rgba(0,0,0,0.08)', borderRadius: 4, margin: '0 16px' }}>
          <div style={{ height: '100%', background: '#FF2D55', borderRadius: 4, width: `${tasks.length ? (done / tasks.length) * 100 : 0}%`, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task…"
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.08)', fontSize: 14, color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
          }}
        />
        <button onClick={add} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: '#FF2D55', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map(t => (
          <div key={t.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
            <div
              onClick={() => toggle(t.id)}
              style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0, cursor: 'pointer',
                background: t.done ? '#FF2D55' : 'transparent',
                border: `2px solid ${t.done ? '#FF2D55' : 'rgba(0,0,0,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff',
              }}
            >{t.done ? '✓' : ''}</div>
            <span style={{ flex: 1, fontSize: 14, color: 'var(--text-primary)', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}>{t.text}</span>
            <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-secondary)', padding: 0, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}
