import { Terminal } from '@/components/terminal/Terminal';
import { LinkButton } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="hero-tag">&lt;dev full stack/&gt;</span>
            <h1>
              Da ideia à{' '}
              <span className="accent">solução digital</span>{' '}
              que gera resultado.
            </h1>
            <p className="lead">
              Sou desenvolvedor focado em transformar ideias e necessidades em soluções
              digitais funcionais — sistemas, automações, APIs e produtos web sob medida.
            </p>
            <div className="hero-actions">
              <LinkButton as="a" variant="primary" href="#projetos">ver projetos</LinkButton>
              <LinkButton as="a" variant="ghost" href="#contato">entrar em contato</LinkButton>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
