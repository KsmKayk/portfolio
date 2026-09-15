# Hair Style Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Hair Style" landing page to `/landing-pages`, converting its Claude Design canvas source into a self-contained static `index.html` (matching the Bellos/ImperioFit/Rock pattern), with all photography downloaded locally instead of hotlinked from Pexels.

**Architecture:** One static file, `public/landing-pages/hair-style/index.html` (inline `<style>` + inline `<script>`, no build step, no React), served directly by Next.js's static file handler; a thin `page.tsx` redirects `/landing-pages/hair-style` to it. Every repeated card (services, team, gallery, testimonials) is hardcoded HTML — no client-side data/render loop is needed since nothing is filtered or re-rendered at runtime.

**Tech Stack:** Plain HTML/CSS/vanilla JS, Next.js 16 App Router redirect route, TypeScript data array (`src/data/landing-pages.ts`).

**Source spec:** `docs/superpowers/specs/2026-09-15-hair-style-landing-design.md` — read it before Task 1 for full context/rationale.

**No automated test framework applies** — this is a static HTML asset outside the Next.js component tree. Verification is: (a) `pnpm build`/`pnpm lint` for the two TS/React files, (b) `curl` against the dev server checking specific markers exist in the served HTML, (c) manual browser checks called out per task.

Before Task 1, start the dev server once, in the background:

```bash
cd "D:/Workspace/Node/portfolio" && pnpm dev
```

It serves on `http://localhost:3000`.

---

## Task 1: Relocate source assets, download photos, update `.gitignore`

**Files:**
- Move: `hair style/Hair Style Landing.dc.html` → `public/landing-pages/hair-style/Hair Style Landing.dc.html`
- Move: `hair style/support.js` → `public/landing-pages/hair-style/support.js`
- Move: `hair style/uploads/*.png` (2 unreferenced files) → `public/landing-pages/hair-style/uploads/`
- Create: `public/landing-pages/hair-style/thumbnail.webp`
- Create: `public/landing-pages/hair-style/uploads/*.jpg` (14 downloaded Pexels photos)
- Modify: `.gitignore`

- [ ] **Step 1: Create the target directory and move the DC source artifacts**

```bash
mkdir -p "public/landing-pages/hair-style/uploads"
mv "hair style/Hair Style Landing.dc.html" "public/landing-pages/hair-style/Hair Style Landing.dc.html"
mv "hair style/support.js" "public/landing-pages/hair-style/support.js"
mv "hair style/uploads/pasted-1789313698410-0.png" "public/landing-pages/hair-style/uploads/pasted-1789313698410-0.png"
mv "hair style/uploads/pasted-1789313711990-0.png" "public/landing-pages/hair-style/uploads/pasted-1789313711990-0.png"
cp "hair style/.thumbnail" "public/landing-pages/hair-style/thumbnail.webp"
rmdir "hair style/uploads" 2>/dev/null; rm -rf "hair style"
```

- [ ] **Step 2: Download the 14 distinct Pexels photos locally**

```bash
cd "public/landing-pages/hair-style/uploads"
curl -sL "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1400" -o hero.jpg
curl -sL "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1600" -o cta-bg.jpg
curl -sL "https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=900" -o servico-corte.jpg
curl -sL "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=900" -o servico-coloracao.jpg
curl -sL "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=900" -o servico-mechas.jpg
curl -sL "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900" -o servico-tratamentos.jpg
curl -sL "https://images.pexels.com/photos/2811087/pexels-photo-2811087.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-camila.jpg
curl -sL "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-rafael.jpg
curl -sL "https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-leticia.jpg
curl -sL "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-bianca.jpg
curl -sL "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-thiago.jpg
curl -sL "https://images.pexels.com/photos/7755248/pexels-photo-7755248.jpeg?auto=compress&cs=tinysrgb&w=900" -o equipe-aline.jpg
curl -sL "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=700" -o galeria-penteado.jpg
curl -sL "https://images.pexels.com/photos/2703181/pexels-photo-2703181.jpeg?auto=compress&cs=tinysrgb&w=700" -o galeria-visual.jpg
cd "D:/Workspace/Node/portfolio"
```

Expected: 14 `.jpg` files land in `public/landing-pages/hair-style/uploads/`, each a valid non-empty JPEG (`file uploads/hero.jpg` reports `JPEG image data`).

- [ ] **Step 3: Verify the downloads**

```bash
ls -la "public/landing-pages/hair-style/uploads/"*.jpg | wc -l
```

Expected: `14`.

- [ ] **Step 4: Generalize `.gitignore`'s design-tool-source-artifact rules**

Replace the existing Rock-only block:

```
public/landing-pages/rock/Rock For You v2.dc.html
public/landing-pages/rock/support.js
public/landing-pages/rock/.thumbnail
```

with:

```
# Claude Design canvas source artifacts (superseded by each landing page's static index.html export)
public/landing-pages/*/*.dc.html
public/landing-pages/*/support.js
public/landing-pages/*/.thumbnail
public/landing-pages/*/image-slot.js
```

(Leave any other pre-existing lines in `.gitignore` — e.g. `.ds-sync`, `ds-bundle/*` — untouched.)

- [ ] **Step 5: Verify git now ignores the moved DC source files**

```bash
git status --short public/landing-pages/hair-style/
```

Expected: only `uploads/` (new photos + the 2 moved unreferenced PNGs) and `thumbnail.webp` show as untracked; `Hair Style Landing.dc.html` and `support.js` do NOT appear (ignored).

