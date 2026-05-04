'use client';
import { FormEvent } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export function Contact() {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nome = (form.elements.namedItem('nome') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const projeto = (form.elements.namedItem('projeto') as HTMLTextAreaElement).value;

    const msg = `Olá Kayk! \n\n*Meu nome é:* ${nome}\n*Email:* ${email}\n\n*E quero falar sobre este rojeto:*\n${projeto}`;
    window.open(`https://wa.me/5521995518027?text=${encodeURIComponent(msg)}`, '_blank');
    form.reset();
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
          </form>
        </div>
      </div>
    </section>
  );
}
