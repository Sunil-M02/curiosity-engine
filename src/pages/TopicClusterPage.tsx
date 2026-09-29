import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { getActiveTopicClusters, getClusterBySlug, getClusterFeaturedArticle } from '@/data/topicClusters';
import { categoryInfo } from '@/data/articles';
import { getTopicClusterIcon } from '@/data/topicClusterIcons';

const TopicClusterPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const cluster = slug ? getClusterBySlug(slug) : undefined;

  if (!cluster) {
    return <Layout><div className="container content-rail py-20 text-center"><h1 className="font-display text-4xl font-semibold mb-4">Knowledge Hub Not Found</h1><p className="text-muted-foreground mb-8">The knowledge hub you're looking for doesn't exist.</p><Link to="/guides" className="text-primary hover:underline">Explore knowledge hubs</Link></div></Layout>;
  }

  const article = getClusterFeaturedArticle(cluster);
  const articles = cluster.articles.filter((item) => item.id !== article?.id);
  const category = categoryInfo[cluster.category];
  const Icon = getTopicClusterIcon(cluster.slug);
  const relatedClusters = getActiveTopicClusters().filter((item) => item.category === cluster.category && item.slug !== cluster.slug).slice(0, 4);
  const baseUrl = 'https://www.curiosityfields.com';

  return (
    <Layout>
      <SEO title={`${cluster.name} - CuriosityFields`} description={cluster.description} canonical={`${baseUrl}/topics/${cluster.slug}`} />

      <div className="container content-rail py-10 sm:py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Categories', href: '/categories' }, { label: category.name, href: `/categories/${cluster.category}` }, { label: cluster.name }]} />

        <header className="mt-8 mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${category.color}18`, borderColor: `${category.color}35` }}>
              <Icon className="w-5 h-5" style={{ color: category.color }} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: category.color }}>{category.name}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-4 max-w-4xl">{cluster.name}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{cluster.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>{cluster.articles.length} connected articles</span>
            <span className="hidden sm:inline text-border">•</span>
            <span>Start with the guide, then go deeper.</span>
          </div>
        </header>

        {article && (
          <section className="mb-14 lg:mb-18" aria-labelledby="start-here-heading">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Start here</p>
              <h2 id="start-here-heading" className="font-display text-2xl sm:text-3xl font-semibold">The essential guide</h2>
            </div>
            <Link to={`/article/${article.slug}`} className="group grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] overflow-hidden rounded-2xl border border-border/50 bg-card/70 hover:border-primary/35 transition-colors">
              <div className="relative aspect-[16/9] md:aspect-auto min-h-[250px] overflow-hidden">
                <OptimizedImage src={article.coverImage} alt={`${cluster.name} guide`} articleTitle={article.title} category={article.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-4">Start here</span>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-6">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Read the essential guide <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          </section>
        )}

        <section className="mb-14 lg:mb-18" aria-labelledby="cluster-learn-heading">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">The ideas inside this hub</p>
            <h2 id="cluster-learn-heading" className="font-display text-2xl sm:text-3xl font-semibold">Key ideas</h2>
          </div>
          <div className="max-w-4xl border-y border-border/50 divide-y divide-border/50">
            {cluster.keywords.slice(0, 8).map((keyword) => (
              <div key={keyword} className="flex items-center gap-3 py-4 text-sm sm:text-base text-foreground/85">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{keyword}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 lg:mb-18" aria-labelledby="cluster-articles-heading">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Continue exploring</p><h2 id="cluster-articles-heading" className="font-display text-2xl sm:text-3xl font-semibold">Explore the articles</h2></div>
            <span className="text-xs text-muted-foreground">{cluster.articles.length} total</span>
          </div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((item, index) => <ArticleCard key={item.id} article={item} index={index} />)}
            </div>
          ) : (
            <p className="text-muted-foreground">More articles will be added as this hub grows.</p>
          )}
        </section>

        {relatedClusters.length > 0 && (
          <section aria-labelledby="related-hubs-heading">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Keep exploring</p><h2 id="related-hubs-heading" className="font-display text-2xl sm:text-3xl font-semibold">Related hubs</h2></div>
              <Link to={`/categories/${cluster.category}`} className="text-sm text-primary">View category <ArrowRight className="inline w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedClusters.map((item) => {
                const RelatedIcon = getTopicClusterIcon(item.slug);
                return (
                  <Link key={item.slug} to={`/topics/${item.slug}`} className="group rounded-xl border border-border/50 bg-card/50 p-5 hover:border-primary/35 hover:bg-card transition-colors">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 border" style={{ backgroundColor: `${category.color}18`, borderColor: `${category.color}30` }}>
                      <RelatedIcon className="w-4 h-4" style={{ color: category.color }} aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default TopicClusterPage;
