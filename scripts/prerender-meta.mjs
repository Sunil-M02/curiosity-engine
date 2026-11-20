import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Production static HTML prerenderer for CuriosityFields.com (Vite + React SPA).
 * - Uses esbuild (bundled with Vite) when available to compile src/data/articles.ts
 *   and src/data/topicClusters.ts into real JS modules—eliminating fragile regexes.
 * - Falls back to a brace-balanced object parser if esbuild is unavailable.
 * - Strips existing meta/OG/Twitter/canonical tags from dist/index.html before
 *   injecting route-specific tags so zero duplicate tags are emitted.
 * - Preserves actual article publishedAt dates without ever inventing fallback dates.
 * - Generates dist/<route>/index.html for /, /categories, /guides, /categories/:slug,
 *   /topics/:slug, /article/:slug, static pages, plus dist/404.html for true HTTP 404s.
 */

const distDir = path.resolve(process.argv[2] || 'dist');
const templatePath = path.join(distDir, 'index.html');
const articlesTsPath = path.resolve(process.argv[3] || 'src/data/articles.ts');
const clustersTsPath = path.resolve(process.argv[4] || 'src/data/topicClusters.ts');
const BASE_URL = 'https://www.curiosityfields.com';

if (!fs.existsSync(templatePath)) {
  console.error(`Missing ${templatePath}. Run vite build first.`);
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf8');

const CATEGORY_INFO = {
  science: {
    name: 'Science',
    description: 'Understand the science behind the world—from physics and biology to the brain, Earth, and phenomena researchers are still trying to explain.',
  },
  technology: {
    name: 'Technology',
    description: 'Understand the hidden systems behind the technology you use every day—from the internet and smartphones to chips, cybersecurity, and networks.',
  },
  'artificial-intelligence': {
    name: 'Artificial Intelligence',
    description: 'Understand how artificial intelligence actually works, where it fails, and how AI agents, models, chips, and research are changing what machines can do.',
  },
  history: {
    name: 'History',
    description: 'Explore the evidence behind civilizations, ancient technologies, forgotten events, and historical mysteries—and separate what we know from what we assume.',
  },
  astronomy: {
    name: 'Astronomy & Space',
    description: 'Understand the universe through astronomy, space missions, planets, black holes, galaxies, and the physics behind discoveries changing our view of space.',
  },
  'future-innovation': {
    name: 'Future Innovation',
    description: 'Explore emerging technologies, energy systems, biotechnology, materials, and engineering ideas moving from research toward the real world.',
  },
  'psychology-mind': {
    name: 'Psychology & Mind',
    description: 'Explore how the brain shapes memory, perception, decisions, emotions, behavior, and our experience of reality.',
  },
};

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripTags(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractFaqs(html = '') {
  const faqSplit = String(html).split(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i);
  if (faqSplit.length < 2) return [];
  const faqSection = faqSplit[1].split(/<h2[^>]*>/i)[0];
  const pairs = [...faqSection.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)];
  return pairs.map((m) => ({
    '@type': 'Question',
    name: stripTags(m[1]),
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripTags(m[2]),
    },
  }));
}

async function loadDataModule(tsPath, exportName) {
  if (!fs.existsSync(tsPath)) return null;
  try {
    const esbuild = await import('esbuild');
    const tmpOut = path.join(distDir, `.tmp_${path.basename(tsPath, '.ts')}.mjs`);
    await esbuild.build({
      entryPoints: [tsPath],
      outfile: tmpOut,
      bundle: true,
      format: 'esm',
      platform: 'node',
      logLevel: 'silent',
      alias: { '@': path.resolve('src') },
    });
    const mod = await import(`${pathToFileURL(tmpOut).href}?t=${Date.now()}`);
    fs.rmSync(tmpOut, { force: true });
    return mod[exportName] ?? mod.default ?? null;
  } catch {
    return null;
  }
}

