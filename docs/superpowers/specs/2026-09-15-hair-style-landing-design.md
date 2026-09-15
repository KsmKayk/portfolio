# Hair Style Landing Page — Design Spec

**Date:** 2026-09-15
**Status:** Approved by user, ready for implementation planning

## Goal

Add the "Hair Style" landing page (a fictional hair salon) to the portfolio's `/landing-pages`
section, following the exact same static self-contained pattern used by Bellos, ImperioFit and
Rock For You.

## Non-goals

- No changes to the Bellos, ImperioFit, or Rock For You landing pages.
- No changes to `ds-bundle/`, `.ds-sync/`, `.design-sync/` (unrelated design-system sync tooling).
- The original `Hair Style Landing.dc.html` and `support.js` (Claude Design canvas artboard
  source) are moved into `public/landing-pages/hair-style/` and left there, untouched, gitignored,
  just no longer referenced by any route.
- No real phone number — the `telefone` prop's fictional default (`5511999990000`) is hardcoded,
  matching the source; this is explicitly a demo salon ("Salão fictício · projeto de demonstração"
  in the footer).

## Source of truth

Content, copy, and behavior are extracted from `hair style/Hair Style Landing.dc.html` (a Claude
Design canvas artboard — depends on React + `support.js` at runtime, incompatible with this repo's
static landing-page pattern). All photography in the source is hotlinked from Pexels
(`images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?...`) — per user decision, every distinct
photo gets downloaded once and served locally instead, matching every other landing page in the
portfolio.

Brand tokens (from the source file):
- Background: `#FBF8F5` (cream), text: `#1C1412` (near-black)
- Accent: `#B24342` (red), accent hover: `#8E3231`, gold: `#C9A227` / `#A67C1F` / `#8A6F14`
  (used at different weights for dots, numbers, labels)
- Secondary panel: `#F3EBE5`
- Fonts: `Anton` (wordmark), `Cormorant Garamond` (400/600, headings), `Jost` (300–600, body),
  `Parisienne` (cursive "Style" overlay), all via Google Fonts.
- WhatsApp number: `5511999990000` (already includes country code in source, unlike Rock's
  number — used as-is with no prefix logic needed).

## 1. File structure

**Create:**
- `public/landing-pages/hair-style/index.html` — the static landing page.
- `public/landing-pages/hair-style/logo.svg` — new small inline SVG wordmark ("HAIR" in Anton with
  a stacked/split-clip effect + cursive "Style" overlaid at an angle, mirroring the header/footer
  lockup already in the source, which has no separate logo asset of its own) for the landing-pages
  gallery card overlay.
