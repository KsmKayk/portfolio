# Beauty Studios Landing Page — Design Spec

**Date:** 2026-09-15
**Status:** Approved by user, ready for implementation planning

## Goal

Add the "Beauty Studios" landing page (a fictional advanced-aesthetics/skincare clinic) to the
portfolio's `/landing-pages` section, following the same static self-contained pattern used by
Bellos, ImperioFit, Rock For You, Hair Style, and Andy Afrodite, while preserving its GSAP-driven
scroll motion system and its pointer-drag before/after image comparison slider.

## Non-goals

- No changes to the other four landing pages.
- No changes to `ds-bundle/`, `.ds-sync/`, `.design-sync/`.
- The original `Beauty Studios.dc.html`, `support.js`, and `image-slot.js` (Claude Design
  canvas-editor tooling — confirmed via its own doc comment to be a generic "user-fillable image
  placeholder" starter component, not a real page feature) move into
  `public/landing-pages/beauty-studios/` and stay there, untouched, gitignored, unreferenced.
- Per user decision, **GSAP + ScrollTrigger are kept via CDN** rather than rewritten in vanilla JS
  — the source's `init()` motion logic (reveals, parallax, mouse-depth, progressive SVG line,
  before/after drag, nav/FAB scroll state) ports over near-verbatim.
- No real WhatsApp number, address, or pricing — all hardcoded from the source's fictional
  defaults (`whatsapp: '5511998877665'`, `ctaLabel: 'Agendar avaliação'`, "Marca fictícia · 2026"
  in the footer). The `mostrarPrecos` DC-editable boolean prop is dropped — the pricing section is
  now unconditionally rendered (it defaulted to `true` and there's no more props panel to toggle
  it), matching how Rock dropped its own editable `telefone` prop for a hardcoded constant.

## Source of truth

Content, copy, and behavior are extracted from `beauty studios/Beauty Studios.dc.html` (depends on
React + `support.js` + GSAP + `image-slot.js` at runtime) and its GSAP `init()` method.

Brand tokens (from the source file):
- Background: `#f4f2f0` (off-white), text: `#0b0b0c` (near-black); hero/dark sections use
  `#0b0b0c` background with `#f4f2f0` text.
- Accent: `#e0a2bb` (pink), link-hover: `#c2708f` (darker pink).
- Fonts: `Bodoni Moda` (400–900, italic variants, display/headings), `Archivo` (300–600, body),
  both via Google Fonts.
- SVG turbulence filters (`#bs-paint`, `#bs-paint-b`) produce the hand-drawn highlighter-stroke
  look behind emphasized headline words — pure SVG/CSS, no JS dependency, copied verbatim.
- WhatsApp number: `5511998877665`, message: "Oi! Vi o site da Beauty Studios e quero agendar uma
  avaliação." (`waHref` built once at parse time, same as Rock's `MAIN_WA_TEXT` pattern).

## 1. File structure

