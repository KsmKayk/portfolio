'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/data/projects';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectModal } from '@/components/projects/ProjectModal';

const isGif = (src: string) => src.toLowerCase().endsWith('.gif');

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="projects" id="projetos">
      <div className="container">
        <div className="projects-head">
          <div>
            <SectionLabel>projetos em destaque</SectionLabel>
            <h2>O que tenho construído.</h2>
          </div>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <button key={p.id} className="project-card" onClick={() => setActive(p)}>
              <div className="project-thumb">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized={isGif(p.images[0])}
                />
              </div>
              <div className="project-body">
                <div style={{ fontFamily: 'var(--font-fira-code), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {p.tag}
                </div>
                <div className="project-title">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tech">{p.tech.join(', ')}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
