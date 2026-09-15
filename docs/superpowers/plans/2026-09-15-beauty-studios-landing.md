# Beauty Studios Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Beauty Studios" landing page to `/landing-pages`, converting its Claude Design canvas source into a self-contained static `index.html` (matching the Bellos/ImperioFit/Rock/Hair Style/Andy Afrodite pattern), keeping GSAP + ScrollTrigger via CDN for its scroll-driven motion (parallax, reveals, progressive line, mouse-depth) and its pointer-drag before/after image comparison slider.

**Architecture:** One static file, `public/landing-pages/beauty-studios/index.html` (inline `<style>` + inline `<script>`, no build step, no React); a thin `page.tsx` redirects `/landing-pages/beauty-studios` to it. Every `<image-slot>` from the source becomes a plain `<img>` with the same `src`/fit — the DC-editor's drag/reframe/attribution chrome is irrelevant once `image-slot.js` isn't loaded. GSAP 3.12.5 + ScrollTrigger load from `cdn.jsdelivr.net` (same versions/CDN the source already used) and the source's `init()` method ports into a plain `DOMContentLoaded` handler with plain JS variables instead of React state. The two SVG `feTurbulence`/`feDisplacementMap` filters and the progressive scroll-position line are copied/ported verbatim — they're pure SVG/JS, no framework dependency.

**Tech Stack:** Plain HTML/CSS/vanilla JS, GSAP 3.12.5 + ScrollTrigger via CDN, inline SVG filters, Next.js 16 App Router redirect route, TypeScript data array (`src/data/landing-pages.ts`).

**Source spec:** `docs/superpowers/specs/2026-09-15-beauty-studios-landing-design.md` — read it before Task 2 for full context/rationale.

**No automated test framework applies** — static HTML asset outside the Next.js component tree. Verification is: (a) `pnpm build`/`pnpm lint` for the two TS/React files, (b) `curl` against the dev server checking specific markers exist in the served HTML, (c) manual browser checks called out per task.

Before Task 2, start the dev server once, in the background:

```bash
cd "D:/Workspace/Node/portfolio" && pnpm dev
```

It serves on `http://localhost:3000`.

---

## Task 1: Relocate source assets

**Files:**
- Move (gitignored, historical source): `beauty studios/Beauty Studios.dc.html`, `support.js`, `image-slot.js` → `public/landing-pages/beauty-studios/`
- Move (gitignored, unreferenced uploads): `beauty studios/uploads/antesedepois.png`, the 6 `pasted-*.png` files, and `.thumbnail` → `public/landing-pages/beauty-studios/uploads/` (uploads) and root (thumbnail)
- Move (real, tracked assets): `uploads/logo.png`, `hero-camada1/2/3.png`, `poros.png`, `olheiras.png`, `linhasexpressao.png`, `protocolos.png`, `clinica.png`, `assets/ba-antes.png`, `assets/ba-depois.png`
- Create: `public/landing-pages/beauty-studios/thumbnail.webp`

`.gitignore` already has the slug-general pattern from the Hair Style branch — no edit needed.

- [x] **Step 1: Confirm the thumbnail's real format** — `file "beauty studios/.thumbnail"` → `RIFF ... Web/P image` (WebP).

- [x] **Step 2: Move everything into place**

```bash
mkdir -p "public/landing-pages/beauty-studios/uploads" "public/landing-pages/beauty-studios/assets"
mv "beauty studios/Beauty Studios.dc.html" "public/landing-pages/beauty-studios/Beauty Studios.dc.html"
mv "beauty studios/support.js" "public/landing-pages/beauty-studios/support.js"
mv "beauty studios/image-slot.js" "public/landing-pages/beauty-studios/image-slot.js"
mv "beauty studios/uploads/"* "public/landing-pages/beauty-studios/uploads/"
mv "beauty studios/assets/"* "public/landing-pages/beauty-studios/assets/"
cp "beauty studios/.thumbnail" "public/landing-pages/beauty-studios/thumbnail.webp"
rmdir "beauty studios/uploads" "beauty studios/assets" 2>/dev/null; rm -rf "beauty studios"
```

- [x] **Step 3: Verify git ignores the DC source/editor tooling**

```bash
git check-ignore -v "public/landing-pages/beauty-studios/Beauty Studios.dc.html" "public/landing-pages/beauty-studios/support.js" "public/landing-pages/beauty-studios/image-slot.js"
```

Confirmed: all three match the `.gitignore` glob rules (`*.dc.html`, `support.js`, `image-slot.js`).

- [x] **Step 4: Commit the real assets only**

