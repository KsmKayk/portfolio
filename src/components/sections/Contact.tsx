'use client';
import { useState, FormEvent } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="contact" id="contato">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-intro">
            <SectionLabel>contato</SectionLabel>
            <h2>Vamos construir algo juntos?</h2>
            <p>Me conta a ideia. Respondo em até 24h com um plano de execução.</p>
            <div className="contact-snippet">
              <div><span className="tk-comment">// resposta_média</span></div>
              <div><span className="tk-key">const</span> <span className="tk-fn">tempo</span> = <span className="tk-str">&quot;&lt; 24h&quot;</span>;</div>
              <div><span className="tk-key">const</span> <span className="tk-fn">disponibilidade</span> = <span className="tk-str">&quot;freelance / contrato&quot;</span>;</div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="nome">seu_nome</label>
              <input id="nome" name="nome" type="text" required placeholder="Como posso te chamar?" />
            </div>
            <div className="field">
              <label htmlFor="email">email</label>
              <input id="email" name="email" type="email" required placeholder="voce@dominio.com" />
            </div>
            <div className="field">
              <label htmlFor="projeto">descricao_do_projeto</label>
              <textarea id="projeto" name="projeto" required placeholder="// conta um pouco sobre o que você precisa..." />
            </div>
            <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              enviar mensagem
            </Button>
            {sent && (
              <div className="form-success">
                {'> '}mensagem enviada com sucesso. retorno em breve.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
