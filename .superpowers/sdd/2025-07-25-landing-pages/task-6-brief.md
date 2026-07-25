# Task 6: Verify everything works end-to-end

**Files:**
- No new files

**Interfaces:**
- Consumes: All previous tasks (1-5)
- Produces: Verified working feature

## Steps

- [ ] **Step 1: Build production bundle**

Run: `pnpm build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: No new lint errors (pre-existing errors are acceptable)

- [ ] **Step 3: Manual E2E verification**

Run: `pnpm dev`

1. Navigate to `http://localhost:3000` — verify "landing pages" link appears in navbar
2. Click "landing pages" — verify listing page renders with Bellos card
3. Verify card shows thumbnail, title, description, and link
4. Click Bellos card — verify standalone page loads at `/landing-pages/bellos`
5. Verify bellos page has its own nav, theme toggle, DM Sans + Playfair Display fonts
6. Verify bellos assets load (logo, video, images)
7. Navigate back to portfolio via browser back button

- [ ] **Step 4: Final commit (if any fixes needed)**

If any fixes were made during verification:

```bash
git add -A
git commit -m "fix: address issues from E2E verification"
```

## Notes

- This task is about verification, not implementation
- If the build or lint fails, investigate and fix the issue
- Pre-existing lint errors (48 errors noted in Task 5) are not caused by this feature
- The bellos page is a standalone HTML file — it won't have the portfolio's Navbar/Footer