```bash
git add "public/landing-pages/beauty-studios/uploads/logo.png" "public/landing-pages/beauty-studios/uploads/hero-camada1.png" "public/landing-pages/beauty-studios/uploads/hero-camada2.png" "public/landing-pages/beauty-studios/uploads/hero-camada3.png" "public/landing-pages/beauty-studios/uploads/poros.png" "public/landing-pages/beauty-studios/uploads/olheiras.png" "public/landing-pages/beauty-studios/uploads/linhasexpressao.png" "public/landing-pages/beauty-studios/uploads/protocolos.png" "public/landing-pages/beauty-studios/uploads/clinica.png" "public/landing-pages/beauty-studios/assets/ba-antes.png" "public/landing-pages/beauty-studios/assets/ba-depois.png" "public/landing-pages/beauty-studios/thumbnail.webp"
git commit -m "chore(beauty-studios): relocate DC source assets and real page assets

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

(The 7 unreferenced uploads and the 3 DC-editor files are left in place on disk, untracked and
gitignored — not staged.)

---

## Task 2: Static page skeleton (head, GSAP CDN, SVG defs, header, footer)

**Files:**
- Create: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Create the file with the document shell**

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Beauty Studios — estética avançada em São Paulo</title>
<meta name="description" content="Beauty Studios: protocolos faciais sob medida, limpeza de pele, peeling, microagulhamento, skinbooster, toxina e preenchimento. Agende sua avaliação pelo WhatsApp." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Archivo:wght@300;400;500;600&display=swap" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<style>
  :root { --bs-bg: #f4f2f0; --bs-ink: #0b0b0c; --bs-accent: #e0a2bb; --bs-accent-2: #c2708f; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--bs-bg); color: var(--bs-ink); font-family: Archivo, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  a { color: var(--bs-ink); text-decoration: none; }
  a:hover { color: var(--bs-accent-2); }
  img { max-width: 100%; display: block; }

  @keyframes bs-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
  @keyframes bs-pulse { 0%,100% { opacity: .35; transform: scale(1) } 50% { opacity: .8; transform: scale(1.35) } }
  @keyframes bs-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes bs-scrollcue { 0% { transform: translateY(-100%) } 100% { transform: translateY(100%) } }

  .bs-cta-primary { display: inline-flex; align-items: center; gap: 9px; padding: 12px 20px; border-radius: 999px; background: var(--bs-bg); color: var(--bs-ink); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; font-weight: 500; min-height: 44px; transition: transform .3s ease, box-shadow .3s ease; }
  .bs-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(224,162,187,.45); color: var(--bs-ink); }
  .bs-cta-outline { display: inline-flex; align-items: center; gap: 10px; min-height: 56px; padding: 17px 26px; border-radius: 999px; border: 1px solid rgba(28,20,18,.18); color: inherit; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; transition: border-color .3s ease; }
  .bs-row:hover { background: rgba(224,162,187,.12); }

  @media (prefers-reduced-motion: reduce) {
    [data-bs-rise], [data-bs-row] { opacity: 1 !important; transform: none !important; }
  }
</style>
</head>
<body>

<svg aria-hidden="true" width="0" height="0" style="position:absolute;top:0;left:0">
  <defs>
    <filter id="bs-paint" x="-12%" y="-30%" width="124%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.09" numOctaves="3" seed="11" result="noise"></feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
    </filter>
    <filter id="bs-paint-b" x="-12%" y="-30%" width="124%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.11" numOctaves="3" seed="34" result="noise"></feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
    </filter>
  </defs>
</svg>

<svg data-bs-line aria-hidden="true" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;pointer-events:none;overflow:visible">
  <path data-bs-line-path d="" fill="none" stroke="#c2708f" stroke-width="2" stroke-linecap="round"></path>
  <circle data-bs-line-dot r="4.5" cx="-20" cy="-20" fill="#c2708f" style="filter:drop-shadow(0 0 10px rgba(194,112,143,.95))"></circle>
</svg>

<header data-bs-nav style="position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px clamp(16px,4vw,56px);backdrop-filter:blur(14px);background:rgba(11,11,12,.32);transition:background .4s ease">
  <a href="#topo" style="display:flex;align-items:center;color:#f4f2f0">
    <img src="uploads/logo.png" alt="Beauty Studios" style="height:54px;width:auto;display:block;filter:invert(1);mix-blend-mode:screen" />
  </a>
  <nav style="display:flex;align-items:center;gap:clamp(14px,2.4vw,34px)">
    <a href="#protocolos" style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f4f2f0;opacity:.75">Protocolos</a>
    <a href="#resultados" style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f4f2f0;opacity:.75">Resultados</a>
    <a href="#investimento" style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f4f2f0;opacity:.75">Investimento</a>
    <a href="#" id="bs-nav-wa" target="_blank" rel="noopener" class="bs-cta-primary">
      <span style="width:7px;height:7px;border-radius:50%;background:#e0a2bb;display:inline-block"></span>Agendar avaliação
    </a>
  </nav>
</header>

<div style="position:relative;width:100%;overflow:hidden;background:var(--bs-bg)">
  <!-- BS:SECTIONS:INSERT -->
</div>

<a href="#" data-bs-float-cta target="_blank" rel="noopener" style="position:fixed;right:clamp(14px,3vw,30px);bottom:clamp(14px,3vw,30px);z-index:70;display:flex;align-items:center;gap:10px;min-height:52px;padding:15px 22px;border-radius:999px;background:#f4f2f0;color:#0b0b0c;font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;box-shadow:0 12px 34px rgba(11,11,12,.28);opacity:0;transform:translateY(20px)">
  <span style="width:8px;height:8px;border-radius:50%;background:#25d366;display:inline-block;animation:bs-pulse 2.2s ease-in-out infinite"></span>Agendar avaliação
</a>

<script>
  var WA_NUMBER = '5511998877665';
  var WA_TEXT = 'Oi! Vi o site da Beauty Studios e quero agendar uma avaliação.';
  var WA_HREF = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_TEXT);
  document.getElementById('bs-nav-wa').href = WA_HREF;
  document.querySelector('[data-bs-float-cta]').href = WA_HREF;

  // BS:SCRIPT:INSERT
</script>
</body>
</html>
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'bs-paint'
```

Expected: title prints; second prints at least `2` (both filter ids).

**Manual check:** header is fixed/translucent with the inverted logo, nav links, and a pill WA
button; a floating WA pill sits bottom-right (still invisible/transparent — fade-in wiring comes in
Task 9); both links open `wa.me/5511998877665` with the avaliação message.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add static page skeleton with header, svg defs and floating cta

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Hero section

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Replace `<!-- BS:SECTIONS:INSERT -->` with the hero section**

