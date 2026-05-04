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
