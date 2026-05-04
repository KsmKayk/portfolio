'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { LinkButton } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface Props { project: Project | null; onClose: () => void; }

const isGif = (src: string) => src.toLowerCase().endsWith('.gif');

export function ProjectModal({ project, onClose }: Props) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = project?.images.length ?? 0;

  useEffect(() => {
    if (!project) return;
    setSlideIdx(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlideIdx(i => (i + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setSlideIdx(i => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const prev = () => setSlideIdx(i => (i - 1 + total) % total);
  const next = () => setSlideIdx(i => (i + 1) % total);
  const filename = project.images[slideIdx]?.split('/').pop() ?? '';

  return (
    <div className={`modal-backdrop ${project ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <SectionLabel>{project.tag}</SectionLabel>
          <h3>{project.name}</h3>
        </div>
        <div className="modal-carousel">
          <div className="carousel-tag">{filename}</div>
          <div className="carousel-counter">{slideIdx + 1} / {total}</div>
          <div className="carousel-track" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
            {project.images.map((src, i) => (
              <div key={i} className="carousel-slide">
                <Image
                  src={src}
                  alt={`${project.name} — ${i + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized={isGif(src)}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          {total > 1 && (
            <>
              <button className="carousel-arrow prev" onClick={prev}>&#8249;</button>
              <button className="carousel-arrow next" onClick={next}>&#8250;</button>
            </>
          )}
        </div>
        <div className="modal-body">
          <p>{project.longDesc}</p>
          <div className="tech-tags">
            {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <LinkButton as="a" variant="primary" href="#contato" onClick={onClose}>Falar sobre projeto</LinkButton>
            <LinkButton as="a" variant="ghost" href="#">Ver código</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
