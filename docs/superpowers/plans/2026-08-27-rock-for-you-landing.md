# Rock For You Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Rock For You" landing page to `/landing-pages`, converting its Claude Design canvas source into a self-contained static `index.html` (matching the Bellos/ImperioFit pattern), then layer a custom three.js + GLSL halftone/pixelation/dither shader with mouse-hover interaction onto the hero and the two orange/cream decorative sections.

**Architecture:** One static file, `public/landing-pages/rock/index.html` (inline `<style>` + inline `<script>`, no build step, no React), served directly by Next.js's static file handler; a thin `page.tsx` redirects `/landing-pages/rock` to it. The page is built up in strict layers: static markup/CSS first (fully functional and good-looking on its own), then vanilla-JS interactivity (quotes, catalog filter, reveals), then the three.js shader system as a pure visual enhancement that degrades to the static CSS backgrounds if WebGL or the CDN script fails.

**Tech Stack:** Plain HTML/CSS/vanilla JS, three.js r160 via CDN (`cdn.jsdelivr.net`), custom GLSL vertex/fragment shaders, Next.js 16 App Router redirect route, TypeScript data array (`src/data/landing-pages.ts`).

**Source spec:** `docs/superpowers/specs/2026-08-27-rock-for-you-landing-design.md` — read it before Task 1 for full context/rationale. This plan implements it task-by-task.

**No automated test framework applies** — this is a static HTML asset outside the Next.js component tree. Verification is: (a) `pnpm build`/`pnpm lint` for the two TS/React files, (b) `curl` against the dev server checking specific markers exist in the served HTML, (c) manual browser checks for anything visual/interactive (explicitly called out as "Manual check" in each task — do not skip these, they are the only way to catch a broken shader or a dead button).

Before Task 1, start the dev server once, in the background, for every task's `curl`/manual checks to use:

```bash
cd "D:/Workspace/Node/portfolio" && pnpm dev
```

Run this with `run_in_background: true` (or an equivalent background shell) — leave it running for the whole plan. It serves on `http://localhost:3000`.

---

## Task 1: Static page skeleton (head, header, empty section anchors, footer)

