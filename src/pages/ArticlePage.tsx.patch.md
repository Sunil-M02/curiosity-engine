# Patch for `src/pages/ArticlePage.tsx` (Article + BreadcrumbList + FAQPage Schema)

Replace the existing `articleJsonLd` block and `<SEO ... />` + `<script type="application/ld+json">` in `src/pages/ArticlePage.tsx` with the following:

```tsx
  const canonicalUrl = `https://www.curiosityfields.com/article/${article.slug}`;
  const categoryName = categoryInfo[article.category].name;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.coverImage.startsWith('http')
      ? article.coverImage
      : `https://www.curiosityfields.com${article.coverImage}`,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'CuriosityFields Editorial',
      url: 'https://www.curiosityfields.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CuriosityFields',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.curiosityfields.com/curiosityfields-favicon-dark.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.curiosityfields.com/' },
      { '@type': 'ListItem', position: 2, name: categoryName, item: `https://www.curiosityfields.com/categories/${article.category}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  // Extract FAQPage schema if the article contains <h2>Frequently Asked Questions</h2>
  const faqPairs = useMemo(() => {
    const split = article.content.split(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i);
    if (split.length < 2) return [];
    const section = split[1].split(/<h2[^>]*>/i)[0];
    return [...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => ({
      '@type': 'Question',
      name: m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      },
    }));
  }, [article.content]);

  const faqJsonLd = faqPairs.length > 0
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqPairs }
    : null;
```

Then pass `jsonLd` directly into `<SEO>` (which now renders `<script type="application/ld+json">` inside `<Helmet>`) and remove the standalone `<script type="application/ld+json">` tag from JSX:

```tsx
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        canonical={canonicalUrl}
        type="article"
        image={article.coverImage}
        article={{
          publishedTime: article.publishedAt,
          section: categoryName,
          tags: article.tags,
        }}
        jsonLd={[articleJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]}
      />
```
