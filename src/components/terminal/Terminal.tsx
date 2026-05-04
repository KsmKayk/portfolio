'use client';
import { useState, useEffect } from 'react';
import { PreviewP2A, PreviewOmnigen, PreviewSodden } from './TerminalPreviews';

const TERM_LINES = [
  { html: '<span class="tk-comment">// projetos.ts — portfolio</span>' },
  { html: '<span class="tk-key">import</span> { Project } <span class="tk-key">from</span> <span class="tk-str">"./types"</span>;' },
  { html: '' },
  { html: '<span class="tk-key">const</span> <span class="tk-fn">projetos</span>: Project[] = [' },
  { html: '  { name: <span class="tk-str">"P2A Consulting"</span>, stack: [<span class="tk-str">"next.js"</span>, <span class="tk-str">"llm"</span>] },' },
  { html: '  { name: <span class="tk-str">"Omnigen"</span>, stack: [<span class="tk-str">"ffmpeg"</span>, <span class="tk-str">"piper"</span>] },' },
  { html: '  { name: <span class="tk-str">"SoddenBot"</span>, stack: [<span class="tk-str">"discord.js"</span>] },' },
  { html: '];' },
  { html: '' },
  { html: '<span class="tk-prompt">$</span> <span class="tk-fn">deploy</span>(projetos) <span class="tk-comment">// shipped <span class="tk-num">20+</span></span>' },
];

const PREVIEWS = [<PreviewP2A key="p2a" />, <PreviewOmnigen key="omnigen" />, <PreviewSodden key="sodden" />];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERM_LINES.length) {
      const t = setTimeout(() => setVisibleLines(0), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines(v => v + 1), 280);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    const i = setInterval(() => setSlideIdx(s => (s + 1) % PREVIEWS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="terminal">
      <div className="term-header">
        <div className="term-title">
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block', borderRadius: '50%' }} />
          ~/portfolio/projetos.ts
        </div>
        <div className="term-controls">
          <span /><span /><span />
        </div>
      </div>
      <div className="term-body">
        {TERM_LINES.slice(0, visibleLines).map((l, i) => (
          <div key={i} className="term-line" dangerouslySetInnerHTML={{ __html: l.html || '&nbsp;' }} />
        ))}
        {visibleLines < TERM_LINES.length && <span className="cursor" />}

        <div className="term-preview">
          <div className="preview-track" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
            {PREVIEWS.map((Preview, i) => (
              <div key={i} className="preview-slide">{Preview}</div>
            ))}
          </div>
          <div className="preview-dots">
            {PREVIEWS.map((_, i) => (
              <span key={i} className={i === slideIdx ? 'active' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