**Files:**
- Create: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Create the file with the document shell**

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Rock For You — camisetas, mangás e colecionáveis em Duque de Caxias</title>
<meta name="description" content="Rock For You: camisetas de banda, mangás, pelúcias e colecionáveis em Duque de Caxias/RJ. Catálogo, loja física e WhatsApp (21) 99420-8796." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Archivo+Black&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
<style>
  :root {
    --rfy-bg: #0C0B0B;
    --rfy-fg: #EFE9E0;
    --rfy-accent: #EA3B21;
    --rfy-accent-2: #F7D9CF;
    --rfy-font-display: 'Archivo Black', 'Archivo', system-ui, sans-serif;
    --rfy-font-body: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
    --rfy-font-serif: 'Instrument Serif', serif;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: var(--rfy-bg);
    color: var(--rfy-fg);
    font: 400 15px/1.5 var(--rfy-font-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: var(--rfy-accent); text-decoration: none; }
  img { max-width: 100%; display: block; }
  ::-webkit-scrollbar { height: 0; width: 0; }
  @keyframes rfy-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .rfy-header {
    position: sticky; top: 0; z-index: 60;
    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
    gap: 10px 20px; padding: 10px 20px;
    background: rgba(12, 11, 11, 0.94);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(239, 233, 224, 0.13);
  }
  .rfy-brand {
    display: flex; align-items: center; gap: 7px;
    color: var(--rfy-fg); font-family: var(--rfy-font-display);
    font-size: 15px; letter-spacing: 0.01em; text-transform: uppercase;
  }
  .rfy-star { color: var(--rfy-accent); font-size: 10px; }
  .rfy-nav {
    display: flex; flex-wrap: wrap; align-items: center; gap: 6px 20px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .rfy-nav-link { color: rgba(239, 233, 224, 0.66); transition: color 0.15s ease; }
  .rfy-nav-link:hover { color: var(--rfy-fg); }
  .rfy-btn-primary {
    padding: 8px 15px; background: var(--rfy-accent); color: var(--rfy-bg);
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 3px; white-space: nowrap; transition: background 0.15s ease;
  }
  .rfy-btn-primary:hover { background: var(--rfy-fg); }

  .rfy-footer {
    padding: 26px 20px; border-top: 1px solid rgba(239, 233, 224, 0.13);
  }
  .rfy-footer-inner {
    max-width: 1180px; margin: 0 auto;
    display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
    gap: 12px 24px; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(239, 233, 224, 0.5);
  }
  .rfy-footer-brand {
    display: flex; align-items: center; gap: 6px; color: var(--rfy-fg);
    font-family: var(--rfy-font-display); letter-spacing: 0.01em;
  }
  .rfy-footer-link { color: rgba(239, 233, 224, 0.7); transition: color 0.15s ease; }
  .rfy-footer-link:hover { color: var(--rfy-accent); }

  /* RFY:STYLES:INSERT */
</style>
</head>
<body>

<header class="rfy-header">
  <a href="#top" class="rfy-brand">Rock<span class="rfy-star">✶</span>For You</a>
  <nav class="rfy-nav">
    <a href="#catalogo" class="rfy-nav-link">Catálogo</a>
    <a href="#loja" class="rfy-nav-link">A loja</a>
    <a href="https://instagram.com/fabiorockforyou" target="_blank" rel="noreferrer" class="rfy-nav-link">Instagram</a>
  </nav>
  <a href="#" id="rfy-header-wa" class="rfy-btn-primary" target="_blank" rel="noreferrer">WhatsApp</a>
</header>

<main>
  <!-- RFY:SECTIONS:INSERT -->
</main>

<footer class="rfy-footer">
  <div class="rfy-footer-inner">
    <span class="rfy-footer-brand">Rock<span class="rfy-star" style="font-size: 9px;">✶</span>For You</span>
    <a href="#" id="rfy-footer-wa" class="rfy-footer-link" target="_blank" rel="noreferrer">Telefone e WhatsApp: 21 99420-8796</a>
    <a href="https://instagram.com/fabiorockforyou" target="_blank" rel="noreferrer" class="rfy-footer-link">@fabiorockforyou</a>
    <span>Marcas e personagens pertencem aos seus titulares</span>
  </div>
</footer>

<script>
  const WA_NUMBER = '5521994208796';
  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }
  const MAIN_WA_TEXT = 'Oi! Vi o site da Rock For You e quero saber o que tem na loja.';
  document.getElementById('rfy-header-wa').href = waLink(MAIN_WA_TEXT);
  document.getElementById('rfy-footer-wa').href = waLink(MAIN_WA_TEXT);

  // RFY:SCRIPT:INSERT
</script>
</body>
</html>
```

- [ ] **Step 2: Verify the skeleton serves and the WhatsApp links are wired**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'RFY:SECTIONS:INSERT'
```

Expected: first command prints `<title>Rock For You — camisetas, mangás e colecionáveis em Duque de Caxias</title>`; second prints `1`.

Open `http://localhost:3000/landing-pages/rock/index.html` in a browser (**Manual check**): header is sticky, dark, shows "Rock✶For You" + nav + orange "WhatsApp" button; clicking it opens `https://wa.me/5521994208796?text=...` in a new tab; footer shows the same WhatsApp link and Instagram link.

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add static page skeleton with header/footer

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Hero section (static, no shader yet)

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add hero CSS**

Replace `  /* RFY:STYLES:INSERT */` with:

```css
  .rfy-hero {
    position: relative; overflow: hidden;
    padding: 96px 20px 84px;
    border-bottom: 1px solid rgba(239, 233, 224, 0.13);
  }
  .rfy-hero-bg {
    position: absolute; inset: -8% 0; width: 100%; height: 116%;
    object-fit: cover; opacity: 0.2;
    filter: grayscale(1) contrast(1.1) brightness(0.5);
    will-change: transform;
  }
  .rfy-hero-canvas {
    position: absolute; inset: -8% 0; width: 100%; height: 116%;
    display: none; pointer-events: none;
  }
  .rfy-hero-canvas.is-active { display: block; }
  .rfy-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(12, 11, 11, 0.94) 0%, rgba(12, 11, 11, 0.82) 46%, rgba(12, 11, 11, 0.6) 100%);
  }
  .rfy-hero-inner { position: relative; max-width: 1180px; margin: 0 auto; }
  .rfy-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--rfy-accent);
  }
  .rfy-hero-title {
    margin: 12px 0 0; font-family: var(--rfy-font-display); font-weight: 400;
    font-size: clamp(38px, 6.4vw, 76px); line-height: 0.92; letter-spacing: -0.025em;
    text-transform: uppercase; color: var(--rfy-fg);
  }
  .rfy-hero-desc {
    margin: 16px 0 0; max-width: 440px; font-size: 16px; line-height: 1.5;
    color: rgba(239, 233, 224, 0.76);
  }
  .rfy-hero-ctas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
  .rfy-btn-outline {
    padding: 11px 20px; border: 1px solid rgba(239, 233, 224, 0.3); color: var(--rfy-fg);
    font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    border-radius: 3px; transition: border-color 0.15s ease, color 0.15s ease;
  }
  .rfy-btn-outline:hover { border-color: var(--rfy-accent); color: var(--rfy-accent); }
  .rfy-hero-ctas .rfy-btn-primary { padding: 11px 20px; font-size: 13px; }
  .rfy-hero-meta {
    display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 22px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(239, 233, 224, 0.5);
  }
  [data-hero] { opacity: 0; transform: translateY(26px); animation: rfy-hero-in 0.7s cubic-bezier(.16,1,.3,1) forwards; }
  [data-hero]:nth-of-type(1) { animation-delay: 0s; }
  [data-hero]:nth-of-type(2) { animation-delay: 0.09s; }
  [data-hero]:nth-of-type(3) { animation-delay: 0.18s; }
  [data-hero]:nth-of-type(4) { animation-delay: 0.27s; }
  [data-hero]:nth-of-type(5) { animation-delay: 0.36s; }
  @keyframes rfy-hero-in { to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    [data-hero] { animation: none; opacity: 1; transform: none; }
  }

  /* RFY:STYLES:INSERT */
```

- [ ] **Step 2: Add hero HTML**

Replace `  <!-- RFY:SECTIONS:INSERT -->` with:

```html
  <section id="top" class="rfy-hero">
    <img class="rfy-hero-bg" id="rfy-hero-bg" src="uploads/Gemini_Generated_Image_u1wpswu1wpswu1wp.png" alt="Parede de camisetas de banda na loja Rock For You" />
    <canvas class="rfy-hero-canvas" id="rfy-canvas-hero"></canvas>
    <div class="rfy-hero-overlay"></div>
    <div class="rfy-hero-inner">
      <div data-hero class="rfy-eyebrow">Loja física · Duque de Caxias / RJ</div>
      <h1 data-hero class="rfy-hero-title">Rock <span class="rfy-star" style="font-size: 0.5em;">✶</span> For You</h1>
      <p data-hero class="rfy-hero-desc">Camisetas de banda, anime e cultura pop, mangás, pelúcias e colecionáveis. Passe na loja ou reserve a sua peça pelo WhatsApp.</p>
      <div data-hero class="rfy-hero-ctas">
        <a href="#" id="rfy-hero-wa" class="rfy-btn-primary" target="_blank" rel="noreferrer">Falar no WhatsApp</a>
        <a href="#catalogo" class="rfy-btn-outline">Ver o catálogo</a>
      </div>
      <div data-hero class="rfy-hero-meta">
        <span>21 99420-8796</span>
        <span>@fabiorockforyou</span>
        <span>Sala 116 · Ed. Cardoso Bessa</span>
      </div>
    </div>
  </section>

  <!-- RFY:SECTIONS:INSERT -->
```

- [ ] **Step 3: Wire the hero WhatsApp button**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  document.getElementById('rfy-hero-wa').href = waLink(MAIN_WA_TEXT);

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'id="rfy-hero-bg"'
```

Expected: `1`.

**Manual check:** reload the page — hero shows the dark photo background (grayscale/dim), headline "Rock ✶ For You", description, both CTA buttons, and the three meta chips. "Falar no WhatsApp" opens the same wa.me link as the header button. Elements fade/slide in on load (or appear instantly if `prefers-reduced-motion` is on in your OS/browser settings).

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add hero section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Marquee + "Frase do dia" section (with quote shuffle)

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add marquee + frase CSS**

Replace `  /* RFY:STYLES:INSERT */` with:

```css
  .rfy-marquee {
    overflow: hidden; padding: 11px 0 33px;
    border-bottom: 1px solid rgba(239, 233, 224, 0.13);
  }
  .rfy-marquee-track {
    display: flex; width: max-content; animation: rfy-marquee 30s linear infinite;
    font-family: var(--rfy-font-display); font-size: 13px; letter-spacing: 0.14em;
    text-transform: uppercase; color: rgba(239, 233, 224, 0.28);
  }
  .rfy-marquee-track span { padding-right: 16px; }
  @media (prefers-reduced-motion: reduce) {
    .rfy-marquee-track { animation: none; }
  }

  .rfy-frase {
    position: relative; z-index: 2; margin: -22px 0; padding: 82px 20px 84px; color: var(--rfy-bg);
  }
  .rfy-shape { position: absolute; }
  .rfy-shape--pink {
    inset: -14px 0 -10px; background: var(--rfy-accent-2);
    clip-path: polygon(0% 3.4%, 7% 6%, 14% 2.6%, 21% 5.4%, 29% 1.8%, 37% 4.6%, 44% 1.2%, 52% 4%, 60% 1%, 68% 3.6%, 76% 0.8%, 84% 3.2%, 91% 0.6%, 100% 2.4%, 100% 96.6%, 92% 99.4%, 84% 96.4%, 76% 99.2%, 67% 96.2%, 59% 99%, 50% 96%, 41% 98.8%, 33% 95.8%, 24% 98.6%, 16% 95.6%, 8% 98.4%, 0% 95.4%);
  }
  .rfy-shape--orange {
    inset: 0; background: var(--rfy-accent);
    clip-path: polygon(0% 6.4%, 5% 3.1%, 11% 5.4%, 17% 2.2%, 24% 4.4%, 31% 1.4%, 38% 3.4%, 45% 0.7%, 52% 2.8%, 59% 0.3%, 66% 2.2%, 73% 0.1%, 81% 1.6%, 88% 0%, 94% 1.2%, 100% 0.2%, 100% 94.4%, 94% 97.6%, 87% 95.2%, 80% 98.2%, 72% 96%, 64% 99%, 56% 96.8%, 48% 99.6%, 40% 97.4%, 32% 100%, 24% 97.6%, 17% 99.8%, 10% 97.4%, 4% 99.4%, 0% 98%);
  }
  .rfy-shape-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: none; pointer-events: none; }
  .rfy-shape-canvas.is-active { display: block; }
  .rfy-frase-inner { position: relative; max-width: 760px; margin: 0 auto; text-align: center; }
  .rfy-label-dark { font-size: 10px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(12, 11, 11, 0.6); }
  .rfy-quote-block { opacity: 0; transform: translateY(10px); transition: opacity 0.45s ease, transform 0.45s ease; }
  .rfy-quote-block.is-in { opacity: 1; transform: translateY(0); }
  .rfy-quote {
    margin: 14px 0 0; font-family: var(--rfy-font-serif); font-size: clamp(22px, 2.6vw, 34px);
    line-height: 1.24;
  }
  .rfy-quote-author { margin-top: 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
  .rfy-btn-ghost-dark {
    margin-top: 18px; padding: 7px 14px; background: transparent; border: 1px solid rgba(12, 11, 11, 0.4);
    border-radius: 3px; color: var(--rfy-bg); font-family: var(--rfy-font-body); font-size: 11px;
    font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }
  .rfy-btn-ghost-dark:hover { background: var(--rfy-bg); color: var(--rfy-accent); border-color: var(--rfy-bg); }

  /* RFY:STYLES:INSERT */
```

- [ ] **Step 2: Add marquee + frase HTML**

Replace `  <!-- RFY:SECTIONS:INSERT -->` with:

```html
  <div class="rfy-marquee">
    <div class="rfy-marquee-track">
      <span>Camisetas ✶ Mangás ✶ Pelúcias ✶ Colecionáveis ✶ Acessórios ✶ Canecas ✶ Camisetas ✶ Mangás ✶ Pelúcias ✶ Colecionáveis ✶ Acessórios ✶ Canecas ✶</span>
      <span>Camisetas ✶ Mangás ✶ Pelúcias ✶ Colecionáveis ✶ Acessórios ✶ Canecas ✶ Camisetas ✶ Mangás ✶ Pelúcias ✶ Colecionáveis ✶ Acessórios ✶ Canecas ✶</span>
    </div>
  </div>

  <section id="frase" class="rfy-frase">
    <div class="rfy-shape rfy-shape--pink"></div>
    <canvas class="rfy-shape-canvas" id="rfy-canvas-frase-pink" style="clip-path: polygon(0% 3.4%, 7% 6%, 14% 2.6%, 21% 5.4%, 29% 1.8%, 37% 4.6%, 44% 1.2%, 52% 4%, 60% 1%, 68% 3.6%, 76% 0.8%, 84% 3.2%, 91% 0.6%, 100% 2.4%, 100% 96.6%, 92% 99.4%, 84% 96.4%, 76% 99.2%, 67% 96.2%, 59% 99%, 50% 96%, 41% 98.8%, 33% 95.8%, 24% 98.6%, 16% 95.6%, 8% 98.4%, 0% 95.4%);"></canvas>
    <div class="rfy-shape rfy-shape--orange"></div>
    <canvas class="rfy-shape-canvas" id="rfy-canvas-frase-orange" style="clip-path: polygon(0% 6.4%, 5% 3.1%, 11% 5.4%, 17% 2.2%, 24% 4.4%, 31% 1.4%, 38% 3.4%, 45% 0.7%, 52% 2.8%, 59% 0.3%, 66% 2.2%, 73% 0.1%, 81% 1.6%, 88% 0%, 94% 1.2%, 100% 0.2%, 100% 94.4%, 94% 97.6%, 87% 95.2%, 80% 98.2%, 72% 96%, 64% 99%, 56% 96.8%, 48% 99.6%, 40% 97.4%, 32% 100%, 24% 97.6%, 17% 99.8%, 10% 97.4%, 4% 99.4%, 0% 98%);"></canvas>
    <div data-reveal class="rfy-frase-inner">
      <div class="rfy-label-dark">Frase do dia</div>
      <div class="rfy-quote-block" id="rfy-quote-block">
        <blockquote class="rfy-quote" id="rfy-quote"></blockquote>
        <div class="rfy-quote-author" id="rfy-quote-author"></div>
      </div>
      <button type="button" class="rfy-btn-ghost-dark" id="rfy-shuffle-btn">Outra frase</button>
    </div>
  </section>

  <!-- RFY:SECTIONS:INSERT -->
```

- [ ] **Step 3: Add quote data + shuffle logic**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const QUOTES = [
    { t: "Não vou ser uma estrela do rock. Vou ser uma lenda.", a: "Freddie Mercury — Queen" },
    { t: "Se você acha que está velho demais para o rock'n'roll, então você está.", a: "Lemmy Kilmister — Motörhead" },
    { t: "Prefiro ser odiado por quem eu sou do que amado por quem eu não sou.", a: "Kurt Cobain — Nirvana" },
    { t: "De todas as coisas que eu perdi, sinto mais falta da minha cabeça.", a: "Ozzy Osbourne — Black Sabbath" },
    { t: "Quando o poder do amor superar o amor pelo poder, o mundo conhecerá a paz.", a: "Jimi Hendrix" },
    { t: "Sem desvio da norma, não existe progresso.", a: "Frank Zappa" },
    { t: "Dizem que fizemos onze discos que soam iguais. Na verdade, fizemos doze.", a: "Angus Young — AC/DC" },
    { t: "Ninguém é você, e esse é o seu poder.", a: "Dave Grohl — Foo Fighters" }
  ];
  let quoteIndex = Math.floor(Math.random() * QUOTES.length);
  function renderQuote(i) {
    const block = document.getElementById('rfy-quote-block');
    block.classList.remove('is-in');
    void block.offsetWidth;
    document.getElementById('rfy-quote').textContent = '\u201c' + QUOTES[i].t + '\u201d';
    document.getElementById('rfy-quote-author').textContent = QUOTES[i].a;
    requestAnimationFrame(() => block.classList.add('is-in'));
  }
  renderQuote(quoteIndex);
  document.getElementById('rfy-shuffle-btn').addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1 + Math.floor(Math.random() * (QUOTES.length - 1))) % QUOTES.length;
    renderQuote(quoteIndex);
  });

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'rfy-quote-block'
```

Expected: `2` (one in the CSS-less HTML id reference count is fine as long as ≥1; the important check is the id exists — grep just confirms the markup landed).

**Manual check:** reload — a scrolling marquee band appears above a jagged pink/orange section with a serif quote and author. The quote is non-empty on first load (no flash of empty text). Clicking "Outra frase" changes the quote/author with a quick fade, and never repeats the exact same quote as the previous click (any of the other 7).

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add marquee and frase-do-dia section with quote shuffle

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Catálogo section (category filter + carousel)

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add catalog CSS**

Replace `  /* RFY:STYLES:INSERT */` with:

```css
  .rfy-catalogo { position: relative; padding: 62px 20px 54px; }
  .rfy-catalogo-inner { max-width: 1180px; margin: 0 auto; }
  .rfy-catalogo-head {
    display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px;
  }
  .rfy-h2 {
    margin: 8px 0 0; font-family: var(--rfy-font-display); font-weight: 400;
    font-size: clamp(26px, 3.6vw, 42px); line-height: 1; letter-spacing: -0.02em;
    text-transform: uppercase; color: var(--rfy-fg);
  }
  .rfy-catalogo-nav { display: flex; gap: 7px; }
  .rfy-nav-btn {
    width: 36px; height: 36px; border-radius: 3px; border: 1px solid rgba(239, 233, 224, 0.3);
    background: transparent; color: var(--rfy-fg); font-size: 14px; cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
  }
  .rfy-nav-btn:hover { border-color: var(--rfy-accent); color: var(--rfy-accent); }
  .rfy-filters { display: flex; flex-wrap: wrap; gap: 7px; margin: 22px 0 18px; }
  .rfy-filter-btn {
    padding: 9px 16px; border-radius: 3px; border: 1px solid rgba(239, 233, 224, 0.26);
    cursor: pointer; font-family: var(--rfy-font-body); font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; background: transparent; color: var(--rfy-fg);
    transition: background 0.15s ease, color 0.15s ease;
  }
  .rfy-filter-btn.is-active { background: var(--rfy-accent); color: var(--rfy-bg); }
  .rfy-track {
    display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
    scroll-behavior: smooth; scrollbar-width: none; padding-bottom: 4px;
  }
  .rfy-card {
    flex: 0 0 216px; scroll-snap-align: start; background: #141110;
    border: 1px solid rgba(239, 233, 224, 0.11); transition: border-color 0.16s ease, opacity 0.4s ease, transform 0.4s ease;
    opacity: 0; transform: translateY(18px);
  }
  .rfy-card.is-in { opacity: 1; transform: translateY(0); }
  .rfy-card:hover { border-color: var(--rfy-accent); }
  .rfy-card-img-wrap { position: relative; }
  .rfy-card-img-wrap img { width: 100%; height: 244px; object-fit: cover; }
  .rfy-card-tag {
    position: absolute; top: 8px; left: 8px; padding: 4px 8px; background: var(--rfy-accent);
    color: var(--rfy-bg); font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .rfy-card-body { padding: 12px; }
  .rfy-card-title { margin: 0; font-size: 14px; font-weight: 700; line-height: 1.25; letter-spacing: 0.01em; color: var(--rfy-fg); }
  .rfy-card-note { margin: 5px 0 10px; font-size: 13px; line-height: 1.35; color: rgba(239, 233, 224, 0.55); }
  .rfy-card-link { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rfy-accent); transition: color 0.15s ease; }
  .rfy-card-link:hover { color: var(--rfy-fg); }
  .rfy-catalogo-note { margin: 16px 0 0; font-size: 14px; color: rgba(239, 233, 224, 0.5); }

  /* RFY:STYLES:INSERT */
```

- [ ] **Step 2: Add catalog HTML**

Replace `  <!-- RFY:SECTIONS:INSERT -->` with:

```html
  <section id="catalogo" class="rfy-catalogo">
    <div class="rfy-catalogo-inner">
      <div data-reveal class="rfy-catalogo-head">
        <div>
          <div class="rfy-eyebrow">Um pouco do que tem na loja</div>
          <h2 class="rfy-h2">Catálogo</h2>
        </div>
        <div class="rfy-catalogo-nav">
          <button type="button" class="rfy-nav-btn" id="rfy-cat-prev" aria-label="Anterior">←</button>
          <button type="button" class="rfy-nav-btn" id="rfy-cat-next" aria-label="Próximo">→</button>
        </div>
      </div>
      <div class="rfy-filters">
        <button type="button" class="rfy-filter-btn is-active" data-cat="pop">Cultura pop</button>
        <button type="button" class="rfy-filter-btn" data-cat="rock">Rock</button>
        <button type="button" class="rfy-filter-btn" data-cat="anime">Anime</button>
      </div>
      <div class="rfy-track" id="rfy-track"></div>
      <p class="rfy-catalogo-note">O estoque gira rápido e tem muito mais na loja. Pergunte pelo que você procura.</p>
    </div>
  </section>

  <!-- RFY:SECTIONS:INSERT -->
```

- [ ] **Step 3: Add catalog data + render/filter/carousel logic**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const CATALOG = {
    pop: [
      { img: "uploads/pop/SaveClip.App_649187775_17942150541137594_7276397696525469133_n.jpg", name: "Pelúcias Stitch e Angel", tag: "Pelúcia", note: "Vários tamanhos." },
      { img: "uploads/pop/SaveClip.App_656690224_18164410894420929_7927532731938851400_n.jpg", name: "Deadpool & Wolverine", tag: "Camiseta", note: "Estampa grande." },
      { img: "uploads/pop/SaveClip.App_652609654_17990636534945734_4779998178597217866_n.jpg", name: "Pelúcias Hello Kitty", tag: "Pelúcia", note: "Modelos grandes." },
      { img: "uploads/pop/SaveClip.App_653977604_18062751656382387_4496262222097931424_n.jpg", name: "Consoles retrô Sega e Nintendo", tag: "Camiseta", note: "Para quem cresceu no cartucho." },
      { img: "uploads/pop/SaveClip.App_650978238_17991559124930766_4794375744282428361_n.jpg", name: "The Fresh Prince of Bel-Air", tag: "Camiseta", note: "Estampa anos 90." },
      { img: "uploads/pop/SaveClip.App_657679108_18183770692326405_6374689376158435885_n.jpg", name: "The Last of Us", tag: "Camiseta", note: "Joel e Ellie." },
      { img: "uploads/pop/SaveClip.App_658800277_18371667793164523_4432036356268433150_n.jpg", name: "Clássicos do Cartoon Network", tag: "Camiseta", note: "Nove personagens." },
      { img: "uploads/pop/SaveClip.App_655084968_18157529089443990_4272791121464112706_n.jpg", name: "Supernatural", tag: "Camiseta", note: "Cinza mescla." }
    ],
    rock: [
      { img: "uploads/rock/SaveClip.App_657223530_18038866103571181_1830343681824598782_n.jpg", name: "System of a Down — Wake Up!", tag: "Camiseta", note: "Estampa nas costas." },
      { img: "uploads/rock/SaveClip.App_649930639_17940223845157310_1908969125519721192_n.jpg", name: "System of a Down — Águia", tag: "Camiseta", note: "Estampa grande." },
      { img: "uploads/rock/SaveClip.App_669928912_18098797279999640_6112816706361503303_n.jpg", name: "System of a Down — Artsakh", tag: "Camiseta", note: "Tons desbotados." },
      { img: "uploads/rock/SaveClip.App_658871049_18092946614173911_8020449171673842999_n.jpg", name: "Avenged Sevenfold — Life Is But a Dream", tag: "Camiseta", note: "Deathbat em laranja." },
      { img: "uploads/rock/SaveClip.App_657639625_18010880477692165_5430744108715106421_n.jpg", name: "Avenged Sevenfold — Caveira", tag: "Camiseta", note: "Estampa colorida." },
      { img: "uploads/rock/SaveClip.App_698751426_18324716062268337_1186645912981004885_n.jpg", name: "Korn — Follow the Leader", tag: "Camiseta", note: "Também em regata." },
      { img: "uploads/rock/SaveClip.App_700102122_18324716026268337_815700617631773090_n.jpg", name: "Korn, AC/DC e mais", tag: "Camiseta / Regata", note: "Vários clássicos." }
    ],
    anime: [
      { img: "uploads/anime/SaveClip.App_654862792_18358653913237738_2163640989489434258_n.jpg", name: "Demon Slayer — Tengen Uzui", tag: "Camiseta", note: "Estampa nas costas." },
      { img: "uploads/anime/SaveClip.App_460135687_18250558051268337_2528918421395883158_n.jpg", name: "Mangá Demon Slayer", tag: "Mangá", note: "Volumes avulsos." },
      { img: "uploads/anime/SaveClip.App_655607105_18166590334406627_4455866004294120684_n.jpg", name: "One Piece — Luffy e Kaido", tag: "Camiseta", note: "Estampa colorida." },
      { img: "uploads/anime/SaveClip.App_655814591_18198276826341573_3190277859813256171_n.jpg", name: "Naruto — Obito", tag: "Camiseta", note: "Cinza mescla." },
      { img: "uploads/anime/SaveClip.App_654252852_18111689605779652_1645127921179157901_n.jpg", name: "Yu-Gi-Oh! — Yugi", tag: "Camiseta", note: "Estampa frontal." },
      { img: "uploads/anime/SaveClip.App_655338873_18096719257999943_8568178372141836631_n.jpg", name: "Pokémon — Iniciais", tag: "Camiseta", note: "Os três iniciais." },
      { img: "uploads/anime/SaveClip.App_460177096_18250558096268337_441033478719607601_n.jpg", name: "Demon Slayer — Fanbook Oficial", tag: "Livro", note: "Registros do Kisatsutai." }
    ]
  };
  let activeCat = 'pop';
  const track = document.getElementById('rfy-track');
  function renderCatalog(cat) {
    activeCat = cat;
    track.innerHTML = CATALOG[cat].map((item) => (
      '<article class="rfy-card">' +
        '<div class="rfy-card-img-wrap">' +
          '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy" />' +
          '<span class="rfy-card-tag">' + item.tag + '</span>' +
        '</div>' +
        '<div class="rfy-card-body">' +
          '<h3 class="rfy-card-title">' + item.name + '</h3>' +
          '<p class="rfy-card-note">' + item.note + '</p>' +
          '<a href="' + waLink('Oi! Vi \u201c' + item.name + '\u201d no site da Rock For You e quero saber mais.') + '" target="_blank" rel="noreferrer" class="rfy-card-link">Consultar →</a>' +
        '</div>' +
      '</article>'
    )).join('');
    track.scrollTo({ left: 0, behavior: 'smooth' });
    requestAnimationFrame(() => {
      track.querySelectorAll('.rfy-card').forEach((card, i) => {
        card.style.transitionDelay = (i * 0.05) + 's';
        requestAnimationFrame(() => card.classList.add('is-in'));
      });
    });
  }
  renderCatalog('pop');
  document.querySelectorAll('.rfy-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rfy-filter-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderCatalog(btn.dataset.cat);
    });
  });
  document.getElementById('rfy-cat-prev').addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  });
  document.getElementById('rfy-cat-next').addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  });

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'data-cat="rock"'
```

Expected: `1`.

**Manual check:** reload — "Catálogo" shows 8 pop-culture cards by default ("Cultura pop" button highlighted orange), each with an image, tag badge, title, note, and a working "Consultar →" WhatsApp link with the item name pre-filled. Clicking "Rock" or "Anime" swaps the highlighted button and re-renders the track with that category's items (7 each), scrolling back to the start. The ← / → buttons scroll the track horizontally.

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add catalog section with category filter and carousel

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Remaining static sections (goods, bandas, galeria, faq, loja) + footer already done

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add CSS for goods/bandas/galeria/faq/loja**

Replace `  /* RFY:STYLES:INSERT */` with:

```css
  .rfy-goods { padding: 8px 20px 76px; }
  .rfy-goods-inner { max-width: 1180px; margin: 0 auto; }
  .rfy-goods-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 8px; margin-top: 22px; }
  .rfy-goods-item { background: var(--rfy-bg); border: 1px solid rgba(239, 233, 224, 0.16); padding: 16px 14px 18px; }
  .rfy-goods-item-name { font-family: var(--rfy-font-display); font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--rfy-fg); }
  .rfy-goods-item-note { margin-top: 5px; font-size: 13px; line-height: 1.35; color: rgba(239, 233, 224, 0.5); }

  .rfy-bandas { position: relative; z-index: 2; margin: -20px 0; padding: 78px 20px 80px; color: var(--rfy-bg); }
  .rfy-bandas-inner { position: relative; max-width: 1180px; margin: 0 auto; }
  .rfy-bandas-list {
    display: flex; flex-wrap: wrap; gap: 8px 18px; margin: 16px 0 0; font-family: var(--rfy-font-display);
    font-size: clamp(18px, 2.4vw, 30px); line-height: 1; letter-spacing: -0.02em; text-transform: uppercase;
  }
  .rfy-bandas-sep { opacity: 0.45; }
  .rfy-bandas-footer {
    display: flex; flex-wrap: wrap; align-items: center; gap: 14px 20px; margin-top: 26px;
    padding-top: 20px; border-top: 1px solid rgba(12, 11, 11, 0.28);
  }
  .rfy-bandas-footer p { margin: 0; max-width: 460px; font-size: 15px; line-height: 1.5; color: rgba(12, 11, 11, 0.78); }
  .rfy-btn-dark {
    padding: 10px 18px; background: var(--rfy-bg); color: var(--rfy-accent); font-size: 12px;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .rfy-btn-dark:hover { background: var(--rfy-fg); color: var(--rfy-bg); }

  .rfy-galeria { padding: 34px 20px 54px; }
  .rfy-galeria-inner { max-width: 1180px; margin: 0 auto; }
  .rfy-galeria-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
  .rfy-galeria-link { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  .rfy-galeria-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 6px; }
  .rfy-galeria-grid img { width: 100%; height: 190px; object-fit: cover; }
  .rfy-galeria-grid img.is-mono { filter: grayscale(1) contrast(1.12); }

  .rfy-faq { padding: 8px 20px 54px; }
  .rfy-faq-inner { max-width: 1180px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 24px 40px; }
  .rfy-faq-side { flex: 1 1 240px; }
  .rfy-faq-list {
    flex: 2 1 520px; display: grid; gap: 1px; background: rgba(239, 233, 224, 0.13);
    border-top: 1px solid rgba(239, 233, 224, 0.13); border-bottom: 1px solid rgba(239, 233, 224, 0.13);
  }
  .rfy-faq-item { background: var(--rfy-bg); padding: 14px 0; }
  .rfy-faq-q { font-size: 14px; font-weight: 700; color: var(--rfy-fg); }
  .rfy-faq-a { margin-top: 4px; font-size: 14px; line-height: 1.45; color: rgba(239, 233, 224, 0.6); }

  .rfy-loja { border-top: 1px solid rgba(239, 233, 224, 0.13); }
  .rfy-loja-inner { max-width: 1180px; margin: 0 auto; display: flex; flex-wrap: wrap; }
  .rfy-loja-info { flex: 1 1 320px; padding: 40px 20px; }
  .rfy-loja-title { margin: 8px 0 0; font-family: var(--rfy-font-display); font-weight: 400; font-size: clamp(24px, 3.2vw, 36px); line-height: 1.02; letter-spacing: -0.02em; text-transform: uppercase; color: var(--rfy-fg); }
  .rfy-loja-addr { margin: 14px 0 0; max-width: 380px; font-size: 15px; line-height: 1.55; color: rgba(239, 233, 224, 0.75); }
  .rfy-loja-ctas { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
  .rfy-loja-map { flex: 1 1 380px; min-height: 300px; border-left: 1px solid rgba(239, 233, 224, 0.13); }
  .rfy-loja-map iframe {
    display: block; width: 100%; height: 100%; min-height: 300px; border: 0;
    filter: grayscale(0.7) contrast(1.05) invert(0.9) hue-rotate(180deg);
  }

  /* RFY:STYLES:INSERT */
```

- [ ] **Step 2: Add goods/bandas/galeria/faq/loja HTML**

Replace `  <!-- RFY:SECTIONS:INSERT -->` with:

```html
  <section class="rfy-goods">
    <div data-reveal class="rfy-goods-inner">
      <div class="rfy-eyebrow">Além das camisetas</div>
      <h2 class="rfy-h2" style="margin-bottom: 0;">O que você encontra na loja</h2>
      <div class="rfy-goods-grid" id="rfy-goods-grid"></div>
    </div>
  </section>

  <section id="bandas" class="rfy-bandas">
    <div class="rfy-shape rfy-shape--pink" style="inset: -12px 0 -14px; clip-path: polygon(0% 3.8%, 8% 1%, 16% 3.6%, 24% 0.8%, 33% 3.4%, 41% 0.6%, 50% 3.2%, 58% 0.4%, 66% 3%, 75% 0.6%, 83% 3.2%, 91% 0.8%, 100% 3.4%, 100% 95.6%, 92% 98.4%, 83% 95.4%, 75% 98.2%, 66% 95.2%, 58% 98%, 49% 95%, 41% 97.8%, 32% 94.8%, 24% 97.6%, 15% 94.8%, 7% 97.4%, 0% 95%);"></div>
    <canvas class="rfy-shape-canvas" id="rfy-canvas-bandas-pink" style="clip-path: polygon(0% 3.8%, 8% 1%, 16% 3.6%, 24% 0.8%, 33% 3.4%, 41% 0.6%, 50% 3.2%, 58% 0.4%, 66% 3%, 75% 0.6%, 83% 3.2%, 91% 0.8%, 100% 3.4%, 100% 95.6%, 92% 98.4%, 83% 95.4%, 75% 98.2%, 66% 95.2%, 58% 98%, 49% 95%, 41% 97.8%, 32% 94.8%, 24% 97.6%, 15% 94.8%, 7% 97.4%, 0% 95%);"></canvas>
    <div class="rfy-shape rfy-shape--orange" style="clip-path: polygon(0% 1.2%, 6% 3.4%, 13% 0.6%, 20% 2.8%, 27% 0.2%, 35% 2.4%, 42% 0%, 50% 2.2%, 58% 0.4%, 66% 3%, 74% 0.8%, 82% 3.4%, 89% 1%, 95% 3.6%, 100% 1.8%, 100% 98%, 95% 96%, 88% 99.2%, 80% 96.6%, 72% 99.6%, 64% 97%, 56% 99.8%, 48% 97.2%, 40% 100%, 31% 97.4%, 23% 99.8%, 15% 97.2%, 8% 99.4%, 0% 97%);"></div>
    <canvas class="rfy-shape-canvas" id="rfy-canvas-bandas-orange" style="clip-path: polygon(0% 1.2%, 6% 3.4%, 13% 0.6%, 20% 2.8%, 27% 0.2%, 35% 2.4%, 42% 0%, 50% 2.2%, 58% 0.4%, 66% 3%, 74% 0.8%, 82% 3.4%, 89% 1%, 95% 3.6%, 100% 1.8%, 100% 98%, 95% 96%, 88% 99.2%, 80% 96.6%, 72% 99.6%, 64% 97%, 56% 99.8%, 48% 97.2%, 40% 100%, 31% 97.4%, 23% 99.8%, 15% 97.2%, 8% 99.4%, 0% 97%);"></canvas>
    <div data-reveal class="rfy-bandas-inner">
      <div class="rfy-label-dark">Passam pela arara</div>
      <div class="rfy-bandas-list">
        <span>System of a Down</span><span class="rfy-bandas-sep">✶</span>
        <span>Korn</span><span class="rfy-bandas-sep">✶</span>
        <span>AC/DC</span><span class="rfy-bandas-sep">✶</span>
        <span>Avenged Sevenfold</span><span class="rfy-bandas-sep">✶</span>
        <span>Nirvana</span><span class="rfy-bandas-sep">✶</span>
        <span>Demon Slayer</span><span class="rfy-bandas-sep">✶</span>
        <span>One Piece</span><span class="rfy-bandas-sep">✶</span>
        <span>Naruto</span><span class="rfy-bandas-sep">✶</span>
        <span>Pokémon</span><span class="rfy-bandas-sep">✶</span>
        <span>Marvel</span><span class="rfy-bandas-sep">✶</span>
        <span>Hello Kitty</span><span class="rfy-bandas-sep">✶</span>
        <span>Cartoon Network</span>
      </div>
      <div class="rfy-bandas-footer">
        <p>Não achou a sua banda ou o seu personagem? Manda o nome no WhatsApp que a gente procura pra você.</p>
        <a href="#" id="rfy-bandas-wa" class="rfy-btn-dark" target="_blank" rel="noreferrer">Pedir uma peça</a>
      </div>
    </div>
  </section>

  <section class="rfy-galeria">
    <div data-reveal class="rfy-galeria-inner">
      <div class="rfy-galeria-head">
        <div>
          <div class="rfy-eyebrow">Por dentro da loja</div>
          <h2 class="rfy-h2">Galeria</h2>
        </div>
        <a href="https://instagram.com/fabiorockforyou" target="_blank" rel="noreferrer" class="rfy-galeria-link">Mais no @fabiorockforyou →</a>
      </div>
      <div class="rfy-galeria-grid">
        <img src="uploads/rock/SaveClip.App_698751426_18324716062268337_1186645912981004885_n.jpg" alt="Arara de camisetas de banda" class="is-mono" loading="lazy" />
        <img src="uploads/pop/SaveClip.App_649187775_17942150541137594_7276397696525469133_n.jpg" alt="Pelúcias na loja" loading="lazy" />
        <img src="uploads/anime/SaveClip.App_460135687_18250558051268337_2528918421395883158_n.jpg" alt="Mangás na prateleira" loading="lazy" />
        <img src="uploads/pop/SaveClip.App_652609654_17990636534945734_4779998178597217866_n.jpg" alt="Pelúcias Hello Kitty" loading="lazy" />
        <img src="uploads/rock/SaveClip.App_700102122_18324716026268337_815700617631773090_n.jpg" alt="Camisetas e regatas de rock" class="is-mono" loading="lazy" />
        <img src="uploads/pop/SaveClip.App_657463522_18086249087219277_4793654301986492837_n.jpg" alt="Detalhe de estampa" loading="lazy" />
      </div>
    </div>
  </section>

  <section class="rfy-faq">
    <div data-reveal class="rfy-faq-inner">
      <div class="rfy-faq-side">
        <div class="rfy-eyebrow">Dúvidas comuns</div>
        <h2 class="rfy-h2">Perguntas rápidas</h2>
      </div>
      <div class="rfy-faq-list">
        <div class="rfy-faq-item">
          <div class="rfy-faq-q">Dá para reservar uma peça?</div>
          <div class="rfy-faq-a">Sim. Manda mensagem com o modelo e o tamanho que separamos no seu nome.</div>
        </div>
        <div class="rfy-faq-item">
          <div class="rfy-faq-q">Quais tamanhos vocês têm?</div>
          <div class="rfy-faq-a">Varia por estampa. Pergunte no WhatsApp que confirmamos a grade daquele modelo.</div>
        </div>
        <div class="rfy-faq-item">
          <div class="rfy-faq-q">E se a estampa que eu quero não estiver aí?</div>
          <div class="rfy-faq-a">Manda o nome da banda ou do personagem. A gente procura e te avisa quando chegar.</div>
        </div>
        <div class="rfy-faq-item">
          <div class="rfy-faq-q">Onde fica a loja?</div>
          <div class="rfy-faq-a">Edifício Cardoso Bessa, Sala 116, em Duque de Caxias. O mapa está logo abaixo.</div>
        </div>
      </div>
    </div>
  </section>

  <section id="loja" class="rfy-loja">
    <div class="rfy-loja-inner">
      <div data-reveal class="rfy-loja-info">
        <div class="rfy-eyebrow">Venha na loja</div>
        <h2 class="rfy-loja-title">Duque de Caxias</h2>
        <p class="rfy-loja-addr">Avenida Governador Leonel de Moura Brizola, 1741, Sala 116, Edifício Cardoso Bessa, Duque de Caxias, Rio de Janeiro</p>
        <div class="rfy-loja-ctas">
          <a href="#" id="rfy-loja-maps" class="rfy-btn-primary" style="padding: 10px 18px; font-size: 12px;" target="_blank" rel="noreferrer">Traçar rota</a>
          <a href="#" id="rfy-loja-wa" class="rfy-btn-outline" style="padding: 10px 18px; font-size: 12px;" target="_blank" rel="noreferrer">21 99420-8796</a>
        </div>
      </div>
      <div class="rfy-loja-map">
        <iframe title="Mapa da loja Rock For You" src="https://www.google.com/maps?q=Avenida%20Governador%20Leonel%20de%20Moura%20Brizola%2C%201741%2C%20Duque%20de%20Caxias%2C%20RJ&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>

  <!-- RFY:SECTIONS:INSERT -->
```

- [ ] **Step 3: Render goods grid + wire remaining WhatsApp/Maps links**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const GOODS = [
    { name: "Camisetas", note: "Rock, anime e cultura pop." },
    { name: "Regatas", note: "Mesmas estampas em cava." },
    { name: "Mangás", note: "Volumes avulsos e coleções." },
    { name: "Pelúcias", note: "Stitch, Hello Kitty e mais." },
    { name: "Canecas", note: "Banda e personagem." },
    { name: "Colecionáveis", note: "Figuras e itens de estante." },
    { name: "Acessórios", note: "Chaveiros, bottons, patches." },
    { name: "Livros e fanbooks", note: "Material oficial de anime." }
  ];
  document.getElementById('rfy-goods-grid').innerHTML = GOODS.map((g) => (
    '<div class="rfy-goods-item">' +
      '<div class="rfy-goods-item-name">' + g.name + '</div>' +
      '<div class="rfy-goods-item-note">' + g.note + '</div>' +
    '</div>'
  )).join('');

  document.getElementById('rfy-bandas-wa').href = waLink('Oi! Estou procurando uma peça específica: ');

  const MAPS_LINK = 'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Avenida Governador Leonel de Moura Brizola, 1741, Duque de Caxias, RJ');
  document.getElementById('rfy-loja-maps').href = MAPS_LINK;
  document.getElementById('rfy-loja-wa').href = waLink(MAIN_WA_TEXT);

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'id="rfy-goods-grid"'
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'Edifício Cardoso Bessa'
```

Expected: both print at least `1`.

**Manual check:** scroll through the full page — "O que você encontra na loja" shows 8 items; "Bandas" shows the jagged pink/orange band list with a working "Pedir uma peça" WhatsApp link; "Galeria" shows 6 photos (2 grayscale); FAQ shows 4 Q&A rows; "A loja" shows the address, a working "Traçar rota" (opens Google Maps directions) and WhatsApp link, plus an embedded, tinted Google Map on the right. No broken images (check the Network tab for any 404s).

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add goods, bandas, galeria, faq and loja sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Scroll reveals + hero parallax + reduced motion

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add reveal CSS**

Replace `  /* RFY:STYLES:INSERT */` with:

```css
  [data-reveal] {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { transition: none; }
  }
```

(No trailing `/* RFY:STYLES:INSERT */` this time — this is the last CSS-only task; Task 9 will insert shader CSS at the very end of the file's `<style>` directly, keeping the marker through Task 9 only. Re-add the marker line right after the block above so Task 9 can still find it:)

```css
  /* RFY:STYLES:INSERT */
```

- [ ] **Step 2: Add reveal/parallax/reduced-motion JS**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add('is-visible');
    } else {
      revealObserver.observe(el);
    }
  });

  if (!prefersReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const heroSection = document.getElementById('top');
        const rect = heroSection.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        document.getElementById('rfy-hero-bg').style.transform = 'translateY(' + (progress * 12) + '%)';
        ticking = false;
      });
    }, { passive: true });
  }

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'IntersectionObserver'
```

Expected: `1`.

**Manual check:** scroll down slowly — each section's content (catalog head, goods, bandas, galeria, faq, loja) fades/slides up into place the first time it enters the viewport, and stays visible on scrolling back up (doesn't re-trigger). Scrolling with the hero in view smoothly shifts the hero background image (subtle parallax). In your browser/OS, enable "reduce motion" and reload: every section's content is visible immediately with no animation, and the hero background does not shift on scroll.

- [ ] **Step 4: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add scroll reveals, hero parallax, reduced-motion support

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Assets (thumbnail, logo)

**Files:**
- Create: `public/landing-pages/rock/thumbnail.webp`
- Create: `public/landing-pages/rock/logo.svg`

- [ ] **Step 1: Copy the existing generated thumbnail to a proper filename**

```bash
cp "public/landing-pages/rock/.thumbnail" "public/landing-pages/rock/thumbnail.webp"
```

- [ ] **Step 2: Verify the copy is byte-identical**

```bash
diff "public/landing-pages/rock/.thumbnail" "public/landing-pages/rock/thumbnail.webp" && echo IDENTICAL
```

Expected: `IDENTICAL` (no diff output before it).

- [ ] **Step 3: Create the wordmark logo**

Create `public/landing-pages/rock/logo.svg`:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" width="220" height="48">
  <text x="0" y="32" font-family="Archivo Black, Arial Black, sans-serif" font-size="26" fill="#EFE9E0" letter-spacing="0.3">ROCK</text>
  <text x="94" y="30" font-family="Archivo Black, Arial Black, sans-serif" font-size="16" fill="#EA3B21">✶</text>
  <text x="114" y="32" font-family="Archivo Black, Arial Black, sans-serif" font-size="26" fill="#EFE9E0" letter-spacing="0.3">FOR YOU</text>
</svg>
```

