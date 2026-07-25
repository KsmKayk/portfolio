# Task 5: Add navbar link

**Files:**
- Modify: `src/components/layout/Navbar.tsx:17-20`

**Interfaces:**
- Consumes: Existing Navbar component
- Produces: Updated nav links array with `'landing pages'` entry

## Steps

- [ ] **Step 1: Add the landing pages link to the nav links array**

In `src/components/layout/Navbar.tsx`, change the links array from:

```tsx
{[
  ['sobre', '#sobre'],['stack', '#stack'], ['projetos', '#projetos'],
   ['contato', '#contato'],
].map(([label, href]) => (
```

To:

```tsx
{[
  ['sobre', '#sobre'],['stack', '#stack'], ['projetos', '#projetos'],
   ['landing pages', '/landing-pages'], ['contato', '#contato'],
].map(([label, href]) => (
```

- [ ] **Step 2: Verify navbar renders correctly**

Run: `pnpm dev`
Navigate to `http://localhost:3000` — verify "landing pages" link appears in the navbar.
Click the link — verify it navigates to `/landing-pages`.

- [ ] **Step 3: Run lint**

Run: `pnpm lint`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add landing pages link to navbar"
```

## Notes

- The link uses a path href (`/landing-pages`) instead of a hash
- The existing click handler `onClick={() => setNavOpen(false)}` works for both hash and path links
- No `next/link` needed — the existing `<a>` tags with `href` work for navigation
