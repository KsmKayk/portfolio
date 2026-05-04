'use client';
import { useState } from 'react';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/data/projects';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { SlidePreview } from '@/components/projects/SlidePreview';

const THUMB_SLIDE: Record<string, 'hero' | 'queue' | 'discord'> = {
  p2a: 'hero', omnigen: 'queue', sodden: 'discord',
};

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
                <SlidePreview kind={THUMB_SLIDE[p.id] ?? 'hero'} />
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
