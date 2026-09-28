import { useParams, Link, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const showAll = searchParams.get('view') === 'all';
  const category = slug as Category;
  const info = categoryInfo[category];
  const articles = getArticlesByCategory(category);
  const clusters = getTopicClustersByCategory(category);
  const featuredCluster = clusters[0];
  const featuredClusterArticle = featuredCluster ? getClusterFeaturedArticle(featuredCluster) : undefined;
  const latestArticles = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const visibleArticles = showAll ? latestArticles : latestArticles.slice(0, 6);

  if (!info) {
    return <Layout><div className="container content-rail py-20 text-center"><h1 className="font-display text-4xl font-semibold mb-4">Category Not Found</h1><Link to="/" className="text-primary hover:underline">Return to Homepage</Link></div></Layout>;
  }

  const baseUrl = 'https://www.curiosityfields.com';
  const collectionJsonLd = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: `${info.name} Articles`, description: info.description, url: `${baseUrl}/categories/${category}`,
    isPartOf: { '@type': 'WebSite', name: 'CuriosityFields', url: baseUrl },
    mainEntity: { '@type': 'ItemList', numberOfItems: articles.length, itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${baseUrl}/article/${a.slug}`, name: a.title })) },
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${baseUrl}/categories` },
      { '@type': 'ListItem', position: 3, name: info.name, item: `${baseUrl}/categories/${category}` },
    ],
  };

  return (
    <Layout>
      <SEO title={`${info.name} Articles - CuriosityFields`} description={info.description} canonical={`${baseUrl}/categories/${category}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="container content-rail py-10 sm:py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }, { label: info.name }]} />

        <section className="relative mb-14 lg:mb-16 overflow-hidden rounded-[2rem] border border-border/50 bg-card/30">
          {featuredClusterArticle && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <OptimizedImage
                src={featuredClusterArticle.coverImage}
                alt=""
                category={featuredClusterArticle.category}
                articleTitle={featuredClusterArticle.title}
                lazy={false}
                className="w-full h-full object-cover opacity-20 blur-[1px] scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(222_47%_6%_/_0.72)_0%,hsl(222_47%_6%_/_0.88)_52%,hsl(222_47%_6%_/_0.98)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,hsl(38_92%_55%_/_0.10),transparent_34%)]" />
            </div>
          )}

          <div className="relative p-6 sm:p-8 lg:p-10">
            <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-10 lg:mb-12">
              <div className="inline-block w-12 h-1.5 rounded-full mb-5" style={{ backgroundColor: info.color }} />
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-4">{info.name}</h1>
              <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">{info.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span>{articles.length} articles</span><span>{clusters.length} knowledge hubs</span>
              </div>
            </motion.header>

        {featuredCluster && featuredClusterArticle && (
          <section aria-labelledby="featured-topic-heading">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Start here</p><h2 id="featured-topic-heading" className="font-display text-2xl sm:text-3xl font-semibold">{featuredCluster.name}</h2></div>
              <Link to={`/topics/${featuredCluster.slug}`} className="inline-flex items-center gap-2 text-sm text-primary">Explore hub <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <Link to={`/topics/${featuredCluster.slug}`} className="group grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-2xl border border-border/50 bg-card/70 hover:border-primary/35 transition-colors">
              <div className="relative aspect-[16/9] md:aspect-auto min-h-[230px] overflow-hidden">
                <OptimizedImage src={featuredClusterArticle.coverImage} alt={`${featuredCluster.name} knowledge hub`} articleTitle={featuredClusterArticle.title} category={featuredClusterArticle.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{featuredCluster.articles.length} connected articles</span>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">Explore {featuredCluster.name}</h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4">{featuredCluster.description}</p>
                <p className="text-sm text-muted-foreground mb-5">Featured guide: <span className="text-foreground">{featuredClusterArticle.title}</span></p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Start exploring <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          </section>
        )}
          </div>
        </section>

        {clusters.length > 0 && (
          <section className="mb-14 lg:mb-16" aria-labelledby="topic-clusters-heading">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Choose a path</p>
              <h2 id="topic-clusters-heading" className="font-display text-2xl sm:text-3xl font-semibold">Explore Knowledge Hubs</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">Follow a connected subject instead of browsing isolated articles.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {clusters.map((cluster) => <TopicClusterCard key={cluster.slug} cluster={cluster} href={`/topics/${cluster.slug}`} />)}
            </div>
          </section>
        )}

        <section aria-labelledby="latest-category-heading">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Fresh reads</p><h2 id="latest-category-heading" className="font-display text-2xl sm:text-3xl font-semibold">Latest {info.name} Articles</h2></div>
            <span className="text-xs text-muted-foreground">{articles.length} total</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleArticles.map((article, index) => <ArticleCard key={article.id} article={article} index={index} />)}
          </div>
          {!showAll && articles.length > visibleArticles.length && (
            <div className="mt-8 text-center">
              <Link to={`/categories/${category}?view=all`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
                View all {info.name} articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
