# CuriosityFields.com — Round 3 SEO Implementation Manifest & GitHub Desktop Guide (2026-11-28)

## 1. Implementation Mode & Baseline Verification
- **Delivery Method:** Complete Implementation ZIP (GitHub write integration unavailable in runtime).
- **Authoritative Source Used:** `curiosity-engine.zip` from `main` (`319` articles through Nov 21, 2026, confirming PR #35 and PR #36 changes are already present in `main`: `package.json` prerender build, `ArticlePage.tsx` `Article`+`BreadcrumbList`+`FAQPage` schema, `getEditorsPickArticles()`, Oct 12 disclaimer removal, and all 10 Round 2 optimized articles).
- **Safeguards Preserved:** All `319` existing URLs, `publishedAt` dates, image paths (`public/images/`), redirects, and daily publishing automation are preserved untouched. No completed PR #35 or PR #36 work was repeated.

## 2. Modified Repository Files (3 Files)
1. `public/sitemap.xml` — Replaced 2 dead slugs sitting in GSC `Discovered - currently not indexed` (`ai-safety-disclosure-gap-model-releases` and `basal-ganglia-damage-strategic-learning`) with their exact live canonical slugs (`ai-model-safety-reports-disclosure-gap-explained` and `basal-ganglia-damage-strategic-thinking-brain-study`). **Result:** `332` canonical URLs, `0` live articles missing, `0` dead sitemap articles.
2. `vercel.json` — Added permanent `301` redirects from `/article/ai-safety-disclosure-gap-model-releases` → `/article/ai-model-safety-reports-disclosure-gap-explained` and `/article/basal-ganglia-damage-strategic-learning` → `/article/basal-ganglia-damage-strategic-thinking-brain-study` to consolidate crawl equity.
3. `src/data/articles.ts` — Applied three targeted upgrades:
   - **Repaired all 7 broken internal links** introduced by the Nov 21 auto-sync (`abydos-skulls-royal-retainer-sacrifice` and `bounded-error-learning-quantum-simulators`) → **`0` broken internal links across all `1,503` links in `319` articles**.
   - **Added 30 contextual internal links** connecting high-performing/indexed articles to high-value unindexed older articles (`Crawled - currently not indexed` and `Discovered - currently not indexed`) plus reciprocal topical links.
   - **Optimized 6 untouched high-opportunity GSC articles** (`openclaw-the-ai-agent-that-actually-does-things`, `2026-rise-of-agentic-ai-autonomous-agents-automation`, `illusion-of-explanatory-depth-explained`, `the-quantum-revolution-reshaping-computing`, `fine-tuning-ai-safety-dangerous-capabilities`, `nobody-invented-internet-distributed-history-biggest-network`).

## 3. Exact Internal-Link Additions (Source → Destination)
See `round3_manifest.json` inside this ZIP for the full machine-readable list of all `30` added contextual internal links and `7` repaired Nov 21 broken links. Key recovery pathways include:
- `james-webb-telescope-discoveries-changing-astronomy` → `fermi-paradox-solutions-explained` (`475` impr, `Crawled - currently not indexed`)
- `dark-energy-weakening-desi-evidence-explained` → `fermi-paradox-solutions-explained` & `cosmic-microwave-background-oldest-light-explained` (`38` impr)
- `agentic-commerce-ai-agents-checkout-payment-rails-2026` → `openclaw-the-ai-agent-that-actually-does-things` (`120` impr) & `2026-rise-of-agentic-ai-autonomous-agents-automation` (`44` impr)
- `prompt-injection-attacks-ai-agents-security-explained` → `openclaw-the-ai-agent-that-actually-does-things` & `fine-tuning-ai-safety-dangerous-capabilities`
- `how-dns-finds-websites-without-server-location` & `how-undersea-cable-repeaters-amplify-signals` → `nobody-invented-internet-distributed-history-biggest-network` (`46` impr)
- `anthrobots-human-cells-self-assembling-living-machines` → `cultivated-meat-regulatory-approval-by-country` (`37` impr)
- `confirmation-bias-news-feed-psychology` → `illusion-of-explanatory-depth-explained` (`30` impr, pos `12.1`)
- `pulsar-timing-array-gravitational-wave-background` → `long-period-radio-transients-unexplained-signals` (`18` impr, `1` click)
- `what-if-ageing-could-be-reversed-biology-longevity-research` → `ageing-physics-problem-entropy-theory-cellular-decline` (`11` impr, `Discovered - currently not indexed`)
- `multi-scale-network-sampling-1996-shortest-path-limit` → `traffic-light-timing-algorithms-400000-signals` (pos `2.0`, `Discovered - currently not indexed`)

## 4. Validation Results (Honest Pass / Not-Run Breakdown)
- **PASSED — Prerenderer (`scripts/prerender-meta.mjs`):** Prerendered `335` static HTML files (`/` + `319` articles + categories + static pages + `404.html`). All 6 newly optimized + 2 restored sitemap articles verified with `Article` + `BreadcrumbList` JSON-LD, `0` duplicate `<title>`/`canonical` tags, and `data-prerendered="true"` HTML.
- **PASSED — Internal Link Audit (`src/data/articles.ts`):** `1,503` internal links across `319` articles → **`0` broken links remaining**.
- **PASSED — Sitemap & Redirects:** `public/sitemap.xml` has `332` canonical URLs (`0` missing live articles, `0` dead slugs); `vercel.json` is valid JSON with 4 permanent redirects.
- **NOT RUN IN VM (Run Locally Before Pushing):**
  1. `npm run build` (`vite build` + TypeScript compilation): `node_modules/` was excluded from the uploaded ZIP and outbound `npm install` is disabled in the VM.
  2. Live HTTP status & `public/images/` asset verification: `public/images/` was excluded from the ZIP and live production HTTP probing is unavailable in the offline VM.

## 5. GitHub Desktop Implementation Instructions
1. Open **GitHub Desktop**, select `Sunil-M02/curiosity-engine`, switch to `main`, and click **Fetch origin / Pull origin**.
2. Create a new branch: `feat/seo-indexing-recovery-2026-11-28`.
3. Extract `curiosity_engine_round3_seo_implementation_2026-11-28.zip` directly into your local `curiosity-engine` folder, choosing **Replace** for `public/sitemap.xml`, `vercel.json`, and `src/data/articles.ts`.
4. Open Terminal (**Repository → Open in Terminal**) and run:
   ```bash
   npm run build
   ```
5. Confirm zero Vite/TypeScript errors and verify `dist/article/openclaw-the-ai-agent-that-actually-does-things/index.html` and `dist/404.html` exist.
6. In **GitHub Desktop**, review the diff on the 3 modified files, commit (`feat(seo): fix sitemap dead slugs, add 301 redirects, repair 7 Nov 21 links, add 30 recovery links & optimize 6 GSC articles`), publish the branch, open a PR, verify the Vercel preview, and merge when satisfied.
7. After merging to `main`, re-submit `https://www.curiosityfields.com/sitemap.xml` in Google Search Console (note: internal links and sitemap fixes improve crawl discovery and consolidation, but Google independently controls recrawling and indexing timelines).
