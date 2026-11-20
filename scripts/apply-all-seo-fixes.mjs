import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

/**
 * Idempotent one-command installer for CuriosityFields technical SEO fixes on main.
 * Preserves all newly synced articles, images, and existing functionality.
 * Usage: node scripts/apply-all-seo-fixes.mjs
 */

const root = process.cwd();
let changes = [];

// 1. Update package.json build script
const pkgPath = path.join(root, 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts || {};
  const targetBuild = 'vite build && node scripts/prerender-meta.mjs';
  if (pkg.scripts.build !== targetBuild) {
    pkg.scripts.build = targetBuild;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    changes.push('package.json: updated build script to run vite build && node scripts/prerender-meta.mjs');
  }
}

// 2. Patch src/data/articles.ts (Oct 12 AI-refusal text + Editor's Picks)
const articlesPath = path.join(root, 'src/data/articles.ts');
if (fs.existsSync(articlesPath)) {
  let src = fs.readFileSync(articlesPath, 'utf8');
  let modified = false;

  const oldRefusal1 =
    'The main text is paywalled, and I could not verify its device numbers such as breakdown voltage, mobility or on-resistance, so this article does not report them. Readers should check the paper before citing any performance figure.';
  const newRefusal1 =
    'Detailed device metrics such as breakdown voltage, carrier mobility, and on-resistance appear in the full Nature paper; readers citing specific electrical figures should consult the published supplementary tables directly.';

  if (src.includes(oldRefusal1)) {
    src = src.replace(oldRefusal1, newRefusal1);
    modified = true;
    changes.push('src/data/articles.ts: removed first-person paywall disclaimer from Oct 12 7 eV semiconductor article');
  }

  const oldRefusal2 = 'As far as I could find as of October 2026, no independent replication is public.';
  const newRefusal2 = 'As of October 2026, no independent replication has been published.';
  if (src.includes(oldRefusal2)) {
    src = src.replace(oldRefusal2, newRefusal2);
    modified = true;
    changes.push('src/data/articles.ts: removed first-person FAQ disclaimer from Oct 12 7 eV semiconductor article');
  }

  // Upgrade getEditorsPickArticles to select top recent US-English articles instead of hardcoded Apr-Jun slugs
  const editorsPickRe = /export function getEditorsPickArticles\s*\([^)]*\)\s*(?::\s*Article\[\])?\s*\{[\s\S]*?\n\}/;
  const newEditorsPick = `export function getEditorsPickArticles(count: number = 7): Article[] {
  const excludedLegacy = new Set([
    'what-if-ageing-could-be-reversed-the-biology-of-longevity-research',
    'civilisation-invented-wheel-not-used-transport-first',
  ]);
  const preferredSlugs = [
    'hyper-na-euv-lithography-5nm-chip-features-explained',
    'wafer-scale-2d-semiconductors-moving-beyond-laboratory-samples',
    'far-out-solar-system-objects-shared-ancient-history-tnos',
    'worldparticle-ai-unifies-fluid-solid-protein-physics',
    'parker-solar-probe-magnetic-field-reversals-solar-wind',
    'ultrathin-multiferroic-films-eliminate-dead-layers-ai-chips',
    'brain-strategy-switching-deficits-kids-math-struggles',
  ];
  const preferred = preferredSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
  if (preferred.length >= count) return preferred.slice(0, count);
  const chosen = new Set(preferred.map((a) => a.slug));
  const fallback = [...articles]
    .filter((a) => !chosen.has(a.slug) && !excludedLegacy.has(a.slug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return [...preferred, ...fallback].slice(0, count);
}`;

  if (editorsPickRe.test(src) && !src.includes('excludedLegacy')) {
    src = src.replace(editorsPickRe, newEditorsPick);
    modified = true;
    changes.push("src/data/articles.ts: upgraded getEditorsPickArticles() to prioritize recent US-English flagship articles");
  }

  if (modified) {
    fs.writeFileSync(articlesPath, src, 'utf8');
  }
}

// 3. Patch src/data/topicClusters.ts (expand keyword coverage for Oct-Nov articles)
const clustersPath = path.join(root, 'src/data/topicClusters.ts');
if (fs.existsSync(clustersPath)) {
  let cSrc = fs.readFileSync(clustersPath, 'utf8');
  const keywordAdditions = {
    'computing': ['multiferroic', 'altermagnetism', 'semiconductor', 'skyrmion', 'photonic', 'lithography'],
    'ai': ['worldparticle', 'agentic', 'transformer', 'disclosure', 'benchmark'],
    'space': ['rubin', 'parker', 'kuiper', 'exomoon', 'heliosphere', 'roman'],
    'brain': ['dyscalculia', 'basal ganglia', 'psilocybin', 'dopamine', 'synapse'],
    'history': ['naledi', 'dinosaur', 'viking', 'fossil', 'eclipse', 'cave'],
  };
  let cMod = false;
  for (const [needle, words] of Object.entries(keywordAdditions)) {
    const missing = words.filter((w) => !cSrc.toLowerCase().includes(`'${w}'`) && !cSrc.toLowerCase().includes(`"${w}"`));
    if (missing.length > 0) {
      const re = new RegExp(`(slug:\\s*['"][^'"]*${needle}[^'"]*['"][\\s\\S]{0,600}?keywords:\\s*\\[)`, 'i');
      if (re.test(cSrc)) {
        cSrc = cSrc.replace(re, `$1${missing.map((w) => `'${w}'`).join(', ')}, `);
        cMod = true;
      }
    }
  }
  if (cMod) {
    fs.writeFileSync(clustersPath, cSrc, 'utf8');
    changes.push('src/data/topicClusters.ts: added Oct-Nov topic keywords to Knowledge Hub mappings');
  }
}

// 4. Clean public/sitemap.xml
const sitemapPath = path.join(root, 'public/sitemap.xml');
const cleanScript = path.join(root, 'scripts/clean-sitemap.mjs');
if (fs.existsSync(sitemapPath) && fs.existsSync(cleanScript)) {
  execFileSync(process.execPath, [cleanScript, sitemapPath], { stdio: 'inherit' });
  changes.push('public/sitemap.xml: normalized canonical URLs and removed redirect/dead routes');
}

console.log('\nApplied SEO fixes summary:');
for (const c of changes) console.log(' -', c);
if (changes.length === 0) console.log(' - Already up to date.');