```html
  <section id="topo" data-bs-hero style="position:relative;min-height:100svh;background:#0b0b0c;display:flex;align-items:flex-end;overflow:hidden;padding:0 0 clamp(32px,6vh,80px)">
    <div data-bs-depth="0.06" style="position:absolute;top:-10%;left:50%;transform:translateX(-50%);width:min(1100px,120vw);height:min(1100px,120vw);border-radius:50%;background:radial-gradient(circle,rgba(224,162,187,.30),rgba(224,162,187,0) 62%);pointer-events:none"></div>

    <div data-bs-parallax="0.16" data-bs-start="top top" data-bs-depth="0.9" style="position:absolute;top:-16%;left:0;width:100%;height:132%;opacity:.92">
      <img src="uploads/hero-camada1.png" alt="Andy Afrodite" style="width:100%;height:100%;object-fit:cover" />
    </div>

    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.66) 0%,rgba(11,11,12,.18) 38%,rgba(11,11,12,.92) 100%);pointer-events:none"></div>

    <div data-bs-parallax="-0.1" data-bs-start="top top" data-bs-depth="2.2" style="position:absolute;top:10%;right:-12%;width:min(38vw,480px);height:min(52vh,560px);filter:invert(1);mix-blend-mode:screen;opacity:.34;mask-image:radial-gradient(ellipse at center,rgba(0,0,0,1) 38%,rgba(0,0,0,0) 76%);-webkit-mask-image:radial-gradient(ellipse at center,rgba(0,0,0,1) 38%,rgba(0,0,0,0) 76%);pointer-events:none">
      <img src="uploads/hero-camada2.png" alt="" style="width:100%;height:100%;object-fit:cover" />
    </div>

    <div data-bs-parallax="-0.22" data-bs-start="top top" data-bs-depth="3.6" style="position:absolute;top:-8%;right:30%;width:min(22vw,270px);height:min(32vh,330px);filter:invert(1);mix-blend-mode:screen;opacity:.4;mask-image:radial-gradient(ellipse at center,rgba(0,0,0,1) 38%,rgba(0,0,0,0) 76%);-webkit-mask-image:radial-gradient(ellipse at center,rgba(0,0,0,1) 38%,rgba(0,0,0,0) 76%);animation:bs-float 9s ease-in-out infinite;pointer-events:none">
      <img src="uploads/hero-camada3.png" alt="" style="width:100%;height:100%;object-fit:contain" />
    </div>

    <div style="position:relative;z-index:10;width:100%;padding:0 clamp(16px,4vw,56px);display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(20px,4vh,44px)">
      <div style="max-width:min(980px,92vw)">
        <p data-bs-rise style="margin:0 0 clamp(14px,2vh,22px);font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:#e0a2bb">Estética avançada · São Paulo</p>
        <h1 data-bs-rise style="margin:0;color:#f4f2f0;font-family:'Bodoni Moda',serif;font-weight:400;line-height:.92;font-size:clamp(44px,8.4vw,132px);letter-spacing:-.02em">
          Sua pele já sabe<br />
          <em style="font-style:italic;position:relative;display:inline-block;color:#0b0b0c">
            <span data-bs-mark style="position:absolute;left:-.09em;right:-.07em;top:-.04em;bottom:-.04em;height:auto;background:#e0a2bb;border-radius:46% 54% 44% 56%/58% 42% 60% 40%;filter:url(#bs-paint);z-index:-1;transform-origin:left center"></span>
            o que pedir.
          </em>
        </h1>
        <p data-bs-rise style="margin:clamp(18px,3vh,30px) 0 0;max-width:52ch;font-size:clamp(15px,1.5vw,19px);line-height:1.65;color:rgba(244,242,240,.74);font-weight:300">
          Protocolos faciais desenhados um a um, a partir da leitura da sua pele. Sem pacote genérico, sem promessa vazia.
        </p>
        <div data-bs-rise style="display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:clamp(24px,4vh,40px)">
          <a href="#" id="bs-hero-wa" target="_blank" rel="noopener" class="bs-cta-primary" style="min-height:56px;padding:17px 30px;font-size:12px;font-weight:600">
            Agendar avaliação <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:17px;text-transform:none;letter-spacing:0">no WhatsApp</span>
          </a>
          <a href="#protocolos" class="bs-cta-outline" style="color:#f4f2f0">Ver protocolos</a>
        </div>
      </div>

      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;border-top:1px solid rgba(244,242,240,.14);padding-top:22px">
        <div style="display:flex;gap:clamp(20px,4vw,56px);flex-wrap:wrap">
          <div>
            <p style="margin:0;font-family:'Bodoni Moda',serif;font-size:clamp(26px,3vw,40px);color:#f4f2f0;line-height:1">9 anos</p>
            <p style="margin:6px 0 0;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,242,240,.5)">de consultório</p>
          </div>
          <div>
            <p style="margin:0;font-family:'Bodoni Moda',serif;font-size:clamp(26px,3vw,40px);color:#f4f2f0;line-height:1">2.400+</p>
            <p style="margin:6px 0 0;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,242,240,.5)">protocolos aplicados</p>
          </div>
          <div>
            <p style="margin:0;font-family:'Bodoni Moda',serif;font-size:clamp(26px,3vw,40px);color:#f4f2f0;line-height:1">4,9</p>
            <p style="margin:6px 0 0;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(244,242,240,.5)">avaliação das clientes</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;color:rgba(244,242,240,.45);font-size:10px;letter-spacing:.26em;text-transform:uppercase">
          <span style="position:relative;display:block;width:1px;height:52px;background:rgba(244,242,240,.2);overflow:hidden"><span style="position:absolute;inset:0;background:#e0a2bb;animation:bs-scrollcue 2.4s ease-in-out infinite"></span></span>
          Role
        </div>
      </div>
    </div>
  </section>

  <div style="position:relative;z-index:4;background:#0b0b0c;border-top:1px solid rgba(244,242,240,.1);padding:16px 0;overflow:hidden">
    <div style="display:flex;width:max-content;animation:bs-marquee 34s linear infinite">
      <div style="display:flex;align-items:center;gap:clamp(22px,4vw,52px);padding-right:clamp(22px,4vw,52px)">
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">limpeza profunda</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">peeling químico</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">microagulhamento</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">skinbooster</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">toxina botulínica</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">preenchimento labial</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">design de sobrancelhas</span><span style="color:#e0a2bb">✳</span>
      </div>
      <div aria-hidden="true" style="display:flex;align-items:center;gap:clamp(22px,4vw,52px);padding-right:clamp(22px,4vw,52px)">
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">limpeza profunda</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">peeling químico</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">microagulhamento</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">skinbooster</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">toxina botulínica</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">preenchimento labial</span><span style="color:#e0a2bb">✳</span>
        <span style="font-family:'Bodoni Moda',serif;font-style:italic;font-size:clamp(18px,2.2vw,30px);color:#f4f2f0">design de sobrancelhas</span><span style="color:#e0a2bb">✳</span>
      </div>
    </div>
  </div>

  <!-- BS:SECTIONS:INSERT -->
```

- [ ] **Step 2: Wire the hero WA button**

Replace `  // BS:SCRIPT:INSERT` with:

```js
  document.getElementById('bs-hero-wa').href = WA_HREF;

  // BS:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'data-bs-mark'
```

