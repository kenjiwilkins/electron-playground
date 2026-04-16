function App(): JSX.Element {
  const versions = (window as Window & { versions?: { node: () => string; chrome: () => string; electron: () => string } }).versions

  return (
    <div style={{ fontFamily: 'sans-serif', background: 'transparent' }}>
      <div style={{ height: 52, WebkitAppRegion: 'drag' } as React.CSSProperties} />
      <div style={{ padding: '0 2rem 2rem' }}>
      <h1>Hello from Electron + React!</h1>
      <p>👋</p>
      {versions && (
        <p>
          This app is using Chrome (v{versions.chrome()}), Node.js (v{versions.node()}), and
          Electron (v{versions.electron()})
        </p>
      )}
      </div>
    </div>
  )
}

export default App
