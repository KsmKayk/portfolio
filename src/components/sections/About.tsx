import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <SectionLabel>sobre mim</SectionLabel>
        <div className="about-grid">
          <div className="about-card">
            <div className="avatar"><span>KM</span></div>
            <div style={{
              marginTop: 14,
              fontFamily: 'var(--font-fira-code), monospace',
              fontSize: 11, color: 'var(--text-muted)', textAlign: 'center',
            }}>
              kayk_mascarenhas.png
            </div>
          </div>
          <div className="about-card about-text-card">
            <p className="about-text">
              Sou desenvolvedor focado em transformar ideias e necessidades em{' '}
              <strong>soluções digitais funcionais</strong>. Atuo criando sistemas, automações
              e produtos sob medida — de landing pages e aplicações web até ferramentas
              internas, APIs e processos automatizados.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="stat-num">+5</div>
                <div className="stat-label">anos<br />programando</div>
              </div>
              <div className="stat">
                <div className="stat-num">+20</div>
                <div className="stat-label">projetos<br />desenvolvidos</div>
              </div>
              <div className="stat">
                <div className="stat-num">+3</div>
                <div className="stat-label">hackathons</div>
                <div className="stat-badge">// 2 vitórias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