Expected: `1` (the first of two marker spans — the second is added in Task 7's final CTA).

**Manual check:** hero fills the viewport with the dark parallax photo stack (static positioning
for now — scrub wiring comes in Task 9), headline with a flat pink highlight block behind "o que
pedir." (turbulence filter renders even without GSAP, since it's pure SVG/CSS), stat row, and a
scrolling marquee band beneath.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add hero section and marquee

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: "Problemas" 3-card grid

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Replace `<!-- BS:SECTIONS:INSERT -->` with the Problemas section**

```html
  <section data-bs-hero style="position:relative;z-index:4;padding:clamp(64px,12vh,140px) clamp(16px,4vw,56px) clamp(48px,9vh,110px)">
    <div style="max-width:1280px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(24px,4vw,56px);align-items:end;margin-bottom:clamp(36px,6vh,72px)">
        <h2 data-bs-rise style="margin:0;font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(34px,5.4vw,78px);line-height:1.02;letter-spacing:-.02em">
          O que a sua pele<br /><em style="font-style:italic">está te contando</em>
        </h2>
        <p data-bs-rise style="margin:0;font-size:clamp(14px,1.4vw,17px);line-height:1.7;color:#5f5d5b;max-width:44ch;font-weight:300">
          Quase tudo o que incomoda no espelho tem causa, tempo de tratamento e protocolo. O primeiro passo é nomear o que você vê.
        </p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(16px,2vw,26px)">
        <article data-bs-rise style="position:relative;border-radius:22px;overflow:hidden;background:#0b0b0c;min-height:clamp(420px,54vh,560px);display:flex;flex-direction:column;justify-content:flex-end">
          <img src="uploads/poros.png" alt="Poros dilatados — macro de pele" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.1),rgba(11,11,12,.88));pointer-events:none"></div>
          <div style="position:relative;padding:clamp(20px,2.6vw,34px);pointer-events:none">
            <p style="margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.6)">Poros dilatados</p>
            <h3 style="margin:10px 0 0;font-family:'Bodoni Moda',serif;font-style:italic;font-weight:400;font-size:clamp(28px,3.4vw,46px);line-height:1;color:#f4f2f0">
              <span style="position:relative;display:inline-block;color:#0b0b0c"><span style="position:absolute;left:-.1em;right:-.08em;top:-.05em;bottom:-.05em;height:auto;background:#e0a2bb;border-radius:48% 52% 42% 58%/56% 44% 58% 42%;filter:url(#bs-paint);z-index:-1"></span>incomodam?</span>
            </h3>
            <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:rgba(244,242,240,.7);max-width:34ch;font-weight:300">Limpeza profunda e peeling controlam oleosidade e refinam a textura em poucas sessões.</p>
          </div>
        </article>

        <article data-bs-rise style="position:relative;border-radius:22px;overflow:hidden;background:#0b0b0c;min-height:clamp(420px,54vh,560px);display:flex;flex-direction:column;justify-content:flex-end">
          <img src="uploads/olheiras.png" alt="Olheiras — close do olhar" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.1),rgba(11,11,12,.88));pointer-events:none"></div>
          <div style="position:absolute;top:clamp(18px,3vw,34px);left:clamp(18px,3vw,34px);width:clamp(90px,12vw,150px);height:clamp(90px,12vw,150px);border:1px solid #e0a2bb;border-radius:50%;pointer-events:none"></div>
          <div style="position:relative;padding:clamp(20px,2.6vw,34px);pointer-events:none">
            <p style="margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.6)">Olheiras profundas</p>
            <h3 style="margin:10px 0 0;font-family:'Bodoni Moda',serif;font-style:italic;font-weight:400;font-size:clamp(28px,3.4vw,46px);line-height:1;color:#f4f2f0">cansaço ou genética?</h3>
            <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:rgba(244,242,240,.7);max-width:34ch;font-weight:300">Clareamento e skinbooster devolvem leveza à região — a avaliação define qual dos dois.</p>
          </div>
        </article>

        <article data-bs-rise style="position:relative;border-radius:22px;overflow:hidden;background:#0b0b0c;min-height:clamp(420px,54vh,560px);display:flex;flex-direction:column;justify-content:flex-end">
          <img src="uploads/linhasexpressao.png" alt="Rugas / linhas finas" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,11,12,.1),rgba(11,11,12,.88));pointer-events:none"></div>
          <div style="position:relative;padding:clamp(20px,2.6vw,34px);pointer-events:none">
            <p style="margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.6)">Linhas de expressão</p>
            <h3 style="margin:10px 0 0;font-family:'Bodoni Moda',serif;font-style:italic;font-weight:400;font-size:clamp(28px,3.4vw,46px);line-height:1;color:#f4f2f0">não aparecem do nada.</h3>
            <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:rgba(244,242,240,.7);max-width:34ch;font-weight:300">Toxina e estímulo de colágeno tratam a causa e preservam o seu movimento natural.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- BS:SECTIONS:INSERT -->
```

(Note: this section does not need `data-bs-parallax`/`data-bs-depth` — only the hero has those.
The `data-bs-hero` attribute on this `<section>` is a mistake to avoid: do NOT add it here, only
the hero section from Task 3 keeps it — it's unused by JS in this plan and was included in the
hero for source-fidelity only; ignore/remove if present after pasting.)

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'Olheiras profundas'
```

Expected: `1`.

**Manual check:** three full-bleed photo cards stack responsively, each with a dark gradient,
label/headline/description; the "olheiras" card shows a decorative circle outline.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add problemas section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: "Protocolos" section

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Replace `<!-- BS:SECTIONS:INSERT -->` with the Protocolos section**

```html
  <section id="protocolos" style="position:relative;z-index:4;padding:clamp(56px,10vh,120px) clamp(16px,4vw,56px)">
    <div style="max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(32px,5vw,72px);align-items:start">
      <div style="position:sticky;top:clamp(90px,14vh,140px)">
        <p data-bs-rise style="margin:0 0 18px;font-size:11px;letter-spacing:.4em;text-transform:uppercase;color:#c2708f">Protocolos</p>
        <h2 data-bs-rise style="margin:0 0 26px;font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(32px,4.6vw,66px);line-height:1.04;letter-spacing:-.02em">
          Sete caminhos.<br /><em style="font-style:italic">Um por vez.</em>
        </h2>
        <p data-bs-rise style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#5f5d5b;max-width:40ch;font-weight:300">
          Cada um tem indicação, tempo e intervalo próprios. Na avaliação a gente decide qual combinação a sua pele aceita agora.
        </p>
        <div data-bs-rise style="position:relative;width:100%;aspect-ratio:4/5;max-width:380px;border-radius:18px;overflow:hidden;background:#0b0b0c">
          <img src="uploads/protocolos.png" alt="Detalhe do procedimento" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>

      <ul id="bs-protocol-list" style="list-style:none;margin:0;padding:0;border-top:1px solid rgba(11,11,12,.14)"></ul>
    </div>
  </section>

  <!-- BS:SECTIONS:INSERT -->
```

- [ ] **Step 2: Add the protocol data + render**

Replace `  // BS:SCRIPT:INSERT` with:

```js
  var BS_PROTOCOLOS = [
    { num: '01', nome: 'Limpeza de pele profunda', desc: 'Extração, vapor e ativos calmantes. A base de qualquer protocolo mais longo.', tempo: '60 min' },
    { num: '02', nome: 'Peeling químico', desc: 'Renovação controlada para manchas, textura irregular e marcas de acne.', tempo: '45 min' },
    { num: '03', nome: 'Microagulhamento', desc: 'Estímulo de colágeno para cicatrizes, poros dilatados e firmeza.', tempo: '75 min' },
    { num: '04', nome: 'Skinbooster', desc: 'Ácido hialurônico injetável para hidratação profunda e viço real.', tempo: '50 min' },
    { num: '05', nome: 'Toxina botulínica', desc: 'Linhas de expressão suavizadas com dose calculada, sem congelar o rosto.', tempo: '40 min' },
    { num: '06', nome: 'Preenchimento labial', desc: 'Volume e contorno respeitando a sua proporção. Resultado natural.', tempo: '60 min' },
    { num: '07', nome: 'Design de sobrancelhas', desc: 'Mapeamento do traço ideal para a sua estrutura óssea e olhar.', tempo: '40 min' }
  ];
  document.getElementById('bs-protocol-list').innerHTML = BS_PROTOCOLOS.map(function (p) {
    return '<li class="bs-row" data-bs-row style="border-bottom:1px solid rgba(11,11,12,.14);transition:background .35s ease">' +
      '<div style="display:flex;align-items:baseline;gap:clamp(14px,2vw,28px);padding:clamp(20px,2.6vw,32px) clamp(8px,1.4vw,20px)">' +
        '<span style="font-size:11px;letter-spacing:.2em;color:#c2708f;min-width:28px;font-variant-numeric:tabular-nums">' + p.num + '</span>' +
        '<div style="flex:1;min-width:0">' +
          '<h3 style="margin:0;font-family:\'Bodoni Moda\',serif;font-weight:400;font-size:clamp(22px,2.8vw,38px);line-height:1.1">' + p.nome + '</h3>' +
          '<p style="margin:10px 0 0;font-size:14px;line-height:1.65;color:#5f5d5b;max-width:48ch;font-weight:300">' + p.desc + '</p>' +
        '</div>' +
        '<span style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8785;white-space:nowrap">' + p.tempo + '</span>' +
      '</div>' +
    '</li>';
  }).join('');

  // BS:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'Design de sobrancelhas'
```

Expected: `1`.

**Manual check:** left column stays visually anchored (sticky, once scrolled with it in view) while
the right column lists all 7 protocol rows with number/name/description/duration.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add protocolos section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: "Resultados" before/after slider

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Replace `<!-- BS:SECTIONS:INSERT -->` with the Resultados section**

```html
  <section id="resultados" style="position:relative;z-index:4;background:#0b0b0c;padding:clamp(56px,10vh,120px) clamp(16px,4vw,56px);margin-top:clamp(40px,7vh,90px)">
    <div style="max-width:1280px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(22px,4vw,56px);align-items:end;margin-bottom:clamp(30px,5vh,60px)">
        <h2 data-bs-rise style="margin:0;color:#f4f2f0;font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(32px,5vw,72px);line-height:1.02;letter-spacing:-.02em">
          Arraste e veja<br /><em style="font-style:italic">a diferença</em>
        </h2>
        <p data-bs-rise style="margin:0;font-size:14px;line-height:1.7;color:rgba(244,242,240,.62);max-width:40ch;font-weight:300">
          Resultados reais de clientes, mesma luz e mesmo ângulo. Sem filtro e sem retoque.
        </p>
      </div>

      <div data-bs-ba style="position:relative;width:100%;aspect-ratio:16/9;min-height:clamp(280px,46vh,520px);border-radius:22px;overflow:hidden;cursor:ew-resize;touch-action:none;background:#141415">
        <div style="position:absolute;inset:0"><img src="assets/ba-depois.png" alt="Depois — mesma pessoa, mesma luz" style="width:100%;height:100%;object-fit:cover" /></div>
        <div data-bs-ba-clip style="position:absolute;inset:0;clip-path:inset(0 50% 0 0)">
          <img src="assets/ba-antes.png" alt="Antes — mesma pessoa, mesma luz" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div data-bs-ba-handle style="position:absolute;top:0;bottom:0;left:50%;width:2px;background:#e0a2bb;pointer-events:none;box-shadow:0 0 24px rgba(224,162,187,.6)">
          <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:52px;height:52px;border-radius:50%;background:#f4f2f0;display:flex;align-items:center;justify-content:center;font-size:13px;color:#0b0b0c;letter-spacing:.05em">↔</span>
        </div>
        <span style="position:absolute;top:18px;left:18px;padding:7px 14px;border-radius:999px;background:rgba(11,11,12,.6);color:#f4f2f0;font-size:10px;letter-spacing:.26em;text-transform:uppercase;pointer-events:none">Antes</span>
        <span style="position:absolute;top:18px;right:18px;padding:7px 14px;border-radius:999px;background:rgba(244,242,240,.9);color:#0b0b0c;font-size:10px;letter-spacing:.26em;text-transform:uppercase;pointer-events:none">Depois</span>
      </div>
    </div>
  </section>

  <!-- BS:SECTIONS:INSERT -->
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'data-bs-ba'
```

Expected: at least `1` (the drag JS wiring, which makes it interactive, comes in Task 9 — until
then the slider is static at 50%, which is expected at this point).

**Manual check:** a dark rounded panel shows the "depois" photo with the "antes" photo clipped to
its left half, a pink vertical handle with a `↔` glyph at the midpoint, "Antes"/"Depois" chips top
corners.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add resultados before-after section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Depoimentos, Investimento, FAQ, and final CTA

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Replace `<!-- BS:SECTIONS:INSERT -->` with all four remaining sections**

```html
  <section style="position:relative;z-index:4;padding:clamp(56px,11vh,130px) clamp(16px,4vw,56px)">
    <div style="max-width:1180px;margin:0 auto">
      <p data-bs-rise style="margin:0 0 clamp(28px,5vh,56px);font-size:11px;letter-spacing:.4em;text-transform:uppercase;color:#c2708f">Elas voltam</p>
      <div id="bs-testimonials" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(18px,2.4vw,32px)"></div>
    </div>
  </section>

  <section id="investimento" style="position:relative;z-index:4;padding:clamp(56px,10vh,120px) clamp(16px,4vw,56px)">
    <div style="max-width:1180px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(22px,4vw,56px);align-items:end;margin-bottom:clamp(30px,5vh,60px)">
        <h2 data-bs-rise style="margin:0;font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(32px,5vw,72px);line-height:1.02;letter-spacing:-.02em">Investimento<br /><em style="font-style:italic">transparente</em></h2>
        <p data-bs-rise style="margin:0;font-size:14px;line-height:1.7;color:#5f5d5b;max-width:40ch;font-weight:300">Valores de referência. O plano final sai da avaliação, sem compromisso de fechar na hora.</p>
      </div>
      <div id="bs-pricing" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(16px,2vw,24px)"></div>
    </div>
  </section>

  <section style="position:relative;z-index:4;padding:clamp(56px,10vh,120px) clamp(16px,4vw,56px)">
    <div style="max-width:1000px;margin:0 auto">
      <h2 data-bs-rise style="margin:0 0 clamp(28px,5vh,56px);font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(30px,4.4vw,60px);line-height:1.04;letter-spacing:-.02em">Dúvidas <em style="font-style:italic">frequentes</em></h2>
      <div id="bs-faq-list" style="border-top:1px solid rgba(11,11,12,.14)"></div>
    </div>
  </section>

  <section style="position:relative;z-index:4;background:#0b0b0c;padding:clamp(64px,12vh,150px) clamp(16px,4vw,56px) clamp(40px,6vh,70px);overflow:hidden">
    <div data-bs-parallax="-0.12" style="position:absolute;top:-20%;right:-10%;width:min(70vw,760px);height:min(70vw,760px);border-radius:50%;background:radial-gradient(circle,rgba(224,162,187,.26),rgba(224,162,187,0) 65%);pointer-events:none"></div>
    <div style="position:relative;max-width:1180px;margin:0 auto">
      <h2 data-bs-rise style="margin:0;color:#f4f2f0;font-family:'Bodoni Moda',serif;font-weight:400;font-size:clamp(38px,7.4vw,116px);line-height:.96;letter-spacing:-.025em;max-width:20ch">
        Você não precisa<br />esperar para
        <em style="font-style:italic;position:relative;display:inline-block;color:#0b0b0c">
          <span data-bs-mark style="position:absolute;left:-.08em;right:-.08em;top:-.04em;bottom:-.04em;height:auto;background:#e0a2bb;border-radius:52% 48% 56% 44%/44% 58% 42% 56%;filter:url(#bs-paint-b);z-index:-1;transform-origin:left center"></span>
          se sentir bem.
        </em>
      </h2>
      <div data-bs-rise style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-top:clamp(28px,5vh,52px)">
        <a href="#" id="bs-final-wa" target="_blank" rel="noopener" class="bs-cta-primary" style="min-height:60px;padding:19px 34px;font-size:12px;font-weight:600;background:#e0a2bb">Agendar avaliação no WhatsApp</a>
        <p style="margin:0;font-size:13px;color:rgba(244,242,240,.55);font-weight:300">Resposta em até 2 horas, em horário comercial.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(22px,3vw,40px);margin-top:clamp(48px,9vh,110px);padding-top:clamp(26px,4vh,44px);border-top:1px solid rgba(244,242,240,.14)">
        <div>
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.45)">Onde</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#f4f2f0;font-weight:300">Rua das Palmeiras, 218 · sala 704<br />Pinheiros — São Paulo</p>
        </div>
        <div>
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.45)">Horários</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#f4f2f0;font-weight:300">Ter a sex · 9h às 20h<br />Sábado · 9h às 15h</p>
        </div>
        <div>
          <p style="margin:0 0 12px;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(244,242,240,.45)">Contato</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#f4f2f0;font-weight:300">+55 11 99887-7665<br />@beautystudios</p>
        </div>
        <div style="position:relative;min-height:150px;border-radius:16px;overflow:hidden">
          <img src="uploads/clinica.png" alt="Ambiente do estúdio" style="width:100%;height:100%;object-fit:cover" />
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:clamp(34px,6vh,64px)">
        <img src="uploads/logo.png" alt="Beauty Studios" style="height:70px;width:auto;display:block;filter:invert(1);mix-blend-mode:screen;opacity:.9" />
        <span style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,242,240,.38)">Marca fictícia · 2026</span>
      </div>
    </div>
  </section>
```

(No trailing `<!-- BS:SECTIONS:INSERT -->` — this is the last block of sections.)

- [ ] **Step 2: Add testimonial/pricing/FAQ data + render + final CTA wiring**

Replace `  // BS:SCRIPT:INSERT` with:

```js
  document.getElementById('bs-final-wa').href = WA_HREF;

  var BS_TESTIMONIALS = [
    { texto: 'Saí da primeira avaliação entendendo minha pele pela primeira vez em 30 anos.', nome: 'Marina R.', proto: 'Peeling + skinbooster' },
    { texto: 'Minhas marcas de acne sumiram quase por completo. Nunca acreditei que fosse possível.', nome: 'Letícia A.', proto: 'Microagulhamento' },
    { texto: 'Toxina bem feita é isso: continuo com o meu rosto, só descansada.', nome: 'Carol M.', proto: 'Toxina botulínica' }
  ];
  document.getElementById('bs-testimonials').innerHTML = BS_TESTIMONIALS.map(function (d) {
    return '<figure data-bs-rise style="margin:0;padding:clamp(24px,3vw,38px);border:1px solid rgba(11,11,12,.14);border-radius:20px;background:#faf9f8;display:flex;flex-direction:column;gap:22px">' +
      '<blockquote style="margin:0;font-family:\'Bodoni Moda\',serif;font-style:italic;font-weight:400;font-size:clamp(19px,2vw,26px);line-height:1.35;letter-spacing:-.01em">' + d.texto + '</blockquote>' +
      '<figcaption style="display:flex;align-items:center;gap:14px;margin-top:auto">' +
        '<span style="width:28px;height:1px;background:#c2708f;flex:0 0 auto;display:block"></span>' +
        '<span><span style="display:block;font-size:13px;font-weight:500">' + d.nome + '</span><span style="display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8785;margin-top:4px">' + d.proto + '</span></span>' +
      '</figcaption>' +
    '</figure>';
  }).join('');

  var BS_PACOTES = [
    { tag: 'Primeira vez', nome: 'Avaliação + limpeza', preco: 'R$ 290', inclui: 'Leitura completa da pele, limpeza profunda e plano de tratamento por escrito.' },
    { tag: 'Mais procurado', nome: 'Protocolo 4 sessões', preco: 'R$ 1.180', inclui: 'Quatro sessões combinadas conforme o plano, com acompanhamento fotográfico.' },
    { tag: 'Manutenção', nome: 'Plano mensal', preco: 'R$ 340/mês', inclui: 'Uma sessão por mês, ajustes de protocolo e prioridade na agenda.' }
  ];
  document.getElementById('bs-pricing').innerHTML = BS_PACOTES.map(function (k) {
    return '<div data-bs-rise style="display:flex;flex-direction:column;gap:18px;padding:clamp(26px,3vw,40px);border:1px solid rgba(11,11,12,.16);border-radius:22px;background:#faf9f8">' +
      '<p style="margin:0;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#c2708f">' + k.tag + '</p>' +
      '<h3 style="margin:0;font-family:\'Bodoni Moda\',serif;font-weight:400;font-size:clamp(24px,2.8vw,34px);line-height:1.1">' + k.nome + '</h3>' +
      '<p style="margin:0;font-family:\'Bodoni Moda\',serif;font-size:clamp(30px,4vw,48px);line-height:1">' + k.preco + '</p>' +
      '<p style="margin:0;font-size:14px;line-height:1.65;color:#5f5d5b;font-weight:300">' + k.inclui + '</p>' +
      '<a href="' + WA_HREF + '" target="_blank" rel="noopener" style="margin-top:auto;display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:15px 24px;border-radius:999px;background:#0b0b0c;color:#f4f2f0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:500;transition:background .3s ease">Agendar avaliação</a>' +
    '</div>';
  }).join('');

  var BS_FAQ = [
    { q: 'Preciso saber o que quero fazer antes de agendar?', a: 'Não. A avaliação existe justamente para isso: a gente lê a sua pele, entende sua rotina e monta o protocolo a partir daí.' },
    { q: 'Quanto tempo dura uma sessão?', a: 'Entre 40 e 90 minutos, dependendo do protocolo. A avaliação inicial leva cerca de 40 minutos.' },
    { q: 'Os procedimentos doem?', a: 'A maioria é indolor. Microagulhamento, peeling e preenchimento usam anestésico tópico, com desconforto leve e passageiro.' },
    { q: 'Em quanto tempo eu vejo resultado?', a: 'Limpeza e skinbooster dão brilho imediato. Colágeno e textura respondem em 3 a 6 semanas, com manutenção periódica.' },
    { q: 'Posso fazer se estiver grávida ou amamentando?', a: 'Alguns protocolos sim, outros ficam para depois. Avise na avaliação para montarmos um plano seguro.' },
    { q: 'Como funciona o pagamento?', a: 'Pix, débito e crédito em até 4x sem juros. Pacotes podem ser divididos ao longo das sessões.' }
  ];
  var bsOpenFaq = -1;
  var bsFaqListEl = document.getElementById('bs-faq-list');
  function renderBsFaq() {
    bsFaqListEl.innerHTML = BS_FAQ.map(function (f, i) {
      var open = bsOpenFaq === i;
      return '<div style="border-bottom:1px solid rgba(11,11,12,.14)">' +
        '<button type="button" class="bs-faq-toggle" data-i="' + i + '" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:clamp(20px,2.4vw,28px) 4px;background:none;border:0;cursor:pointer;text-align:left;font-family:Archivo,sans-serif;min-height:56px">' +
          '<span style="font-size:clamp(15px,1.6vw,19px);font-weight:400;color:#0b0b0c">' + f.q + '</span>' +
          '<span style="flex:0 0 auto;width:30px;height:30px;border-radius:50%;border:1px solid rgba(11,11,12,.24);display:flex;align-items:center;justify-content:center;font-size:15px;color:#c2708f">' + (open ? '−' : '+') + '</span>' +
        '</button>' +
        '<div style="' + (open ? 'overflow:hidden;max-height:360px;opacity:1;transition:max-height .5s ease,opacity .4s ease' : 'overflow:hidden;max-height:0;opacity:0;transition:max-height .4s ease,opacity .25s ease') + '">' +
          '<p style="margin:0;padding:0 4px clamp(22px,2.6vw,30px);font-size:15px;line-height:1.72;color:#5f5d5b;max-width:70ch;font-weight:300">' + f.a + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
    Array.prototype.forEach.call(bsFaqListEl.querySelectorAll('.bs-faq-toggle'), function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.dataset.i);
        bsOpenFaq = bsOpenFaq === i ? -1 : i;
        renderBsFaq();
      });
    });
  }
  renderBsFaq();

  // BS:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'Marca fictícia'
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'bs-faq-list'
```

Expected: both print at least `1`.

**Manual check:** 3 testimonial cards, 3 pricing cards (always visible — no more `mostrarPrecos`
toggle), 6-question FAQ accordion (one open at a time), final CTA with headline mark, WhatsApp
button, location/hours/contact/clinic-photo grid, footer logo bar.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): add depoimentos, investimento, faq and final cta

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: GSAP motion system (reveals, parallax, mouse-depth, progressive line, nav/FAB, before/after drag)

