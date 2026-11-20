# CuriosityFields (`Sunil-M02/curiosity-engine`) — Feature Branch Deployment & Sync Guide

## 1. Apply the Patch Bundle in a Feature Branch
```bash
git checkout -b fix/seo-ssg-prerender-2026-11-16
unzip -o curiosity_engine_seo_patches_v2_2026-11-16.zip -d .
```

## 2. Update `package.json` Build Script
In `package.json`, update `"build"` so Vite builds the split chunks and `prerender-meta.mjs` generates static HTML + `404.html`:
```json
"build": "vite build && node scripts/prerender-meta.mjs"
```

## 3. Clean `public/sitemap.xml`
Run once to remove `/category/*` redirects, dead `/editorial-policy` & `/privacy` routes, and duplicate/non-www URLs:
```bash
node scripts/clean-sitemap.mjs public/sitemap.xml
```

## 4. Wire Payload Validation into `.github/workflows/gemini-auto-sync.yml`
Before the commit/push step in `gemini-auto-sync.yml`, add:
```yaml
- name: Validate incoming payloads against published slugs
  run: node scripts/validate-payloads.mjs --articles-ts src/data/articles.ts downloaded_payloads/*.json
```

## 5. Build, Verify & Deploy
```bash
npm run build
ls -la dist/404.html dist/article/ | head -n 20
git add -A
git commit -m "feat(seo): add SSG prerendering, route lazy-loading, vercel.json true 404s, schema & payload validation"
git push -u origin fix/seo-ssg-prerender-2026-11-16
```
Inspect the Vercel Preview URL:
1. Verify `curl -sI https://<preview-url>/article/worldparticle-ai-unifies-fluid-solid-protein-physics` returns `HTTP/2 200` and `curl -s` contains `<link rel="canonical"`, `"@type":"Article"`, `"@type":"BreadcrumbList"`, and `data-prerendered="true"`.
2. Verify `curl -sI https://<preview-url>/nonexistent-test-slug` returns `HTTP/2 404` (not `200`).
3. Verify `curl -sI https://<preview-url>/category/science` returns `308`/`301` to `/categories/science`.
4. Merge PR into `main` after Vercel Preview passes.
