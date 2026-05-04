export function PreviewP2A() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">P2A</span>
        <div className="bar" style={{ width: 40 }} />
        <div className="bar" style={{ width: 30 }} />
        <div className="bar" style={{ width: 30, marginLeft: 'auto' }} />
      </div>
      <div className="panel">
        <div className="bar" style={{ width: '70%', height: 8 }} />
        <div className="bar" style={{ width: '50%' }} />
        <div className="row" style={{ marginTop: 'auto' }}>
          <div className="bar" style={{ width: 36, height: 10, background: 'var(--accent)' }} />
          <div className="bar" style={{ width: 24, height: 10 }} />
        </div>
      </div>
    </div>
  );
}

export function PreviewOmnigen() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">VIDEO</span>
        <div className="bar" style={{ width: '60%', marginLeft: 'auto' }} />
      </div>
      <div className="panel" style={{ background: 'var(--bg-2)', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 8,
          background: 'linear-gradient(135deg, var(--accent-soft), transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 0, height: 0,
            borderLeft: '14px solid var(--accent)',
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
          }} />
        </div>
      </div>
      <div className="row">
        <div className="bar" style={{ width: '100%', height: 3, background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

export function PreviewSodden() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">#music</span>
        <div className="bar" style={{ width: 30, marginLeft: 'auto' }} />
      </div>
      <div className="panel">
        <div className="row">
          <div style={{ width: 18, height: 18, background: 'var(--accent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <div className="bar" style={{ width: '80%' }} />
            <div className="bar" style={{ width: '50%', height: 3 }} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 'auto', gap: 4 }}>
          {[8, 14, 6, 18, 10, 16, 12].map((h, i) => (
            <div key={i} style={{ width: 4, height: h, background: 'var(--accent)', opacity: 0.4 + i * 0.08 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