- [ ] **Step 6: Commit**

```bash
git add .gitignore "public/landing-pages/hair-style/uploads" "public/landing-pages/hair-style/thumbnail.webp"
git commit -m "chore(hair-style): relocate DC source assets, download photos locally, generalize .gitignore

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Logo asset + static page skeleton

**Files:**
- Create: `public/landing-pages/hair-style/logo.svg`
- Create: `public/landing-pages/hair-style/index.html`

- [ ] **Step 1: Create the wordmark logo**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <text x="4" y="34" font-family="Anton, Impact, sans-serif" font-size="30" letter-spacing="2" fill="#B24342">HAIR</text>
  <text x="86" y="46" font-family="Parisienne, cursive" font-size="24" fill="#A67C1F" transform="rotate(-9 100 40)">Style</text>
</svg>
```

- [ ] **Step 2: Create the document shell**

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Hair Style — salão de beleza em Vila Madalena</title>
<meta name="description" content="Hair Style: corte, coloração e tratamentos capilares em Vila Madalena, São Paulo. Agende com o especialista certo pelo WhatsApp." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap" rel="stylesheet" />
<style>
  :root {
    --hs-bg: #FBF8F5;
    --hs-text: #1C1412;
    --hs-accent: #B24342;
    --hs-accent-hover: #8E3231;
    --hs-gold: #C9A227;
    --hs-gold-dim: #A67C1F;
    --hs-gold-label: #8A6F14;
    --hs-panel: #F3EBE5;
    --hs-body-muted: #574742;
    --hs-body-mute2: #7A6660;
    --hs-nav-muted: #4A3C38;
    --hs-faint: #9A8681;
    --hs-font-display: 'Anton', Impact, sans-serif;
    --hs-font-serif: 'Cormorant Garamond', Georgia, serif;
    --hs-font-body: 'Jost', sans-serif;
    --hs-font-script: 'Parisienne', cursive;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--hs-bg); color: var(--hs-text); font-family: var(--hs-font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  a { color: var(--hs-accent); text-decoration: none; }
  a:hover { color: var(--hs-accent-hover); }
  img { max-width: 100%; display: block; }
  @keyframes hs-float-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  [data-reveal] { opacity: 0; }
  [data-reveal].is-visible { animation: hs-float-up 0.7s ease both; }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { opacity: 1 !important; animation: none !important; }
  }

  .hs-header { position: sticky; top: 0; z-index: 50; background: rgba(251,248,245,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(28,20,18,0.08); }
  .hs-header-inner { max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
  .hs-logo { position: relative; display: inline-block; padding-bottom: 7px; font-family: var(--hs-font-display); font-size: 34px; line-height: 1; letter-spacing: 0.12em; color: var(--hs-accent); }
  .hs-logo span.hs-top { display: block; margin-right: -0.12em; clip-path: inset(0 0 50% 0); }
  .hs-logo span.hs-bottom { position: absolute; left: 0; top: 7px; clip-path: inset(50% 0 0 0); }
  .hs-logo span.hs-script { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) rotate(-9deg); font-family: var(--hs-font-script); font-size: 26px; line-height: 1; color: var(--hs-gold-dim); white-space: nowrap; -webkit-text-stroke: 1.5px var(--hs-bg); paint-order: stroke fill; }
  .hs-nav { display: flex; align-items: center; gap: 30px; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hs-nav-muted); flex-wrap: wrap; }
  .hs-nav a { color: var(--hs-nav-muted); }
  .hs-btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--hs-accent); color: #fff; padding: 13px 22px; border-radius: 999px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; box-shadow: 0 8px 20px rgba(178,67,66,0.28); transition: background 0.2s ease; }
  .hs-btn-primary:hover { background: var(--hs-accent-hover); color: #fff; }
  .hs-btn-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--hs-gold); display: inline-block; }

  .hs-footer { background: var(--hs-bg); padding: 60px 24px 40px; }
  .hs-footer-inner { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; align-items: start; }
  .hs-footer-desc { margin: 0; font-size: 14px; line-height: 1.65; color: var(--hs-body-mute2); max-width: 260px; }
  .hs-footer-label { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--hs-gold-label); margin-bottom: 14px; }
  .hs-footer-text { font-size: 14px; line-height: 1.9; color: var(--hs-body-muted); }
  .hs-footer-bottom { max-width: 1240px; margin: 44px auto 0; padding-top: 22px; border-top: 1px solid rgba(28,20,18,0.1); display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--hs-faint); }

  .hs-fab { position: fixed; right: 22px; bottom: 22px; z-index: 60; display: inline-flex; align-items: center; gap: 10px; background: var(--hs-accent); color: #fff; padding: 16px 24px; border-radius: 999px; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 14px 34px rgba(178,67,66,0.4); transition: background 0.2s ease; }
  .hs-fab:hover { background: var(--hs-accent-hover); color: #fff; }

  /* HS:STYLES:INSERT */
</style>
</head>
<body>

<header class="hs-header">
  <div class="hs-header-inner">
    <a href="#top" class="hs-logo" aria-label="Hair Style">
      <span class="hs-top">HAIR</span>
      <span class="hs-bottom">HAIR</span>
      <span class="hs-script">Style</span>
    </a>
    <nav class="hs-nav">
      <a href="#servicos">Serviços</a>
      <a href="#equipe">Equipe</a>
      <a href="#galeria">Galeria</a>
      <a href="#depoimentos">Depoimentos</a>
    </nav>
    <a href="#" id="hs-header-wa" class="hs-btn-primary" target="_blank" rel="noopener">
      <span class="hs-btn-dot"></span>
      Agendar no WhatsApp
    </a>
  </div>
</header>

<main>
  <!-- HS:SECTIONS:INSERT -->
</main>

<footer class="hs-footer">
  <div class="hs-footer-inner">
    <div>
      <a href="#top" class="hs-logo" style="font-size: 40px; margin-bottom: 18px;" aria-label="Hair Style">
        <span class="hs-top">HAIR</span>
        <span class="hs-bottom" style="top: 8px;">HAIR</span>
        <span class="hs-script" style="font-size: 31px;">Style</span>
      </a>
      <p class="hs-footer-desc">Salão de beleza especializado em cor, corte e cuidado do fio.</p>
    </div>
    <div>
      <div class="hs-footer-label">Horário</div>
      <div class="hs-footer-text">Seg a sex · 09h – 20h<br />Sábado · 09h – 18h<br />Domingo · fechado</div>
    </div>
    <div>
      <div class="hs-footer-label">Contato</div>
      <div class="hs-footer-text">(11) 99999-0000<br />Rua das Palmeiras, 148<br />Vila Madalena, SP</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
      <div class="hs-footer-label" style="margin-bottom: 0;">Agendamento</div>
      <a href="#" id="hs-footer-wa" class="hs-btn-primary" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
  <div class="hs-footer-bottom">
    <span>© 2026 Hair Style</span>
    <span>Salão fictício · projeto de demonstração</span>
  </div>
</footer>

<a href="#" id="hs-fab-wa" class="hs-fab" target="_blank" rel="noopener">
  <span class="hs-btn-dot"></span>
  Agendar
</a>

<script>
  const WA_NUMBER = '5511999990000';
  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }
  const WA_HERO = waLink('Olá! Vim pelo site e gostaria de agendar um horário.');
  const WA_FINAL = waLink('Olá! Gostaria de verificar os horários disponíveis desta semana.');
  document.getElementById('hs-header-wa').href = WA_HERO;
  document.getElementById('hs-footer-wa').href = WA_FINAL;
  document.getElementById('hs-fab-wa').href = WA_FINAL;

  // HS:SCRIPT:INSERT
</script>
</body>
</html>
```

- [ ] **Step 3: Verify**

```bash
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'HS:SECTIONS:INSERT'
```

Expected: title tag prints; second command prints `1`.

**Manual check:** header shows the split "HAIR"/"Style" wordmark, nav links, red WhatsApp button; footer mirrors the same content; a floating "Agendar" button sits bottom-right. Both WhatsApp links/buttons open `wa.me/5511999990000` with the right pre-filled text.

- [ ] **Step 4: Commit**

```bash
git add "public/landing-pages/hair-style/logo.svg" "public/landing-pages/hair-style/index.html"
git commit -m "feat(hair-style): add logo asset and static page skeleton

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Hero section + services marquee

**Files:**
- Modify: `public/landing-pages/hair-style/index.html`

- [ ] **Step 1: Add hero + marquee CSS**

Replace `  /* HS:STYLES:INSERT */` with:

```css
  .hs-hero { position: relative; min-height: 640px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: stretch; background: var(--hs-panel); }
  .hs-hero-copy { display: flex; flex-direction: column; justify-content: center; gap: 26px; padding: 84px 48px; max-width: 680px; margin-left: auto; width: 100%; }
  .hs-hero-kicker { display: flex; align-items: center; gap: 12px; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--hs-accent); }
  .hs-hero-kicker-line { width: 34px; height: 1px; background: var(--hs-gold); }
  .hs-hero-title { margin: 0; font-family: var(--hs-font-serif); font-size: clamp(46px, 6vw, 82px); line-height: 0.98; font-weight: 600; color: var(--hs-text); }
  .hs-hero-title em { font-style: italic; color: var(--hs-accent); }
  .hs-hero-desc { margin: 0; font-size: 17px; line-height: 1.65; color: var(--hs-body-muted); max-width: 460px; }
  .hs-hero-ctas { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
  .hs-btn-primary-lg { display: inline-flex; align-items: center; gap: 12px; background: var(--hs-accent); color: #fff; padding: 19px 34px; border-radius: 999px; font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; box-shadow: 0 14px 34px rgba(178,67,66,0.32); transition: background 0.25s ease, transform 0.25s ease; }
  .hs-btn-primary-lg:hover { background: var(--hs-accent-hover); color: #fff; transform: translateY(-2px); }
  .hs-btn-outline { display: inline-flex; align-items: center; gap: 10px; color: var(--hs-text); padding: 19px 28px; border-radius: 999px; border: 1px solid rgba(28,20,18,0.18); font-size: 14px; letter-spacing: 0.1em; text-transform: uppercase; transition: border-color 0.2s ease, color 0.2s ease; }
  .hs-btn-outline:hover { border-color: var(--hs-gold); color: var(--hs-accent); }
  .hs-hero-stats { display: flex; flex-wrap: wrap; gap: 34px; padding-top: 14px; border-top: 1px solid rgba(28,20,18,0.1); }
  .hs-stat-num { font-family: var(--hs-font-serif); font-size: 34px; color: var(--hs-accent); line-height: 1; }
  .hs-stat-label { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--hs-body-mute2); margin-top: 6px; }
  .hs-hero-photo { position: relative; min-height: 520px; background-image: url('uploads/hero.jpg'); background-size: cover; background-position: center 35%; }
  .hs-hero-photo-fade { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(243,235,229,0.9) 0%, rgba(243,235,229,0) 22%); }
  .hs-hero-badge { position: absolute; left: 32px; bottom: 32px; background: rgba(251,248,245,0.94); border-radius: 18px; padding: 18px 22px; display: flex; align-items: center; gap: 14px; box-shadow: 0 18px 40px rgba(28,20,18,0.18); }
  .hs-hero-badge-icon { width: 42px; height: 42px; border-radius: 50%; background: var(--hs-accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .hs-hero-badge-title { font-size: 14px; font-weight: 500; color: var(--hs-text); }
  .hs-hero-badge-sub { font-size: 13px; color: var(--hs-body-mute2); }

  .hs-marquee { background: var(--hs-accent); color: var(--hs-bg); padding: 20px 24px; }
  .hs-marquee-inner { max-width: 1240px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 48px; font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--hs-bg); }
  .hs-marquee-inner span.hs-sep { opacity: 0.4; }

  .hs-section { max-width: 1240px; margin: 0 auto; padding: 96px 24px; }
  .hs-section-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 46px; }
  .hs-eyebrow { font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--hs-accent); margin-bottom: 14px; }
  .hs-h2 { margin: 0; font-family: var(--hs-font-serif); font-size: clamp(36px, 4.4vw, 58px); font-weight: 600; line-height: 1.05; color: var(--hs-text); }
  .hs-section-lead { margin: 0; max-width: 340px; font-size: 16px; line-height: 1.65; color: var(--hs-body-muted); }

  .hs-servicos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; }
  .hs-card { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(28,20,18,0.07); display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .hs-card:hover { transform: translateY(-4px); box-shadow: 0 20px 42px rgba(28,20,18,0.12); }
  .hs-card-img { height: 230px; overflow: hidden; background: #E8DDD5; }
  .hs-card-img img { width: 100%; height: 100%; object-fit: cover; }
  .hs-card-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .hs-card-title { margin: 0; font-family: var(--hs-font-serif); font-size: 27px; font-weight: 600; color: var(--hs-text); }
  .hs-card-desc { margin: 0; font-size: 15px; line-height: 1.6; color: var(--hs-body-mute2); flex: 1; }
  .hs-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: nowrap; padding-top: 14px; border-top: 1px solid rgba(28,20,18,0.08); }
  .hs-card-price { font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--hs-gold-label); white-space: nowrap; }
  .hs-card-link { font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--hs-accent); white-space: nowrap; }

  /* HS:STYLES:INSERT */
```

- [ ] **Step 2: Add hero + marquee + servicos HTML**

Replace `  <!-- HS:SECTIONS:INSERT -->` with:

```html
  <section id="top" class="hs-hero">
    <div class="hs-hero-copy">
      <div data-reveal class="hs-hero-kicker">
        <span class="hs-hero-kicker-line"></span>
        Salão de beleza · Vila Madalena
      </div>
      <h1 data-reveal class="hs-hero-title">Seu cabelo do jeito<br />que você sempre<br /><em>imaginou.</em></h1>
      <p data-reveal class="hs-hero-desc">Corte, coloração e tratamento com profissionais especialistas. Agenda organizada, horário garantido e diagnóstico personalizado antes de qualquer serviço.</p>
      <div data-reveal class="hs-hero-ctas">
        <a href="#" id="hs-hero-wa" class="hs-btn-primary-lg" target="_blank" rel="noopener">Agendar meu horário <span style="font-size: 17px;">→</span></a>
        <a href="#equipe" class="hs-btn-outline">Ver horários da equipe</a>
      </div>
      <div data-reveal class="hs-hero-stats">
        <div><div class="hs-stat-num">12 anos</div><div class="hs-stat-label">no bairro</div></div>
        <div><div class="hs-stat-num">4.9 ★</div><div class="hs-stat-label">+800 avaliações</div></div>
        <div><div class="hs-stat-num">6</div><div class="hs-stat-label">especialistas</div></div>
      </div>
    </div>
    <div class="hs-hero-photo">
      <div class="hs-hero-photo-fade"></div>
      <div class="hs-hero-badge">
        <div class="hs-hero-badge-icon">✓</div>
        <div>
          <div class="hs-hero-badge-title">Resposta em até 5 minutos</div>
          <div class="hs-hero-badge-sub">Atendimento pelo WhatsApp, seg a sáb</div>
        </div>
      </div>
    </div>
  </section>

  <div class="hs-marquee">
    <div class="hs-marquee-inner">
      <span>Coloração</span><span class="hs-sep">·</span>
      <span>Mechas &amp; Loiros</span><span class="hs-sep">·</span>
      <span>Corte feminino e masculino</span><span class="hs-sep">·</span>
      <span>Tratamentos</span><span class="hs-sep">·</span>
      <span>Penteados</span>
    </div>
  </div>

  <section id="servicos" class="hs-section">
    <div data-reveal class="hs-section-head">
      <div>
        <div class="hs-eyebrow">Nossos serviços</div>
        <h2 class="hs-h2">Tudo o que seu cabelo<br />precisa, em um só lugar</h2>
      </div>
      <p class="hs-section-lead">Cada serviço começa com uma avaliação do fio. Você recebe o orçamento fechado antes de iniciar.</p>
    </div>
    <div class="hs-servicos-grid">
      <article data-reveal class="hs-card">
        <div class="hs-card-img"><img src="uploads/servico-corte.jpg" alt="" loading="lazy" /></div>
        <div class="hs-card-body">
          <h3 class="hs-card-title">Corte & Finalização</h3>
          <p class="hs-card-desc">Corte desenhado para o seu formato de rosto, com finalização e orientação de manutenção em casa.</p>
          <div class="hs-card-foot"><span class="hs-card-price">Desde R$ 120</span><a href="#" class="hs-card-link hs-wa-servico" data-msg="Olá! Gostaria de agendar: Corte & Finalização.">Agendar →</a></div>
        </div>
      </article>
      <article data-reveal class="hs-card">
        <div class="hs-card-img"><img src="uploads/servico-coloracao.jpg" alt="" loading="lazy" /></div>
        <div class="hs-card-body">
          <h3 class="hs-card-title">Coloração</h3>
          <p class="hs-card-desc">Cobertura de brancos, mudança de tom e retoque de raiz com produtos de baixa agressão ao fio.</p>
          <div class="hs-card-foot"><span class="hs-card-price">Desde R$ 210</span><a href="#" class="hs-card-link hs-wa-servico" data-msg="Olá! Gostaria de agendar: Coloração.">Agendar →</a></div>
        </div>
      </article>
      <article data-reveal class="hs-card">
        <div class="hs-card-img"><img src="uploads/servico-mechas.jpg" alt="" loading="lazy" /></div>
        <div class="hs-card-body">
          <h3 class="hs-card-title">Mechas & Loiros</h3>
          <p class="hs-card-desc">Balayage, luzes e morena iluminada com matização inclusa na sessão.</p>
          <div class="hs-card-foot"><span class="hs-card-price">Desde R$ 390</span><a href="#" class="hs-card-link hs-wa-servico" data-msg="Olá! Gostaria de agendar: Mechas & Loiros.">Agendar →</a></div>
        </div>
      </article>
      <article data-reveal class="hs-card">
        <div class="hs-card-img"><img src="uploads/servico-tratamentos.jpg" alt="" loading="lazy" /></div>
        <div class="hs-card-body">
          <h3 class="hs-card-title">Tratamentos</h3>
          <p class="hs-card-desc">Reconstrução, hidratação e selagem para cabelos com química ou pontas ressecadas.</p>
          <div class="hs-card-foot"><span class="hs-card-price">Desde R$ 150</span><a href="#" class="hs-card-link hs-wa-servico" data-msg="Olá! Gostaria de agendar: Tratamentos.">Agendar →</a></div>
        </div>
      </article>
    </div>
  </section>

  <!-- HS:SECTIONS:INSERT -->
```

- [ ] **Step 3: Wire hero WA link + per-service WA links**

Replace `  // HS:SCRIPT:INSERT` with:

```js
  document.getElementById('hs-hero-wa').href = WA_HERO;
  document.querySelectorAll('.hs-wa-servico').forEach((el) => {
    el.href = waLink(el.dataset.msg);
  });

  // HS:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'hs-servicos-grid'
```

Expected: `1`.

**Manual check:** hero shows headline/description/stats/photo with badge; marquee band scrolls behind (static band, no animation needed); 4 service cards show photo/name/description/price, each "Agendar →" opens WhatsApp with that service's name pre-filled.

- [ ] **Step 5: Commit**

```bash
git add "public/landing-pages/hair-style/index.html"
git commit -m "feat(hair-style): add hero, marquee and servicos sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 4: Equipe section (6 team cards with weekly schedules)

**Files:**
- Modify: `public/landing-pages/hair-style/index.html`

- [ ] **Step 1: Add equipe CSS**

Replace `  /* HS:STYLES:INSERT */` with:

```css
  .hs-equipe { background: var(--hs-panel); padding: 96px 24px; }
  .hs-equipe-inner { max-width: 1240px; margin: 0 auto; }
  .hs-equipe-head { text-align: center; max-width: 620px; margin: 0 auto 50px; }
  .hs-equipe-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 22px; }
  .hs-team-card { background: #fff; border-radius: 22px; overflow: hidden; border: 1px solid rgba(28,20,18,0.07); display: flex; flex-direction: column; }
  .hs-team-photo { position: relative; height: 290px; overflow: hidden; background: #E8DDD5; }
  .hs-team-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }
  .hs-team-badge { position: absolute; left: 16px; top: 16px; background: rgba(251,248,245,0.95); color: var(--hs-accent); padding: 7px 14px; border-radius: 999px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
  .hs-team-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; flex: 1; }
  .hs-team-name { margin: 0 0 4px; font-family: var(--hs-font-serif); font-size: 28px; font-weight: 600; color: var(--hs-text); }
  .hs-team-bio { margin: 0; font-size: 14px; line-height: 1.55; color: var(--hs-body-mute2); }
  .hs-team-agenda-label { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--hs-gold-label); margin-bottom: 12px; }
  .hs-team-agenda { display: flex; flex-direction: column; gap: 7px; }
  .hs-team-agenda-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--hs-bg); border-radius: 10px; padding: 9px 14px; }
  .hs-team-agenda-day { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--hs-text); font-weight: 500; }
  .hs-team-agenda-hours { font-size: 14px; color: var(--hs-body-muted); font-variant-numeric: tabular-nums; }
  .hs-team-folga { margin-top: 10px; font-size: 12px; color: var(--hs-faint); }
  .hs-team-cta { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--hs-text); color: #fff; padding: 15px 20px; border-radius: 999px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; transition: background 0.2s ease; }
  .hs-team-cta:hover { background: var(--hs-accent); color: #fff; }

  /* HS:STYLES:INSERT */
```

- [ ] **Step 2: Add equipe HTML**

Replace `  <!-- HS:SECTIONS:INSERT -->` with (each card's schedule and bio copied verbatim from the source):

```html
  <section id="equipe" class="hs-equipe">
    <div class="hs-equipe-inner">
      <div data-reveal class="hs-equipe-head">
        <div class="hs-eyebrow">A equipe</div>
        <h2 class="hs-h2" style="margin-bottom: 16px;">Escolha o profissional<br />e o melhor horário</h2>
        <p class="hs-section-lead" style="margin: 0 auto; max-width: none;">Confira os dias e horários de cada especialista. É só chamar no WhatsApp com o nome de quem você quer.</p>
      </div>
      <div class="hs-equipe-grid">
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-camila.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Colorista</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Camila Duarte</h3><p class="hs-team-bio">Especialista em loiros e correção de cor. 9 anos de bancada.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Seg</span><span class="hs-team-agenda-hours">09h – 18h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Ter</span><span class="hs-team-agenda-hours">09h – 18h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qui</span><span class="hs-team-agenda-hours">13h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sáb</span><span class="hs-team-agenda-hours">09h – 16h</span></div>
              </div>
              <div class="hs-team-folga">Folga: quarta, sexta e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Camila Duarte." target="_blank" rel="noopener">Agendar com Camila</a>
          </div>
        </article>
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-rafael.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Cortes</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Rafael Monteiro</h3><p class="hs-team-bio">Cortes femininos e masculinos, barba e repicados estruturados.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Ter</span><span class="hs-team-agenda-hours">10h – 19h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qua</span><span class="hs-team-agenda-hours">10h – 19h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qui</span><span class="hs-team-agenda-hours">10h – 19h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sex</span><span class="hs-team-agenda-hours">12h – 20h</span></div>
              </div>
              <div class="hs-team-folga">Folga: segunda, sábado e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Rafael Monteiro." target="_blank" rel="noopener">Agendar com Rafael</a>
          </div>
        </article>
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-leticia.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Tratamentos</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Letícia Prado</h3><p class="hs-team-bio">Reconstrução capilar e cuidado de cabelos com química.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Seg</span><span class="hs-team-agenda-hours">09h – 13h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qua</span><span class="hs-team-agenda-hours">09h – 18h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sex</span><span class="hs-team-agenda-hours">09h – 18h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sáb</span><span class="hs-team-agenda-hours">09h – 15h</span></div>
              </div>
              <div class="hs-team-folga">Folga: terça, quinta e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Letícia Prado." target="_blank" rel="noopener">Agendar com Letícia</a>
          </div>
        </article>
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-bianca.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Penteados</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Bianca Rocha</h3><p class="hs-team-bio">Penteados de festa, noivas e maquiagem social.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qua</span><span class="hs-team-agenda-hours">13h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qui</span><span class="hs-team-agenda-hours">13h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sex</span><span class="hs-team-agenda-hours">10h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sáb</span><span class="hs-team-agenda-hours">08h – 18h</span></div>
              </div>
              <div class="hs-team-folga">Folga: segunda, terça e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Bianca Rocha." target="_blank" rel="noopener">Agendar com Bianca</a>
          </div>
        </article>
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-thiago.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Barbearia</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Thiago Alves</h3><p class="hs-team-bio">Corte masculino na máquina e navalha, barba e pigmentação.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Seg</span><span class="hs-team-agenda-hours">11h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Ter</span><span class="hs-team-agenda-hours">11h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qui</span><span class="hs-team-agenda-hours">11h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sáb</span><span class="hs-team-agenda-hours">09h – 17h</span></div>
              </div>
              <div class="hs-team-folga">Folga: quarta, sexta e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Thiago Alves." target="_blank" rel="noopener">Agendar com Thiago</a>
          </div>
        </article>
        <article data-reveal class="hs-team-card">
          <div class="hs-team-photo"><img src="uploads/equipe-aline.jpg" alt="" loading="lazy" /><span class="hs-team-badge">Alisamentos</span></div>
          <div class="hs-team-body">
            <div><h3 class="hs-team-name">Aline Ferraz</h3><p class="hs-team-bio">Progressiva sem formol, botox capilar e escova definitiva.</p></div>
            <div>
              <div class="hs-team-agenda-label">Agenda da semana</div>
              <div class="hs-team-agenda">
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Ter</span><span class="hs-team-agenda-hours">09h – 16h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Qua</span><span class="hs-team-agenda-hours">09h – 16h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sex</span><span class="hs-team-agenda-hours">13h – 20h</span></div>
                <div class="hs-team-agenda-row"><span class="hs-team-agenda-day">Sáb</span><span class="hs-team-agenda-hours">10h – 16h</span></div>
              </div>
              <div class="hs-team-folga">Folga: segunda, quinta e domingo</div>
            </div>
            <a href="#" class="hs-team-cta hs-wa-equipe" data-msg="Olá! Gostaria de agendar um horário com Aline Ferraz." target="_blank" rel="noopener">Agendar com Aline</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- HS:SECTIONS:INSERT -->
```

- [ ] **Step 3: Wire equipe WA links**

Replace `  // HS:SCRIPT:INSERT` with:

```js
  document.querySelectorAll('.hs-wa-equipe').forEach((el) => {
    el.href = waLink(el.dataset.msg);
  });

  // HS:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'Camila Duarte'
```

Expected: `1` or more.

**Manual check:** 6 team cards show photo/specialty badge/name/bio/4-row schedule/folga note; each "Agendar com <Nome>" opens WhatsApp pre-filled with that person's name.

- [ ] **Step 5: Commit**

```bash
git add "public/landing-pages/hair-style/index.html"
git commit -m "feat(hair-style): add equipe section with weekly schedules

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 5: Galeria + Depoimentos sections

**Files:**
- Modify: `public/landing-pages/hair-style/index.html`

- [ ] **Step 1: Add galeria + depoimentos CSS**

Replace `  /* HS:STYLES:INSERT */` with:

```css
  .hs-galeria-head { margin-bottom: 40px; }
  .hs-galeria-link { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hs-accent); }
  .hs-galeria-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
  .hs-galeria-item { position: relative; aspect-ratio: 3/4; border-radius: 16px; overflow: hidden; background: #E8DDD5; }
  .hs-galeria-item img { width: 100%; height: 100%; object-fit: cover; }
  .hs-galeria-label { position: absolute; left: 12px; bottom: 12px; background: rgba(251,248,245,0.94); padding: 6px 13px; border-radius: 999px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--hs-text); }

  .hs-depoimentos { background: var(--hs-text); color: var(--hs-panel); padding: 92px 24px; }
  .hs-depoimentos-inner { max-width: 1240px; margin: 0 auto; }
  .hs-depoimentos-eyebrow { font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--hs-gold); margin-bottom: 40px; }
  .hs-depoimentos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; }
  .hs-depoimento { margin: 0; background: rgba(243,235,229,0.06); border: 1px solid rgba(201,162,39,0.24); border-radius: 20px; padding: 30px; }
  .hs-depoimento-stars { color: var(--hs-gold); font-size: 15px; letter-spacing: 0.2em; margin-bottom: 16px; }
  .hs-depoimento-quote { margin: 0 0 22px; font-family: var(--hs-font-serif); font-size: 22px; line-height: 1.45; font-style: italic; color: var(--hs-panel); }
  .hs-depoimento-author { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #B8A49E; }

  /* HS:STYLES:INSERT */
```

- [ ] **Step 2: Add galeria + depoimentos HTML**

Replace `  <!-- HS:SECTIONS:INSERT -->` with:

```html
  <section id="galeria" class="hs-section">
    <div data-reveal class="hs-section-head hs-galeria-head">
      <h2 class="hs-h2">Trabalhos <em style="font-style: italic; color: var(--hs-accent);">recentes</em></h2>
      <a href="#" id="hs-galeria-wa" class="hs-galeria-link" target="_blank" rel="noopener">Quero um resultado assim →</a>
    </div>
    <div class="hs-galeria-grid">
      <div data-reveal class="hs-galeria-item"><img src="uploads/servico-mechas.jpg" alt="" loading="lazy" /><span class="hs-galeria-label">Balayage</span></div>
      <div data-reveal class="hs-galeria-item"><img src="uploads/galeria-penteado.jpg" alt="" loading="lazy" /><span class="hs-galeria-label">Penteado de festa</span></div>
      <div data-reveal class="hs-galeria-item"><img src="uploads/galeria-visual.jpg" alt="" loading="lazy" /><span class="hs-galeria-label">Mudança de visual</span></div>
      <div data-reveal class="hs-galeria-item"><img src="uploads/servico-corte.jpg" alt="" loading="lazy" /><span class="hs-galeria-label">Corte & escova</span></div>
    </div>
  </section>

  <section id="depoimentos" class="hs-depoimentos">
    <div class="hs-depoimentos-inner">
      <div class="hs-depoimentos-eyebrow">Quem já passou por aqui</div>
      <div class="hs-depoimentos-grid">
        <blockquote data-reveal class="hs-depoimento">
          <div class="hs-depoimento-stars">★★★★★</div>
          <p class="hs-depoimento-quote">Fui com o cabelo cheio de manchas de coloração caseira e saí com o loiro que eu queria há dois anos.</p>
          <footer class="hs-depoimento-author">Marina S. · cliente desde 2023</footer>
        </blockquote>
        <blockquote data-reveal class="hs-depoimento">
          <div class="hs-depoimento-stars">★★★★★</div>
          <p class="hs-depoimento-quote">Agendei pelo WhatsApp num domingo e já saí com horário confirmado para a terça. Nunca esperei mais de 5 minutos na recepção.</p>
          <footer class="hs-depoimento-author">Priscila A.</footer>
        </blockquote>
        <blockquote data-reveal class="hs-depoimento">
          <div class="hs-depoimento-stars">★★★★★</div>
          <p class="hs-depoimento-quote">Melhor corte masculino da região. O Thiago entende exatamente o que eu peço e ainda ensina como manter.</p>
          <footer class="hs-depoimento-author">Eduardo M.</footer>
        </blockquote>
      </div>
    </div>
  </section>

  <!-- HS:SECTIONS:INSERT -->
```

- [ ] **Step 3: Wire galeria WA link**

Replace `  // HS:SCRIPT:INSERT` with:

```js
  document.getElementById('hs-galeria-wa').href = waLink('Olá! Vi os trabalhos no site e queria um resultado parecido. Podem me ajudar?');

  // HS:SCRIPT:INSERT
```

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'hs-depoimentos-grid'
```

Expected: `1`.

**Manual check:** galeria shows 4 labeled photos; depoimentos shows 3 dark testimonial cards with stars/quote/author.

- [ ] **Step 5: Commit**

```bash
git add "public/landing-pages/hair-style/index.html"
git commit -m "feat(hair-style): add galeria and depoimentos sections

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 6: Final CTA section + scroll reveals

**Files:**
- Modify: `public/landing-pages/hair-style/index.html`

- [ ] **Step 1: Add final CTA CSS**

Replace `  /* HS:STYLES:INSERT */` with:

```css
  .hs-cta-final { position: relative; padding: 110px 24px; background-image: linear-gradient(rgba(28,20,18,0.55), rgba(28,20,18,0.55)), url('uploads/cta-bg.jpg'); background-size: cover; background-position: center; text-align: center; color: #fff; }
  .hs-cta-final-inner { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .hs-cta-eyebrow { font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--hs-gold); }
  .hs-cta-title { margin: 0; font-family: var(--hs-font-serif); font-size: clamp(38px, 5vw, 64px); font-weight: 600; line-height: 1.05; }
  .hs-cta-desc { margin: 0; font-size: 17px; line-height: 1.6; color: rgba(255,255,255,0.88); max-width: 520px; }
  .hs-btn-cta-final { display: inline-flex; align-items: center; gap: 12px; background: var(--hs-accent); color: #fff; padding: 21px 42px; border-radius: 999px; font-size: 15px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; box-shadow: 0 16px 40px rgba(0,0,0,0.35); transition: background 0.25s ease, color 0.25s ease; }
  .hs-btn-cta-final:hover { background: var(--hs-gold); color: var(--hs-text); }
  .hs-cta-addr { font-size: 13px; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); }

  /* HS:STYLES:INSERT */
```

- [ ] **Step 2: Add final CTA HTML**

Replace `  <!-- HS:SECTIONS:INSERT -->` with:

```html
  <section class="hs-cta-final">
    <div data-reveal class="hs-cta-final-inner">
      <div class="hs-cta-eyebrow">Agenda aberta desta semana</div>
      <h2 class="hs-cta-title">Chame no WhatsApp e<br />garanta seu horário</h2>
      <p class="hs-cta-desc">Diga o serviço, o profissional e o melhor dia. A gente confirma na hora e envia um lembrete um dia antes.</p>
      <a href="#" id="hs-cta-final-wa" class="hs-btn-cta-final" target="_blank" rel="noopener">Falar com o salão agora <span style="font-size: 18px;">→</span></a>
      <div class="hs-cta-addr">Rua das Palmeiras, 148 · Vila Madalena, São Paulo</div>
    </div>
  </section>

  <!-- HS:SECTIONS:INSERT -->
```

- [ ] **Step 3: Wire final CTA WA link + scroll reveals**

Replace `  // HS:SCRIPT:INSERT` with:

```js
  document.getElementById('hs-cta-final-wa').href = WA_FINAL;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add('is-visible');
    } else {
      revealObserver.observe(el);
    }
  });
```

(No trailing `// HS:SCRIPT:INSERT` marker this time — this is the last script-insertion task.)

- [ ] **Step 4: Verify**

```bash
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'IntersectionObserver'
curl -s http://localhost:3000/landing-pages/hair-style/index.html | grep -c 'HS:STYLES:INSERT\|HS:SECTIONS:INSERT\|HS:SCRIPT:INSERT'
```

Expected: first prints `1`; second prints `0` (no leftover markers — every insertion point has been consumed).

**Manual check:** final CTA shows headline/description/WhatsApp button/address over the background photo. Scrolling down the whole page reveals each section's content fading/sliding up the first time it enters the viewport (hero content is visible immediately on load, not gated behind scroll). Toggling `prefers-reduced-motion` shows everything immediately with no animation. No broken images anywhere (check the Network tab).

- [ ] **Step 5: Commit**

```bash
git add "public/landing-pages/hair-style/index.html"
git commit -m "feat(hair-style): add final CTA section and scroll reveals

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 7: Route integration + landing-pages data entry

**Files:**
- Create: `src/app/landing-pages/hair-style/page.tsx`
- Modify: `src/data/landing-pages.ts`

- [ ] **Step 1: Create the redirect route**

```tsx
import { redirect } from 'next/navigation';

export default function HairStylePage() {
  redirect('/landing-pages/hair-style/index.html');
}
```

- [ ] **Step 2: Add the data entry**

Append to the `landingPages` array in `src/data/landing-pages.ts` (after the `rock` entry):

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

- [ ] **Step 3: Verify**

```bash
curl -sI http://localhost:3000/landing-pages/hair-style | grep -i location
curl -s http://localhost:3000/landing-pages | grep -c 'Hair Style'
```

Expected: first shows a redirect `Location` header pointing at `/landing-pages/hair-style/index.html`; second prints `1` or more.

**Manual check:** `/landing-pages` shows the new Hair Style card (thumbnail, logo overlay, description) and clicking it navigates through to the static page.

- [ ] **Step 4: Commit**

```bash
git add "src/app/landing-pages/hair-style/page.tsx" "src/data/landing-pages.ts"
git commit -m "feat(hair-style): wire Hair Style landing page into the site

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 8: Final verification

- [ ] **Step 1: Build and lint**

```bash
pnpm build
pnpm lint
```

Expected: both exit 0 with no errors.

- [ ] **Step 2: Full manual pass**

Revisit every "Manual check" from Tasks 1–7 in one pass on the running dev server, plus:
- Resize to mobile width (~375px): all grids collapse to one column, header nav wraps sensibly,
  floating WhatsApp button doesn't overlap footer content.
- Confirm no requests to `images.pexels.com` occur when loading the page (all photos are local).
