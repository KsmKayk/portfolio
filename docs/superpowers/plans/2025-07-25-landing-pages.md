# Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Landing Pages" section to the portfolio with a navbar link, a listing page at `/landing-pages`, and the first standalone landing page (Bellos Barbearia) at `/landing-pages/bellos`.

**Architecture:** The listing page is a Next.js React page using the portfolio's layout and design system. The Bellos page is a standalone static HTML file served from `public/landing-pages/bellos/` with its own design system. A data file drives the listing page's card grid.

**Tech Stack:** Next.js 16 (App Router), React, plain CSS (globals.css), static files in `public/`.

## Global Constraints

- All text content in pt-BR
- Theme controlled via `[data-theme="dark"|"light"]` on `<html>`
- CSS custom properties for colors (never hardcode)
- Font variables: `var(--font-space-grotesk)` and `var(--font-fira-code)`
- Prefer existing CSS classes for consistency
- No inline SVGs — use `react-icons` where icons are needed
- Mark client components with `'use client'`

---

### Task 1: Create landing pages data file

**Files:**
- Create: `src/data/landing-pages.ts`

**Interfaces:**
- Produces: `LandingPage` type and `landingPages` array consumed by Task 3

- [ ] **Step 1: Create the data file**

```ts
export interface LandingPage {
  slug: string;
  title: string;
  desc: string;
  thumbnail: string;
  url: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: 'bellos',
    title: 'Barbearia Bellos',
    desc: 'Landing page completa para barbearia com agendamento via WhatsApp, cardápio de serviços, galeria e localização.',
    thumbnail: '/landing-pages/bellos/mrzf1jkv-resultado1.jpg',
    url: '/landing-pages/bellos',
  },
];
```

- [ ] **Step 2: Verify file compiles**

Run: `pnpm exec tsc --noEmit src/data/landing-pages.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/landing-pages.ts
git commit -m "feat: add landing pages data file"
```

---

### Task 2: Copy Bellos static files to public/

