import fs from 'node:fs';
import path from 'node:path';

/**
 * Cleans public/sitemap.xml by:
 * 1. Replacing legacy /category/* redirect URLs with canonical /categories/*
 * 2. Removing dead routes (/editorial-policy, /privacy) and placeholder slugs (published-2026-*)
 * 3. Normalizing https://curiosityfields.com -> https://www.curiosityfields.com and stripping trailing slashes
 * 4. Deduplicating <loc> entries
 */
const sitemapPath = path.resolve(process.argv[2] || 'public/sitemap.xml');
const raw = fs.readFileSync(sitemapPath, 'utf8');

const urlBlocks = [...raw.matchAll(/<url>([\s\S]*?)<\/url>/g)];
const seen = new Set();
const cleanedBlocks = [];

for (const match of urlBlocks) {
  const block = match[1];
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) continue;

  let loc = locMatch[1].trim();
  loc = loc.replace(/^https?:\/\/curiosityfields\.com\b/, 'https://www.curiosityfields.com');
  loc = loc.replace('/category/', '/categories/');
  if (loc !== 'https://www.curiosityfields.com/') {
    loc = loc.replace(/\/+$/, '');
  }

  if (
    loc.endsWith('/editorial-policy') ||
    loc.endsWith('/privacy') ||
    loc.includes('/published-2026-')
  ) {
    continue;
  }

  if (seen.has(loc)) continue;
  seen.add(loc);

  const updatedBlock = block.replace(/<loc>.*?<\/loc>/, `<loc>${loc}</loc>`);
  cleanedBlocks.push(`  <url>${updatedBlock.trimEnd()}\n  </url>`);
}

const out = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${cleanedBlocks.join('\n')}\n</urlset>\n`;
fs.writeFileSync(sitemapPath, out, 'utf8');
console.log(`Cleaned sitemap.xml: ${urlBlocks.length} -> ${cleanedBlocks.length} unique canonical URLs.`);
