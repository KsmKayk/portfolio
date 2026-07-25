import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { landingPages } from '@/data/landing-pages';

export const metadata: Metadata = {
  title: 'Landing Pages — Kayk Mascarenhas',
  description: 'Landing pages criadas por Kayk Mascarenhas.',
};

export default function LandingPages() {
  return (
    <>
      <Navbar />
      <main>
        <section className="lp-section">
          <div className="container">
            <span className="section-label">landing pages</span>
            <h1 className="lp-title">landing pages que criei</h1>
            <p className="lp-subtitle">
              páginas institucionais e comerciais desenvolvidas para clientes.
            </p>

            <div className="lp-grid">
              {landingPages.map((lp) => (
                <a key={lp.slug} href={lp.url} className="lp-card">
                  <div className="lp-thumb">
                    <img src={lp.thumbnail} alt={lp.title} loading="lazy" />
                    <div className="lp-thumb-overlay">
                      <img src={lp.logo} alt="" className="lp-thumb-logo" />
                    </div>
                  </div>
                  <div className="lp-body">
                    <h2 className="lp-card-title">{lp.title}</h2>
                    <p className="lp-card-desc">{lp.desc}</p>
                    <span className="lp-card-link">
                      ver landing page →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