**Files:**
- Create: `public/landing-pages/bellos/index.html` (copy from `bellos/index.html`)
- Create: `public/landing-pages/bellos/mrzga072-logoa.svg` (copy from `bellos/mrzga072-logoa.svg`)
- Create: `public/landing-pages/bellos/mrzf1jj2-processo.mp4` (copy from `bellos/mrzf1jj2-processo.mp4`)
- Create: `public/landing-pages/bellos/mrzf1jkv-resultado1.jpg` (copy from `bellos/mrzf1jkv-resultado1.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jkt-resultado2.jpg` (copy from `bellos/mrzf1jkt-resultado2.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jj1-resultado3.jpg` (copy from `bellos/mrzf1jj1-resultado3.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jky-equipe.jpg` (copy from `bellos/mrzf1jky-equipe.jpg`)

**Interfaces:**
- Consumes: `bellos/` directory at project root
- Produces: Static files at `public/landing-pages/bellos/` for Task 3 card thumbnails and direct browsing

- [ ] **Step 1: Create directory and copy files**

```powershell
New-Item -ItemType Directory -Path "public\landing-pages\bellos" -Force
Copy-Item "bellos\index.html" "public\landing-pages\bellos\index.html"
Copy-Item "bellos\mrzga072-logoa.svg" "public\landing-pages\bellos\mrzga072-logoa.svg"
Copy-Item "bellos\mrzf1jj2-processo.mp4" "public\landing-pages\bellos\mrzf1jj2-processo.mp4"
Copy-Item "bellos\mrzf1jkv-resultado1.jpg" "public\landing-pages\bellos\mrzf1jkv-resultado1.jpg"
Copy-Item "bellos\mrzf1jkt-resultado2.jpg" "public\landing-pages\bellos\mrzf1jkt-resultado2.jpg"
Copy-Item "bellos\mrzf1jj1-resultado3.jpg" "public\landing-pages\bellos\mrzf1jj1-resultado3.jpg"
Copy-Item "bellos\mrzf1jky-equipe.jpg" "public\landing-pages\bellos\mrzf1jky-equipe.jpg"
```

- [ ] **Step 2: Verify files exist**

```powershell
Get-ChildItem "public\landing-pages\bellos" | Select-Object Name
```

Expected: 7 files listed

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/bellos/
git commit -m "feat: add Bellos landing page static assets"
```

---

### Task 3: Create the listing page

**Files:**
- Create: `src/app/landing-pages/page.tsx`

**Interfaces:**
- Consumes: `landingPages` array from `src/data/landing-pages.ts`
- Produces: Rendered page at `/landing-pages`

- [ ] **Step 1: Create the page component**

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

---

### Task 4: Add landing pages CSS styles

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Existing CSS custom properties and classes
- Produces: New `.lp-*` classes for the listing page

- [ ] **Step 1: Add landing page styles to globals.css**

Add the following block at the end of `globals.css`, before the final responsive media queries:

```css
/* LANDING PAGES */
.lp-section { padding: 80px 0 60px; }
.lp-title {
  font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em;
  font-weight: 700; margin-bottom: 12px;
}
.lp-subtitle { color: var(--text-dim); font-size: 16px; margin-bottom: 40px; }
.lp-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
.lp-card {
  background: var(--panel); border: 1px solid var(--border);
  text-decoration: none; color: inherit;
  transition: all 0.25s; position: relative; overflow: hidden;
  display: flex; flex-direction: column;
}
.lp-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px;
  background: var(--accent); transition: width 0.4s; z-index: 2;
}
.lp-card:hover {
  border-color: var(--accent); transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 30px var(--accent-glow);
}
.lp-card:hover::before { width: 100%; }
.lp-thumb {
  aspect-ratio: 16 / 10; background: var(--bg-2);
  border-bottom: 1px solid var(--border); overflow: hidden;
}
.lp-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s;
}
.lp-card:hover .lp-thumb img { transform: scale(1.04); }
.lp-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.lp-card-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em; }
.lp-card-desc { font-size: 13.5px; color: var(--text-dim); line-height: 1.6; margin-bottom: 14px; flex: 1; }
.lp-card-link {
  font-family: var(--font-fira-code), monospace; font-size: 12px;
  color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em;
}
```

Also add responsive overrides inside the existing `@media (max-width: 900px)` block:

```css
.lp-grid { grid-template-columns: 1fr; }
```

And inside `@media (min-width: 901px) and (max-width: 1100px)` (or a new block):

```css
@media (min-width: 901px) and (max-width: 1100px) {
  .lp-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 2: Verify styles load**

Run: `pnpm dev`
Navigate to `http://localhost:3000/landing-pages` — verify the page renders with styled cards.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add landing pages section styles"
```

---

### Task 5: Add navbar link

**Files:**
- Modify: `src/components/layout/Navbar.tsx:17-20`

**Interfaces:**
- Consumes: Existing Navbar component
- Produces: Updated nav links array with `'landing pages'` entry

- [ ] **Step 1: Add the landing pages link to the nav links array**

In `src/components/layout/Navbar.tsx`, change the links array from:

```tsx
{[
  ['sobre', '#sobre'],['stack', '#stack'], ['projetos', '#projetos'],
   ['contato', '#contato'],
].map(([label, href]) => (
```

To:

```tsx
{[
  ['sobre', '#sobre'],['stack', '#stack'], ['projetos', '#projetos'],
   ['landing pages', '/landing-pages'], ['contato', '#contato'],
].map(([label, href]) => (
```

- [ ] **Step 2: Verify navbar renders correctly**

Run: `pnpm dev`
Navigate to `http://localhost:3000` — verify "landing pages" link appears in the navbar.
Click the link — verify it navigates to `/landing-pages`.

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add landing pages link to navbar"
```

---

### Task 6: Verify everything works end-to-end

**Files:**
- No new files

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified working feature

- [ ] **Step 1: Build production bundle**

Run: `pnpm build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: No lint errors

- [ ] **Step 3: Manual E2E verification**

Run: `pnpm dev`

1. Navigate to `http://localhost:3000` — verify "landing pages" link in navbar
2. Click "landing pages" — verify listing page renders with Bellos card
3. Verify card shows thumbnail, title, description, and link
4. Click Bellos card — verify standalone page loads at `/landing-pages/bellos`
5. Verify bellos page has its own nav, theme toggle, DM Sans + Playfair Display fonts
6. Verify bellos assets load (logo, video, images)
7. Navigate back to portfolio via browser back button

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address issues from E2E verification"
```
