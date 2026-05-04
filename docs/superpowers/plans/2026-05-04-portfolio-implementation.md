# Portfolio Kayk Mascarenhas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the HTML/CSS/JSX design handoff into a Next.js 16 portfolio with reusable components, react-icons, dark/light theme, and full documentation.

**Architecture:** Single-page App Router portfolio. Server components for static sections; `'use client'` for interactive ones (Navbar, Terminal, Projects modal, Contact form, Share modal). CSS custom properties on `<html data-theme>` for theming. All icons via `react-icons` — no inline SVGs.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript 5, Tailwind v4, pnpm, react-icons, html-to-image

---

## File Structure

```
src/
  app/
    layout.tsx                  — fonts (Space Grotesk + Fira Code), metadata, no-flash script
    page.tsx                    — page assembly (server component)
    globals.css                 — CSS variables + all component styles from design
  components/
    providers/
      ThemeProvider.tsx         — dark/light context + localStorage persistence
    ui/
      Button.tsx                — btn / btn-primary / btn-ghost variants
      SectionLabel.tsx          — section-label with // prefix decoration
    layout/
      Navbar.tsx                — sticky nav, theme toggle, mobile menu
      Footer.tsx                — footer grid + share button trigger
    sections/
      Hero.tsx                  — hero content + Terminal
      About.tsx                 — avatar, text, stats grid
      Stack.tsx                 — 6-item tech grid with react-icons/si
      Projects.tsx              — projects grid, holds modal open state
      Contact.tsx               — contact form + code snippet
    terminal/
      Terminal.tsx              — animated typewriter + preview carousel
      TerminalPreviews.tsx      — PreviewP2A / PreviewOmnigen / PreviewSodden
    projects/
      ProjectCard.tsx           — card with thumbnail + on-hover top bar
      ProjectModal.tsx          — detail modal with carousel + keyboard nav
      SlidePreview.tsx          — FakeHero / FakeFeatures / … fake screenshots
    share/
      ShareModal.tsx            — share modal wrapper
      BusinessCard.tsx          — downloadable business card UI
  lib/
    types.ts                    — Project interface
    constants.ts                — SITE_URL, SHARE_TEXT, contact info
  data/
    projects.ts                 — PROJECTS array
    stack.ts                    — STACK array
README.md
CLAUDE.md
DESIGN.md
```

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install react-icons and html-to-image**

```bash
pnpm add react-icons html-to-image
```

- [ ] **Step 2: Verify install**

```bash
pnpm list react-icons html-to-image
```

Expected: both packages listed with versions.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add react-icons and html-to-image"
```

---

### Task 2: Global CSS, fonts, and layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css with design CSS**

Full file content — replaces existing content entirely:

```css
@import "tailwindcss";

:root {
  --bg: #0a0710;
  --bg-2: #0f0b18;
  --panel: #13101c;
  --panel-2: #1a1628;
  --border: #2a2340;
  --border-strong: #3d3358;
  --text: #e8e4f0;
  --text-dim: #9890b0;
  --text-muted: #6b6486;
  --accent: oklch(0.72 0.22 60);
  --accent-soft: oklch(0.72 0.22 60 / 0.15);
  --accent-glow: oklch(0.72 0.22 60 / 0.4);
  --accent-2: oklch(0.78 0.18 85);
  --danger: oklch(0.7 0.2 25);
  --warn: oklch(0.82 0.17 85);
  --grid: rgba(220, 180, 60, 0.05);
  --shadow: 0 20px 60px rgba(0,0,0,0.5);
}

[data-theme="light"] {
  --bg: #f5f3fa;
  --bg-2: #ebe7f3;
  --panel: #ffffff;
  --panel-2: #f8f6fc;
  --border: #ddd5ec;
  --border-strong: #b8aed4;
  --text: #1a1428;
  --text-dim: #4a4360;
  --text-muted: #7c7595;
  --accent: oklch(0.55 0.22 60);
  --accent-soft: oklch(0.55 0.22 60 / 0.1);
  --accent-glow: oklch(0.55 0.22 60 / 0.25);
  --accent-2: oklch(0.6 0.2 85);
  --grid: rgba(180, 140, 20, 0.04);
  --shadow: 0 20px 60px rgba(80, 40, 160, 0.12);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-space-grotesk), system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 48px 48px;
}

.mono { font-family: var(--font-fira-code), monospace; }

.container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

/* NAV */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in oklab, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; max-width: 1180px; margin: 0 auto;
}
.logo {
  font-family: var(--font-fira-code), monospace;
  font-weight: 700; font-size: 18px; color: var(--accent); letter-spacing: -0.02em;
}
.logo::after { content: '_'; animation: blink 1s step-end infinite; color: var(--accent); }
.nav-links { display: flex; gap: 32px; align-items: center; list-style: none; }
.nav-links a {
  font-family: var(--font-fira-code), monospace;
  font-size: 13px; color: var(--text-dim); text-decoration: none;
  text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.2s;
}
.nav-links a::before { content: '// '; color: var(--accent); opacity: 0.6; }
.nav-links a:hover { color: var(--text); }
.nav-actions { display: flex; gap: 12px; align-items: center; }
.theme-toggle {
  width: 36px; height: 36px; border: 1px solid var(--border);
  background: var(--panel); color: var(--text-dim); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; transition: all 0.2s;
}
.theme-toggle:hover { border-color: var(--accent); color: var(--accent); }
.mobile-menu-btn {
  display: none; width: 36px; height: 36px;
  background: var(--panel); border: 1px solid var(--border);
  color: var(--text); cursor: pointer;
  font-family: var(--font-fira-code), monospace;
  align-items: center; justify-content: center;
}

