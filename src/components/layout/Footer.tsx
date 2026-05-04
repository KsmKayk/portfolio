'use client';
import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { ShareModal } from '@/components/share/ShareModal';
import { CONTACT } from '@/lib/constants';

export function Footer() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">kayk</div>
              <p>Desenvolvedor full stack — transformando ideias em sistemas que geram resultado real.</p>
              <button className="share-btn" onClick={() => setShareOpen(true)}>
                <FiShare2 size={14} />
                compartilhar
              </button>
            </div>
            <div>
              <h4>contato</h4>
              <div className="footer-links">
                <a href={`mailto:${CONTACT.email}`}>
                  <span className="arrow">→</span> {CONTACT.email}
                </a>
                <a href={CONTACT.phoneHref}>
                  <span className="arrow">→</span> (21) 99551-8027
                </a>
              </div>
            </div>
            <div>
              <h4>redes</h4>
              <div className="footer-links">
                <a href={CONTACT.github} target="_blank" rel="noopener">
                  <span className="arrow">→</span> github
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener">
                  <span className="arrow">→</span> linkedin
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener">
                  <span className="arrow">→</span> instagram
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 kayk mascarenhas. all rights reserved.</span>
            <span>// built with code &amp; coffee</span>
          </div>
        </div>
      </footer>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
