# Andy Afrodite Landing Page — Design Spec

**Date:** 2026-09-15
**Status:** Approved by user, ready for implementation planning

## Goal

Add the "Andy Afrodite" landing page (a fictional alternative-model content-creator portfolio, for
pitching content work to gothic/alternative fashion brands) to the portfolio's `/landing-pages`
section, following the same static self-contained pattern used by Bellos, ImperioFit, and Rock For
You, while preserving its bespoke `<hero-particles>` canvas particle effect as a genuine (not
decorative-only) piece of the page.

## Non-goals

- No changes to the Bellos, ImperioFit, Rock For You, or Hair Style landing pages.
- No changes to `ds-bundle/`, `.ds-sync/`, `.design-sync/` (unrelated design-system sync tooling).
- The original `Andy Afrodite.dc.html` and `support.js` (Claude Design canvas artboard source) are
  moved into `public/landing-pages/andy-afrodite/` and left there, untouched, gitignored, no longer
  referenced by any route.
- **The "Galeria" section ships exactly as the source has it: 9 empty "arraste a foto aqui"
  placeholder tiles, no photos wired in.** This was a deliberate choice (confirmed with the user)
  over filling the tiles with the 6 available `uploads/` photos — the uploaded images stay
  unreferenced by `index.html`. The category filter buttons remain fully functional against this
  placeholder set (clicking a category still re-filters which placeholder tiles show, matching the
  source's `itens.filter(...)` behavior).
- The bracketed provisional-copy notices in the source
  ("[ texto provisório — me envie o seu e eu substituo ]" in "Sobre mim",
  "[ links provisórios — me envie os reais ]" in "Contato") are kept verbatim, for the same
  reason as the gallery — this mirrors an explicit source-fidelity choice rather than an oversight.
- No real WhatsApp number or contact info — the `whatsapp` prop's fictional default
  (`5511999999999`) is hardcoded; Instagram/TikTok/email links stay as `#contato` anchors (their
  literal `href` in the source), since the source itself marks them provisional.

## Source of truth

Content, copy, and behavior are extracted from `andy afrodite/Andy Afrodite.dc.html` (a Claude
Design canvas artboard — depends on React + `support.js` at runtime) and
`andy afrodite/hero-particles.js` (a genuinely framework-free custom element, kept as-is).

Brand tokens (from the source file):
- Background: `#07070a` (near-black), text: `#ece9e4` (off-white)
- Accent: `#ff4d8d` (pink)
- Fonts: `Cinzel` (400–700, display/headings), `Cormorant Garamond` (300/400 + italics, body),
  `Space Mono` (400/700, labels/mono UI), all via Google Fonts.
- Greek-letter motifs used decoratively throughout (ΑΡΧΗ, ΑΦΡΟΔΙΤΗ, ΚΑΛΛΟΣ, ΛΟΓΟΣ, ΕΡΩΣ·ΤΕΧΝΗ) —
  copied verbatim, no translation needed (they're intentional stylistic flourishes, not content).
- WhatsApp number: `5511999999999` (source already strips non-digits via `.replace(/\D/g, '')`;
  the static version just hardcodes the resulting digit string directly into the `wa.me` link).

## 1. File structure

**Create:**
- `public/landing-pages/andy-afrodite/index.html` — the static landing page.
- `public/landing-pages/andy-afrodite/thumbnail.webp` (or source's actual format) — copy of
  `andy afrodite/.thumbnail`, renamed.
- `src/app/landing-pages/andy-afrodite/page.tsx` — Next.js route, redirects to the static file.

**Moved as-is (real assets, referenced by `index.html`, tracked by git):**
- `andy afrodite/andy-logo.svg` → `public/landing-pages/andy-afrodite/andy-logo.svg`
- `andy afrodite/andy-hero.jpg` → `public/landing-pages/andy-afrodite/andy-hero.jpg`
- `andy afrodite/hero-particles.js` → `public/landing-pages/andy-afrodite/hero-particles.js`

**Moved into `public/landing-pages/andy-afrodite/` (gitignored, historical source artifacts):**
- `Andy Afrodite.dc.html`, `support.js`
- `uploads/*` (all 7 files — unreferenced by the shipped page per the Non-goals above, kept only
  in case the placeholders get filled by hand later).

**Modify:**
- `src/data/landing-pages.ts` — add the `andy-afrodite` entry.
- `.gitignore` — covered by the general pattern introduced in the Hair Style spec (Section 5
  there); no additional Andy-specific rule needed beyond that generalized pattern.

The root-level `andy afrodite/` folder is removed once its contents are relocated.

## 2. Route integration

```tsx
import { redirect } from 'next/navigation';

export default function AndyAfroditePage() {
  redirect('/landing-pages/andy-afrodite/index.html');
}
```

`src/data/landing-pages.ts` entry:

```ts
{
  slug: 'andy-afrodite',
  title: 'Andy Afrodite',
  desc: 'Portfólio de conteúdo para modelo alternativa: catálogo, reels e editoriais para marcas góticas e de nicho, com galeria filtrável por categoria.',
  thumbnail: '/landing-pages/andy-afrodite/thumbnail.webp',
  logo: '/landing-pages/andy-afrodite/andy-logo.svg',
  url: '/landing-pages/andy-afrodite',
},
```

## 3. Static content conversion

`style-hover` becomes `:hover` CSS classes. The `[data-reveal]` / `.is-in` opacity+transform
transition system already exists in the source's `<style>` block and its `IntersectionObserver`
wiring in `componentDidMount` — this ports near-verbatim to a plain
`document.addEventListener('DOMContentLoaded', ...)` handler (no React lifecycle needed).

**Static sections (hardcoded HTML):**
- Fixed header: logo + wordmark, nav (Sobre/Galeria/FAQ/Orçamento).
- Fixed dot-grid overlay background layer (decorative, pure CSS `radial-gradient` pattern).
- Fixed left-edge vertical progress rail: a thin bar, a fill segment, a cycling Greek glyph, and a
  percentage readout — all driven by scroll position (see Dynamic behavior below).
- Hero: eyebrow, two-line headline ("ANDY AFRODITE"), Greek subtitle, description, two CTAs
  (WhatsApp primary + "Ver galeria" anchor), a masked/grayscale hero photo with a
  `<hero-particles>` canvas layered on top via a `ref`-style host div.
- Marquee band (single repeating static line, no JS needed).
- `#sobre`: two-column "Sobre mim" — body copy + a bordered "FICHA TÉCNICA" panel (4 stat rows:
  Altura/Calçado/Medidas/Cabelo·olhos) + 5 service tag chips (Catálogo/Reels/Publipost/Try-on
  haul/Close de peças).
- `#galeria`: header with 5 category filter buttons (Tudo/Catálogo/Editorial/Reels/Detalhe de
  peça), a CSS multi-column masonry grid of 9 placeholder tiles (each: dashed pattern background,
  category label, "arraste a foto aqui" caption, category name + index number in the figcaption).
  Heights per item come straight from the source's `base` array (`h: 380/520/620/300/...`).
- `#faq`: header + 8-question accordion (num/question/answer, `+`→`×` rotate icon, `max-height`
  transition body).
- `#contato`: centered CTA block — Greek eyebrow, headline, description, WhatsApp button,
  Instagram/TikTok/email row (all `#contato` anchors, per source), provisional-links note.
- Footer: logo + wordmark, copyright line, "Voltar ao topo ↑" anchor.

**Dynamic behavior (vanilla JS):**
- `waLink()`/single `WA_NUMBER` constant, same pattern as the other three landing pages.
- Scroll progress rail: a scroll listener (rAF-throttled, matching the source's `onScroll` +
  `requestAnimationFrame` pattern) computes `p = scrollY / (scrollHeight - innerHeight)`, sets the
  fill bar's `transform: scaleY(p)`, the percentage text, and picks the current glyph from the
  8-character `ΑΦΡΟΔΙΤΗ` array by `Math.floor(p * 8)`.
- `<hero-particles>` mount: the element is placed directly in the static HTML (no need for the
  source's `mountStage()` polling-for-`customElements.get` dance, since `hero-particles.js` loads
  synchronously in `<head>` before the body parses, same load order the source already used via
  `<script src="hero-particles.js">` in its `<helmet>`).
- Gallery filter: `CATEGORIES` + `ITEMS` (9 entries, `cat`/`h`/computed `label`) as plain JS
  arrays/constants (not React state); clicking a filter button re-renders the masonry grid's
  `innerHTML` from the filtered subset and toggles each button's active style, replacing the
  source's `this.setState({ filtro })` re-render.
- FAQ accordion: click toggles one open index at a time (`openIndex` variable, not React state),
  same expand/collapse `max-height`/`opacity`/icon-rotation transition as the source.
- Scroll reveals: `IntersectionObserver` on every `[data-reveal]` element, `threshold: 0.14`
  (matching the source exactly), unobserve after first reveal. Reduced-motion: apply `.is-in`
  immediately instead of observing, consistent with Rock/Hair Style.

## 4. Assets

- `public/landing-pages/andy-afrodite/andy-logo.svg`, `andy-hero.jpg`, `hero-particles.js` — moved
  as-is, referenced directly by `index.html`.
- `public/landing-pages/andy-afrodite/thumbnail.webp` — byte-for-byte copy of
  `andy afrodite/.thumbnail`.
- No new assets need to be created (unlike Hair Style, no new logo is needed — `andy-logo.svg`
  already exists in source).

## 5. Testing / verification approach

No unit-test framework applies. Verification is manual + build-level:

1. `pnpm build` / `pnpm lint` pass.
2. Dev-server checks:
   - `/landing-pages` shows the Andy Afrodite card, links to `/landing-pages/andy-afrodite`.
   - Page renders with no console errors; `hero-particles.js` loads and the particle canvas
     animates in the hero, reacting to pointer movement (drift toward cursor) as in the source.
   - The left-edge progress rail's fill/percentage/glyph update smoothly while scrolling, reaching
     100%/`Η` at the page bottom.
   - Gallery filter buttons re-filter the 9 placeholder tiles by category with no broken layout;
     "Tudo" shows all 9.
   - FAQ accordion opens one question at a time, previous one closes.
   - All WhatsApp CTAs (header, hero, contact) open the same `wa.me/5511999999999` link.
   - Toggling `prefers-reduced-motion` disables the reveal animations (content shows immediately)
     — the particle canvas and progress rail are unaffected (matching source, which doesn't gate
     them on reduced-motion either).
   - Resize to mobile width: hero grid stacks to one column, gallery masonry drops to fewer
     columns, progress rail (fixed to the far left edge) doesn't overlap hero content.
