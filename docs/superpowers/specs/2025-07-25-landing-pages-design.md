# Design: Landing Pages Section

## Overview

Add a "Landing Pages" section to the portfolio site. This introduces:
- A new navbar link to `/landing-pages`
- A listing page at `/landing-pages` showing available landing pages as a card grid
- The first landing page: Bellos Barbearia at `/landing-pages/bellos`

All text content is in pt-BR.

## Architecture

### Two rendering strategies
- **Listing page** (`/landing-pages`): Next.js React page using the portfolio's layout (Navbar + Footer) and design system (Space Grotesk font, existing CSS classes)
- **Bellos page** (`/landing-pages/bellos`): Standalone static HTML served from `public/`, keeping its own design system (DM Sans + Playfair Display fonts, custom theme tokens, own nav/footer)

### File structure changes
```
public/
  landing-pages/
    bellos/
      index.html                    ← copied from bellos/
      mrzga072-logoa.svg
      mrzf1jj2-processo.mp4
      mrzf1jkv-resultado1.jpg
      mrzf1jkt-resultado2.jpg
      mrzf1jj1-resultado3.jpg
      mrzf1jky-equipe.jpg

src/
  app/
    landing-pages/
      page.tsx                      ← new listing page
  components/
    layout/
      Navbar.tsx                    ← modified: add nav link
  data/
    landing-pages.ts               ← new data file
```

## Components

### 1. Navbar modification

**File:** `src/components/layout/Navbar.tsx`

Add `'landing pages'` to the nav links array. It uses a path href (`/landing-pages`) instead of a hash.

```tsx
['sobre', '#sobre'], ['stack', '#stack'], ['projetos', '#projetos'],
['landing pages', '/landing-pages'], ['contato', '#contato']
```

The logo `<a>` tag href stays as `#` — it already works as "back to top" on the main page. On the `/landing-pages` page, the Navbar is rendered via the layout, so the logo link to `/` is handled by the listing page's own layout wrapping.

### 2. Listing page

**File:** `src/app/landing-pages/page.tsx`

A server component (no `'use client'` needed) that:
- Exports `metadata` for SEO (title, description)
- Imports `Navbar` and `Footer` from layout components
- Imports landing page data from `src/data/landing-pages.ts`
- Renders a page header section ("landing pages" title + subtitle)
- Renders a responsive card grid of landing pages

**Layout:** The page renders `<Navbar />` + `<main>` + `<Footer />` directly (same pattern as `src/app/page.tsx`), since it's a separate route that needs the portfolio chrome.

**Card grid:**
- Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop
- Uses existing CSS classes from `globals.css` (glass panels, borders, hover effects)
- Each card is an `<a>` tag linking to the landing page URL
- Card contents: thumbnail image, title, description

**Metadata:**
```ts
export const metadata: Metadata = {
  title: "Landing Pages — Kayk Mascarenhas",
  description: "Landing pages criadas por Kayk Mascarenhas.",
};
```

### 3. Data file

**File:** `src/data/landing-pages.ts`

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

### 4. Bellos static files

**Location:** `public/landing-pages/bellos/`

Copy all files from `bellos/` directory:
- `index.html` — main page (unchanged)
- `mrzga072-logoa.svg` — logo
- `mrzf1jj2-processo.mp4` — hero video
- `mrzf1jkv-resultado1.jpg`, `mrzf1jkt-resultado2.jpg`, `mrzf1jj1-resultado3.jpg` — gallery
- `mrzf1jky-equipe.jpg` — team photo

The HTML references assets via relative paths, so they resolve correctly at `/landing-pages/bellos/`.

**Note:** Extra files in `bellos/` (`barbearia-bellos-landing.html`, `DESIGN-MANIFEST.json`, `DESIGN-HANDOFF.md`, `mrzf1jl3-logo.svg`) are not needed for the public-facing page and are not copied.

## Styling

The listing page uses the portfolio's existing CSS classes from `globals.css`. New minimal styles for the landing pages section may be added to `globals.css` if needed (e.g., card grid layout for the listing page).

The bellos page keeps all its styles inline in its `<style>` tag — no changes.

## Text content (pt-BR)

- Navbar link: "landing pages"
- Listing page title: "landing pages"
- Listing page subtitle: "landing pages que criei para clientes"
- Bellos card description: "Landing page completa para barbearia com agendamento via WhatsApp, cardápio de serviços, galeria e localização."

## Verification

1. `pnpm dev` — start dev server
2. Navigate to homepage — verify "landing pages" link appears in navbar
3. Click "landing pages" — verify listing page renders with card grid
4. Click Bellos card — verify standalone bellos page loads at `/landing-pages/bellos`
5. Verify bellos page has its own nav, fonts, theme toggle, and all assets load
6. `pnpm build` — verify no build errors
7. `pnpm lint` — verify no lint errors