- [ ] **Step 4: Verify**

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/landing-pages/rock/thumbnail.webp
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/landing-pages/rock/logo.svg
```

Expected: both print `200`.

**Manual check:** open both URLs directly in a browser — `thumbnail.webp` shows a store photo, `logo.svg` shows a clean "ROCK ✶ FOR YOU" wordmark on a transparent background, cream text with an orange star.

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/thumbnail.webp public/landing-pages/rock/logo.svg
git commit -m "feat(rock): add thumbnail and wordmark logo assets

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Wire into the Next.js site (route + landing-pages list)

**Files:**
- Create: `src/app/landing-pages/rock/page.tsx`
- Modify: `src/data/landing-pages.ts`

- [ ] **Step 1: Create the redirect route**

Create `src/app/landing-pages/rock/page.tsx`:

```tsx
import { redirect } from 'next/navigation';

export default function RockForYouPage() {
  redirect('/landing-pages/rock/index.html');
}
```

- [ ] **Step 2: Add the data entry**

In `src/data/landing-pages.ts`, add after the `imperiofit` entry (before the closing `];`):

```ts
  {
    slug: 'rock',
    title: 'Rock For You',
    desc: 'Landing page para loja de camisetas de banda, mangás e colecionáveis, com catálogo filtrável, frase do dia e localização.',
    thumbnail: '/landing-pages/rock/thumbnail.webp',
    logo: '/landing-pages/rock/logo.svg',
    url: '/landing-pages/rock',
  },