/* BUTTONS */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px;
  font-family: var(--font-fira-code), monospace;
  font-size: 13px; font-weight: 500; text-transform: uppercase;
  letter-spacing: 0.05em; text-decoration: none;
  border: 1px solid var(--border-strong); background: transparent;
  color: var(--text); cursor: pointer; transition: all 0.2s; position: relative;
}
.btn-primary {
  background: var(--accent-soft); border-color: var(--accent);
  color: var(--accent); box-shadow: 0 0 24px var(--accent-glow);
}
.btn-primary:hover {
  background: var(--accent); color: #0a0710; box-shadow: 0 0 32px var(--accent-glow);
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
.btn::before { content: '> '; color: inherit; }

/* SECTION HEADERS */
.section-label {
  font-family: var(--font-fira-code), monospace;
  font-size: 12px; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 16px;
}
.section-label::before { content: '// '; color: var(--accent); }

/* HERO */
.hero { padding: 80px 0 60px; position: relative; }
.hero-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 60px; align-items: center; }
.hero-tag {
  display: inline-block; font-family: var(--font-fira-code), monospace;
  font-size: 12px; color: var(--accent); background: var(--accent-soft);
  border: 1px solid var(--accent); padding: 6px 12px; margin-bottom: 24px; letter-spacing: 0.05em;
}
.hero h1 {
  font-size: clamp(38px, 5.5vw, 64px); line-height: 1.05;
  letter-spacing: -0.03em; font-weight: 700; margin-bottom: 24px; text-wrap: balance;
}
.hero h1 .accent { color: var(--accent); position: relative; }
.hero h1 .accent::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 4px;
  height: 8px; background: var(--accent); opacity: 0.2; z-index: -1;
}
.hero p.lead { color: var(--text-dim); font-size: 17px; max-width: 480px; margin-bottom: 32px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* TERMINAL */
.terminal {
  background: var(--panel); border: 1px solid var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft), 0 30px 80px rgba(0,0,0,0.4), 0 0 60px var(--accent-glow);
  position: relative; overflow: hidden; border-radius: 2px;
}
.terminal::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 49%, var(--accent-soft) 50%, transparent 51%);
  pointer-events: none; opacity: 0.5;
}
.term-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: var(--panel-2);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-fira-code), monospace; font-size: 12px;
}
.term-title { display: flex; align-items: center; gap: 8px; color: var(--accent); }
.term-controls { display: flex; gap: 6px; color: var(--text-muted); font-size: 14px; }
.term-controls span { width: 10px; height: 10px; border: 1px solid var(--text-muted); display: inline-block; }
.term-body {
  padding: 18px; font-family: var(--font-fira-code), monospace;
  font-size: 12.5px; line-height: 1.7; min-height: 380px; position: relative;
  background: repeating-linear-gradient(transparent 0, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px);
}
[data-theme="light"] .term-body {
  background: repeating-linear-gradient(transparent 0, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px);
}
.term-line { white-space: pre-wrap; color: var(--text); }
.tk-comment { color: var(--text-muted); }
.tk-key { color: var(--accent); }
.tk-str { color: var(--accent-2); }
.tk-fn { color: oklch(0.78 0.18 200); }
.tk-num { color: oklch(0.82 0.17 85); }
.tk-prompt { color: var(--accent); }
.cursor {
  display: inline-block; width: 8px; height: 14px;
  background: var(--accent); vertical-align: text-bottom;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

.term-preview {
  margin-top: 14px; border: 1px solid var(--border);
  background: var(--bg-2); height: 140px; overflow: hidden; position: relative;
}
.preview-track { display: flex; height: 100%; transition: transform 0.6s cubic-bezier(.7,.1,.3,1); }
.preview-slide {
  flex: 0 0 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.preview-dots {
  position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px; z-index: 2;
}
.preview-dots span { width: 18px; height: 2px; background: var(--border-strong); transition: background 0.3s; }
.preview-dots span.active { background: var(--accent); }

.fake-shot { width: 100%; height: 100%; padding: 12px; display: flex; flex-direction: column; gap: 6px; }
.fake-shot .row { display: flex; gap: 6px; align-items: center; }
.fake-shot .bar { height: 6px; background: var(--border-strong); }
.fake-shot .chip { padding: 2px 8px; border: 1px solid var(--accent); color: var(--accent); font-size: 8px; font-family: var(--font-fira-code), monospace; }
.fake-shot .panel { background: var(--panel); border: 1px solid var(--border); flex: 1; padding: 8px; display: flex; flex-direction: column; gap: 4px; }

/* ABOUT */
.about { padding: 60px 0; }
.about-grid { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: stretch; }
.about-grid > .about-card { display: flex; flex-direction: column; }
.about-grid > .about-card.about-text-card { justify-content: space-between; min-height: 360px; }
.about-card {
  background: var(--panel); border: 1px solid var(--border); padding: 24px; position: relative;
}
.about-card::before {
  content: ''; position: absolute; top: -1px; left: -1px; width: 12px; height: 12px;
  border-top: 2px solid var(--accent); border-left: 2px solid var(--accent);
}
.about-card::after {
  content: ''; position: absolute; bottom: -1px; right: -1px; width: 12px; height: 12px;
  border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent);
}
.avatar {
  width: 100%; aspect-ratio: 1;
  background: linear-gradient(135deg, var(--bg-2), var(--panel-2));
  border: 1px solid var(--border-strong);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-fira-code), monospace;
  font-size: 64px; font-weight: 700; color: var(--accent);
  position: relative; overflow: hidden;
}
.avatar::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, var(--accent-glow), transparent 60%); opacity: 0.4;
}
.avatar span { position: relative; z-index: 1; text-shadow: 0 0 30px var(--accent-glow); }
.about-text { font-size: 15.5px; color: var(--text-dim); line-height: 1.7; margin-bottom: 28px; max-width: 580px; }
.about-text strong { color: var(--text); font-weight: 500; }
.stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  border-top: 1px dashed var(--border-strong); padding-top: 20px;
  text-align: center; justify-items: center;
}
.stat { position: relative; display: flex; flex-direction: column; align-items: center; }
.stat .stat-label { text-align: center; }
.stat-num {
  font-family: var(--font-fira-code), monospace;
  font-size: 44px; font-weight: 700; color: var(--accent);
  line-height: 1; text-shadow: 0 0 20px var(--accent-glow);
}
.stat-label {
  font-family: var(--font-fira-code), monospace;
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--text-muted); margin-top: 8px;
}
.stat-badge { display: inline-block; font-family: var(--font-fira-code), monospace; font-size: 10px; color: var(--accent-2); margin-top: 4px; }

/* STACK */
.stack { padding: 40px 0 60px; }
.stack-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.stack-item {
  background: var(--panel); border: 1px solid var(--border);
  padding: 18px 14px; display: flex; flex-direction: column;
  align-items: center; gap: 10px; text-align: center;
  transition: all 0.2s; position: relative;
}
.stack-item:hover {
  border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-glow);
}
.stack-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 32px; }
.stack-name { font-family: var(--font-fira-code), monospace; font-size: 12px; color: var(--text); }

/* PROJECTS */
.projects { padding: 60px 0; }
.projects-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 28px; gap: 16px; }
.projects-head h2 { font-size: clamp(28px, 4vw, 40px); letter-spacing: -0.02em; font-weight: 700; }
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.project-card {
  background: var(--panel); border: 1px solid var(--border);
  cursor: pointer; transition: all 0.25s; position: relative;
  overflow: hidden; text-align: left; font-family: inherit; color: inherit; padding: 0;
}
.project-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px;
  background: var(--accent); transition: width 0.4s; z-index: 2;
}
.project-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 30px var(--accent-glow); }
.project-card:hover::before { width: 100%; }
.project-thumb { aspect-ratio: 16 / 10; background: var(--bg-2); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
.project-body { padding: 20px; }
.project-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.01em; }
.project-desc { font-size: 13.5px; color: var(--text-dim); line-height: 1.6; margin-bottom: 14px; }
.project-tech { font-family: var(--font-fira-code), monospace; font-size: 11px; color: var(--text-muted); padding-top: 12px; border-top: 1px dashed var(--border); }
.project-tech::before { content: 'tech: '; color: var(--accent); }