**Files:**
- Modify: `public/landing-pages/beauty-studios/index.html`

- [ ] **Step 1: Add the full motion-init function**

Replace `  // BS:SCRIPT:INSERT` with:

```js
  function bsInitMotion() {
    var gsap = window.gsap;
    if (!gsap) return;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var q = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

    q('[data-bs-rise]').forEach(function (el) {
      gsap.fromTo(el, { y: reduce ? 0 : 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    q('[data-bs-mark]').forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.1, ease: 'power4.out', delay: .35,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });

    q('[data-bs-row]').forEach(function (el, i) {
      gsap.fromTo(el, { opacity: 0, x: reduce ? 0 : 26 }, {
        opacity: 1, x: 0, duration: .8, ease: 'power3.out', delay: i * .04,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true }
      });
    });

    if (!reduce) {
      q('[data-bs-parallax]').forEach(function (el) {
        var amt = parseFloat(el.dataset.bsParallax) || 0;
        var host = el.closest('section') || el.parentElement;
        gsap.fromTo(el, { yPercent: 0 }, {
          yPercent: amt * 100, ease: 'none',
          scrollTrigger: {
            trigger: host,
            start: el.dataset.bsStart || 'top bottom',
            end: el.dataset.bsEnd || 'bottom top',
            scrub: true
          }
        });
      });
      var bg = document.querySelector('[data-bs-start="top top"]');
      if (bg) gsap.fromTo(bg, { scale: 1.08 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '#topo', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    var depths = q('[data-bs-depth]');
    var bsMouseHandler = function (e) {
      var cx = (e.clientX / window.innerWidth - .5);
      var cy = (e.clientY / window.innerHeight - .5);
      depths.forEach(function (el) {
        var d = parseFloat(el.dataset.bsDepth) || 0;
        gsap.to(el, { x: -cx * d * 26, y: -cy * d * 18, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });
      });
    };
    if (!reduce && window.matchMedia('(pointer: fine)').matches) window.addEventListener('mousemove', bsMouseHandler);

    var svg = document.querySelector('[data-bs-line]');
    var path = document.querySelector('[data-bs-line-path]');
    var dot = document.querySelector('[data-bs-line-dot]');
    if (svg && path) {
      var len = 0;
      var build = function () {
        var w = svg.clientWidth || window.innerWidth;
        var h = document.documentElement.scrollHeight;
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        var cx = w / 2;
        var amp = Math.min(w * 0.36, 420);
        var segs = Math.max(6, Math.round(h / 900));
        var y0 = h * 0.055;
        var dy = (h * 0.9) / segs;
        var x = cx, y = y0, d = 'M ' + x + ' ' + y;
        for (var i = 0; i < segs; i++) {
          var nx = cx + amp * (i % 2 === 0 ? 1 : -1);
          var ny = y + dy;
          d += ' C ' + x + ' ' + (y + dy * 0.55) + ' ' + nx + ' ' + (ny - dy * 0.55) + ' ' + nx + ' ' + ny;
          x = nx; y = ny;
        }
        d += ' C ' + x + ' ' + (y + dy * 0.45) + ' ' + cx + ' ' + (h * 0.985 - dy * 0.3) + ' ' + cx + ' ' + (h * 0.985);
        path.setAttribute('d', d);
        len = path.getTotalLength();
        path.style.strokeDasharray = len;
      };
      var update = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        path.style.strokeDashoffset = len * (1 - p);
        var pt = path.getPointAtLength(len * p);
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);
        dot.style.opacity = p > 0.002 ? 1 : 0;
      };
      build(); update();
      var t;
      var onResize = function () { clearTimeout(t); t = setTimeout(function () { build(); update(); }, 120); };
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', onResize);
      if (window.ScrollTrigger) window.ScrollTrigger.addEventListener('refresh', function () { build(); update(); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { build(); update(); });
    }

    var nav = document.querySelector('[data-bs-nav]');
    var fab = document.querySelector('[data-bs-float-cta]');
    var bsNavScroll = function () {
      var past = window.scrollY > window.innerHeight * .7;
      if (nav) nav.style.background = past ? 'rgba(11,11,12,.88)' : 'rgba(11,11,12,.32)';
      if (fab) gsap.to(fab, { opacity: past ? 1 : 0, y: past ? 0 : 20, duration: .5, ease: 'power2.out', overwrite: 'auto' });
    };
    bsNavScroll();
    window.addEventListener('scroll', bsNavScroll, { passive: true });

    var ba = document.querySelector('[data-bs-ba]');
    if (ba) {
      var clip = ba.querySelector('[data-bs-ba-clip]');
      var handle = ba.querySelector('[data-bs-ba-handle]');
      var dragging = false;
      var setBa = function (x) {
        var r = ba.getBoundingClientRect();
        var pct = Math.min(97, Math.max(3, ((x - r.left) / r.width) * 100));
        clip.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
      };
      ba.addEventListener('pointerdown', function (e) { dragging = true; setBa(e.clientX); });
      window.addEventListener('pointerup', function () { dragging = false; });
      ba.addEventListener('pointermove', function (e) { if (dragging || e.pointerType === 'mouse') setBa(e.clientX); });
    }
  }

  requestAnimationFrame(bsInitMotion);

  // BS:SCRIPT:INSERT
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'bsInitMotion'
curl -s http://localhost:3000/landing-pages/beauty-studios/index.html | grep -c 'ScrollTrigger'
```

