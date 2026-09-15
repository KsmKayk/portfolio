# Andy Afrodite Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Andy Afrodite" landing page to `/landing-pages`, converting its Claude Design canvas source into a self-contained static `index.html` (matching the Bellos/ImperioFit/Rock/Hair Style pattern), while preserving the real `<hero-particles>` canvas particle effect and shipping the "Galeria" section exactly as empty placeholder tiles (a deliberate, user-confirmed choice — no photos are wired in).

**Architecture:** One static file, `public/landing-pages/andy-afrodite/index.html` (inline `<style>` + inline `<script>`, no build step, no React), served directly by Next.js's static file handler; a thin `page.tsx` redirects `/landing-pages/andy-afrodite` to it. Unlike Hair Style's fully-classed CSS, this page mirrors the source's own authoring style — most one-off layout/decoration stays as inline `style="..."` attributes (as in the `.dc.html` source), with a `<style>` block reserved for hover states, keyframe animations, reduced-motion overrides, and the handful of dynamically-toggled states (active filter button, FAQ open/closed, scroll-reveal visibility). `<hero-particles>` is placed directly in the markup — since `hero-particles.js` loads synchronously in `<head>` (same as the source), the custom element upgrades before the browser paints it, so no mount-polling is needed.

**Tech Stack:** Plain HTML/CSS/vanilla JS, a real framework-free custom element (`hero-particles.js`, canvas 2D, already dependency-free), Next.js 16 App Router redirect route, TypeScript data array (`src/data/landing-pages.ts`).

**Source spec:** `docs/superpowers/specs/2026-09-15-andy-afrodite-landing-design.md` — read it before Task 1 for full context/rationale.

**No automated test framework applies** — this is a static HTML asset outside the Next.js component tree. Verification is: (a) `pnpm build`/`pnpm lint` for the two TS/React files, (b) `curl` against the dev server checking specific markers exist in the served HTML, (c) manual browser checks called out per task.

Before Task 1, start the dev server once, in the background:

```bash
cd "D:/Workspace/Node/portfolio" && pnpm dev
```

It serves on `http://localhost:3000`.

---

## Task 1: Relocate source assets

**Files:**
- Move: `andy afrodite/Andy Afrodite.dc.html` → `public/landing-pages/andy-afrodite/Andy Afrodite.dc.html`
- Move: `andy afrodite/support.js` → `public/landing-pages/andy-afrodite/support.js`
- Move: `andy afrodite/uploads/*` (7 files, unreferenced by the shipped page) → `public/landing-pages/andy-afrodite/uploads/`
- Move (real, tracked assets): `andy afrodite/andy-logo.svg`, `andy-hero.jpg`, `hero-particles.js` → `public/landing-pages/andy-afrodite/`
- Create: `public/landing-pages/andy-afrodite/thumbnail.webp`

`.gitignore` already has the slug-general pattern from the Hair Style branch
(`public/landing-pages/*/*.dc.html`, `*/support.js`, `*/.thumbnail`, `*/image-slot.js`) — no edit
needed here.

- [ ] **Step 1: Confirm the thumbnail's real format**

```bash
file "andy afrodite/.thumbnail"
```

Expected: `RIFF ... Web/P image` (WebP) — confirmed. Use `.webp` as the copied filename's
extension.

- [ ] **Step 2: Move everything into place**

```bash
mkdir -p "public/landing-pages/andy-afrodite/uploads"
mv "andy afrodite/Andy Afrodite.dc.html" "public/landing-pages/andy-afrodite/Andy Afrodite.dc.html"
mv "andy afrodite/support.js" "public/landing-pages/andy-afrodite/support.js"
mv "andy afrodite/andy-logo.svg" "public/landing-pages/andy-afrodite/andy-logo.svg"
mv "andy afrodite/andy-hero.jpg" "public/landing-pages/andy-afrodite/andy-hero.jpg"
mv "andy afrodite/hero-particles.js" "public/landing-pages/andy-afrodite/hero-particles.js"
mv "andy afrodite/uploads/"* "public/landing-pages/andy-afrodite/uploads/"
cp "andy afrodite/.thumbnail" "public/landing-pages/andy-afrodite/thumbnail.webp"
rmdir "andy afrodite/uploads" 2>/dev/null; rm -rf "andy afrodite"
```

- [ ] **Step 3: Verify git ignores the DC source but tracks the real assets**

```bash
git status --short public/landing-pages/andy-afrodite/
```

Expected: `Andy Afrodite.dc.html`, `support.js`, and `uploads/` do NOT appear (ignored — uploads
matches no rule directly, but its contents are irrelevant until referenced; if `uploads/` DOES show
as untracked here that's fine, it's simply not yet staged — the point is `.dc.html`/`support.js`
must not appear even after `git add -A` is attempted). `andy-logo.svg`, `andy-hero.jpg`,
`hero-particles.js`, and `thumbnail.webp` DO appear as untracked (new files to be added).

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/andy-afrodite/andy-logo.svg" "public/landing-pages/andy-afrodite/andy-hero.jpg" "public/landing-pages/andy-afrodite/hero-particles.js" "public/landing-pages/andy-afrodite/thumbnail.webp"
git commit -m "chore(andy-afrodite): relocate DC source assets and real page assets

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