```

- [ ] **Step 3: Run lint and build**

```bash
cd "D:/Workspace/Node/portfolio" && pnpm lint && pnpm build
```

Expected: both complete with exit code 0 and no TypeScript errors.

- [ ] **Step 4: Verify the route and the listing**

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/landing-pages/rock
curl -s http://localhost:3000/landing-pages | grep -c 'Rock For You'
```

Expected: first prints `200` (or a `307`/`308` redirect code followed by 200 if `curl -L` is used — either is fine, the redirect route works either way; if it prints something other than 200/307/308, investigate before continuing). Second prints at least `1`.

**Manual check:** visit `http://localhost:3000/landing-pages` — a new "Rock For You" card appears (after Bellos and ImperioFit) with the thumbnail photo, the wordmark logo overlay, and the description. Clicking it navigates to `/landing-pages/rock`, which redirects straight to the static page built in Tasks 1–7.

- [ ] **Step 5: Commit**

```bash
git add src/app/landing-pages/rock/page.tsx src/data/landing-pages.ts
git commit -m "feat(rock): wire Rock For You landing page into the site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 9: Three.js + GLSL shader core (hero only, static render, no interaction yet)

**Files:**
- Modify: `public/landing-pages/rock/index.html`

This task gets the shader pipeline rendering correctly on the hero, with no mouse interaction and no animation yet (interaction lands in Task 10). Keeping this task non-interactive first makes it possible to verify the GLSL pipeline (pixelation/halftone/dither/contrast) in isolation before adding the more error-prone mouse/touch/ripple logic on top.

- [ ] **Step 1: Load three.js from CDN**

In the `<head>`, immediately after the Google Fonts `<link rel="stylesheet">` tag, add:

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
```

