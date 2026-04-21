import { useState } from 'react'

export default function NotesWidget(): JSX.Element {
  const [text, setText] = useState('Start typing your notes here...\n\n')
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="widget-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 12,
          padding: '20px',
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          resize: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          minHeight: 300,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
        {words} word{words !== 1 ? 's' : ''} · {text.length} chars
      </div>
    </div>
  )
}
