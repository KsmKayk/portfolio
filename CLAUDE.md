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