- [ ] **Step 2: Add the shader source constants + ShaderPanel class**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const SHADER_VERTEX = [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = vec4(position.xy, 0.0, 1.0);',
    '}'
  ].join('\n');

  const SHADER_FRAGMENT = [
    'precision highp float;',
    'varying vec2 vUv;',
    'uniform float uTime;',
    'uniform vec2 uResolution;',
    'uniform vec2 uMouse;',
    'uniform float uHover;',
    'uniform float uRippleTime;',
    'uniform vec2 uRippleOrigin;',
    'uniform float uMode;',
    'uniform sampler2D uTexture;',
    'uniform vec3 uColorA;',
    'uniform vec3 uColorB;',
    'uniform vec3 uColorC;',
    'uniform float uReducedMotion;',
    '',
    'float hash(vec2 p) {',
    '  p = fract(p * vec2(123.34, 456.21));',
    '  p += dot(p, p + 45.32);',
    '  return fract(p.x * p.y);',
    '}',
    'float noise(vec2 p) {',
    '  vec2 i = floor(p), f = fract(p);',
    '  float a = hash(i), b = hash(i + vec2(1.0, 0.0));',
    '  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));',
    '  vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;',
    '}',
    'float fbm(vec2 p) {',
    '  float v = 0.0, amp = 0.55;',
    '  for (int i = 0; i < 3; i++) {',
    '    v += amp * noise(p);',
    '    p *= 2.0;',
    '    amp *= 0.5;',
    '  }',
    '  return v;',
    '}',
    'float bayerDither(vec2 fragCoord) {',
    '  int x = int(mod(fragCoord.x, 4.0));',
    '  int y = int(mod(fragCoord.y, 4.0));',
    '  float m[16];',
    '  m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;',
    '  m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;',
    '  m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;',
    '  m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;',
    '  return m[y * 4 + x] / 16.0;',
    '}',
    '',
    'void main() {',
    '  vec2 uv = vUv;',
    '  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);',
    '  float distToMouse = distance(uv * aspect, uMouse * aspect);',
    '  float lens = uHover * smoothstep(0.35, 0.0, distToMouse);',
    '  float dt = uTime - uRippleTime;',
    '  float rippleEnvelope = uReducedMotion > 0.5 ? 0.0 : exp(-dt * 1.6) * step(0.0, dt);',
    '  float distToRipple = distance(uv * aspect, uRippleOrigin * aspect);',
    '  float ripple = sin(distToRipple * 40.0 - dt * 6.0) * rippleEnvelope * smoothstep(0.6, 0.0, distToRipple);',
    '  float baseGrid = mix(28.0, 64.0, lens);',
    '  vec2 grid = vec2(baseGrid * aspect.x, baseGrid);',
    '  vec2 rippledUv = uv + normalize(uv - uRippleOrigin + 1e-5) * ripple * 0.01;',
    '  vec2 cell = floor(rippledUv * grid);',
    '  vec2 cellUv = fract(rippledUv * grid);',
    '  vec2 cellCenterUv = (cell + 0.5) / grid;',
    '  float lum;',
    '  if (uMode > 0.5) {',
    '    lum = dot(texture2D(uTexture, cellCenterUv).rgb, vec3(0.299, 0.587, 0.114));',
    '  } else {',
    '    lum = fbm(cellCenterUv * 6.0 + uTime * 0.02 * (1.0 - uReducedMotion));',
    '  }',
    '  float contrast = 1.35;',
    '  lum = clamp((lum - 0.5) * contrast + 0.5, 0.0, 1.0);',
    '  lum = clamp(lum + ripple * 0.15, 0.0, 1.0);',
    '  float dotRadius = mix(lum * 0.42, lum * 0.48 + 0.04, lens);',
    '  float dist = distance(cellUv, vec2(0.5));',
    '  float dotShape = smoothstep(dotRadius + 0.04, dotRadius, dist);',
    '  float threshold = bayerDither(gl_FragCoord.xy);',
    '  float dithered = step(threshold, dotShape);',
    '  vec3 color = mix(uColorA, uColorB, dithered);',
    '  float accentMix = dithered * smoothstep(0.72, 1.0, lum) * mix(0.15, 0.6, lens);',
    '  color = mix(color, uColorC, accentMix);',
    '  gl_FragColor = vec4(color, 1.0);',
    '}'
  ].join('\n');

  function hexToVec3(hex) {
    const c = new THREE.Color(hex);
    return c;
  }

  class ShaderPanel {
    constructor(opts) {
      this.canvas = opts.canvas;
      this.visible = true;
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      this.scene = new THREE.Scene();
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0 },
        uRippleTime: { value: -1000 },
        uRippleOrigin: { value: new THREE.Vector2(0.5, 0.5) },
        uMode: { value: opts.mode === 'photo' ? 1 : 0 },
        uTexture: { value: opts.texture || null },
        uColorA: { value: hexToVec3(opts.colorA) },
        uColorB: { value: hexToVec3(opts.colorB) },
        uColorC: { value: hexToVec3(opts.colorC) },
        uReducedMotion: { value: prefersReducedMotion ? 1 : 0 }
      };
      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: SHADER_VERTEX,
        fragmentShader: SHADER_FRAGMENT,
        transparent: true
      });
      this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
      this.resize();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      this.renderer.setSize(rect.width, rect.height, false);
      this.uniforms.uResolution.value.set(rect.width, rect.height);
    }

    setMouse(nx, ny) { this.uniforms.uMouse.value.set(nx, ny); }
    ping(nx, ny, timeNow) {
      this.uniforms.uRippleOrigin.value.set(nx, ny);
      this.uniforms.uRippleTime.value = timeNow;
    }
    render(timeNow) {
      if (!this.visible) return;
      this.uniforms.uTime.value = timeNow;
      this.renderer.render(this.scene, this.camera);
    }
  }

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 3: Initialize the hero panel with a static texture and mark its canvas active**