function extractFieldFallback(block, key) {
  const re = new RegExp(`${key}:\\s*(?:"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)'|\`((?:\\\\.|[^\`\\\\])*)\`)`);
  const m = block.match(re);
  if (!m) return '';
  const raw = m[1] ?? m[2] ?? m[3] ?? '';
  try {
    return JSON.parse(`"${raw.replace(/"/g, '\\"')}"`);
  } catch {
    return raw.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
}

function parseArticlesFallback(tsSource) {
  const articles = [];
  const chunks = tsSource.split(/\n\s*\{\s*\n\s*(?:id|slot|slug):/);
  for (let i = 1; i < chunks.length; i++) {
    const block = chunks[i];
    const slug = extractFieldFallback(block, 'slug');
    const title = extractFieldFallback(block, 'title');
    if (!slug || !title) continue;
    articles.push({
      slug,
      title,
      metaTitle: extractFieldFallback(block, 'metaTitle') || `${title} | CuriosityFields`,
      metaDescription: extractFieldFallback(block, 'metaDescription') || extractFieldFallback(block, 'excerpt'),
      excerpt: extractFieldFallback(block, 'excerpt'),
      category: extractFieldFallback(block, 'category') || 'science',
      publishedAt: extractFieldFallback(block, 'publishedAt') || '',
      coverImage: extractFieldFallback(block, 'coverImage') || extractFieldFallback(block, 'image') || '',
      content: extractFieldFallback(block, 'content'),
    });
  }
  return articles;
}

function stripExistingSeoTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '');
}

