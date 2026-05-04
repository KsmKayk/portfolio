import { RefObject } from 'react';

interface Props { cardRef: RefObject<HTMLDivElement | null>; }

export function BusinessCard({ cardRef }: Props) {
  return (
    <div ref={cardRef} className="biz-card">
      <div className="biz-grid-bg" />
      <div className="biz-left">
        <div className="biz-tag">// dev_card.png</div>
        <div className="biz-name">Kayk<br />Mascarenhas</div>
        <div className="biz-role">programador full stack</div>
        <div className="biz-stack">
          <span>node.js</span>
          <span>typescript</span>
          <span>python</span>
        </div>
      </div>
      <div className="biz-divider">
        <div className="biz-divider-line" />
        <div className="biz-divider-glow" />
      </div>
      <div className="biz-right">
        <div className="biz-row">
          <div className="biz-row-label">email</div>
          <div className="biz-row-value">kaykdsg@gmail.com</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">telefone</div>
          <div className="biz-row-value">+55 (21) 99551-8027</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">linkedin</div>
          <div className="biz-row-value">/in/kaykmascarenhas</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">github</div>
          <div className="biz-row-value">/KsmKayk</div>
        </div>
      </div>
      <div className="biz-corner biz-corner-tl" />
      <div className="biz-corner biz-corner-br" />
    </div>
  );
}