Replace `  // RFY:SCRIPT:INSERT` with:

```js
  const shaderPanels = [];
  try {
    if (!window.THREE) throw new Error('three.js failed to load from CDN');
    const loader = new THREE.TextureLoader();
    const heroTexture = loader.load('uploads/Gemini_Generated_Image_u1wpswu1wpswu1wp.png');
    heroTexture.minFilter = THREE.LinearFilter;
    heroTexture.magFilter = THREE.LinearFilter;

    const heroCanvas = document.getElementById('rfy-canvas-hero');
    const heroPanel = new ShaderPanel({
      canvas: heroCanvas, mode: 'photo', texture: heroTexture,
      colorA: '#0C0B0B', colorB: '#EFE9E0', colorC: '#EA3B21'
    });
    heroCanvas.classList.add('is-active');
    shaderPanels.push(heroPanel);

    function renderAllPanels() {
      const now = performance.now() / 1000;
      shaderPanels.forEach((p) => p.render(now));
      requestAnimationFrame(renderAllPanels);
    }
    requestAnimationFrame(renderAllPanels);
  } catch (err) {
    console.warn('Rock For You: shader textures disabled —', err.message);
  }

  // RFY:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'cdn.jsdelivr.net/npm/three'
```

Expected: `1`.

**Manual check:** reload the page with the browser console open — no errors. The hero background is now a halftone/dither/pixelated rendering of the store photo (dark ink + cream dots, orange highlights on the brightest dots), replacing the plain grayscale-filtered photo. It's static (no motion) since interaction/animation isn't wired yet. Resize the browser window — the canvas keeps filling the hero box without stretching (reload after resizing if it looks off, since resize handling isn't wired until Task 12).

- [ ] **Step 5: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add three.js/GLSL halftone shader on the hero (static)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 10: Mouse/touch interaction on the hero (lens + ripple)

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add the shared hover/tick/touch wiring, scoped to the hero for now**

Replace `  // RFY:SCRIPT:INSERT` (the one at the very end, after the Task 9 init block) with:

```js
  const sectionPanelMap = new Map();
  const lastMoveTimeBySection = new Map();

  function bindHover(sectionEl, panelsForSection) {
    sectionPanelMap.set(sectionEl, panelsForSection);
    lastMoveTimeBySection.set(sectionEl, -1000);
    let lastX = null, lastY = null;
    sectionEl.addEventListener('pointermove', (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1.0 - (e.clientY - rect.top) / rect.height;
      panelsForSection.forEach((p) => p.setMouse(nx, ny));
      const now = performance.now() / 1000;
      lastMoveTimeBySection.set(sectionEl, now);
      if (lastX !== null) {
        const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (speed > 18) panelsForSection.forEach((p) => p.ping(nx, ny, now));
      }
      lastX = e.clientX; lastY = e.clientY;
    });
    sectionEl.addEventListener('pointerleave', () => {
      lastMoveTimeBySection.set(sectionEl, -1000);
      lastX = null; lastY = null;
    });
    sectionEl.addEventListener('touchstart', (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const t = e.touches[0];
      const nx = (t.clientX - rect.left) / rect.width;
      const ny = 1.0 - (t.clientY - rect.top) / rect.height;
      const now = performance.now() / 1000;
      panelsForSection.forEach((p) => { p.setMouse(nx, ny); p.ping(nx, ny, now); });
    }, { passive: true });
  }

  if (shaderPanels.length > 0) {
    bindHover(document.getElementById('top'), [shaderPanels[0]]);
  }

  function tickHover() {
    const now = performance.now() / 1000;
    sectionPanelMap.forEach((panelsForSection, sectionEl) => {
      const lastMove = lastMoveTimeBySection.get(sectionEl);
      const hoverTarget = (now - lastMove < 0.15 && !prefersReducedMotion) ? 1 : 0;
      panelsForSection.forEach((p) => {
        p.uniforms.uHover.value += (hoverTarget - p.uniforms.uHover.value) * 0.12;
      });
    });
    requestAnimationFrame(tickHover);
  }
  if (shaderPanels.length > 0) requestAnimationFrame(tickHover);

  // RFY:SCRIPT:INSERT
```

Note: this task's `bindHover` call and `tickHover` loop must be added **inside the same `try { ... }` block from Task 9** (right after `shaderPanels.push(heroPanel);` and before the `renderAllPanels` definition), not after it — since `shaderPanels`, `heroPanel`, etc. are declared with `const`/`let` inside that block's scope. Move the `sectionPanelMap`/`bindHover`/`tickHover` declarations to be function/const declarations placed just **before** the `try {` block (so they're in scope for both the try block and any later task), and only the two calls (`bindHover(...)` and `requestAnimationFrame(tickHover)`) go inside the `try` block after `shaderPanels.push(heroPanel)`. Concretely, the full replaced script tail from Task 9 Step 3 through this task should read:

```js
  const shaderPanels = [];
  const sectionPanelMap = new Map();
  const lastMoveTimeBySection = new Map();

  function bindHover(sectionEl, panelsForSection) {
    sectionPanelMap.set(sectionEl, panelsForSection);
    lastMoveTimeBySection.set(sectionEl, -1000);
    let lastX = null, lastY = null;
    sectionEl.addEventListener('pointermove', (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1.0 - (e.clientY - rect.top) / rect.height;
      panelsForSection.forEach((p) => p.setMouse(nx, ny));
      const now = performance.now() / 1000;
      lastMoveTimeBySection.set(sectionEl, now);
      if (lastX !== null) {
        const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (speed > 18) panelsForSection.forEach((p) => p.ping(nx, ny, now));
      }
      lastX = e.clientX; lastY = e.clientY;
    });
    sectionEl.addEventListener('pointerleave', () => {
      lastMoveTimeBySection.set(sectionEl, -1000);
      lastX = null; lastY = null;
    });
    sectionEl.addEventListener('touchstart', (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const t = e.touches[0];
      const nx = (t.clientX - rect.left) / rect.width;
      const ny = 1.0 - (t.clientY - rect.top) / rect.height;
      const now = performance.now() / 1000;
      panelsForSection.forEach((p) => { p.setMouse(nx, ny); p.ping(nx, ny, now); });
    }, { passive: true });
  }

  function tickHover() {
    const now = performance.now() / 1000;
    sectionPanelMap.forEach((panelsForSection, sectionEl) => {
      const lastMove = lastMoveTimeBySection.get(sectionEl);
      const hoverTarget = (now - lastMove < 0.15 && !prefersReducedMotion) ? 1 : 0;
      panelsForSection.forEach((p) => {
        p.uniforms.uHover.value += (hoverTarget - p.uniforms.uHover.value) * 0.12;
      });
    });
    requestAnimationFrame(tickHover);
  }

  try {
    if (!window.THREE) throw new Error('three.js failed to load from CDN');
    const loader = new THREE.TextureLoader();
    const heroTexture = loader.load('uploads/Gemini_Generated_Image_u1wpswu1wpswu1wp.png');
    heroTexture.minFilter = THREE.LinearFilter;
    heroTexture.magFilter = THREE.LinearFilter;

    const heroCanvas = document.getElementById('rfy-canvas-hero');
    const heroPanel = new ShaderPanel({
      canvas: heroCanvas, mode: 'photo', texture: heroTexture,
      colorA: '#0C0B0B', colorB: '#EFE9E0', colorC: '#EA3B21'
    });
    heroCanvas.classList.add('is-active');
    shaderPanels.push(heroPanel);
    bindHover(document.getElementById('top'), [heroPanel]);

    function renderAllPanels() {
      const now = performance.now() / 1000;
      shaderPanels.forEach((p) => p.render(now));
      requestAnimationFrame(renderAllPanels);
    }
    requestAnimationFrame(renderAllPanels);
    requestAnimationFrame(tickHover);
  } catch (err) {
    console.warn('Rock For You: shader textures disabled —', err.message);
  }

  // RFY:SCRIPT:INSERT
```

(This replaces the entire script tail from Task 9 Step 3 onward — apply it as one edit covering both the earlier `try` block and the new hover logic, rather than two separate insertions.)

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'pointermove'
```

Expected: `1`.

**Manual check:** reload with the console open (no errors). Move the mouse slowly over the hero — the halftone dots near the cursor sharpen/shrink (lens) while the rest stays coarse; moving the mouse quickly across the hero produces a visible ripple wave radiating from the motion. Move the mouse off the hero — the lens relaxes back to the coarse default within about a second. On a touchscreen/emulated touch device, tapping the hero produces a single ripple ping at the tap point.

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): add mouse/touch lens+ripple interaction to hero shader

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 11: Extend the shader to "Frase" and "Bandas" sections

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Add the 4 procedural panels and their hover bindings**

Inside the `try { ... }` block from Task 10, right after the `bindHover(document.getElementById('top'), [heroPanel]);` line and before the `function renderAllPanels() {` line, insert:

```js
    const frasePinkPanel = new ShaderPanel({
      canvas: document.getElementById('rfy-canvas-frase-pink'), mode: 'procedural',
      colorA: '#0C0B0B', colorB: '#F7D9CF', colorC: '#EA3B21'
    });
    const fraseOrangePanel = new ShaderPanel({
      canvas: document.getElementById('rfy-canvas-frase-orange'), mode: 'procedural',
      colorA: '#0C0B0B', colorB: '#EA3B21', colorC: '#F7D9CF'
    });
    document.getElementById('rfy-canvas-frase-pink').classList.add('is-active');
    document.getElementById('rfy-canvas-frase-orange').classList.add('is-active');
    shaderPanels.push(frasePinkPanel, fraseOrangePanel);
    bindHover(document.getElementById('frase'), [frasePinkPanel, fraseOrangePanel]);

    const bandasPinkPanel = new ShaderPanel({
      canvas: document.getElementById('rfy-canvas-bandas-pink'), mode: 'procedural',
      colorA: '#0C0B0B', colorB: '#F7D9CF', colorC: '#EA3B21'
    });
    const bandasOrangePanel = new ShaderPanel({
      canvas: document.getElementById('rfy-canvas-bandas-orange'), mode: 'procedural',
      colorA: '#0C0B0B', colorB: '#EA3B21', colorC: '#F7D9CF'
    });
    document.getElementById('rfy-canvas-bandas-pink').classList.add('is-active');
    document.getElementById('rfy-canvas-bandas-orange').classList.add('is-active');
    shaderPanels.push(bandasPinkPanel, bandasOrangePanel);
    bindHover(document.getElementById('bandas'), [bandasPinkPanel, bandasOrangePanel]);
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'rfy-canvas-bandas-orange'
```

Expected: `2` (once in the `<canvas>` tag, once in this new script reference).

**Manual check:** reload — the "Frase do dia" and "Bandas" sections now show a granular halftone/dither texture in their jagged pink/orange shapes instead of flat color (the torn-paper double-outline silhouette is preserved via the `clip-path` on each canvas). Hovering over either section shows the same lens+ripple behavior as the hero, independently per section (hovering "Frase" doesn't affect "Bandas" or the hero).

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): extend shader texture to frase and bandas sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 12: Visibility gating + resize handling

**Files:**
- Modify: `public/landing-pages/rock/index.html`

- [ ] **Step 1: Pause off-screen panels and handle resize**

Inside the `try { ... }` block, right after the `bindHover(document.getElementById('bandas'), [bandasPinkPanel, bandasOrangePanel]);` line and before `function renderAllPanels() {`, insert:

```js
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const panelsForSection = sectionPanelMap.get(entry.target);
        if (panelsForSection) panelsForSection.forEach((p) => { p.visible = entry.isIntersecting; });
      });
    }, { threshold: 0 });
    [document.getElementById('top'), document.getElementById('frase'), document.getElementById('bandas')]
      .forEach((el) => visibilityObserver.observe(el));

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        shaderPanels.forEach((p) => p.resize());
      }, 150);
    });
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/rock/index.html | grep -c 'IntersectionObserver'
```

Expected: `2` (one from Task 6's reveal observer, one from this visibility observer).

**Manual check:** with the browser dev tools' Performance/FPS meter open, scroll so the hero, "Frase", and "Bandas" are all off-screen — GPU usage from `renderer.render()` calls should drop (the shared `requestAnimationFrame` loop keeps running but skips the actual draw calls via each panel's `visible` flag). Resize the browser window (or rotate an emulated mobile device) — after a brief pause, all shader canvases resize to match their containers with no stretching or blank edges.

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/rock/index.html
git commit -m "feat(rock): pause off-screen shader panels and handle resize

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 13: Final QA pass

**Files:** none (verification only)

- [ ] **Step 1: Re-run build/lint**

```bash
cd "D:/Workspace/Node/portfolio" && pnpm lint && pnpm build
```

Expected: both exit 0.

- [ ] **Step 2: Simulate a WebGL/CDN failure and confirm graceful fallback**

In the browser dev tools, open the Network tab, right-click the request to
`cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js` after a reload attempt and block that
request URL (or use "Block request domain" for `cdn.jsdelivr.net`), then reload
`http://localhost:3000/landing-pages/rock/index.html`.

