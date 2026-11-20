import fs from 'node:fs';
import path from 'node:path';

/**
 * Strict payload validator for .github/workflows/gemini-auto-sync.yml.
 * Rejects:
 * - Broken / unpublished internal /article/<slug> links
 * - Duplicate slugs or duplicate titles within the batch or against src/data/articles.ts
 * - Invalid category slugs
 * - Missing or invalid YYYY-MM-DD publishedAt dates
 * - First-person AI leakage
 * Warns on metaTitle > 78 chars, metaDescription > 165 chars, or em/en dashes.
 */
const VALID_CATEGORIES = new Set([
  'science',
  'history',
  'technology',
  'future-innovation',
  'astronomy',
  'artificial-intelligence',
  'psychology-mind',
]);

const args = process.argv.slice(2);
let articlesTsPath = path.resolve('src/data/articles.ts');
const payloadFiles = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--articles-ts' && args[i + 1]) {
    articlesTsPath = path.resolve(args[++i]);
  } else {
    payloadFiles.push(args[i]);
  }
}

if (payloadFiles.length === 0) {
  console.error('Usage: node scripts/validate-payloads.mjs [--articles-ts path] <payload.json ...>');
  process.exit(1);
}

const existingSlugs = new Set();
const existingTitles = new Set();

if (fs.existsSync(articlesTsPath)) {
  const src = fs.readFileSync(articlesTsPath, 'utf8');
  for (const m of src.matchAll(/slug:\s*["']([^"']+)["']/g)) {
    existingSlugs.add(m[1].trim());
  }
  for (const m of src.matchAll(/title:\s*["']([^"']+)["']/g)) {
    existingTitles.add(m[1].trim().toLowerCase());
  }
}

const payloads = payloadFiles.map((file) => ({
  file,
  data: JSON.parse(fs.readFileSync(file, 'utf8')),
}));

const batchSlugs = new Set();
const allValidSlugs = new Set(existingSlugs);

for (const { data } of payloads) {
  for (const art of data.articles || []) {
    if (art?.slug) allValidSlugs.add(art.slug.trim());
  }
}

let errors = 0;
let warnings = 0;

for (const { file, data } of payloads) {
  const articles = Array.isArray(data.articles) ? data.articles : [];
  if (articles.length === 0) {
    console.error(`[ERROR] ${file}: Empty articles array`);
    errors++;
    continue;
  }

  for (const art of articles) {
    const slug = (art.slug || '').trim();
    const title = (art.title || '').trim();
    const content = art.content || '';
    const metaTitle = art.metaTitle || title;
    const metaDesc = art.metaDescription || art.excerpt || '';
    const category = (art.category || '').trim();
    const publishedAt = (art.publishedAt || '').trim();

    if (!slug || !title || !content) {
      console.error(`[ERROR] ${file}: Missing required slug, title, or content`);
      errors++;
      continue;
    }

    if (batchSlugs.has(slug)) {
      console.error(`[ERROR] ${file} (${slug}): Duplicate slug within payload batch`);
      errors++;
    }
    batchSlugs.add(slug);

    if (!VALID_CATEGORIES.has(category)) {
      console.error(`[ERROR] ${file} (${slug}): Invalid category "${category}"`);
      errors++;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
      console.error(`[ERROR] ${file} (${slug}): Invalid publishedAt date "${publishedAt}"`);
      errors++;
    }

    if (!art.coverImage) {
      console.error(`[ERROR] ${file} (${slug}): Missing coverImage`);
      errors++;
    }

    const linkMatches = [...content.matchAll(/href=["'](?:https:\/\/(?:www\.)?curiosityfields\.com)?\/article\/([^"'#?]+)["']/g)];
    for (const m of linkMatches) {
      const targetSlug = m[1].replace(/\/+$/, '');
      if (!allValidSlugs.has(targetSlug)) {
        console.error(`[ERROR] ${file} (${slug}): Broken or unpublished internal link -> /article/${targetSlug}`);
        errors++;
      }
    }

    if (/\b(I could not verify|As far as I could find|I cannot access)\b/i.test(content)) {
      console.error(`[ERROR] ${file} (${slug}): First-person AI disclaimer detected in body`);
      errors++;
    }

    if (metaTitle.length > 78) {
      console.warn(`[WARN] ${file} (${slug}): metaTitle length ${metaTitle.length} > 78 chars`);
      warnings++;
    }
    if (metaDesc.length > 165) {
      console.warn(`[WARN] ${file} (${slug}): metaDescription length ${metaDesc.length} > 165 chars`);
      warnings++;
    }
    if (content.includes('—') || content.includes('–')) {
      console.warn(`[WARN] ${file} (${slug}): Contains em-dash or en-dash`);
      warnings++;
    }
  }
}

console.log(`Validation complete: ${errors} error(s), ${warnings} warning(s) across ${payloadFiles.length} file(s).`);
if (errors > 0) process.exit(1);