**Create:**
- `public/landing-pages/beauty-studios/index.html` — the static landing page.
- `public/landing-pages/beauty-studios/thumbnail.webp` (or source's actual format) — copy of
  `beauty studios/.thumbnail`, renamed.
- `src/app/landing-pages/beauty-studios/page.tsx` — Next.js route, redirects to the static file.

**Moved as-is (real assets, referenced by `index.html`, tracked by git):**
- `beauty studios/uploads/logo.png`
- `beauty studios/uploads/hero-camada1.png`, `hero-camada2.png`, `hero-camada3.png`
- `beauty studios/uploads/poros.png`, `olheiras.png`, `linhasexpressao.png`
- `beauty studios/uploads/protocolos.png`, `clinica.png`
- `beauty studios/assets/ba-antes.png`, `ba-depois.png`

(The remaining `uploads/pasted-*.png` — 6 files — are not referenced anywhere in the source markup
and move into the gitignored bucket below rather than being tracked.)

**Moved into `public/landing-pages/beauty-studios/` (gitignored, historical source artifacts):**
- `Beauty Studios.dc.html`, `support.js`, `image-slot.js`
- The 6 unreferenced `uploads/pasted-*.png` files
- `.thumbnail` (superseded by the tracked, renamed `thumbnail.webp`)

**Modify:**
- `src/data/landing-pages.ts` — add the `beauty-studios` entry.
- `.gitignore` — already covered by the generalized pattern from the Hair Style spec.

The root-level `beauty studios/` folder is removed once its contents are relocated.

## 2. Route integration

```tsx
import { redirect } from 'next/navigation';

export default function BeautyStudiosPage() {
  redirect('/landing-pages/beauty-studios/index.html');
}
```

`src/data/landing-pages.ts` entry:

```ts
{
  slug: 'beauty-studios',
  title: 'Beauty Studios',
  desc: 'Landing page para clínica de estética avançada, com protocolos, comparador de antes e depois interativo, investimento e agendamento via WhatsApp.',
  thumbnail: '/landing-pages/beauty-studios/thumbnail.webp',
  logo: '/landing-pages/beauty-studios/uploads/logo.png',
  url: '/landing-pages/beauty-studios',
},
```

## 3. Static content conversion

`style-hover` becomes `:hover` CSS classes. Every `<image-slot id="..." src="..." shape="rect"
fit="cover|contain" placeholder="...">` becomes a plain `<img src="..." alt="...">` (or a
`background-image` div where the source layered it as a full-bleed absolute layer) — same visual
result (the DC-editor drag/reframe/attribution chrome that `image-slot.js` adds is invisible in a
plain browser anyway once no `window.omelette` bridge is present, so dropping the custom element
entirely for a plain `<img>` is a straightforward, size-reducing equivalence, not a visual change).

**Static sections (hardcoded HTML):**
- Two `<svg width="0" height="0">` defs blocks: `feTurbulence`/`feDisplacementMap` filters
  (`#bs-paint`, `#bs-paint-b`) — copied verbatim, referenced by the two headline "highlighter mark"
  `<span>`s (hero + final CTA).
- One full-page-height `<svg data-bs-line>` overlay with a `<path>` + `<circle>` — the progressive
  pink scroll-position line (built/updated in JS, see below).
- Fixed header: logo, nav (Protocolos/Resultados/Investimento), WhatsApp CTA — background opacity
  toggles on scroll (JS).
- Hero (`#topo`): 3 stacked parallax image layers (face photo, serum drops, pipette — each with
  its own `data-bs-parallax` depth factor and `data-bs-depth` mouse-reactivity factor), a dark
  gradient overlay, eyebrow/headline (with the turbulence-mark "o que pedir." emphasis)/description
  /two CTAs, a stat row (9 anos / 2.400+ / 4,9), a "Role" scroll-cue indicator.
- Services marquee band (single repeating static line, no JS needed).
- "Problemas": 3 full-bleed photo cards (poros/olheiras/linhasexpressao), each with a gradient
  overlay, label/headline (one with its own turbulence mark)/description; the olheiras card also
  has a decorative circle outline.
- `#protocolos`: sticky-left intro column (headline/description/a protocol photo) + a 7-row static
  list (num/nome/desc/tempo) on the right, each row fading/sliding in on scroll (`data-bs-row`).
- `#resultados`: the before/after drag-comparison component (see Dynamic behavior).
- Testimonials: header + 3 static quote cards (texto/nome/protocolo).
- `#investimento`: header + 3 static pricing cards (tag/nome/preço/inclui/WhatsApp CTA) — always
  rendered (the source's `mostrarPrecos` conditional is dropped per Non-goals).
- FAQ: header + 6-question accordion (question/answer/±icon/`max-height` transition body).
- Final CTA: parallax decorative circle, headline (with its own turbulence mark "se sentir bem."),
  WhatsApp CTA + response-time note, a 3-column info grid (onde/horários/contato) + a 4th cell with
  the clinic photo, logo + "Marca fictícia · 2026" bar.
- Floating WhatsApp button (bottom-right), hidden until the user scrolls past ~70% of one
  viewport height (JS, matching the source's `_navScroll` behavior).

**Dynamic behavior (GSAP + ScrollTrigger via CDN, ported from the source's `init()`):**
- Load order in `<head>`: Google Fonts, then
  `cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`, then
  `cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js` (same versions as the source),
  `gsap.registerPlugin(ScrollTrigger)` once at the top of the page's own `<script>`.
- `[data-bs-rise]` reveals: `gsap.fromTo` (y:34→0, opacity 0→1), `ScrollTrigger` per element,
  `start: 'top 88%', once: true`. Reduced-motion: `y: 0` from the start (no vertical travel), same
  conditional the source already has.
- `[data-bs-mark]` (the two turbulence highlight spans): `scaleX` 0→1 wipe, `power4.out`,
  `delay: .35`, triggered at `top 92%`, `once: true`.
- `[data-bs-row]` (the 7 protocol rows): staggered `opacity`+`x` reveal, `delay: i * .04`.
- `[data-bs-parallax]` layers: `yPercent` scrub tied to each element's own `data-bs-parallax`
  factor, `data-bs-start`/`data-bs-end` (defaults `'top bottom'`/`'bottom top'`), `scrub: true`,
  trigger = the closest `<section>`. Skipped entirely under reduced-motion (source does this too).
- Hero background zoom-out: the `[data-bs-start="top top"]` layer gets its own `scale` 1.08→1
  scrub tied to `#topo`'s own scroll range.
- Mouse-depth (`[data-bs-depth]`): a `pointermove` listener (only attached when
  `matchMedia('(pointer: fine)')` and not reduced-motion, per source) nudges each depth layer's
  `x`/`y` via `gsap.to(..., { overwrite: 'auto' })` proportional to cursor offset from viewport
  center × that layer's own depth factor.
- Progressive SVG line: builds a zig-zag Catmull-Rom-ish bezier path spanning the full document
  height (segment count derived from `scrollHeight / 900`), computes `strokeDasharray`/
  `strokeDashoffset` from scroll progress on `scroll`/`resize`/`ScrollTrigger:refresh`/
  `document.fonts.ready`, and positions a glowing dot at the current point along the path via
  `path.getPointAtLength()`. Ported as a plain function (not a React method), same math.
- Nav background + floating CTA: a `scroll` listener toggles the header's background opacity and
  fades the floating WhatsApp button in/out past 70% of one viewport height, via
  `gsap.to(fab, { opacity, y, overwrite: 'auto' })`.
- Before/after drag: `pointerdown`/`pointermove`/`pointerup` on the `data-bs-ba` container compute
  a 3–97% clamped horizontal percentage from cursor X, apply it as `clip-path: inset(0 X% 0 0)` on
  the "antes" (before) layer and as the handle's `left`, and additionally react to plain
  `pointermove` when `e.pointerType === 'mouse'` (so desktop users can drag-free without holding
  the button down, matching the source's exact condition) — this needs no GSAP, it's the same
  vanilla logic as the source's `init()` closure.
- FAQ accordion: `openFaq` variable (not React state), one open question at a time, same
  `max-height`/`opacity` transition + `±` icon swap as the source.
- WhatsApp helper: single `WA_HREF` constant built once (`wa.me/5511998877665?text=...`), reused
  by every CTA on the page — the source rebuilds `waHref` per `renderVals()` call, which is
  unnecessary once there's no more reactive props/state driving it.

## 4. Assets

- 10 PNGs moved as-is (listed in Section 1) — no re-encoding needed, referenced directly.
- `public/landing-pages/beauty-studios/thumbnail.webp` — byte-for-byte copy of
  `beauty studios/.thumbnail`.
- No new assets need to be created — `uploads/logo.png` serves directly as both the in-page logo
  and the `landing-pages.ts` gallery-card logo overlay (no separate wordmark SVG needed, unlike
  Hair Style).

## 5. Testing / verification approach

No unit-test framework applies. Verification is manual + build-level:

1. `pnpm build` / `pnpm lint` pass.
2. Dev-server checks:
   - `/landing-pages` shows the Beauty Studios card, links to `/landing-pages/beauty-studios`.
   - Page renders with no console errors; GSAP/ScrollTrigger load from the CDN successfully.
   - Hero's 3 image layers show independent parallax speed while scrolling; moving the mouse over
     the hero visibly nudges the two upper-right decorative layers (pointer: fine only).
   - Both turbulence-mark headline emphases ("o que pedir.", "se sentir bem.") show the jagged
     hand-drawn highlight wipe in on scroll, not a flat rectangle.
   - The pink progressive line traces smoothly from top to bottom while scrolling the full page,
     with the glowing dot tracking scroll position.
   - The before/after slider drags smoothly with the mouse (both on drag and on hover-move without
     holding the button) and via touch, clamped so the handle never fully disappears past either
     edge.
   - Nav background darkens and the floating WhatsApp button fades in once scrolled past ~70% of
     one viewport height; both revert scrolling back up.
   - FAQ accordion opens one question at a time; pricing section always renders (no more
     `mostrarPrecos` toggle to test).
   - All WhatsApp CTAs (header, hero, problem section is non-CTA, pricing cards ×3, final CTA,
     floating button) open the same `wa.me/5511998877665` link.
   - Toggling `prefers-reduced-motion`: parallax/mouse-depth/hero-zoom are skipped entirely (source
     behavior), rise/mark/row reveals show with no vertical travel, everything remains readable.
   - Resize to mobile width: all grids collapse to a single column, before/after slider remains
     usable via touch, sticky protocol intro column stacks above its list on narrow viewports.
