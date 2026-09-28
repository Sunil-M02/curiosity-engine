import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getArticlesByCategory, categoryInfo, type Category } from '@/data/articles';
import { getTopicClustersByCategory, getClusterFeaturedArticle } from '@/data/topicClusters';
import { TopicClusterCard } from '@/components/topics/TopicClusterCard';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug as Category;
  const info = categoryInfo[category];
  const articles = getArticlesByCategory(category);
  const clusters = getTopicClustersByCategory(category);
  const featuredCluster = clusters[0];
  const featuredClusterArticle = featuredCluster ? getClusterFeaturedArticle(featuredCluster) : undefined;
  const remainingArticles = featuredClusterArticle
    ? articles.filter((article) => article.id !== featuredClusterArticle.id)
    : articles;

  if (!info) {
    return (
      <Layout>
        <div className="container content-rail py-20 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/" className="text-primary hover:underline">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  const baseUrl = 'https://www.curiosityfields.com';
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${info.name} Articles`,
    description: info.description,
    url: `${baseUrl}/categories/${category}`,
    isPartOf: { '@type': 'WebSite', name: 'CuriosityFields', url: baseUrl },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${baseUrl}/article/${a.slug}`,
        name: a.title,
      })),
    },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${baseUrl}/categories` },
      { '@type': 'ListItem', position: 3, name: info.name, item: `${baseUrl}/categories/${category}` },
    ],
  };

  return (
    <Layout>
      <SEO
        title={`${info.name} Articles - CuriosityFields`}
        description={info.description}
        canonical={`${baseUrl}/categories/${category}`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="container content-rail py-10 sm:py-12 lg:py-20">
        <Breadcrumbs
          items={[
            { label: 'Categories', href: '/categories' },
            { label: info.name },
          ]}
        />

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12 lg:mb-16"
        >
          <div
            className="inline-block w-12 h-1.5 rounded-full mb-5"
            style={{ backgroundColor: info.color }}
          />
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">
            {info.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            {info.description}
          </p>
          <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <span>{articles.length} articles</span>
            <span>{clusters.length} active topic clusters</span>
          </div>
        </motion.header>

        {featuredCluster && featuredClusterArticle && (
          <section className="mb-16 lg:mb-20" aria-labelledby="featured-topic-heading">
            <div className="flex items-end justify-between gap-4 mb-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                  Featured Topic
                </p>
                <h2 id="featured-topic-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  {featuredCluster.name}
                </h2>
              </div>
              <Link
                to={`/topics/${featuredCluster.slug}`}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
              >
                Explore topic
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <Link
              to={`/article/${featuredClusterArticle.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-2xl border border-border/50 bg-card/70 hover:border-primary/35 transition-[border-color,background-color] duration-300"
            >
              <div className="relative aspect-[16/9] md:aspect-auto min-h-[230px] overflow-hidden">
                <OptimizedImage
                  src={featuredClusterArticle.coverImage}
                  alt={featuredClusterArticle.title}
                  articleTitle={featuredClusterArticle.title}
                  category={featuredClusterArticle.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  {featuredCluster.articles.length} connected articles
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                  {featuredClusterArticle.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                  {featuredClusterArticle.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read the featured guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {clusters.length > 0 && (
          <section className="mb-16 lg:mb-20" aria-labelledby="topic-clusters-heading">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Explore Deeper
              </p>
              <h2 id="topic-clusters-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Topic Clusters
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Follow connected ideas instead of browsing isolated articles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {clusters.map((cluster) => (
                <TopicClusterCard
                  key={cluster.slug}
                  cluster={cluster}
                  href={`/topics/${cluster.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="latest-category-heading">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Fresh Reads
              </p>
              <h2 id="latest-category-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Latest {info.name} Articles
              </h2>
            </div>
          </div>

          {remainingArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {remainingArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No articles in this category yet. Check back soon!
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
