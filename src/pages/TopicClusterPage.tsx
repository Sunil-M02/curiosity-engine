import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { getClusterBySlug, getClusterFeaturedArticle } from '@/data/topicClusters';
import { categoryInfo } from '@/data/articles';

const TopicClusterPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? getClusterBySlug(slug) : undefined;

  if (!cluster) {
    return (
      <Layout>
        <div className="container content-rail py-20 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground mb-8">The topic you're looking for doesn't exist.</p>
          <Link to="/categories" className="text-primary hover:underline">Explore categories</Link>
        </div>
      </Layout>
    );
  }

  const article = getClusterFeaturedArticle(cluster);
  const articles = cluster.articles.filter((item) => item.id !== article?.id);
  const category = categoryInfo[cluster.category];
  const baseUrl = 'https://www.curiosityfields.com';

  return (
    <Layout>
      <SEO
        title={`${cluster.name} - CuriosityFields`}
        description={cluster.description}
        canonical={`${baseUrl}/topics/${cluster.slug}`}
      />

      <div className="container content-rail py-10 sm:py-12 lg:py-20">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/categories/${cluster.category}` },
            { label: cluster.name },
          ]}
        />

        <header className="mt-8 mb-12 lg:mb-16">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: `${category.color}25`, color: category.color }}
          >
            {category.name}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mt-5 mb-4 max-w-4xl">
            {cluster.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {cluster.description}
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            {cluster.articles.length} connected articles
          </div>
        </header>

        {article && (
          <section className="mb-16 lg:mb-20" aria-labelledby="featured-guide-heading">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Featured Guide
              </p>
              <h2 id="featured-guide-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Start here
              </h2>
            </div>

            <Link
              to={`/article/${article.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] overflow-hidden rounded-2xl border border-border/50 bg-card/70 hover:border-primary/35 transition-[border-color,background-color] duration-300"
            >
              <div className="relative aspect-[16/9] md:aspect-auto min-h-[250px] overflow-hidden">
                <OptimizedImage
                  src={article.coverImage}
                  alt={article.title}
                  articleTitle={article.title}
                  category={article.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="font-display text-2xl lg:text-3xl font-semibold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-6">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read the guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>
        )}

        <section aria-labelledby="cluster-articles-heading">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Continue Exploring
            </p>
            <h2 id="cluster-articles-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
              Articles in This Topic
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((item, index) => (
                <ArticleCard key={item.id} article={item} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">More articles will be added to this topic as the cluster grows.</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default TopicClusterPage;