Expected: both print at least `1`.

**Manual check (with dev tools console open, watching for errors):**
- Scroll from the top: hero's 3 image layers move at different parallax speeds; the hero background
  layer scales down slightly as it leaves view; both turbulence-mark headline emphases wipe in with
  a jagged highlight (not a flat rectangle) as they enter view; the pink progressive line traces
  from top to bottom with a glowing dot tracking scroll position; the nav background darkens and
  the floating WA pill fades in once scrolled past ~70% of one viewport height.
- Move the mouse over the hero: the two upper-right decorative layers nudge opposite the cursor
  (pointer: fine only — skip this check on a touch-only device).
- Drag the before/after handle left/right with the mouse (and hover-move without holding the
  button, and via touch): the "antes" layer's visible portion and the handle position track the
  cursor, clamped between 3–97%.
- FAQ accordion opens one question at a time.
- Toggle `prefers-reduced-motion` in dev tools and reload: parallax/mouse-depth/hero-zoom are
  skipped entirely; rise/mark/row reveals still fire but with `y: 0` (no vertical travel — should
  look like a fade only); page remains fully readable and functional.
- Resize to a narrow (mobile) width: all grids collapse to one column, before/after slider remains
  draggable via touch, sticky protocol intro stacks above its list.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/beauty-studios/index.html"
