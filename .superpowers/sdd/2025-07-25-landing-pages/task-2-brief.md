# Task 2: Copy Bellos static files to public/

**Files:**
- Create: `public/landing-pages/bellos/index.html` (copy from `bellos/index.html`)
- Create: `public/landing-pages/bellos/mrzga072-logoa.svg` (copy from `bellos/mrzga072-logoa.svg`)
- Create: `public/landing-pages/bellos/mrzf1jj2-processo.mp4` (copy from `bellos/mrzf1jj2-processo.mp4`)
- Create: `public/landing-pages/bellos/mrzf1jkv-resultado1.jpg` (copy from `bellos/mrzf1jkv-resultado1.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jkt-resultado2.jpg` (copy from `bellos/mrzf1jkt-resultado2.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jj1-resultado3.jpg` (copy from `bellos/mrzf1jj1-resultado3.jpg`)
- Create: `public/landing-pages/bellos/mrzf1jky-equipe.jpg` (copy from `bellos/mrzf1jky-equipe.jpg`)

**Interfaces:**
- Consumes: `bellos/` directory at project root
- Produces: Static files at `public/landing-pages/bellos/` for Task 3 card thumbnails and direct browsing

## Steps

- [ ] **Step 1: Create directory and copy files**

```powershell
New-Item -ItemType Directory -Path "public\landing-pages\bellos" -Force
Copy-Item "bellos\index.html" "public\landing-pages\bellos\index.html"
Copy-Item "bellos\mrzga072-logoa.svg" "public\landing-pages\bellos\mrzga072-logoa.svg"
Copy-Item "bellos\mrzf1jj2-processo.mp4" "public\landing-pages\bellos\mrzf1jj2-processo.mp4"
Copy-Item "bellos\mrzf1jkv-resultado1.jpg" "public\landing-pages\bellos\mrzf1jkv-resultado1.jpg"
Copy-Item "bellos\mrzf1jkt-resultado2.jpg" "public\landing-pages\bellos\mrzf1jkt-resultado2.jpg"
Copy-Item "bellos\mrzf1jj1-resultado3.jpg" "public\landing-pages\bellos\mrzf1jj1-resultado3.jpg"
Copy-Item "bellos\mrzf1jky-equipe.jpg" "public\landing-pages\bellos\mrzf1jky-equipe.jpg"
```

- [ ] **Step 2: Verify files exist**

```powershell
Get-ChildItem "public\landing-pages\bellos" | Select-Object Name
```

Expected: 7 files listed

- [ ] **Step 3: Commit**

```bash
git add public/landing-pages/bellos/
git commit -m "feat: add Bellos landing page static assets"
```
