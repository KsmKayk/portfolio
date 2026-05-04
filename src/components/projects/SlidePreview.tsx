import { SlideKind } from '@/lib/types';

const Bar = ({ w = '100%', h = 8, c = 'var(--text-dim)', o = 0.4 }: { w?: string | number; h?: number; c?: string; o?: number }) => (
  <div style={{ width: w, height: h, background: c, opacity: o }} />
);

function FakeHero() {
  return (
    <div style={{ width: '88%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', gap: 24, background: 'var(--panel)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Bar w="50%" h={6} c="var(--accent)" o={1} />
          <Bar w="80%" h={14} />
          <Bar w="65%" h={14} />
          <Bar w="40%" h={6} />
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <Bar w={60} h={20} c="var(--accent)" o={1} />
            <Bar w={60} h={20} c="var(--border-strong)" o={1} />
          </div>
        </div>
        <div style={{ flex: 1, height: '80%', background: 'var(--bg-2)', border: '1px solid var(--border)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Bar w="60%" h={4} c="var(--accent)" o={1} />
            <Bar w="100%" h={4} />
            <Bar w="80%" h={4} />
            <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-soft), transparent)', marginTop: 6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeFeatures() {
  return (
    <div style={{ width: '88%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, background: 'var(--panel)' }}>
        <Bar w="40%" h={10} c="var(--accent)" o={1} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ width: 16, height: 16, background: 'var(--accent)', opacity: 0.8 }} />
              <Bar w="80%" h={6} />
              <Bar w="60%" h={4} />
              <Bar w="90%" h={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FakePricing() {
  return (
    <div style={{ width: '70%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, background: 'var(--panel)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[0, 1].map(i => (
          <div key={i} style={{ background: 'var(--bg-2)', border: i === 1 ? '1px solid var(--accent)' : '1px solid var(--border)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8, boxShadow: i === 1 ? '0 0 20px var(--accent-glow)' : 'none' }}>
            <Bar w="50%" h={6} c={i === 1 ? 'var(--accent)' : 'var(--text-dim)'} o={1} />
            <Bar w="60%" h={16} c="var(--text)" o={0.7} />
            <Bar w="100%" h={3} /><Bar w="80%" h={3} /><Bar w="90%" h={3} /><Bar w="60%" h={3} />
            <Bar w="100%" h={20} c={i === 1 ? 'var(--accent)' : 'var(--border-strong)'} o={1} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeMobile() {
  return (
    <div style={{ width: 180, height: '90%', background: 'var(--panel)', border: '2px solid var(--border-strong)', borderRadius: 18, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 4, background: 'var(--border-strong)', borderRadius: 2 }} />
      </div>
      <Bar w="60%" h={8} c="var(--accent)" o={1} />
      <Bar w="100%" h={10} />
      <Bar w="80%" h={10} />
      <div style={{ flex: 1, background: 'linear-gradient(180deg, var(--accent-soft), transparent)', border: '1px solid var(--border)' }} />
      <Bar w="100%" h={20} c="var(--accent)" o={1} />
    </div>
  );
}

function FakeTerminal() {
  return (
    <div style={{ width: '80%', height: '82%', background: '#0a0710', border: '1px solid var(--accent)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar" style={{ background: 'var(--panel-2)' }}><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 16, fontFamily: 'var(--font-fira-code), monospace', fontSize: 10, color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div><span style={{ color: 'var(--accent)' }}>$</span> python omnigen.py --theme=&quot;space&quot;</div>
        <div style={{ color: 'var(--text-muted)' }}>[1/4] generating script... <span style={{ color: 'var(--accent-2)' }}>ok</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[2/4] fetching images... <span style={{ color: 'var(--accent-2)' }}>ok</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[3/4] narrating with piper... <span style={{ color: 'var(--accent)' }}>...</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[4/4] composing ffmpeg pipeline</div>
        <div style={{ marginTop: 8, color: 'var(--accent)' }}>$ <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--accent)', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} /></div>
      </div>
    </div>
  );
}

function FakeVideo() {
  return (
    <div style={{ width: '80%', aspectRatio: '16/9', background: '#000', border: '1px solid var(--accent)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, var(--accent-glow), transparent 60%)' }} />
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
        <div style={{ width: 0, height: 0, borderLeft: '16px solid var(--accent)', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: 4 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Bar w="100%" h={3} c="var(--accent)" o={0.4} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-fira-code), monospace', fontSize: 9, color: 'var(--text)' }}>
          <span>00:42</span><span>02:18</span>
        </div>
      </div>
    </div>
  );
}

function FakeQueue() {
  return (
    <div style={{ width: '85%', height: '85%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 14, background: 'var(--panel)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Bar w="40%" h={8} c="var(--accent)" o={1} />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div style={{ width: 6, height: 6, background: i === 1 ? 'var(--accent)' : 'var(--border-strong)', borderRadius: '50%' }} />
            <Bar w={`${50 + i * 8}%`} h={5} />
            <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-fira-code), monospace', fontSize: 8, color: i === 1 ? 'var(--accent)' : 'var(--text-muted)' }}>
              {i === 1 ? 'RUNNING' : 'QUEUED'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeOutput() {
  return (
    <div style={{ display: 'flex', gap: 8, width: '85%', height: '80%' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ flex: 1, background: '#000', border: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${135 + i * 60}deg, var(--accent-soft), transparent 70%)` }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontFamily: 'var(--font-fira-code), monospace', fontSize: 9, color: 'var(--text)' }}>
            video_{String(i + 1).padStart(2, '0')}.mp4
          </div>
        </div>
      ))}
    </div>
  );
}

function FakeDiscord() {
  return (
    <div style={{ width: '85%', height: '85%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, display: 'flex', background: 'var(--panel)' }}>
        <div style={{ width: 50, background: 'var(--bg-2)', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: i === 1 ? 'var(--accent)' : 'var(--border-strong)' }} />
          ))}
        </div>
        <div style={{ width: 100, background: 'var(--panel-2)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Bar w="60%" h={5} c="var(--text-dim)" o={0.6} />
          <Bar w="80%" h={3} /><Bar w="50%" h={3} />
          <Bar w="70%" h={3} c="var(--accent)" o={1} />
        </div>
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Bar w="40%" h={4} /><Bar w="80%" h={3} />
            </div>
          </div>
          <div style={{ marginTop: 'auto', background: 'var(--bg-2)', border: '1px solid var(--accent)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Bar w="50%" h={4} c="var(--accent)" o={1} />
            <Bar w="100%" h={3} />
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {[6, 12, 4, 14, 8, 10].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: 'var(--accent)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeCommands() {
  return (
    <div style={{ width: '70%', background: 'var(--panel-2)', border: '1px solid var(--border-strong)', padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {['/play', '/queue', '/skip', '/loop', '/volume', '/lyrics'].map((cmd, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-fira-code), monospace', fontSize: 11, color: 'var(--accent)', width: 70 }}>{cmd}</span>
          <Bar w={`${40 + i * 6}%`} h={4} />
        </div>
      ))}
    </div>
  );
}

function FakeEmbed() {
  return (
    <div style={{ width: '60%', background: 'var(--panel-2)', border: '1px solid var(--border-strong)', borderLeft: '3px solid var(--accent)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 14, height: 14, background: 'var(--accent)' }} />
        <Bar w="40%" h={5} c="var(--text-dim)" o={0.7} />
      </div>
      <Bar w="80%" h={9} c="var(--accent)" o={1} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 60, height: 60, background: 'var(--bg-2)', border: '1px solid var(--border)' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Bar w="100%" h={4} /><Bar w="70%" h={4} /><Bar w="50%" h={4} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        <Bar w={40} h={16} c="var(--accent)" o={0.3} />
        <Bar w={40} h={16} c="var(--accent)" o={0.3} />
      </div>
    </div>
  );
}

const SLIDE_MAP: Record<SlideKind, React.ComponentType> = {
  hero: FakeHero, features: FakeFeatures, pricing: FakePricing, mobile: FakeMobile,
  terminal: FakeTerminal, video: FakeVideo, queue: FakeQueue, output: FakeOutput,
  discord: FakeDiscord, commands: FakeCommands, embed: FakeEmbed,
};

export function SlidePreview({ kind }: { kind: SlideKind }) {
  const Component = SLIDE_MAP[kind] ?? FakeHero;
  return <Component />;
}
