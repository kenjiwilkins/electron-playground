function App(): JSX.Element {
  const versions = (window as Window & { versions?: { node: () => string; chrome: () => string; electron: () => string } }).versions

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', background: 'transparent' }}>
      <h1>Hello from Electron + React!</h1>
      <p>👋</p>
      {versions && (
        <p>
          This app is using Chrome (v{versions.chrome()}), Node.js (v{versions.node()}), and
          Electron (v{versions.electron()})
        </p>
      )}
    </div>
  )
}

export default App