- `public/landing-pages/hair-style/thumbnail.webp` (or the source's actual format) — copy of
  `hair style/.thumbnail`, renamed to a normal extension-visible filename.
- `public/landing-pages/hair-style/uploads/*` — 14 distinct photos downloaded from the Pexels URLs
  referenced in the source (see Assets below), saved locally.
- `src/app/landing-pages/hair-style/page.tsx` — Next.js route, redirects to the static file.

**Modify:**
- `src/data/landing-pages.ts` — add the `hair-style` entry to the `landingPages` array.
- `.gitignore` — generalize the existing Rock-only design-tool-source-artifact rules into a
  pattern covering every landing-page slug (see Section 5).

**Moved into `public/landing-pages/hair-style/` (gitignored, historical source artifacts):**
- `hair style/Hair Style Landing.dc.html`
- `hair style/support.js`
- The two unused `hair style/uploads/pasted-*.png` files (not referenced anywhere in the source
  markup — the source's `img()` helper builds all photo URLs from Pexels IDs, not from these local
  uploads). They move along with the rest of the folder rather than being deleted, in case they're
  wanted later.

The root-level `hair style/` folder is removed once its contents are relocated (nothing is left
behind at the repo root for this landing).

## 2. Route integration

`src/app/landing-pages/hair-style/page.tsx` follows the exact pattern of the other three:

```tsx
import { redirect } from 'next/navigation';

export default function HairStylePage() {
  redirect('/landing-pages/hair-style/index.html');
}
```

`src/data/landing-pages.ts` gets a new array entry:

```ts
{
  slug: 'hair-style',
  title: 'Hair Style',
  desc: 'Landing page para salão de beleza com agendamento por profissional, agenda da semana, catálogo de serviços e depoimentos.',
  thumbnail: '/landing-pages/hair-style/thumbnail.webp',
  logo: '/landing-pages/hair-style/logo.svg',
  url: '/landing-pages/hair-style',
},
```

## 3. Static content conversion

All `{{ }}` bindings and `sc-for` loops are converted to hardcoded HTML — unlike Rock's catalog,
none of Hair Style's repeated content needs to be filterable or re-rendered at runtime, so there is
no reason to keep it data-driven in JS. `style-hover="..."` attributes become CSS classes with
`:hover` rules.

**Sections (all static HTML, content copied verbatim from the source's `renderVals()` arrays):**
- Header: sticky, wordmark lockup, nav (Serviços/Equipe/Galeria/Depoimentos), WhatsApp CTA button.
- Hero: eyebrow, headline, description, two CTAs (WhatsApp primary + "Ver horários" anchor), stat
  row (12 anos / 4.9★ / 6 especialistas), a Pexels hero photo with a gradient overlay and a
  bottom-left "resposta em até 5 minutos" info card.
- Services marquee band (single static line, no JS needed — it's not filterable, just a colored
  strip: "Coloração · Mechas & Loiros · ...").
- `#servicos`: 4 service cards (Corte & Finalização, Coloração, Mechas & Loiros, Tratamentos),
  each with photo/name/description/price/a WhatsApp "Agendar →" link pre-filled with that
  service's name.
- `#equipe`: 6 team member cards (Camila, Rafael, Letícia, Bianca, Thiago, Aline), each with
  photo/specialty badge/name/bio/a 4-row weekly schedule table/day-off note/a WhatsApp CTA
  pre-filled with that person's name.
- `#galeria`: 4 photos (Balayage, Penteado de festa, Mudança de visual, Corte & escova) with a
  bottom-left label chip, plus a "Quero um resultado assim →" WhatsApp link in the section header.
- `#depoimentos`: dark section, 3 testimonial cards (5-star row, italic quote, author line).
- Final CTA: full-bleed photo background, headline, description, a large WhatsApp CTA, address
  line.
- Footer: wordmark + tagline, hours, contact/address, WhatsApp CTA button, copyright bar.
- Floating fixed WhatsApp button (bottom-right, always visible — matches the source, unlike Beauty
  Studios' scroll-gated version).

**Dynamic behavior (vanilla JS):**
- A single `waLink(text)` helper builds `https://wa.me/5511999990000?text=...` links — used by
  every CTA across the page (header, hero, each service card with its own name-specific message,
  each team member card with their own name-specific message, gallery CTA, final CTA, footer,
  floating button), each with the exact message text from the source's per-item `wa()` calls.
- Scroll reveals: the source defines an unused `@keyframes floatUp` in its `<style>` block (never
  applied to any element in the markup as-read). This plan activates it as a light `data-reveal` +
  `IntersectionObserver` treatment on section headers and the 4/6/4/3 card grids, matching the
  scroll-reveal polish already present on Rock and Bellos — a small, low-risk use of styling the
  source already declared but never wired up, not new visual design. Reduced-motion: elements with
  `data-reveal` get `is-visible` applied immediately instead of being observed, mirroring Rock's
  reduced-motion handling.

## 4. Assets

14 distinct Pexels photo IDs referenced in the source, to be fetched once each and saved as
`public/landing-pages/hair-style/uploads/<id>.jpg` (or a descriptive filename per section):

| Section | IDs |
|---|---|
| Hero background | `2681751` |
| Final CTA background | `3992874` |
| Serviços | `3993465`, `3993444`, `3065209`, `3993449` |
| Equipe | `2811087`, `1222271`, `3373716`, `1130626`, `897262`, `7755248` |
| Galeria (new only — `3065209` and `3993465` are reused from Serviços) | `3065171`, `2703181` |

Fetch each via `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=<900|700>`
(same width the source's `img()` helper already requests — 900px for servicos/equipe, 700px for
galeria) and save the bytes locally; `index.html` references the local paths instead of the
Pexels URL.

- `public/landing-pages/hair-style/thumbnail.webp` — byte-for-byte copy of `hair style/.thumbnail`.
- `public/landing-pages/hair-style/logo.svg` — new inline SVG wordmark as described in Section 1.

## 5. `.gitignore` generalization

Current rules are Rock-specific:

```
public/landing-pages/rock/Rock For You v2.dc.html
public/landing-pages/rock/support.js
public/landing-pages/rock/.thumbnail
```

These become slug-general patterns covering all four landing pages with Claude Design source
artifacts (Rock, Hair Style, Andy Afrodite, Beauty Studios):

```
# Claude Design canvas source artifacts (superseded by each landing page's static index.html export)
public/landing-pages/*/*.dc.html
public/landing-pages/*/support.js
public/landing-pages/*/.thumbnail
public/landing-pages/*/image-slot.js
```

`image-slot.js` is included here (not just for Beauty Studios) since it's a generic Claude Design
canvas-editor component, not a real page feature, confirmed by reading its source doc comment
("Outside the omelette runtime the slot is read-only" / "Copied omelette starter").
`hero-particles.js` (Andy Afrodite) is deliberately NOT in this list — it's a genuine,
framework-free custom element that ships as part of that page's real functionality.

## 6. Testing / verification approach

No unit-test framework applies here (static HTML asset outside the Next.js component tree).
Verification is manual + build-level:

1. `pnpm build` / `pnpm lint` must still pass (only TS/React changes are the new `page.tsx`
   redirect and the `landing-pages.ts` array entry).
2. Run the dev server and manually check:
   - `/landing-pages` shows the new Hair Style card and links to `/landing-pages/hair-style`.
   - `/landing-pages/hair-style` redirects to `/landing-pages/hair-style/index.html`, renders with
     no console errors, and no image 404s (all photos load from local `uploads/`, not Pexels).
   - Every WhatsApp CTA (header, hero, each of the 4 service cards, each of the 6 team cards,
     gallery, final CTA, footer, floating button) opens `wa.me` with the correct, item-specific
     pre-filled message.
   - Scroll-reveal elements fade/slide in once per element; toggling `prefers-reduced-motion`
     shows everything immediately with no animation.
   - Resize to mobile width: grids collapse to a single column, header remains usable, floating
     WhatsApp button doesn't overlap footer content awkwardly.
