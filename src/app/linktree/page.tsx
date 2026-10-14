import type { Metadata } from 'next';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { SiGithub, SiMedium } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { LINKS } from '@/data/links';
import { LinkIcon } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Links — Kayk Mascarenhas',
  description: 'Todos os links do Kayk Mascarenhas em um só lugar.',
};

function Icon({ icon }: { icon: LinkIcon }) {
  switch (icon) {
    case 'portfolio':
      return <Image src="/linktree/portfolio.png" alt="" width={28} height={28} />;
    case 'godrinking':
      return <Image src="/linktree/godrinking.png" alt="" width={32} height={32} />;
    case 'github':
      return <SiGithub size={22} />;
    case 'medium':
      return <SiMedium size={22} />;
    case 'linkedin':
      return <FaLinkedin size={22} />;
  }
}

export default function Linktree() {
  return (
    <main className="lt-page">
      <div className="lt-wrap">
        <header className="lt-header">
          <div className="lt-avatar">
            <Image src="/me.jpg" alt="Kayk Mascarenhas" fill sizes="96px" style={{ objectFit: 'cover' }} priority />
          </div>
          <h1 className="lt-name">Kayk Mascarenhas</h1>
          <p className="lt-role mono">dev full stack</p>
          <p className="lt-bio">transformando ideias em sistemas que geram resultado real.</p>
        </header>

        <ul className="lt-links">
          {LINKS.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 70}ms` }}>
              <a className="lt-link" href={link.href} target="_blank" rel="noopener">
                <span className={`lt-icon lt-icon-${link.icon}`}>
                  <Icon icon={link.icon} />
                </span>
                <span className="lt-text">
                  <span className="lt-label">{link.label}</span>
                  <span className="lt-desc mono">{link.desc}</span>
                </span>
                <FiArrowUpRight className="lt-arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>

        <footer className="lt-footer mono">{'// kayk_'}</footer>
      </div>
    </main>
  );
}
