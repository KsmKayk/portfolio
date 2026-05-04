'use client';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaTelegram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BusinessCard } from './BusinessCard';
import { Button, LinkButton } from '@/components/ui/Button';
import { SITE_URL, SHARE_TEXT } from '@/lib/constants';

interface Props { open: boolean; onClose: () => void; }

export function ShareModal({ open, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  const downloadCard = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'kayk-mascarenhas-card.png';
      link.href = dataUrl;
      link.click();
    } catch (e) { console.error('download fail', e); }
    setDownloading(false);
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(SITE_URL); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch (e) { console.error(e); }
  };

  const url = encodeURIComponent(SITE_URL);
  const text = encodeURIComponent(SHARE_TEXT);

  const networks = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}`, icon: <FaWhatsapp /> },
    { name: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}`, icon: <FaTelegram /> },
    { name: 'X / Twitter', href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`, icon: <FaXTwitter /> },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, icon: <FaLinkedin /> },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: <FaFacebook /> },
    { name: 'Email', href: `mailto:?subject=${text}&body=${text}%20${url}`, icon: <MdEmail /> },
  ];

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal share-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="section-label">compartilhar</div>
          <h3>Card de contato</h3>
        </div>
        <div className="share-body">
          <div className="share-card-preview">
            <BusinessCard cardRef={cardRef} />
          </div>
          <div className="share-actions">
            <div className="share-section-title">// baixar</div>
            <Button variant="primary" onClick={downloadCard} disabled={downloading}
              style={{ width: '100%', justifyContent: 'center' }}>
              {downloading ? 'gerando...' : 'baixar como imagem (.png)'}
            </Button>

            <div className="share-section-title" style={{ marginTop: 18 }}>// link do site</div>
            <div className="share-link-row">
              <code>{SITE_URL}</code>
              <Button variant="ghost" className="share-copy-btn" onClick={copyLink}>
                {copied ? 'copiado!' : 'copiar'}
              </Button>
            </div>

            <div className="share-section-title" style={{ marginTop: 18 }}>// enviar para</div>
            <div className="share-networks">
              {networks.map(n => (
                <a key={n.name} className="share-net" href={n.href} target="_blank" rel="noopener noreferrer">
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{n.icon}</span>
                  <span>{n.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