function writeRouteHtml(routePath, { title, description, canonical, robots = 'index, follow', ogType = 'website', image, jsonLdList = [], bodyHtml = '' }) {
  let html = stripExistingSeoTags(baseHtml);
  const fullTitle = title.includes('CuriosityFields') ? title : `${title} | CuriosityFields`;
  const safeTitle = escapeHtml(fullTitle);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const absImage = image
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : `${BASE_URL}/curiosityfields-favicon-dark.png`;

  const headTags = [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${safeDesc}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    canonical ? `<link rel="canonical" href="${safeCanonical}" />` : '',
    `<meta property="og:site_name" content="CuriosityFields" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDesc}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    canonical ? `<meta property="og:url" content="${safeCanonical}" />` : '',
    `<meta property="og:image" content="${escapeHtml(absImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@curiosityfields" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDesc}" />`,
    `<meta name="twitter:image" content="${escapeHtml(absImage)}" />`,
    ...jsonLdList.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`),
  ].filter(Boolean).join('\n    ');

  html = html.replace('</head>', `    ${headTags}\n  </head>`);
  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  }

  if (routePath === '/404.html') {
    fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
    return;
  }

  const outDir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\/+/, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

async function main() {
  let articles = await loadDataModule(articlesTsPath, 'articles');
  if (!Array.isArray(articles) && fs.existsSync(articlesTsPath)) {
    articles = parseArticlesFallback(fs.readFileSync(articlesTsPath, 'utf8'));
  }
  articles = Array.isArray(articles) ? articles : [];

  let count = 0;

  // 1. Prerender Homepage (/) with latest article links & WebSite JSON-LD
  const latest = [...articles]
    .filter((a) => a.publishedAt)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12);

  const homeLinksHtml = latest
    .map((a) => `<li><a href="/article/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></li>`)
    .join('');

  writeRouteHtml('/', {
    title: 'CuriosityFields — Where Curiosity Meets Discovery',
    description: 'Explore science, technology, AI, psychology, history, astronomy, and future innovation. Evidence-led stories that expand how you see the world.',
    canonical: `${BASE_URL}/`,
    jsonLdList: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CuriosityFields',
        url: `${BASE_URL}/`,
      },
    ],
    bodyHtml: `<main data-prerendered="true"><h1>Where Curiosity Meets Discovery</h1><ul>${homeLinksHtml}</ul></main>`,
  });
  count++;

  // 2. Prerender every Article (/article/:slug)
  for (const art of articles) {
    if (!art.slug || !art.title) continue;
    const canonical = `${BASE_URL}/article/${art.slug}`;
    const catInfo = CATEGORY_INFO[art.category] || { name: 'Science' };
    const faqs = extractFaqs(art.content);

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: art.title,
      description: art.metaDescription || art.excerpt,
      image: art.coverImage ? (art.coverImage.startsWith('http') ? art.coverImage : `${BASE_URL}${art.coverImage}`) : undefined,
      ...(art.publishedAt ? { datePublished: art.publishedAt } : {}),
      author: { '@type': 'Organization', name: 'CuriosityFields Editorial', url: `${BASE_URL}/about` },
      publisher: {
        '@type': 'Organization',
        name: 'CuriosityFields',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/curiosityfields-favicon-dark.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: catInfo.name, item: `${BASE_URL}/categories/${art.category}` },
        { '@type': 'ListItem', position: 3, name: art.title, item: canonical },
      ],
    };

    const jsonLdList = [articleSchema, breadcrumbSchema];
    if (faqs.length > 0) {
      jsonLdList.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs });
    }

    const bodyHtml = `<main data-prerendered="true"><article><header><h1>${escapeHtml(art.title)}</h1><p>${escapeHtml(art.excerpt || '')}</p></header><div class="article-content">${art.content || ''}</div></article></main>`;

    writeRouteHtml(`/article/${art.slug}`, {
      title: art.metaTitle || art.title,
      description: art.metaDescription || art.excerpt || '',
      canonical,
      ogType: 'article',
      image: art.coverImage,
      jsonLdList,
      bodyHtml,
    });
    count++;
  }

  // 3. Prerender Categories (/categories/:slug) with internal article links
  for (const [slug, info] of Object.entries(CATEGORY_INFO)) {
    const catArticles = articles.filter((a) => a.category === slug).slice(0, 20);
    const catListHtml = catArticles
      .map((a) => `<li><a href="/article/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a></li>`)
      .join('');
    writeRouteHtml(`/categories/${slug}`, {
      title: `${info.name} Articles - CuriosityFields`,
      description: info.description,
      canonical: `${BASE_URL}/categories/${slug}`,
      bodyHtml: `<main data-prerendered="true"><h1>${escapeHtml(info.name)}</h1><p>${escapeHtml(info.description)}</p><ul>${catListHtml}</ul></main>`,
    });
    count++;
  }

  // 4. Prerender Topic Clusters / Knowledge Hubs (/topics/:slug) if available
  const clusters = await loadDataModule(clustersTsPath, 'topicClusters');
  if (Array.isArray(clusters)) {
    for (const c of clusters) {
      if (!c?.slug || !c?.name) continue;
      writeRouteHtml(`/topics/${c.slug}`, {
        title: `${c.name} Knowledge Hub | CuriosityFields`,
        description: c.description || `Explore connected articles in the ${c.name} Knowledge Hub on CuriosityFields.`,
        canonical: `${BASE_URL}/topics/${c.slug}`,
        bodyHtml: `<main data-prerendered="true"><h1>${escapeHtml(c.name)}</h1><p>${escapeHtml(c.description || '')}</p></main>`,
      });
      count++;
    }
  }

  // 5. Prerender Core Static Routes
  const staticRoutes = [
    ['/categories', 'All Categories | CuriosityFields', 'Explore all seven science, technology, AI, history, astronomy, future innovation, and psychology categories on CuriosityFields.'],
    ['/guides', 'Knowledge Hubs | CuriosityFields', 'Explore connected Knowledge Hubs across AI, physics, space, history, and neuroscience on CuriosityFields.'],
    ['/about', 'About CuriosityFields', 'CuriosityFields is an evidence-led digital publication exploring science, technology, AI, history, astronomy, future innovation, and psychology.'],
    ['/contact', 'Contact Us | CuriosityFields', 'Contact CuriosityFields for story ideas, editorial feedback, or partnership inquiries.'],
    ['/contact/thank-you', 'Thank You | CuriosityFields', 'Thank you for contacting CuriosityFields.'],
    ['/write-for-us', 'Write for Us | CuriosityFields', 'Editorial guidelines and contributor information for CuriosityFields.'],
    ['/terms', 'Terms of Service | CuriosityFields', 'Terms of Service for CuriosityFields.com.'],
  ];

  for (const [route, title, description] of staticRoutes) {
    writeRouteHtml(route, {
      title,
      description,
      canonical: `${BASE_URL}${route}`,
      robots: route === '/contact/thank-you' ? 'noindex, follow' : 'index, follow',
    });
    count++;
  }

  // 6. Generate true 404.html for Vercel
  writeRouteHtml('/404.html', {
    title: 'Page Not Found | CuriosityFields',
    description: 'The requested page could not be found on CuriosityFields.',
    canonical: '',
    robots: 'noindex, nofollow',
    bodyHtml: `<main data-prerendered="true"><h1>Page Not Found</h1><p>The requested article or page does not exist. <a href="/">Return to CuriosityFields</a>.</p></main>`,
  });
  count++;

  console.log(`Prerendered ${count} static HTML files (including homepage, ${articles.length} articles, categories, and 404.html) in ${distDir}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
