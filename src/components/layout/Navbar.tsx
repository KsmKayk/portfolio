'use client';
import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '@/components/providers/ThemeProvider';
import { LinkButton } from '@/components/ui/Button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href="/" aria-label="Voltar ao topo">kayk</a>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          {[
            ['sobre', '/#sobre'],['stack', '/#stack'], ['projetos', '/#projetos'],
            ['contato', '/#contato'], //['landing pages', '/landing-pages'], 
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setNavOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <LinkButton as="a" variant="primary" href="/#contato" style={{ display: 'inline-flex' }}>
            contato
          </LinkButton>
          <button className="mobile-menu-btn" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