**Manual check:** the console shows the warning `Rock For You: shader textures disabled — three.js failed to load from CDN` and nothing else red/uncaught. The hero shows its original grayscale/dark photo background; "Frase" and "Bandas" show their original flat pink/orange jagged shapes. All buttons, links, the quote shuffle, and the catalog filter still work normally. Unblock the request afterward.

- [ ] **Step 3: Full manual walkthrough against the spec's checklist**

Reload normally (three.js unblocked) and confirm, in order down the page:

1. `/landing-pages` lists the Rock For You card; it links to `/landing-pages/rock`, which redirects to the static page.
2. Header sticky nav + WhatsApp button work; hero shows the shader texture with working lens+ripple on hover and correct CTAs.
3. Marquee scrolls; "Frase do dia" shows the shader texture on both jagged layers, quote shuffle works.
4. "Catálogo" filters between pop/rock/anime, carousel arrows scroll, every card's WhatsApp link is correct.
5. "O que você encontra na loja" grid, "Bandas" (shader texture + working "Pedir uma peça" link), "Galeria", FAQ, and "A loja" (address, maps link, working embedded map) all render correctly.
6. Footer links work.
7. `prefers-reduced-motion: reduce` disables all animation (marquee, reveals, hero parallax, shader ripple/ambient drift, hero fade-in) while keeping the page fully readable and interactive.
8. No console errors at any point during the walkthrough.

