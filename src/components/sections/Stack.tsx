import { SectionLabel } from '@/components/ui/SectionLabel';
import { STACK } from '@/data/stack';
import { StackName } from '@/lib/types';
import {
  SiNodedotjs, SiTypescript, SiPython,
  SiPostgresql, SiDocker,
} from 'react-icons/si';
import { FiDatabase } from 'react-icons/fi';

const ICON_MAP: Record<StackName, React.ElementType> = {
  'Node.js': SiNodedotjs,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'Oracle': FiDatabase,
};

export function Stack() {
  return (
    <section className="stack" id="stack">
      <div className="container">
        <SectionLabel>stack principal</SectionLabel>
        <div className="stack-grid">
          {STACK.map(name => {
            const Icon = ICON_MAP[name];
            return (
              <div key={name} className="stack-item">
                <div className="stack-icon"><Icon /></div>
                <div className="stack-name">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
