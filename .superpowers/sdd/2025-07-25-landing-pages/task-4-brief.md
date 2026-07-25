# Task 4: Add landing pages CSS styles

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Existing CSS custom properties (`--panel`, `--border`, `--bg-2`, `--accent`, `--accent-glow`, `--text-dim`, `--font-fira-code`) and classes (`.container`, `.section-label`)
- Produces: New `.lp-*` classes for the listing page

## Steps

- [ ] **Step 1: Add landing pages section styles**

Add the following CSS block at the end of `src/app/globals.css`, **before** the responsive media query sections (before the `@media (max-width: 900px)` block around line 506):

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

- [ ] **Step 2: Add responsive overrides inside the existing `@media (max-width: 900px)` block**

Inside the existing `@media (max-width: 900px)` block (which already has `.nav-links`, `.hero-grid`, `.about-grid`, etc.), add:

```css
.lp-grid { grid-template-columns: 1fr; }
```

- [ ] **Step 3: Add a new media query for tablet breakpoint**

Add this new block right after the `@media (max-width: 900px)` block:

```css
@media (min-width: 901px) and (max-width: 1100px) {
  .lp-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 4: Verify styles load**

Run: `pnpm dev`
Navigate to `http://localhost:3000/landing-pages` — verify the page renders with styled cards in a 3-column grid (desktop), 2-column (tablet), 1-column (mobile).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add landing pages section styles"
```

## Notes

- The card styles are modeled after the existing `.project-card` styles (same hover effect, accent bar, panel background)
- The `lp-card-link` uses the same Fira Code monospace style as other labels
- The responsive breakpoints match the existing ones: 900px for mobile, 1100px for tablet
