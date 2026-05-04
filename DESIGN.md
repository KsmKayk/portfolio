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
- Grid background: subtle amber grid `48px × 48px` via `background-image` on `<body>`

## Component Patterns

### Section Header
```tsx
<div className="section-label">nome da seção</div>
// Renders as: // nome da seção (with amber // prefix)
```

### Buttons
```tsx
<Button variant="primary">primary action</Button>   // amber glow
<Button variant="ghost">secondary action</Button>   // outline
// All buttons prepend "> " via CSS ::before
```

### Cards (About, Stack)
Corner accent brackets via `::before` (top-left) and `::after` (bottom-right) pseudo-elements.

### Project Cards
- Hover: `translateY(-4px)` + amber border + top progress bar animation
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
