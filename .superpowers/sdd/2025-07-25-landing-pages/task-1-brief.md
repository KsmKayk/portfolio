# Task 1: Create landing pages data file

**Files:**
- Create: `src/data/landing-pages.ts`

**Interfaces:**
- Produces: `LandingPage` type and `landingPages` array consumed by Task 3

## Steps

- [ ] **Step 1: Create the data file**

Create `src/data/landing-pages.ts` with the following content:

```ts
export interface LandingPage {
  slug: string;
  title: string;
  desc: string;
  thumbnail: string;
  url: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: 'bellos',
    title: 'Barbearia Bellos',
    desc: 'Landing page completa para barbearia com agendamento via WhatsApp, cardápio de serviços, galeria e localização.',
    thumbnail: '/landing-pages/bellos/mrzf1jkv-resultado1.jpg',
    url: '/landing-pages/bellos',
  },
];
```

- [ ] **Step 2: Verify file compiles**

Run: `pnpm exec tsc --noEmit src/data/landing-pages.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/landing-pages.ts
git commit -m "feat: add landing pages data file"
```