/* MODAL */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(5, 3, 10, 0.85);
  backdrop-filter: blur(8px); z-index: 100;
  display: flex; align-items: center; justify-content: center; padding: 24px;
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.modal-backdrop.open { opacity: 1; pointer-events: auto; }
.modal {
  background: var(--panel); border: 1px solid var(--accent);
  box-shadow: 0 0 80px var(--accent-glow), 0 40px 80px rgba(0,0,0,0.6);
  max-width: 920px; width: 100%; max-height: 90vh; overflow-y: auto;
  position: relative; transform: scale(0.96); transition: transform 0.25s;
}
.modal-backdrop.open .modal { transform: scale(1); }
.modal-close {
  position: absolute; top: 14px; right: 14px; width: 36px; height: 36px;
  background: transparent; border: 1px solid var(--border-strong);
  color: var(--text-dim); font-family: var(--font-fira-code), monospace;
  font-size: 18px; cursor: pointer; z-index: 5; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.modal-close:hover { color: var(--accent); border-color: var(--accent); }
.modal-header { padding: 24px 28px 18px; border-bottom: 1px solid var(--border); }
.modal-header .section-label { margin-bottom: 8px; }
.modal-header h3 { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; }
.modal-carousel { position: relative; background: var(--bg-2); aspect-ratio: 16 / 9; overflow: hidden; }
.carousel-track { display: flex; height: 100%; transition: transform 0.5s cubic-bezier(.7,.1,.3,1); }
.carousel-slide { flex: 0 0 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; }
.carousel-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px; background: rgba(10, 7, 16, 0.7);
  border: 1px solid var(--accent); color: var(--accent);
  font-family: var(--font-fira-code), monospace; font-size: 18px;
  cursor: pointer; z-index: 3; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.carousel-arrow:hover { background: var(--accent); color: #0a0710; }
.carousel-arrow.prev { left: 16px; }
.carousel-arrow.next { right: 16px; }
.carousel-counter {
  position: absolute; top: 16px; right: 16px;
  font-family: var(--font-fira-code), monospace; font-size: 11px; color: var(--text);
  background: rgba(10, 7, 16, 0.7); padding: 4px 10px; border: 1px solid var(--border-strong); z-index: 3;
}
.carousel-tag {
  position: absolute; top: 16px; left: 16px;
  font-family: var(--font-fira-code), monospace; font-size: 11px; color: var(--accent);
  background: rgba(10, 7, 16, 0.7); padding: 4px 10px; border: 1px solid var(--accent);
  z-index: 3; text-transform: uppercase; letter-spacing: 0.05em;
}
.modal-body { padding: 24px 28px 28px; }
.modal-body p { color: var(--text-dim); line-height: 1.7; margin-bottom: 18px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.tech-tag { font-family: var(--font-fira-code), monospace; font-size: 11px; padding: 4px 10px; border: 1px solid var(--border-strong); color: var(--text-dim); }

/* Fake screenshot shared styles */
.shot-bar { display: flex; gap: 4px; padding: 8px; background: var(--panel-2); border-bottom: 1px solid var(--border); }
.shot-bar i { width: 8px; height: 8px; border: 1px solid var(--border-strong); }

/* CONTACT */
.contact { padding: 80px 0; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
.contact-intro h2 { font-size: clamp(32px, 4.5vw, 48px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; text-wrap: balance; }
.contact-intro p { color: var(--text-dim); font-size: 16px; margin-bottom: 24px; }
.contact-snippet {
  background: var(--panel); border: 1px solid var(--border); padding: 18px;
  font-family: var(--font-fira-code), monospace; font-size: 12.5px; line-height: 1.8;
}
.contact-form { background: var(--panel); border: 1px solid var(--border); padding: 28px; position: relative; }
.contact-form::before {
  content: ''; position: absolute; top: -1px; right: -1px; width: 16px; height: 16px;
  border-top: 2px solid var(--accent); border-right: 2px solid var(--accent);
}
.field { margin-bottom: 18px; }
.field label {
  display: block; font-family: var(--font-fira-code), monospace; font-size: 11px;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
}
.field label::before { content: '> '; color: var(--accent); }
.field input, .field textarea {
  width: 100%; background: var(--bg-2); border: 1px solid var(--border-strong);
  color: var(--text); padding: 12px 14px;
  font-family: var(--font-space-grotesk), sans-serif; font-size: 14px; transition: border-color 0.2s;
}
.field input:focus, .field textarea:focus {
  outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft);
}
.field textarea {
  min-height: 120px; resize: vertical;
  font-family: var(--font-fira-code), monospace; font-size: 13px;
}
.form-success {
  background: var(--accent-soft); border: 1px solid var(--accent); padding: 14px;
  font-family: var(--font-fira-code), monospace; font-size: 13px; color: var(--accent);
  margin-top: 14px;
}

/* FOOTER */
.footer { border-top: 1px solid var(--border); background: var(--bg-2); padding: 48px 0 32px; margin-top: 60px; }
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; margin-bottom: 32px; }
.footer-brand .logo { font-size: 22px; }
.footer-brand p { color: var(--text-dim); font-size: 14px; margin-top: 12px; max-width: 320px; }
.footer h4 {
  font-family: var(--font-fira-code), monospace; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 16px;
}
.footer h4::before { content: '// '; color: var(--accent); }
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a {
  font-family: var(--font-fira-code), monospace; font-size: 13px;
  color: var(--text-dim); text-decoration: none; transition: color 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.footer-links a:hover { color: var(--accent); }
.footer-links a .arrow { color: var(--accent); opacity: 0.6; }
.footer-bottom {
  border-top: 1px dashed var(--border); padding-top: 24px;
  display: flex; justify-content: space-between;
  font-family: var(--font-fira-code), monospace; font-size: 11px; color: var(--text-muted);
}

/* SHARE BUTTON */
.share-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px;
  background: var(--accent-soft); border: 1px solid var(--accent); color: var(--accent);
  font-family: var(--font-fira-code), monospace; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s; margin-top: 12px;
}
.share-btn:hover { background: var(--accent); color: #0a0710; box-shadow: 0 0 24px var(--accent-glow); }

/* SHARE MODAL */
.share-modal { max-width: 980px; }
.share-body { display: grid; grid-template-columns: 1.3fr 1fr; gap: 0; }
.share-card-preview {
  padding: 28px; background: var(--bg-2); border-right: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
}
.share-actions { padding: 24px 28px 28px; }
.share-section-title {
  font-family: var(--font-fira-code), monospace; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 10px;
}
.share-link-row { display: flex; gap: 8px; align-items: stretch; }
.share-link-row code {
  flex: 1; background: var(--bg-2); border: 1px solid var(--border-strong);
  padding: 11px 12px; font-family: var(--font-fira-code), monospace; font-size: 12px;
  color: var(--text-dim); overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.share-copy-btn { padding: 10px 14px; }
.share-networks { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.share-net {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px;
  background: var(--bg-2); border: 1px solid var(--border-strong); color: var(--text);
  text-decoration: none; font-family: var(--font-fira-code), monospace;
  font-size: 12px; transition: all 0.2s;
}
.share-net:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

/* BUSINESS CARD */
.biz-card {
  width: 480px; height: 270px; background: var(--panel); border: 1px solid var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft), 0 30px 60px rgba(0,0,0,0.5), 0 0 50px var(--accent-glow);
  display: grid; grid-template-columns: 1.05fr auto 1fr;
  position: relative; overflow: hidden;
  font-family: var(--font-fira-code), monospace; color: var(--text);
}
.biz-grid-bg {
  position: absolute; inset: 0;
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 24px 24px; opacity: 0.6; pointer-events: none;
}
.biz-left { padding: 22px 20px; display: flex; flex-direction: column; justify-content: space-between; position: relative; z-index: 1; }
.biz-tag { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.biz-name { font-family: var(--font-space-grotesk), system-ui, sans-serif; font-size: 30px; font-weight: 700; line-height: 1; letter-spacing: -0.02em; color: var(--text); margin-top: 14px; }
.biz-role { font-size: 11px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 8px; }
.biz-role::before { content: '> '; }
.biz-stack { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 14px; }
.biz-stack span { font-size: 9px; padding: 3px 7px; border: 1px solid var(--border-strong); color: var(--text-dim); }
.biz-divider { position: relative; width: 24px; display: flex; align-items: center; justify-content: center; }
.biz-divider-line { width: 2px; height: 80%; background: var(--accent); box-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent-glow); transform: skewX(-12deg); }
.biz-divider-glow { position: absolute; width: 40px; height: 100%; background: radial-gradient(ellipse at center, var(--accent-glow), transparent 70%); opacity: 0.6; pointer-events: none; }
.biz-right { padding: 22px 20px; display: flex; flex-direction: column; justify-content: center; gap: 12px; position: relative; z-index: 1; }
.biz-row { display: flex; flex-direction: column; gap: 2px; }
.biz-row-label { font-size: 9px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
.biz-row-label::before { content: '// '; color: var(--accent); }
.biz-row-value { font-size: 12px; color: var(--text); }
.biz-corner { position: absolute; width: 14px; height: 14px; z-index: 2; }
.biz-corner-tl { top: 8px; left: 8px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
.biz-corner-br { bottom: 8px; right: 8px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }

/* RESPONSIVE */
@media (max-width: 720px) {
  .share-body { grid-template-columns: 1fr; }
  .share-card-preview { border-right: none; border-bottom: 1px solid var(--border); padding: 20px; }
  .biz-card { width: 100%; max-width: 420px; height: auto; aspect-ratio: 16/9; grid-template-columns: 1fr auto 1fr; }
  .biz-name { font-size: 22px; }
  .biz-row-value { font-size: 11px; }
  .share-networks { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .nav-links { display: none; }
  .nav-links.open {
    display: flex; position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; background: var(--panel); border-bottom: 1px solid var(--border);
    padding: 20px 24px; gap: 16px;
  }
  .mobile-menu-btn { display: flex; }
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-grid { grid-template-columns: 1fr; }
  .avatar { max-width: 240px; margin: 0 auto; }
  .stack-grid { grid-template-columns: repeat(3, 1fr); }
  .projects-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .footer-bottom { flex-direction: column; gap: 8px; }
  .term-body { min-height: 320px; font-size: 11.5px; }
}
@media (max-width: 540px) {
  .stack-grid { grid-template-columns: repeat(2, 1fr); }
  .stats { grid-template-columns: 1fr; gap: 12px; text-align: left; }
  .stat-num { font-size: 36px; }
  .hero { padding: 48px 0 32px; }
  .hero h1 { font-size: 36px; }
  .modal-header h3 { font-size: 22px; }
}
```

- [ ] **Step 2: Replace layout.tsx**

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kayk Mascarenhas — Portfolio",
  description: "Desenvolvedor full stack — transformando ideias em sistemas que geram resultado real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html:
          `try{const t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}`
        }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run dev server and confirm no errors**

```bash
pnpm dev
```

Expected: server starts on http://localhost:3000 with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: setup global CSS design tokens and fonts"
```

---

### Task 3: Types, constants, and data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/constants.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/stack.ts`

- [ ] **Step 1: Create src/lib/types.ts**

```ts
export interface Project {
  id: string;
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  tech: string[];
  slides: SlideKind[];
}

export type SlideKind =
  | 'hero' | 'features' | 'pricing' | 'mobile'
  | 'terminal' | 'video' | 'queue' | 'output'
  | 'discord' | 'commands' | 'embed';

export type StackName = 'Node.js' | 'TypeScript' | 'Python' | 'PostgreSQL' | 'Docker' | 'Oracle';

export type Theme = 'dark' | 'light';
```

- [ ] **Step 2: Create src/lib/constants.ts**

```ts
export const SITE_URL = 'https://kaykmascarenhas.dev';
export const SHARE_TEXT = 'Confira o portfolio do Kayk Mascarenhas — Dev Full Stack';

export const CONTACT = {
  email: 'kaykdsg@gmail.com',
  phone: '+55 (21) 99551-8027',
  phoneHref: 'tel:+5521995518027',
  github: 'https://github.com/KsmKayk',
  linkedin: 'https://www.linkedin.com/in/kaykmascarenhas/',
  instagram: 'https://www.instagram.com/kayk.mascarenhas/',
};
```

- [ ] **Step 3: Create src/data/projects.ts**

```ts
import { Project } from '@/lib/types';

export const PROJECTS: Project[] = [
  {
    id: 'p2a',
    name: 'P2A Consulting',
    tag: 'Landing Page',
    desc: 'Landing page para uma empresa de automação com o uso das LLMs mais fortes do mercado atual.',
    longDesc: 'Site institucional desenvolvido para uma agência de consultoria em automação. Foco em performance, SEO e narrativa visual sobre como LLMs podem ser aplicadas para resolver problemas reais de negócio. Deploy no GitHub Pages com pipeline de build automatizado.',
    tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'GitHub Pages'],
    slides: ['hero', 'features', 'pricing', 'mobile'],
  },
  {
    id: 'omnigen',
    name: 'Omnigen',
    tag: 'Sistema de Videos Automáticos',
    desc: 'Gerador de vídeos que cria roteiro, busca imagens, narra e legenda a partir de um tema.',
    longDesc: 'Pipeline completo de geração de vídeo a partir de um único prompt. Integra OpenRouter para roteiro, APIs de busca de imagens, ffmpeg para composição e Piper TTS para narração natural — tudo orquestrado em uma fila assíncrona com retry e cache.',
    tech: ['Python', 'OpenRouter', 'FFmpeg', 'Piper TTS'],
    slides: ['terminal', 'video', 'queue', 'output'],
  },
  {
    id: 'sodden',
    name: 'SoddenBot',
    tag: 'Bot de Música',
    desc: 'Bot de música para Discord com playlists, filas e integração via discord.js + DisTube.',
    longDesc: 'Bot full-featured para servidores de Discord: tocar de YouTube/Spotify/SoundCloud, filas, playlists salvas, controles de volume e equalizador, comandos slash e suporte a múltiplos servidores simultâneos. Construído com discord.js v14 e DisTube.',
    tech: ['Node.js', 'discord.js', 'DisTube', 'TypeScript'],
    slides: ['discord', 'commands', 'embed'],
  },
];
```

- [ ] **Step 4: Create src/data/stack.ts**

```ts
import { StackName } from '@/lib/types';

export const STACK: StackName[] = [
  'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Oracle',
];
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/ src/data/
git commit -m "feat: add types, constants, and data"
```

---

### Task 4: ThemeProvider

**Files:**
- Create: `src/components/providers/ThemeProvider.tsx`

- [ ] **Step 1: Create ThemeProvider**

```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/lib/types';

interface ThemeCtx { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

- [ ] **Step 2: Commit**

```bash
git add src/components/providers/
git commit -m "feat: add ThemeProvider context"
```

---

### Task 5: UI atoms — Button and SectionLabel

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionLabel.tsx`

- [ ] **Step 1: Create Button.tsx**

```tsx
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  as: 'a';
}

export function Button({ variant = 'ghost', className = '', children, ...props }: ButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  return <button className={cls} {...props}>{children}</button>;
}

export function LinkButton({ variant = 'ghost', className = '', children, as: _as, ...props }: LinkButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  return <a className={cls} {...props}>{children}</a>;
}
```

- [ ] **Step 2: Create SectionLabel.tsx**

```tsx
interface SectionLabelProps { children: string; }

export function SectionLabel({ children }: SectionLabelProps) {
  return <div className="section-label">{children}</div>;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add Button and SectionLabel UI atoms"
```

---

### Task 6: Terminal component

**Files:**
- Create: `src/components/terminal/TerminalPreviews.tsx`
- Create: `src/components/terminal/Terminal.tsx`

- [ ] **Step 1: Create TerminalPreviews.tsx**

```tsx
export function PreviewP2A() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">P2A</span>
        <div className="bar" style={{ width: 40 }} />
        <div className="bar" style={{ width: 30 }} />
        <div className="bar" style={{ width: 30, marginLeft: 'auto' }} />
      </div>
      <div className="panel">
        <div className="bar" style={{ width: '70%', height: 8 }} />
        <div className="bar" style={{ width: '50%' }} />
        <div className="row" style={{ marginTop: 'auto' }}>
          <div className="bar" style={{ width: 36, height: 10, background: 'var(--accent)' }} />
          <div className="bar" style={{ width: 24, height: 10 }} />
        </div>
      </div>
    </div>
  );
}

export function PreviewOmnigen() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">VIDEO</span>
        <div className="bar" style={{ width: '60%', marginLeft: 'auto' }} />
      </div>
      <div className="panel" style={{ background: 'var(--bg-2)', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 8,
          background: 'linear-gradient(135deg, var(--accent-soft), transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 0, height: 0,
            borderLeft: '14px solid var(--accent)',
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
          }} />
        </div>
      </div>
      <div className="row">
        <div className="bar" style={{ width: '100%', height: 3, background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

export function PreviewSodden() {
  return (
    <div className="fake-shot">
      <div className="row">
        <span className="chip">#music</span>
        <div className="bar" style={{ width: 30, marginLeft: 'auto' }} />
      </div>
      <div className="panel">
        <div className="row">
          <div style={{ width: 18, height: 18, background: 'var(--accent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <div className="bar" style={{ width: '80%' }} />
            <div className="bar" style={{ width: '50%', height: 3 }} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 'auto', gap: 4 }}>
          {[8, 14, 6, 18, 10, 16, 12].map((h, i) => (
            <div key={i} style={{ width: 4, height: h, background: 'var(--accent)', opacity: 0.4 + i * 0.08 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Terminal.tsx**

```tsx
'use client';
import { useState, useEffect } from 'react';
import { PreviewP2A, PreviewOmnigen, PreviewSodden } from './TerminalPreviews';

const TERM_LINES = [
  { html: '<span class="tk-comment">// projetos.ts — portfolio</span>' },
  { html: '<span class="tk-key">import</span> { Project } <span class="tk-key">from</span> <span class="tk-str">"./types"</span>;' },
  { html: '' },
  { html: '<span class="tk-key">const</span> <span class="tk-fn">projetos</span>: Project[] = [' },
  { html: '  { name: <span class="tk-str">"P2A Consulting"</span>, stack: [<span class="tk-str">"next.js"</span>, <span class="tk-str">"llm"</span>] },' },
  { html: '  { name: <span class="tk-str">"Omnigen"</span>, stack: [<span class="tk-str">"ffmpeg"</span>, <span class="tk-str">"piper"</span>] },' },
  { html: '  { name: <span class="tk-str">"SoddenBot"</span>, stack: [<span class="tk-str">"discord.js"</span>] },' },
  { html: '];' },
  { html: '' },
  { html: '<span class="tk-prompt">$</span> <span class="tk-fn">deploy</span>(projetos) <span class="tk-comment">// shipped <span class="tk-num">20+</span></span>' },
];

const PREVIEWS = [<PreviewP2A />, <PreviewOmnigen />, <PreviewSodden />];

export function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (visibleLines >= TERM_LINES.length) {
      const t = setTimeout(() => setVisibleLines(0), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines(v => v + 1), 280);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    const i = setInterval(() => setSlideIdx(s => (s + 1) % PREVIEWS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="terminal">
      <div className="term-header">
        <div className="term-title">
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block', borderRadius: '50%' }} />
          ~/portfolio/projetos.ts
        </div>
        <div className="term-controls">
          <span /><span /><span />
        </div>
      </div>
      <div className="term-body">
        {TERM_LINES.slice(0, visibleLines).map((l, i) => (
          <div key={i} className="term-line" dangerouslySetInnerHTML={{ __html: l.html || '&nbsp;' }} />
        ))}
        {visibleLines < TERM_LINES.length && <span className="cursor" />}

        <div className="term-preview">
          <div className="preview-track" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
            {PREVIEWS.map((Preview, i) => (
              <div key={i} className="preview-slide">{Preview}</div>
            ))}
          </div>
          <div className="preview-dots">
            {PREVIEWS.map((_, i) => (
              <span key={i} className={i === slideIdx ? 'active' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/terminal/
git commit -m "feat: add animated Terminal component"
```

---

### Task 7: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
import { Terminal } from '@/components/terminal/Terminal';
import { LinkButton } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="hero-tag">&lt;dev full stack/&gt;</span>
            <h1>
              Da ideia à{' '}
              <span className="accent">solução digital</span>{' '}
              que gera resultado.
            </h1>
            <p className="lead">
              Sou desenvolvedor focado em transformar ideias e necessidades em soluções
              digitais funcionais — sistemas, automações, APIs e produtos web sob medida.
            </p>
            <div className="hero-actions">
              <LinkButton as="a" variant="primary" href="#projetos">ver projetos</LinkButton>
              <LinkButton as="a" variant="ghost" href="#contato">entrar em contato</LinkButton>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section"
```

---

### Task 8: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <SectionLabel>sobre mim</SectionLabel>
        <div className="about-grid">
          <div className="about-card">
            <div className="avatar"><span>KM</span></div>
            <div style={{
              marginTop: 14,
              fontFamily: 'var(--font-fira-code), monospace',
              fontSize: 11, color: 'var(--text-muted)', textAlign: 'center',
            }}>
              kayk_mascarenhas.png
            </div>
          </div>
          <div className="about-card about-text-card">
            <p className="about-text">
              Sou desenvolvedor focado em transformar ideias e necessidades em{' '}
              <strong>soluções digitais funcionais</strong>. Atuo criando sistemas, automações
              e produtos sob medida — de landing pages e aplicações web até ferramentas
              internas, APIs e processos automatizados.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="stat-num">+5</div>
                <div className="stat-label">anos<br />programando</div>
              </div>
              <div className="stat">
                <div className="stat-num">+20</div>
                <div className="stat-label">projetos<br />desenvolvidos</div>
              </div>
              <div className="stat">
                <div className="stat-num">+3</div>
                <div className="stat-label">hackathons</div>
                <div className="stat-badge">// 2 vitórias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section"
```

---

### Task 9: Stack section with react-icons

**Files:**
- Create: `src/components/sections/Stack.tsx`

- [ ] **Step 1: Create Stack.tsx**

```tsx
import { SectionLabel } from '@/components/ui/SectionLabel';
import { STACK } from '@/data/stack';
import { StackName } from '@/lib/types';
import {
  SiNodedotjs, SiTypescript, SiPython,
  SiPostgresql, SiDocker, SiOracle,
} from 'react-icons/si';

const ICON_MAP: Record<StackName, React.ElementType> = {
  'Node.js': SiNodedotjs,
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'PostgreSQL': SiPostgresql,
  'Docker': SiDocker,
  'Oracle': SiOracle,
};

export function Stack() {
  return (
    <section className="stack" id="stack">
      <div className="container">
        <SectionLabel>stack principal</SectionLabel>
        <div className="stack-grid">
          {STACK.map(name => {
            const Icon = ICON_MAP[name];
            return (
              <div key={name} className="stack-item">
                <div className="stack-icon"><Icon /></div>
                <div className="stack-name">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Stack.tsx
git commit -m "feat: add Stack section with react-icons/si"
```

---

### Task 10: Projects section — cards, fake screenshots, modal

**Files:**
- Create: `src/components/projects/SlidePreview.tsx`
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/projects/ProjectModal.tsx`
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create SlidePreview.tsx** (fake screenshot placeholders)

```tsx
import { SlideKind } from '@/lib/types';

const Bar = ({ w = '100%', h = 8, c = 'var(--text-dim)', o = 0.4 }: { w?: string | number; h?: number; c?: string; o?: number }) => (
  <div style={{ width: w, height: h, background: c, opacity: o }} />
);

function FakeHero() {
  return (
    <div style={{ width: '88%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', gap: 24, background: 'var(--panel)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Bar w="50%" h={6} c="var(--accent)" o={1} />
          <Bar w="80%" h={14} />
          <Bar w="65%" h={14} />
          <Bar w="40%" h={6} />
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <Bar w={60} h={20} c="var(--accent)" o={1} />
            <Bar w={60} h={20} c="var(--border-strong)" o={1} />
          </div>
        </div>
        <div style={{ flex: 1, height: '80%', background: 'var(--bg-2)', border: '1px solid var(--border)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Bar w="60%" h={4} c="var(--accent)" o={1} />
            <Bar w="100%" h={4} />
            <Bar w="80%" h={4} />
            <div style={{ flex: 1, background: 'linear-gradient(135deg, var(--accent-soft), transparent)', marginTop: 6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeFeatures() {
  return (
    <div style={{ width: '88%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, background: 'var(--panel)' }}>
        <Bar w="40%" h={10} c="var(--accent)" o={1} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ width: 16, height: 16, background: 'var(--accent)', opacity: 0.8 }} />
              <Bar w="80%" h={6} />
              <Bar w="60%" h={4} />
              <Bar w="90%" h={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FakePricing() {
  return (
    <div style={{ width: '70%', height: '86%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 20, background: 'var(--panel)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[0, 1].map(i => (
          <div key={i} style={{ background: 'var(--bg-2)', border: i === 1 ? '1px solid var(--accent)' : '1px solid var(--border)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8, boxShadow: i === 1 ? '0 0 20px var(--accent-glow)' : 'none' }}>
            <Bar w="50%" h={6} c={i === 1 ? 'var(--accent)' : 'var(--text-dim)'} o={1} />
            <Bar w="60%" h={16} c="var(--text)" o={0.7} />
            <Bar w="100%" h={3} /><Bar w="80%" h={3} /><Bar w="90%" h={3} /><Bar w="60%" h={3} />
            <Bar w="100%" h={20} c={i === 1 ? 'var(--accent)' : 'var(--border-strong)'} o={1} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeMobile() {
  return (
    <div style={{ width: 180, height: '90%', background: 'var(--panel)', border: '2px solid var(--border-strong)', borderRadius: 18, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 4, background: 'var(--border-strong)', borderRadius: 2 }} />
      </div>
      <Bar w="60%" h={8} c="var(--accent)" o={1} />
      <Bar w="100%" h={10} />
      <Bar w="80%" h={10} />
      <div style={{ flex: 1, background: 'linear-gradient(180deg, var(--accent-soft), transparent)', border: '1px solid var(--border)' }} />
      <Bar w="100%" h={20} c="var(--accent)" o={1} />
    </div>
  );
}

function FakeTerminal() {
  return (
    <div style={{ width: '80%', height: '82%', background: '#0a0710', border: '1px solid var(--accent)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar" style={{ background: 'var(--panel-2)' }}><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 16, fontFamily: 'var(--font-fira-code), monospace', fontSize: 10, color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div><span style={{ color: 'var(--accent)' }}>$</span> python omnigen.py --theme=&quot;space&quot;</div>
        <div style={{ color: 'var(--text-muted)' }}>[1/4] generating script... <span style={{ color: 'var(--accent-2)' }}>ok</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[2/4] fetching images... <span style={{ color: 'var(--accent-2)' }}>ok</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[3/4] narrating with piper... <span style={{ color: 'var(--accent)' }}>...</span></div>
        <div style={{ color: 'var(--text-muted)' }}>[4/4] composing ffmpeg pipeline</div>
        <div style={{ marginTop: 8, color: 'var(--accent)' }}>$ <span className="cursor" style={{ background: 'var(--accent)' }} /></div>
      </div>
    </div>
  );
}

function FakeVideo() {
  return (
    <div style={{ width: '80%', aspectRatio: '16/9', background: '#000', border: '1px solid var(--accent)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, var(--accent-glow), transparent 60%)' }} />
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
        <div style={{ width: 0, height: 0, borderLeft: '16px solid var(--accent)', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: 4 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Bar w="100%" h={3} c="var(--accent)" o={0.4} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-fira-code), monospace', fontSize: 9, color: 'var(--text)' }}>
          <span>00:42</span><span>02:18</span>
        </div>
      </div>
    </div>
  );
}

function FakeQueue() {
  return (
    <div style={{ width: '85%', height: '85%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, padding: 14, background: 'var(--panel)', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Bar w="40%" h={8} c="var(--accent)" o={1} />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
            <div style={{ width: 6, height: 6, background: i === 1 ? 'var(--accent)' : 'var(--border-strong)', borderRadius: '50%' }} />
            <Bar w={`${50 + i * 8}%`} h={5} />
            <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-fira-code), monospace', fontSize: 8, color: i === 1 ? 'var(--accent)' : 'var(--text-muted)' }}>
              {i === 1 ? 'RUNNING' : 'QUEUED'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeOutput() {
  return (
    <div style={{ display: 'flex', gap: 8, width: '85%', height: '80%' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ flex: 1, background: '#000', border: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${135 + i * 60}deg, var(--accent-soft), transparent 70%)` }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontFamily: 'var(--font-fira-code), monospace', fontSize: 9, color: 'var(--text)' }}>
            video_{String(i + 1).padStart(2, '0')}.mp4
          </div>
        </div>
      ))}
    </div>
  );
}

function FakeDiscord() {
  return (
    <div style={{ width: '85%', height: '85%', background: 'var(--panel)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="shot-bar"><i /><i /><i /></div>
      <div style={{ flex: 1, display: 'flex', background: 'var(--panel)' }}>
        <div style={{ width: 50, background: 'var(--bg-2)', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: i === 1 ? 'var(--accent)' : 'var(--border-strong)' }} />
          ))}
        </div>
        <div style={{ width: 100, background: 'var(--panel-2)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Bar w="60%" h={5} c="var(--text-dim)" o={0.6} />
          <Bar w="80%" h={3} /><Bar w="50%" h={3} />
          <Bar w="70%" h={3} c="var(--accent)" o={1} />
        </div>
        <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Bar w="40%" h={4} /><Bar w="80%" h={3} />
            </div>
          </div>
          <div style={{ marginTop: 'auto', background: 'var(--bg-2)', border: '1px solid var(--accent)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Bar w="50%" h={4} c="var(--accent)" o={1} />
            <Bar w="100%" h={3} />
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {[6, 12, 4, 14, 8, 10].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: 'var(--accent)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeCommands() {
  return (
    <div style={{ width: '70%', background: 'var(--panel-2)', border: '1px solid var(--border-strong)', padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {['/play', '/queue', '/skip', '/loop', '/volume', '/lyrics'].map((cmd, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-fira-code), monospace', fontSize: 11, color: 'var(--accent)', width: 70 }}>{cmd}</span>
          <Bar w={`${40 + i * 6}%`} h={4} />
        </div>
      ))}
    </div>
  );
}

function FakeEmbed() {
  return (
    <div style={{ width: '60%', background: 'var(--panel-2)', border: '1px solid var(--border-strong)', borderLeft: '3px solid var(--accent)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 14, height: 14, background: 'var(--accent)' }} />
        <Bar w="40%" h={5} c="var(--text-dim)" o={0.7} />
      </div>
      <Bar w="80%" h={9} c="var(--accent)" o={1} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 60, height: 60, background: 'var(--bg-2)', border: '1px solid var(--border)' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Bar w="100%" h={4} /><Bar w="70%" h={4} /><Bar w="50%" h={4} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        <Bar w={40} h={16} c="var(--accent)" o={0.3} />
        <Bar w={40} h={16} c="var(--accent)" o={0.3} />
      </div>
    </div>
  );
}

const SLIDE_MAP: Record<SlideKind, React.ComponentType> = {
  hero: FakeHero, features: FakeFeatures, pricing: FakePricing, mobile: FakeMobile,
  terminal: FakeTerminal, video: FakeVideo, queue: FakeQueue, output: FakeOutput,
  discord: FakeDiscord, commands: FakeCommands, embed: FakeEmbed,
};

export function SlidePreview({ kind }: { kind: SlideKind }) {
  const Component = SLIDE_MAP[kind] ?? FakeHero;
  return <Component />;
}
```

- [ ] **Step 2: Create ProjectCard.tsx**

```tsx
import { Project } from '@/lib/types';

interface Props { project: Project; onClick: () => void; }

export function ProjectCard({ project, onClick }: Props) {
  return (
    <button className="project-card" onClick={onClick}>
      <div className="project-thumb">
        {/* Thumbnail rendered by Projects section via SlidePreview */}
      </div>
      <div className="project-body">
        <div style={{ fontFamily: 'var(--font-fira-code), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          // {project.tag}
        </div>
        <div className="project-title">{project.name}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-tech">{project.tech.join(', ')}</div>
      </div>
    </button>
  );
}
```

- [ ] **Step 3: Create ProjectModal.tsx**

```tsx
'use client';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import { SlidePreview } from './SlidePreview';
import { LinkButton } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface Props { project: Project | null; onClose: () => void; }

export function ProjectModal({ project, onClose }: Props) {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (!project) return;
    setSlideIdx(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlideIdx(i => (i + 1) % project.slides.length);
      if (e.key === 'ArrowLeft') setSlideIdx(i => (i - 1 + project.slides.length) % project.slides.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const prev = () => setSlideIdx(i => (i - 1 + project.slides.length) % project.slides.length);
  const next = () => setSlideIdx(i => (i + 1) % project.slides.length);

  return (
    <div className={`modal-backdrop ${project ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <SectionLabel>{project.tag}</SectionLabel>
          <h3>{project.name}</h3>
        </div>
        <div className="modal-carousel">
          <div className="carousel-tag">{project.slides[slideIdx]}.{slideIdx === 1 ? 'mp4' : 'png'}</div>
          <div className="carousel-counter">{slideIdx + 1} / {project.slides.length}</div>
          <div className="carousel-track" style={{ transform: `translateX(-${slideIdx * 100}%)` }}>
            {project.slides.map((kind, i) => (
              <div key={i} className="carousel-slide">
                <SlidePreview kind={kind} />
              </div>
            ))}
          </div>
          <button className="carousel-arrow prev" onClick={prev}>‹</button>
          <button className="carousel-arrow next" onClick={next}>›</button>
        </div>
        <div className="modal-body">
          <p>{project.longDesc}</p>
          <div className="tech-tags">
            {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <LinkButton as="a" variant="primary" href="#contato" onClick={onClose}>Falar sobre projeto</LinkButton>
            <LinkButton as="a" variant="ghost" href="#">Ver código</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Projects.tsx**

```tsx
'use client';
import { useState } from 'react';
import { Project } from '@/lib/types';
import { PROJECTS } from '@/data/projects';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { SlidePreview } from '@/components/projects/SlidePreview';

const THUMB_SLIDE: Record<string, 'hero' | 'queue' | 'discord'> = {
  p2a: 'hero', omnigen: 'queue', sodden: 'discord',
};

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="projects" id="projetos">
      <div className="container">
        <div className="projects-head">
          <div>
            <SectionLabel>projetos em destaque</SectionLabel>
            <h2>O que tenho construído.</h2>
          </div>
        </div>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <button key={p.id} className="project-card" onClick={() => setActive(p)}>
              <div className="project-thumb">
                <SlidePreview kind={THUMB_SLIDE[p.id] ?? 'hero'} />
              </div>
              <div className="project-body">
                <div style={{ fontFamily: 'var(--font-fira-code), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  // {p.tag}
                </div>
                <div className="project-title">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tech">{p.tech.join(', ')}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/ src/components/sections/Projects.tsx
git commit -m "feat: add Projects section with modal and slide previews"
```

---

### Task 11: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
'use client';
import { useState, FormEvent } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="contact" id="contato">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-intro">
            <SectionLabel>contato</SectionLabel>
            <h2>Vamos construir algo juntos?</h2>
            <p>Me conta a ideia. Respondo em até 24h com um plano de execução.</p>
            <div className="contact-snippet">
              <div><span className="tk-comment">// resposta_média</span></div>
              <div><span className="tk-key">const</span> <span className="tk-fn">tempo</span> = <span className="tk-str">&quot;&lt; 24h&quot;</span>;</div>
              <div><span className="tk-key">const</span> <span className="tk-fn">disponibilidade</span> = <span className="tk-str">&quot;freelance / contrato&quot;</span>;</div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="nome">seu_nome</label>
              <input id="nome" name="nome" type="text" required placeholder="Como posso te chamar?" />
            </div>
            <div className="field">
              <label htmlFor="email">email</label>
              <input id="email" name="email" type="email" required placeholder="voce@dominio.com" />
            </div>
            <div className="field">
              <label htmlFor="projeto">descricao_do_projeto</label>
              <textarea id="projeto" name="projeto" required placeholder="// conta um pouco sobre o que você precisa..." />
            </div>
            <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              enviar mensagem
            </Button>
            {sent && (
              <div className="form-success">
                {'> '}mensagem enviada com sucesso. retorno em breve.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section with form"
```

---

### Task 12: Share modal and BusinessCard

**Files:**
- Create: `src/components/share/BusinessCard.tsx`
- Create: `src/components/share/ShareModal.tsx`

- [ ] **Step 1: Create BusinessCard.tsx**

```tsx
import { RefObject } from 'react';

interface Props { cardRef: RefObject<HTMLDivElement | null>; }

export function BusinessCard({ cardRef }: Props) {
  return (
    <div ref={cardRef} className="biz-card">
      <div className="biz-grid-bg" />
      <div className="biz-left">
        <div className="biz-tag">// dev_card.png</div>
        <div>
          <div className="biz-name">Kayk<br />Mascarenhas</div>
          <div className="biz-role">programador full stack</div>
          <div className="biz-stack">
            <span>node.js</span>
            <span>typescript</span>
            <span>python</span>
          </div>
        </div>
      </div>
      <div className="biz-divider">
        <div className="biz-divider-line" />
        <div className="biz-divider-glow" />
      </div>
      <div className="biz-right">
        <div className="biz-row">
          <div className="biz-row-label">email</div>
          <div className="biz-row-value">kaykdsg@gmail.com</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">telefone</div>
          <div className="biz-row-value">+55 (21) 99551-8027</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">linkedin</div>
          <div className="biz-row-value">/in/kaykmascarenhas</div>
        </div>
        <div className="biz-row">
          <div className="biz-row-label">github</div>
          <div className="biz-row-value">/KsmKayk</div>
        </div>
      </div>
      <div className="biz-corner biz-corner-tl" />
      <div className="biz-corner biz-corner-br" />
    </div>
  );
}
```

- [ ] **Step 2: Create ShareModal.tsx**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaTelegram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BusinessCard } from './BusinessCard';
import { Button, LinkButton } from '@/components/ui/Button';
import { SITE_URL, SHARE_TEXT } from '@/lib/constants';

interface Props { open: boolean; onClose: () => void; }

export function ShareModal({ open, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  const downloadCard = async () => {
    if (!cardRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'kayk-mascarenhas-card.png';
      link.href = dataUrl;
      link.click();
    } catch (e) { console.error('download fail', e); }
    setDownloading(false);
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(SITE_URL); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch (e) { console.error(e); }
  };

  const url = encodeURIComponent(SITE_URL);
  const text = encodeURIComponent(SHARE_TEXT);

  const networks = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}`, icon: <FaWhatsapp /> },
    { name: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}`, icon: <FaTelegram /> },
    { name: 'X / Twitter', href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`, icon: <FaXTwitter /> },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, icon: <FaLinkedin /> },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: <FaFacebook /> },
    { name: 'Email', href: `mailto:?subject=${text}&body=${text}%20${url}`, icon: <MdEmail /> },
  ];

  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal share-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="section-label">compartilhar</div>
          <h3>Card de contato</h3>
        </div>
        <div className="share-body">
          <div className="share-card-preview">
            <BusinessCard cardRef={cardRef} />
          </div>
          <div className="share-actions">
            <div className="share-section-title">// baixar</div>
            <Button variant="primary" onClick={downloadCard} disabled={downloading}
              style={{ width: '100%', justifyContent: 'center' }}>
              {downloading ? 'gerando...' : 'baixar como imagem (.png)'}
            </Button>

            <div className="share-section-title" style={{ marginTop: 18 }}>// link do site</div>
            <div className="share-link-row">
              <code>{SITE_URL}</code>
              <Button variant="ghost" className="share-copy-btn" onClick={copyLink}>
                {copied ? 'copiado!' : 'copiar'}
              </Button>
            </div>

            <div className="share-section-title" style={{ marginTop: 18 }}>// enviar para</div>
            <div className="share-networks">
              {networks.map(n => (
                <a key={n.name} className="share-net" href={n.href} target="_blank" rel="noopener noreferrer">
                  <span style={{ color: 'var(--accent)', display: 'flex' }}>{n.icon}</span>
                  <span>{n.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/share/
git commit -m "feat: add ShareModal and BusinessCard with react-icons"
```

---

### Task 13: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```tsx
'use client';
import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '@/components/providers/ThemeProvider';
import { LinkButton } from '@/components/ui/Button';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="logo">kayk</div>
        <ul className={`nav-links ${navOpen ? 'open' : ''}`}>
          {[
            ['sobre', '#sobre'], ['projetos', '#projetos'],
            ['stack', '#stack'], ['contato', '#contato'],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setNavOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <LinkButton as="a" variant="primary" href="#contato" style={{ display: 'inline-flex' }}>
            contato
          </LinkButton>
          <button className="mobile-menu-btn" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? <HiX size={18} /> : <HiMenu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with theme toggle and mobile menu"
```

---

### Task 14: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
'use client';
import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { ShareModal } from '@/components/share/ShareModal';
import { CONTACT } from '@/lib/constants';

export function Footer() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">kayk</div>
              <p>Desenvolvedor full stack — transformando ideias em sistemas que geram resultado real.</p>
              <button className="share-btn" onClick={() => setShareOpen(true)}>
                <FiShare2 size={14} />
                compartilhar
              </button>
            </div>
            <div>
              <h4>contato</h4>
              <div className="footer-links">
                <a href={`mailto:${CONTACT.email}`}>
                  <span className="arrow">→</span> {CONTACT.email}
                </a>
                <a href={CONTACT.phoneHref}>
                  <span className="arrow">→</span> (21) 99551-8027
                </a>
              </div>
            </div>
            <div>
              <h4>redes</h4>
              <div className="footer-links">
                <a href={CONTACT.github} target="_blank" rel="noopener">
                  <span className="arrow">→</span> github
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener">
                  <span className="arrow">→</span> linkedin
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener">
                  <span className="arrow">→</span> instagram
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 kayk mascarenhas. all rights reserved.</span>
            <span>// built with code &amp; coffee</span>
          </div>
        </div>
      </footer>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with share modal trigger"
```

---

### Task 15: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx**

```tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run build and fix any TypeScript errors**

```bash
pnpm build
```

Expected: Build completes successfully with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble portfolio page"
```

---

### Task 16: Documentation files

**Files:**
- Create: `README.md`
- Create: `CLAUDE.md`
- Create: `DESIGN.md`

- [ ] **Step 1: Create README.md**

```markdown
# Kayk Mascarenhas — Portfolio

Personal developer portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Icons:** react-icons
- **Fonts:** Space Grotesk + Fira Code (via next/font/google)
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              — Next.js App Router (layout, page, globals.css)
  components/       — Reusable components
    providers/      — React context providers (ThemeProvider)
    ui/             — Atoms (Button, SectionLabel)
    layout/         — Navbar, Footer
    sections/       — Page sections (Hero, About, Stack, Projects, Contact)
    terminal/       — Animated terminal component
    projects/       — Project card, modal, slide previews
    share/          — Share modal, business card
  data/             — Static content (projects, stack)
  lib/              — Types, constants
```

## Build

```bash
pnpm build
pnpm start
```
```

- [ ] **Step 2: Create CLAUDE.md**

```markdown
# CLAUDE.md — Portfolio Project

## Project Overview
Personal developer portfolio for Kayk Mascarenhas. Single-page Next.js 16 (App Router) site.

## Key Conventions

### Component Boundaries
- Mark any component that uses `useState`, `useEffect`, event handlers, or browser APIs with `'use client'`
- Static/presentational components can stay as server components

### Styling
- All component styles live in `src/app/globals.css` as plain CSS classes
- Theme is controlled via `[data-theme="dark"|"light"]` on `<html>`
- CSS custom properties (e.g. `var(--accent)`, `var(--panel)`) — never hardcode colors
- Font variables: `var(--font-space-grotesk)` and `var(--font-fira-code)`
- Tailwind utilities available but prefer the existing CSS classes for consistency

### Icons
- Use `react-icons` for all icons — never write inline SVGs
- Stack icons: `react-icons/si` (SiNodedotjs, SiTypescript, etc.)
- UI icons: `react-icons/fi` (Feather), `react-icons/hi` (Heroicons), etc.

### Data & Content
- All static content (projects, stack) lives in `src/data/`
- Contact info and site constants in `src/lib/constants.ts`
- TypeScript types in `src/lib/types.ts`

## Commands
```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
```

## Design Reference
See `DESIGN.md` for color palette, typography, and component patterns.
The original design handoff is in `.design-handoff/portifolio/`.
```

- [ ] **Step 3: Create DESIGN.md**

```markdown
# DESIGN.md — Design System

## Color Palette

All colors are CSS custom properties on `:root` (dark) and `[data-theme="light"]`.

| Variable          | Dark                        | Light                       |
|-------------------|-----------------------------|-----------------------------|
| `--bg`            | `#0a0710`                   | `#f5f3fa`                   |
| `--bg-2`          | `#0f0b18`                   | `#ebe7f3`                   |
| `--panel`         | `#13101c`                   | `#ffffff`                   |
| `--panel-2`       | `#1a1628`                   | `#f8f6fc`                   |
| `--border`        | `#2a2340`                   | `#ddd5ec`                   |
| `--border-strong` | `#3d3358`                   | `#b8aed4`                   |
| `--text`          | `#e8e4f0`                   | `#1a1428`                   |
| `--text-dim`      | `#9890b0`                   | `#4a4360`                   |
| `--text-muted`    | `#6b6486`                   | `#7c7595`                   |
| `--accent`        | `oklch(0.72 0.22 60)`       | `oklch(0.55 0.22 60)`       |
| `--accent-soft`   | `oklch(... / 0.15)`         | `oklch(... / 0.10)`         |
| `--accent-glow`   | `oklch(... / 0.40)`         | `oklch(... / 0.25)`         |

Default accent is **amber** (hue 60). To change the accent color, update `--accent` in `:root`.

## Typography

- **Display font:** Space Grotesk — headings, body text  
  CSS var: `var(--font-space-grotesk)`
- **Monospace font:** Fira Code — code, labels, nav links, buttons, terminal  
  CSS var: `var(--font-fira-code)`, class: `.mono`

## Layout

- Max container width: `1180px`
- Container padding: `24px`
- Grid background: subtle purple grid `48px × 48px` via `background-image` on `<body>`

## Component Patterns

### Section Header
```tsx
<div className="section-label">nome da seção</div>
// Renders as: // nome da seção (with purple // prefix)
```

### Buttons
```tsx
<Button variant="primary">primary action</Button>   // purple glow
<Button variant="ghost">secondary action</Button>   // outline
// All buttons prepend "> " via CSS ::before
```

### Cards (About, Stack)
Corner accent brackets via `::before` (top-left) and `::after` (bottom-right) pseudo-elements.

### Project Cards
- Hover: `translateY(-4px)` + purple border + top progress bar animation
- Thumbnail: `aspect-ratio: 16/10`

### Terminal
Animated typewriter reveals lines one by one (280ms interval), then restarts after 4s pause.
Preview carousel auto-advances every 2.4s.

### Modals
Fade-in backdrop (`opacity 0 → 1`) + scale-in modal (`scale 0.96 → 1`).
Close on: × button, backdrop click, Escape key.

## Breakpoints

| Breakpoint | Change |
|------------|--------|
| ≤ 900px    | Collapse nav links, single-column hero/about/contact/footer |
| ≤ 720px    | Share modal stacks, business card adapts |
| ≤ 540px    | Stack grid 2-col, stats single-col, smaller font sizes |
```

- [ ] **Step 4: Commit**

```bash
git add README.md CLAUDE.md DESIGN.md
git commit -m "docs: add README, CLAUDE, and DESIGN documentation"
```

---

### Task 17: Final build verification

- [ ] **Step 1: Run full build**

```bash
pnpm build
```

Expected: No TypeScript errors, no ESLint errors. Build completes successfully.

- [ ] **Step 2: Start production server and verify**

```bash
pnpm start
```

Open http://localhost:3000 and verify:
- Dark theme loads by default (no flash)
- Navbar links scroll to sections
- Theme toggle switches dark ↔ light
- Terminal animates with typewriter effect
- Project cards open modal on click; carousel navigates; Escape closes
- Contact form shows success message on submit
- Footer share button opens share modal
- Business card download triggers on button click
- Mobile menu works at < 900px viewport
- All stack icons render (react-icons)

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio implementation"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Navbar with sticky, glass effect, mobile menu, theme toggle, CTA
- ✅ Hero: tag, h1, lead text, CTA buttons, animated Terminal
- ✅ About: avatar with initials, text, stats (5+, 20+, 3+)
- ✅ Stack: 6 items (Node.js, TypeScript, Python, PostgreSQL, Docker, Oracle) — react-icons/si
- ✅ Projects: 3 cards (P2A, Omnigen, SoddenBot), modal with carousel
- ✅ Contact: form with success state, code snippet
- ✅ Footer: brand, contact links, social links, share button
- ✅ Share modal: business card, download as PNG, copy link, 6 social networks
- ✅ Dark/light theme toggle with localStorage persistence and no-flash script
- ✅ react-icons throughout — no inline SVGs
- ✅ All components separated and reusable
- ✅ README.md, CLAUDE.md, DESIGN.md at project root
- ✅ pnpm throughout
- ✅ TweaksPanel excluded (design-only tool, not for production)

**Type consistency:**
- `Project` interface used in PROJECTS data, ProjectCard, ProjectModal, Projects section
- `SlideKind` union used in Project.slides and SlidePreview
- `StackName` union used in STACK data and Stack section icon map
- `Theme` used in ThemeProvider and types