git commit -m "feat(beauty-studios): wire gsap motion system and before-after drag

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Wire the page into the site

**Files:**
- Create: `src/app/landing-pages/beauty-studios/page.tsx`
- Modify: `src/data/landing-pages.ts`

- [ ] **Step 1: Create the redirect route**

```tsx
import { redirect } from 'next/navigation';

export default function BeautyStudiosPage() {
  redirect('/landing-pages/beauty-studios/index.html');
}
```

- [ ] **Step 2: Add the data entry**

Read `src/data/landing-pages.ts` first (it should currently have 5 entries: bellos, imperiofit,
rock, hair-style, andy-afrodite) and append:

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

- [ ] **Step 3: Verify**

```bash
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3000/landing-pages/beauty-studios
curl -s http://localhost:3000/landing-pages | grep -c 'Beauty Studios'
```

Expected: redirect status with `.../landing-pages/beauty-studios/index.html`; second prints at
least `1`.

**Manual check:** `/landing-pages` shows the Beauty Studios card, links through correctly.

- [ ] **Step 4: Commit**

```bash
git add "src/app/landing-pages/beauty-studios/page.tsx" "src/data/landing-pages.ts"
git commit -m "feat(beauty-studios): wire Beauty Studios landing page into the site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Full verification**

```bash
pnpm build
pnpm lint
```

Expected: `pnpm build` succeeds and lists `/landing-pages/beauty-studios` in its route table.
`pnpm lint` shows no new errors beyond the pre-existing, unrelated ones already known from the
prior three landing-page branches (Navbar.tsx, ProjectModal.tsx, ThemeProvider.tsx, About.tsx,
Contact.tsx, BusinessCard.tsx, Footer.tsx, `.design-handoff/` jsx files).
