import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  robots?: string;
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({
  title,
  description,
  canonical,
  type = 'website',
  image = 'https://www.curiosityfields.com/curiosityfields-favicon-dark.png',
  robots,
  noIndex = false,
  article,
  jsonLd,
}: SEOProps) {
  const siteName = 'CuriosityFields';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const robotsContent = noIndex ? 'noindex, follow' : (robots || 'index, follow');
  const absImage = image.startsWith('http') ? image : `https://www.curiosityfields.com${image}`;
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {robotsContent && <meta name="robots" content={robotsContent} />}

      <link rel="icon" type="image/png" sizes="64x64" href="/curiosityfields-favicon-dark.png?v=20261008" />
      <link rel="shortcut icon" type="image/png" href="/curiosityfields-favicon-dark.png?v=20261008" />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={absImage} />
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@curiosityfields" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />

      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          <meta property="article:publisher" content="CuriosityFields" />
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {jsonLdItems.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
