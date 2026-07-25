# Task 3: Create the listing page

**Files:**
- Create: `src/app/landing-pages/page.tsx`

**Interfaces:**
- Consumes: `landingPages` array from `src/data/landing-pages.ts` (already created in Task 1)
- Produces: Rendered page at `/landing-pages`

## Steps

- [ ] **Step 1: Create the page component**

Create `src/app/landing-pages/page.tsx` with the following content:

```tsx
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
```

- [ ] **Step 2: Verify page compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/landing-pages/page.tsx
git commit -m "feat: add landing pages listing page"
```

## Notes

- This is a server component (no `'use client'` needed) — it only uses server-side rendering
- The Navbar and Footer are imported from existing layout components
- The page follows the same pattern as `src/app/page.tsx` (Navbar + main + Footer)
- CSS classes `lp-*` will be added in Task 4 — they don't exist yet but the page will still compile
- The `section-label` class is already defined in `globals.css` and adds the `// ` prefix automatically