(The `.dc.html`/`support.js`/`uploads/*` files are gitignored and never staged — confirmed in
Step 3 — so this commit only contains the four real assets.)

---

## Task 2: Static page skeleton (head, dot-grid overlay, header, progress rail, footer)

**Files:**
- Create: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Create the file with the document shell**

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Andy Afrodite — conteúdo para marcas alternativas e góticas</title>
<meta name="description" content="Andy Afrodite: modelo alternativa produzindo catálogo, reels e editoriais para marcas góticas, de piercing, tattoo e acessórios de nicho." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<script src="hero-particles.js"></script>
<style>
  :root {
    --aa-bg: #07070a;
    --aa-fg: #ece9e4;
    --aa-accent: #ff4d8d;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: var(--aa-bg); }
  body { -webkit-font-smoothing: antialiased; font-family: 'Cormorant Garamond', Georgia, serif; color: var(--aa-fg); overflow-x: hidden; }
  a { color: var(--aa-fg); text-decoration: none; }
  a:hover { color: var(--aa-accent); }
  img { max-width: 100%; display: block; }
  ::selection { background: var(--aa-accent); color: var(--aa-bg); }

  [data-reveal] { opacity: 0; transform: translateY(34px); transition: opacity 1.1s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1); }
  [data-reveal].is-in { opacity: 1; transform: none; }

  @keyframes riseIn { from { opacity: 0; transform: translateY(60px) scale(.98); filter: blur(14px); } to { opacity: 1; transform: none; filter: blur(0); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
  @keyframes halo { 0%, 100% { opacity: .45; transform: scale(1); } 50% { opacity: .75; transform: scale(1.06); } }
  @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .aa-nav-link { color: rgba(236,233,228,.62); }
  .aa-nav-link:hover { color: var(--aa-accent); }
  .aa-nav-cta { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(236,233,228,.28); padding: 10px 18px; color: var(--aa-fg); }
  .aa-nav-cta:hover { border-color: var(--aa-accent); color: var(--aa-accent); }
  .aa-btn-solid { display: inline-flex; align-items: center; gap: 12px; background: var(--aa-fg); color: var(--aa-bg); padding: 17px 30px; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; }
  .aa-btn-solid:hover { background: var(--aa-accent); color: var(--aa-bg); }
  .aa-btn-outline { display: inline-flex; align-items: center; gap: 12px; border: 1px solid rgba(236,233,228,.26); padding: 17px 30px; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: rgba(236,233,228,.82); }
  .aa-btn-outline:hover { border-color: rgba(236,233,228,.7); }

  .aa-filter-btn { cursor: pointer; padding: 10px 16px; font-family: 'Space Mono', monospace; font-size: 9.5px; letter-spacing: .18em; text-transform: uppercase; transition: all .3s ease; background: transparent; color: rgba(236,233,228,.6); border: 1px solid rgba(236,233,228,.2); }
  .aa-filter-btn.is-active { background: var(--aa-fg); color: var(--aa-bg); border-color: var(--aa-fg); }

  .aa-faq-item { border-top: 1px solid rgba(236,233,228,.12); }
  .aa-faq-head { width: 100%; cursor: pointer; background: transparent; border: 0; color: rgba(236,233,228,.82); display: flex; align-items: center; gap: 16px; text-align: left; padding: 22px 0; transition: color .3s ease; font-family: inherit; font-size: inherit; }
  .aa-faq-item.is-open .aa-faq-head { color: var(--aa-fg); }
  .aa-faq-icon { flex: none; font-family: 'Space Mono', monospace; font-size: 16px; color: rgba(236,233,228,.4); transform: rotate(0deg); transition: transform .4s cubic-bezier(.16,1,.3,1), color .3s ease; }
  .aa-faq-item.is-open .aa-faq-icon { color: var(--aa-accent); transform: rotate(45deg); }
  .aa-faq-body { overflow: hidden; max-height: 0; opacity: 0; transition: max-height .55s cubic-bezier(.16,1,.3,1), opacity .4s ease; }
  .aa-faq-item.is-open .aa-faq-body { max-height: 340px; opacity: 1; }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { transition: none; }
    .aa-hero-anim { animation: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
  }
</style>
</head>
<body>

<div style="position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.5;background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 1px, transparent 0);background-size:3px 3px"></div>

<header style="position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:22px clamp(20px,4vw,56px);backdrop-filter:blur(14px);background:linear-gradient(180deg,rgba(7,7,10,.82),rgba(7,7,10,0))">
  <a href="#topo" style="display:flex;align-items:center;gap:14px">
    <img src="andy-logo.svg" alt="Andy Afrodite" style="width:38px;height:38px;display:block" />
    <span style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:.42em;text-transform:uppercase;color:var(--aa-fg)">Andy Afrodite</span>
  </a>
  <nav style="display:flex;align-items:center;gap:clamp(16px,2.4vw,34px);font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.26em;text-transform:uppercase">
    <a href="#sobre" class="aa-nav-link">Sobre</a>
    <a href="#galeria" class="aa-nav-link">Galeria</a>
    <a href="#faq" class="aa-nav-link">FAQ</a>
    <a href="#contato" class="aa-nav-cta">Orçamento</a>
  </nav>
</header>

<aside style="position:fixed;left:clamp(12px,2.2vw,34px);top:0;bottom:0;z-index:45;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;pointer-events:none">
  <span style="font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.3em;color:rgba(236,233,228,.4)">ΑΡΧΗ</span>
  <div style="position:relative;width:1px;height:min(46vh,420px);background:rgba(236,233,228,.14);overflow:hidden">
    <div id="aa-rail-fill" style="position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:top;transform:scaleY(0);background:linear-gradient(180deg,#ece9e4,#ff4d8d)"></div>
  </div>
  <div id="aa-rail-glyph" style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:.2em;color:var(--aa-accent);writing-mode:vertical-rl;text-orientation:upright">Α</div>
  <span id="aa-rail-pct" style="font-family:'Space Mono',monospace;font-size:9px;letter-spacing:.18em;color:rgba(236,233,228,.5)">00</span>
</aside>

<div style="background:var(--aa-bg);color:var(--aa-fg);overflow-x:hidden;position:relative">
  <!-- AA:SECTIONS:INSERT -->

  <footer style="border-top:1px solid rgba(236,233,228,.1);padding:36px clamp(28px,6vw,90px) 40px clamp(64px,9vw,140px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px">
    <div style="display:flex;align-items:center;gap:14px">
      <img src="andy-logo.svg" alt="" style="width:30px;height:30px;display:block;opacity:.85" />
      <span style="font-family:'Cinzel',serif;font-size:11px;letter-spacing:.38em;color:rgba(236,233,228,.6)">ANDY AFRODITE</span>
    </div>
    <span style="font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.35)">© 2026 · Modelo alternativa · Brasil</span>
    <a href="#topo" style="font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.5)">Voltar ao topo ↑</a>
  </footer>
</div>

<script>
  var WA_NUMBER = '5511999999999';
  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  // AA:SCRIPT:INSERT
</script>
</body>
</html>
```

- [ ] **Step 2: Verify the skeleton serves**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'AA:SECTIONS:INSERT'
```

Expected: title tag prints correctly; second command prints `1`.

**Manual check:** header shows logo + wordmark + nav; the left-edge progress rail is visible (empty
fill for now, no JS wired yet); footer shows logo + wordmark + copyright + "voltar ao topo" link.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add static page skeleton with header, rail and footer

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Hero section with `<hero-particles>`

**Files:**
- Modify: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Replace `<!-- AA:SECTIONS:INSERT -->` with the hero section**

```html
  <section id="topo" style="position:relative;min-height:100vh;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:clamp(20px,4vw,60px);padding:140px clamp(28px,6vw,90px) 90px clamp(64px,9vw,140px)">
    <div style="position:absolute;top:14%;right:6%;width:min(46vw,620px);height:min(46vw,620px);border-radius:50%;background:radial-gradient(circle,rgba(255,77,141,.16),rgba(120,60,140,.07) 45%,transparent 70%);filter:blur(30px);animation:halo 9s ease-in-out infinite;pointer-events:none"></div>

    <div style="position:relative;z-index:2">
      <div class="aa-hero-anim" style="display:flex;align-items:center;gap:14px;margin-bottom:26px;animation:fadeUp 1s .1s both">
        <span style="width:46px;height:1px;background:var(--aa-accent)"></span>
        <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:rgba(236,233,228,.6)">Modelo alternativa · Moda gótica</span>
      </div>
      <h1 class="aa-hero-anim" style="margin:0;font-family:'Cinzel',serif;font-weight:500;line-height:.92;letter-spacing:.02em;font-size:clamp(52px,8.6vw,132px);animation:fadeUp 1.1s .22s both">ANDY<br /><span style="color:rgba(236,233,228,.5)">AFRODITE</span></h1>
      <div class="aa-hero-anim" style="margin:18px 0 0;font-family:'Cinzel',serif;font-size:clamp(13px,1.4vw,17px);letter-spacing:.52em;color:rgba(255,77,141,.85);animation:fadeUp 1.1s .34s both">ΑΦΡΟΔΙΤΗ</div>
      <p class="aa-hero-anim" style="max-width:44ch;margin:30px 0 0;font-size:clamp(17px,1.5vw,21px);line-height:1.62;color:rgba(236,233,228,.72);animation:fadeUp 1.1s .44s both">Visto o que a sua loja vende. Catálogo, reels e conteúdo para marcas alternativas, góticas e de nicho — com estética própria e entrega rápida.</p>
      <div class="aa-hero-anim" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:38px;animation:fadeUp 1.1s .56s both">
        <a href="#" id="aa-hero-wa" target="_blank" rel="noopener" class="aa-btn-solid">Pedir orçamento <span style="font-size:14px">→</span></a>
        <a href="#galeria" class="aa-btn-outline">Ver galeria</a>
      </div>
    </div>

    <div style="position:relative;z-index:1;display:flex;justify-content:center;align-items:flex-end;align-self:stretch">
      <div style="position:absolute;bottom:0;width:min(34vw,420px);height:min(34vw,420px);border:1px solid rgba(236,233,228,.12);border-radius:50%;animation:halo 12s ease-in-out infinite"></div>
      <div class="aa-hero-anim" style="position:relative;width:min(100%,600px);height:min(84vh,820px);animation:riseIn 1.6s .3s both">
        <img src="andy-hero.jpg" alt="Andy Afrodite" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:42% 30%;filter:grayscale(.28) contrast(1.1) brightness(.82);-webkit-mask-image:radial-gradient(ellipse 74% 70% at 50% 44%, #000 46%, transparent 100%);mask-image:radial-gradient(ellipse 74% 70% at 50% 44%, #000 46%, transparent 100%);animation:drift 13s 1.6s ease-in-out infinite" />
        <div style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(210deg,rgba(255,77,141,.13),transparent 52%);mix-blend-mode:screen"></div>
        <div style="position:absolute;inset:-8%;pointer-events:none">
          <hero-particles></hero-particles>
        </div>
      </div>
    </div>
  </section>

  <div style="border-top:1px solid rgba(236,233,228,.1);border-bottom:1px solid rgba(236,233,228,.1);overflow:hidden;padding:16px 0;background:rgba(236,233,228,.02)">
    <div style="display:flex;width:max-content;animation:marquee 34s linear infinite">
      <div style="display:flex;gap:46px;padding-right:46px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(236,233,228,.55);white-space:nowrap">
        <span>Catálogo &amp; e-commerce</span><span style="color:var(--aa-accent)">✦</span><span>Reels e vídeos</span><span style="color:var(--aa-accent)">✦</span><span>Publiposts</span><span style="color:var(--aa-accent)">✦</span><span>Try-on haul</span><span style="color:var(--aa-accent)">✦</span><span>Close de peças</span><span style="color:var(--aa-accent)">✦</span>
      </div>
      <div style="display:flex;gap:46px;padding-right:46px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(236,233,228,.55);white-space:nowrap">
        <span>Catálogo &amp; e-commerce</span><span style="color:var(--aa-accent)">✦</span><span>Reels e vídeos</span><span style="color:var(--aa-accent)">✦</span><span>Publiposts</span><span style="color:var(--aa-accent)">✦</span><span>Try-on haul</span><span style="color:var(--aa-accent)">✦</span><span>Close de peças</span><span style="color:var(--aa-accent)">✦</span>
      </div>
    </div>
  </div>

  <!-- AA:SECTIONS:INSERT -->
```

- [ ] **Step 2: Wire the hero WhatsApp button**

Replace `  // AA:SCRIPT:INSERT` with:

```js
  document.getElementById('aa-hero-wa').href = waLink('Olá! Vim pelo site e gostaria de um orçamento.');

  // AA:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c '<hero-particles>'
```

Expected: `1`.

**Manual check:** reload — hero shows the masked grayscale photo with a particle canvas drifting
over it; moving the mouse over the page visibly nudges the particle drift direction (per
`hero-particles.js`'s `pointermove` listener). Headline/description/CTAs fade up on load. "Pedir
orçamento" opens `wa.me/5511999999999` with the orçamento message. A scrolling marquee band shows
below the hero.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add hero section with hero-particles and marquee

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: "Sobre mim" section

**Files:**
- Modify: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Replace `<!-- AA:SECTIONS:INSERT -->` with the Sobre section**

```html
  <section id="sobre" style="position:relative;padding:clamp(80px,11vw,150px) clamp(28px,6vw,90px) clamp(80px,11vw,150px) clamp(64px,9vw,140px)">
    <div style="position:absolute;top:6%;right:4%;font-family:'Cinzel',serif;font-size:clamp(70px,13vw,190px);color:rgba(236,233,228,.035);letter-spacing:.08em;pointer-events:none;user-select:none">ΚΑΛΛΟΣ</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(36px,6vw,84px);align-items:start;position:relative">
      <div data-reveal>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:26px">
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;color:var(--aa-accent)">01</span>
          <span style="width:36px;height:1px;background:rgba(236,233,228,.3)"></span>
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(236,233,228,.6)">Sobre mim</span>
        </div>
        <h2 style="margin:0 0 28px;font-family:'Cinzel',serif;font-weight:400;font-size:clamp(30px,4vw,54px);line-height:1.12;letter-spacing:.01em">A roupa conta<br />uma história.<br /><span style="color:rgba(236,233,228,.45)">Eu conto ela.</span></h2>
        <p style="margin:0 0 20px;font-size:clamp(17px,1.4vw,20px);line-height:1.68;color:rgba(236,233,228,.72);max-width:52ch">Sou modelo alternativa e trabalho com lojas góticas, marcas de piercing, tattoo e acessórios de nicho. Meu trabalho não é só vestir a peça: é traduzir o universo da marca em imagem — luz, pose, atitude e o tipo de foto que faz alguém parar o scroll e clicar em comprar.</p>
        <p style="margin:0;font-size:clamp(17px,1.4vw,20px);line-height:1.68;color:rgba(236,233,228,.56);max-width:52ch">Produzo tudo do briefing à entrega: fotos tratadas para e-commerce, vídeos verticais prontos para Reels e TikTok, e closes que mostram tecido, corte e caimento de verdade.</p>
        <p style="margin:26px 0 0;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.22em;color:rgba(255,77,141,.6)">[ texto provisório — me envie o seu e eu substituo ]</p>
      </div>

      <div data-reveal style="border:1px solid rgba(236,233,228,.12);padding:clamp(26px,3vw,40px);background:linear-gradient(160deg,rgba(236,233,228,.045),rgba(236,233,228,.008))">
        <div style="font-family:'Cinzel',serif;font-size:13px;letter-spacing:.36em;color:rgba(236,233,228,.75);margin-bottom:6px">FICHA TÉCNICA</div>
        <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.24em;color:rgba(255,77,141,.7);margin-bottom:28px">ΜΟΡΦΗ</div>
        <div style="display:flex;flex-direction:column">
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:16px 0;border-top:1px solid rgba(236,233,228,.1)">
            <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.5)">Altura</span>
            <span style="font-family:'Cinzel',serif;font-size:clamp(16px,1.6vw,20px);color:var(--aa-fg);text-align:right">1,68 m</span>
          </div>
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:16px 0;border-top:1px solid rgba(236,233,228,.1)">
            <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.5)">Calçado</span>
            <span style="font-family:'Cinzel',serif;font-size:clamp(16px,1.6vw,20px);color:var(--aa-fg);text-align:right">37 BR</span>
          </div>
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:16px 0;border-top:1px solid rgba(236,233,228,.1)">
            <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.5)">Medidas</span>
            <span style="font-family:'Cinzel',serif;font-size:clamp(16px,1.6vw,20px);color:var(--aa-fg);text-align:right">96 · 78 · 106</span>
          </div>
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding:16px 0;border-top:1px solid rgba(236,233,228,.1)">
            <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(236,233,228,.5)">Cabelo / olhos</span>
            <span style="font-family:'Cinzel',serif;font-size:clamp(16px,1.6vw,20px);color:var(--aa-fg);text-align:right">Preto · Castanho</span>
          </div>
        </div>
        <div style="margin-top:28px;display:flex;flex-wrap:wrap;gap:8px">
          <span style="border:1px solid rgba(236,233,228,.18);padding:8px 13px;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,233,228,.65)">Catálogo</span>
          <span style="border:1px solid rgba(236,233,228,.18);padding:8px 13px;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,233,228,.65)">Reels</span>
          <span style="border:1px solid rgba(236,233,228,.18);padding:8px 13px;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,233,228,.65)">Publipost</span>
          <span style="border:1px solid rgba(236,233,228,.18);padding:8px 13px;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,233,228,.65)">Try-on haul</span>
          <span style="border:1px solid rgba(236,233,228,.18);padding:8px 13px;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(236,233,228,.65)">Close de peças</span>
        </div>
      </div>
    </div>
  </section>

  <!-- AA:SECTIONS:INSERT -->
```

- [ ] **Step 2: Verify**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'FICHA TÉCNICA'
```

Expected: `1`.

**Manual check:** reload and scroll to "Sobre mim" — two-column layout fades up on scroll (once
the reveal observer is wired in Task 7, this section will animate in; until then it's simply
visible/static, which is fine at this intermediate step), body copy + FICHA TÉCNICA panel with 4
rows + 5 service tags render correctly, provisional-text note is visible.

- [ ] **Step 3: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add sobre mim section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: "Galeria" section (filterable placeholder masonry)

**Files:**
- Modify: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Replace `<!-- AA:SECTIONS:INSERT -->` with the Galeria section**

```html
  <section id="galeria" style="position:relative;padding:clamp(70px,9vw,120px) clamp(28px,6vw,90px) clamp(80px,10vw,140px) clamp(64px,9vw,140px);border-top:1px solid rgba(236,233,228,.08)">
    <div data-reveal style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:44px">
      <div>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;color:var(--aa-accent)">02</span>
          <span style="width:36px;height:1px;background:rgba(236,233,228,.3)"></span>
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(236,233,228,.6)">Galeria</span>
        </div>
        <h2 style="margin:0;font-family:'Cinzel',serif;font-weight:400;font-size:clamp(30px,4.4vw,58px);line-height:1.1">Trabalhos <span style="color:rgba(236,233,228,.45)">selecionados</span></h2>
      </div>
      <div id="aa-filters" style="display:flex;flex-wrap:wrap;gap:8px"></div>
    </div>

    <div id="aa-gallery-grid" style="column-count:3;column-gap:14px"></div>
  </section>

  <!-- AA:SECTIONS:INSERT -->
```

- [ ] **Step 2: Add gallery data + render/filter logic**

Replace `  // AA:SCRIPT:INSERT` with:

```js
  var AA_CATEGORIES = ["Tudo", "Catálogo", "Editorial", "Reels", "Detalhe de peça"];
  var AA_GALLERY_BASE = [
    { cat: "Catálogo", h: 380 }, { cat: "Editorial", h: 520 }, { cat: "Reels", h: 620 },
    { cat: "Detalhe de peça", h: 300 }, { cat: "Catálogo", h: 480 }, { cat: "Editorial", h: 340 },
    { cat: "Reels", h: 600 }, { cat: "Detalhe de peça", h: 360 }, { cat: "Catálogo", h: 520 }
  ];
  function aaGalleryLabel(cat) {
    if (cat === "Reels") return "vídeo vertical 9:16";
    if (cat === "Detalhe de peça") return "close do produto";
    return "foto " + cat.toLowerCase();
  }
  var aaActiveFilter = "Tudo";
  var aaFiltersEl = document.getElementById('aa-filters');
  var aaGridEl = document.getElementById('aa-gallery-grid');

  function renderAaFilters() {
    aaFiltersEl.innerHTML = AA_CATEGORIES.map(function (c) {
      return '<button type="button" class="aa-filter-btn' + (c === aaActiveFilter ? ' is-active' : '') + '" data-cat="' + c + '">' + c + '</button>';
    }).join('');
    Array.prototype.forEach.call(aaFiltersEl.querySelectorAll('.aa-filter-btn'), function (btn) {
      btn.addEventListener('click', function () {
        aaActiveFilter = btn.dataset.cat;
        renderAaFilters();
        renderAaGallery();
      });
    });
  }

  function renderAaGallery() {
    var items = AA_GALLERY_BASE.filter(function (i) { return aaActiveFilter === "Tudo" || i.cat === aaActiveFilter; });
    aaGridEl.innerHTML = items.map(function (item, n) {
      var label = aaGalleryLabel(item.cat);
      var num = String(n + 1).padStart(2, '0');
      var wrapStyle = 'break-inside:avoid;margin:0 0 14px;display:block;animation:fadeUp .7s ' + (n * 0.06).toFixed(2) + 's both';
      var boxStyle = 'position:relative;display:flex;align-items:center;justify-content:center;height:' + item.h + 'px;background:linear-gradient(160deg,rgba(236,233,228,.05),rgba(236,233,228,.015));border:1px solid rgba(236,233,228,.12);overflow:hidden';
      return '<figure style="' + wrapStyle + '">' +
        '<div style="' + boxStyle + '">' +
          '<div style="position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(236,233,228,.05) 0 2px,transparent 2px 9px)"></div>' +
          '<div style="position:relative;text-align:center;padding:16px">' +
            '<div style="font-family:\'Space Mono\',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(236,233,228,.55)">' + label + '</div>' +
            '<div style="font-family:\'Space Mono\',monospace;font-size:9px;letter-spacing:.16em;color:rgba(236,233,228,.3);margin-top:8px">arraste a foto aqui</div>' +
          '</div>' +
        '</div>' +
        '<figcaption style="display:flex;justify-content:space-between;gap:12px;padding:10px 2px 0;font-family:\'Space Mono\',monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(236,233,228,.42)">' +
          '<span>' + item.cat + '</span><span>' + num + '</span>' +
        '</figcaption>' +
      '</figure>';
    }).join('');
  }

  renderAaFilters();
  renderAaGallery();

  // AA:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'aa-gallery-grid'
```

Expected: at least `1`.

**Manual check:** reload — "Galeria" shows a 3-column masonry of 9 placeholder tiles (varied
heights), each reading "arraste a foto aqui" with a category label and index number, and 5 filter
buttons ("Tudo" active by default). Clicking "Reels" narrows the grid to the 3 Reels items (all
labeled "vídeo vertical 9:16"); clicking "Tudo" restores all 9. No real photos anywhere in this
section — confirmed intentional per spec.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add filterable galeria placeholder grid

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: FAQ accordion

**Files:**
- Modify: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Replace `<!-- AA:SECTIONS:INSERT -->` with the FAQ section**

```html
  <section id="faq" style="position:relative;padding:clamp(80px,10vw,140px) clamp(28px,6vw,90px) clamp(80px,10vw,140px) clamp(64px,9vw,140px);border-top:1px solid rgba(236,233,228,.08)">
    <div style="position:absolute;left:clamp(64px,9vw,140px);bottom:6%;font-family:'Cinzel',serif;font-size:clamp(60px,11vw,160px);color:rgba(236,233,228,.03);pointer-events:none;user-select:none">ΛΟΓΟΣ</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(32px,5vw,70px);align-items:start;position:relative">
      <div data-reveal>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;color:var(--aa-accent)">03</span>
          <span style="width:36px;height:1px;background:rgba(236,233,228,.3)"></span>
          <span style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(236,233,228,.6)">Perguntas frequentes</span>
        </div>
        <h2 style="margin:0 0 20px;font-family:'Cinzel',serif;font-weight:400;font-size:clamp(28px,3.8vw,50px);line-height:1.12">O que as lojas<br />perguntam antes<br />de fechar</h2>
        <p style="margin:0;font-size:18px;line-height:1.66;color:rgba(236,233,228,.55);max-width:38ch">Não achou sua dúvida? Manda no WhatsApp que respondo no mesmo dia.</p>
      </div>
      <div data-reveal>
        <div id="aa-faq-list"></div>
        <div style="border-top:1px solid rgba(236,233,228,.12)"></div>
      </div>
    </div>
  </section>

  <!-- AA:SECTIONS:INSERT -->
```

- [ ] **Step 2: Add FAQ data + accordion logic**

Replace `  // AA:SCRIPT:INSERT` with:

```js
  var AA_FAQ = [
    ["Como funciona o orçamento?", "O valor depende da quantidade de peças, do formato (foto, vídeo ou os dois) e de onde as imagens vão ser usadas. Me manda o briefing no WhatsApp e devolvo uma proposta fechada, sem surpresa depois."],
    ["Você atende marcas de outras cidades?", "Sim. A loja envia as peças pelo correio, eu produzo aqui e devolvo tudo junto com as imagens. O frete de ida e volta entra no combinado."],
    ["Em quanto tempo as fotos ficam prontas?", "Prévias em até 48h depois da produção e o material final tratado em até 7 dias. Se a campanha for urgente, dá para acelerar com taxa de prioridade."],
    ["As peças voltam para a loja depois?", "Voltam, em perfeito estado e na embalagem original. Uso protetor de maquiagem e não corto etiqueta. Se a marca preferir deixar a peça comigo, isso abate parte do cachê."],
    ["Quais tamanhos você veste?", "Confira a ficha técnica acima. Trabalho bem com modelagens plus e com peças de tamanho único, corset e lace-up — que são as mais comuns no nicho alternativo."],
    ["Você faz vídeo além de foto?", "Faço. Reels, try-on haul e cortes verticais prontos para Instagram e TikTok, já no formato 9:16 e com áudio limpo. Vídeo pode ser contratado junto com o catálogo ou separado."],
    ["Por quanto tempo a marca pode usar as imagens?", "O padrão é uso livre nas redes e no e-commerce da loja por 12 meses, com crédito. Uso em anúncio pago, outdoor ou período ilimitado é negociado à parte."],
    ["Trabalha por permuta?", "Avalio caso a caso, principalmente com marcas pequenas do nicho que combinem com o meu perfil. Produções maiores e conteúdo em vídeo eu faço só como trabalho pago."]
  ];
  var aaOpenFaq = -1;
  var aaFaqListEl = document.getElementById('aa-faq-list');

  function renderAaFaq() {
    aaFaqListEl.innerHTML = AA_FAQ.map(function (pair, i) {
      var num = String(i + 1).padStart(2, '0');
      return '<div class="aa-faq-item' + (aaOpenFaq === i ? ' is-open' : '') + '" data-i="' + i + '">' +
        '<button type="button" class="aa-faq-head">' +
          '<span style="font-family:\'Space Mono\',monospace;font-size:10px;letter-spacing:.2em;color:rgba(255,77,141,.7);flex:none">' + num + '</span>' +
          '<span style="flex:1;font-family:\'Cormorant Garamond\',serif;font-size:clamp(18px,1.7vw,22px);line-height:1.4">' + pair[0] + '</span>' +
          '<span class="aa-faq-icon">+</span>' +
        '</button>' +
        '<div class="aa-faq-body"><p style="margin:0;padding:0 0 24px 34px;font-size:17px;line-height:1.66;color:rgba(236,233,228,.62);max-width:60ch">' + pair[1] + '</p></div>' +
      '</div>';
    }).join('');
    Array.prototype.forEach.call(aaFaqListEl.querySelectorAll('.aa-faq-head'), function (btn, i) {
      btn.addEventListener('click', function () {
        aaOpenFaq = aaOpenFaq === i ? -1 : i;
        renderAaFaq();
      });
    });
  }
  renderAaFaq();

  // AA:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'aa-faq-list'
```

Expected: at least `1`.

**Manual check:** reload — 8 questions listed, all collapsed by default. Clicking a question opens
it (icon rotates 45°, answer expands) and closes any previously open one; clicking the open
question again collapses it.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add faq accordion

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Contato section, scroll reveals, and progress rail

**Files:**
- Modify: `public/landing-pages/andy-afrodite/index.html`

- [ ] **Step 1: Replace `<!-- AA:SECTIONS:INSERT -->` with the Contato section**

```html
  <section id="contato" style="position:relative;padding:clamp(90px,12vw,170px) clamp(28px,6vw,90px) clamp(70px,9vw,120px) clamp(64px,9vw,140px);border-top:1px solid rgba(236,233,228,.08);overflow:hidden">
    <div style="position:absolute;left:50%;top:-30%;transform:translateX(-50%);width:min(80vw,900px);height:min(80vw,900px);border-radius:50%;background:radial-gradient(circle,rgba(255,77,141,.12),transparent 68%);filter:blur(40px);pointer-events:none;animation:halo 10s ease-in-out infinite"></div>
    <div data-reveal style="position:relative;text-align:center;max-width:860px;margin:0 auto">
      <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:.5em;color:rgba(255,77,141,.8);margin-bottom:26px">ΕΡΩΣ · ΤΕΧΝΗ</div>
      <h2 style="margin:0 0 26px;font-family:'Cinzel',serif;font-weight:400;font-size:clamp(32px,5.4vw,72px);line-height:1.08">Sua próxima<br />coleção pede<br /><span style="color:rgba(236,233,228,.45)">uma imagem forte</span></h2>
      <p style="margin:0 auto 42px;max-width:50ch;font-size:clamp(17px,1.5vw,21px);line-height:1.62;color:rgba(236,233,228,.66)">Me conta o que a loja precisa — quantidade de peças, prazo e onde as imagens vão rodar. Devolvo proposta e datas disponíveis.</p>
      <a href="#" id="aa-contato-wa" target="_blank" rel="noopener" class="aa-btn-solid" style="padding:20px 40px;font-size:12px;letter-spacing:.22em">Chamar no WhatsApp <span style="font-size:15px">→</span></a>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(18px,4vw,50px);margin-top:52px;font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.22em;text-transform:uppercase">
        <a href="#contato" style="color:rgba(236,233,228,.6);border-bottom:1px solid rgba(236,233,228,.2);padding-bottom:5px">Instagram @andyafrodite</a>
        <a href="#contato" style="color:rgba(236,233,228,.6);border-bottom:1px solid rgba(236,233,228,.2);padding-bottom:5px">TikTok @andyafrodite</a>
        <a href="#contato" style="color:rgba(236,233,228,.6);border-bottom:1px solid rgba(236,233,228,.2);padding-bottom:5px">contato@andyafrodite.com</a>
      </div>
      <p style="margin:22px 0 0;font-family:'Space Mono',monospace;font-size:9.5px;letter-spacing:.2em;color:rgba(255,77,141,.55)">[ links provisórios — me envie os reais ]</p>
    </div>
  </section>
```

(No trailing `<!-- AA:SECTIONS:INSERT -->` — this is the last section before the footer, which is
already in place from Task 2.)

- [ ] **Step 2: Add contato WA wiring + scroll reveals + progress rail JS**

Replace `  // AA:SCRIPT:INSERT` with:

```js
  document.getElementById('aa-contato-wa').href = waLink('Olá! Vim pelo site e gostaria de um orçamento.');

  var aaReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var aaRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        aaRevealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'), function (el) {
    if (aaReduceMotion) { el.classList.add('is-in'); } else { aaRevealObserver.observe(el); }
  });

  var AA_GLYPHS = ["Α", "Φ", "Ρ", "Ο", "Δ", "Ι", "Τ", "Η"];
  var aaRailFill = document.getElementById('aa-rail-fill');
  var aaRailGlyph = document.getElementById('aa-rail-glyph');
  var aaRailPct = document.getElementById('aa-rail-pct');
  var aaRailRaf = null;
  function aaOnScroll() {
    if (aaRailRaf) return;
    aaRailRaf = requestAnimationFrame(function () {
      aaRailRaf = null;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      aaRailFill.style.transform = 'scaleY(' + p + ')';
      aaRailPct.textContent = String(Math.round(p * 100)).padStart(2, '0');
      var g = AA_GLYPHS[Math.min(AA_GLYPHS.length - 1, Math.floor(p * AA_GLYPHS.length))];
      if (aaRailGlyph.textContent !== g) aaRailGlyph.textContent = g;
    });
  }
  window.addEventListener('scroll', aaOnScroll, { passive: true });
  aaOnScroll();

  // AA:SCRIPT:INSERT
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'IntersectionObserver'
curl -s http://localhost:3000/landing-pages/andy-afrodite/index.html | grep -c 'ΕΡΩΣ'
```

Expected: both print at least `1`.

**Manual check:** scroll the full page slowly — "Sobre mim", "Galeria", "FAQ", and "Contato"
sections fade/slide up the first time they enter the viewport (each only once). The left-edge
progress rail's fill/percentage/glyph update smoothly while scrolling, reaching 100%/`Η` at the
page bottom and resetting toward 0%/`Α` scrolling back to the top. "Chamar no WhatsApp" in the
Contato section opens the same `wa.me/5511999999999` link as the hero CTA. Toggle
`prefers-reduced-motion` in dev tools and reload: reveal sections show immediately with no
animation (the particle canvas and progress rail are unaffected, matching source behavior).

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/andy-afrodite/index.html"
git commit -m "feat(andy-afrodite): add contato section, scroll reveals and progress rail

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Wire the page into the site

**Files:**
- Create: `src/app/landing-pages/andy-afrodite/page.tsx`
- Modify: `src/data/landing-pages.ts`

- [ ] **Step 1: Create the redirect route**

```tsx
import { redirect } from 'next/navigation';

export default function AndyAfroditePage() {
  redirect('/landing-pages/andy-afrodite/index.html');
}
```

- [ ] **Step 2: Add the data entry**

Read `src/data/landing-pages.ts`, then append after the `rock` entry (or after whichever entry is
currently last — check the file first, since the Hair Style branch already added one entry before
this one):

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

- [ ] **Step 3: Verify the route and listing**

```bash
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://localhost:3000/landing-pages/andy-afrodite
curl -s http://localhost:3000/landing-pages | grep -c 'Andy Afrodite'
```

Expected: first command prints a redirect status (`307` or `308`) with `.../landing-pages/andy-afrodite/index.html`; second prints at least `1`.

**Manual check:** `/landing-pages` shows the new Andy Afrodite card (thumbnail + logo overlay +
description) linking to `/landing-pages/andy-afrodite`, which redirects to the static page.

- [ ] **Step 4: Commit**

```bash
git add "src/app/landing-pages/andy-afrodite/page.tsx" "src/data/landing-pages.ts"
git commit -m "feat(andy-afrodite): wire Andy Afrodite landing page into the site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Full verification**

```bash
pnpm build
pnpm lint
```

Expected: `pnpm build` succeeds and lists `/landing-pages/andy-afrodite` in its route table.
`pnpm lint` shows no new errors beyond the pre-existing, unrelated ones in
Navbar.tsx/ProjectModal.tsx/ThemeProvider.tsx/About.tsx/Contact.tsx/BusinessCard.tsx/ShareModal.tsx/Button.tsx.
If `hero-particles.js` itself gets flagged by lint (it's plain browser JS outside the `src/`
TypeScript tree, so it normally won't be), only then add it to `eslint.config.mjs`'s ignore list
alongside `support.js`/`image-slot.js`, and note that deviation in the final report.