- [ ] **Step 4: Stop the background dev server**

```bash
# Stop the `pnpm dev` background process started before Task 1 (Ctrl+C if run in a foreground
# terminal you kept open, or kill the backgrounded shell/task by its id).
```

- [ ] **Step 5: Final commit (only if Step 2/3 surfaced fixes; otherwise this task has nothing to commit)**

```bash
git status
```

If clean (no fixes were needed), this task is done with no commit. If fixes were made during Steps 2–3, commit them:

```bash
git add public/landing-pages/rock/index.html
git commit -m "fix(rock): address QA findings from final walkthrough

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Self-review notes

**Spec coverage:** Section 1 (file structure) → Tasks 1, 7, 8. Section 2 (route integration) →
Task 8. Section 3 (static conversion: quotes, catalog, WA links, maps link, reveals, parallax,
reduced motion) → Tasks 2–6. Section 4 (shader: setup, shaders, interaction, visibility gating,
fallback) → Tasks 9–12. Section 5 (assets) → Task 7. Section 6 (testing/verification) → every
task's Verify/Manual check steps plus the consolidated Task 13 walkthrough.

**Placeholder scan:** no TBD/TODO; every step carries literal code or an exact command with
expected output.

**Type/name consistency:** `ShaderPanel`, `uniforms` field names (`uTime`, `uMouse`, `uHover`,
`uRippleTime`, `uRippleOrigin`, `uMode`, `uTexture`, `uColorA/B/C`, `uReducedMotion`), `waLink()`,
`MAIN_WA_TEXT`, `MAPS_LINK`, `renderCatalog()`, `renderQuote()`, `bindHover()`, `tickHover()`,
`sectionPanelMap`, `shaderPanels` are each defined once (Tasks 1–3, 9, 10) and reused with the same
names/signatures in every later task that touches them (Tasks 4, 5, 10, 11, 12) — verified by
cross-reading every task against the ones before it while writing this plan.
