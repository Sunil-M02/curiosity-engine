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

        <section className="relative mb-10 lg:mb-14 overflow-hidden rounded-[2rem] border border-border/50 bg-card/30">
          {article && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <OptimizedImage
                src={article.coverImage}
                alt=""
                category={article.category}
                articleTitle={article.title}
                lazy={false}
                className="w-full h-full object-cover opacity-18 blur-[1px] scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(222_47%_6%_/_0.66)_0%,hsl(222_47%_6%_/_0.88)_58%,hsl(222_47%_6%_/_0.98)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,hsl(38_92%_55%_/_0.11),transparent_36%)]" />
            </div>
          )}
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${category.color}18`, borderColor: `${category.color}35` }}>
                <Icon className="w-5 h-5" style={{ color: category.color }} aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: category.color }}>{category.name}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-4 max-w-4xl">{cluster.name}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{cluster.description}</p>
            <div className="mt-5 text-sm text-muted-foreground">{cluster.articles.length} connected articles · Start with the guide, then go deeper.</div>
          </div>
        </section>

        <section className="mb-12 lg:mb-14" aria-labelledby="about-topic-heading">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6 lg:gap-8 items-stretch">
            <div className="rounded-2xl border border-border/50 bg-card/45 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">About this topic</p>
              <h2 id="about-topic-heading" className="font-display text-2xl sm:text-3xl font-semibold mb-4">Understand the territory before you dive in.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {cluster.description} This hub connects the core concepts and related questions that help explain the subject from multiple angles.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/45 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Key ideas</p>
              <ul className="space-y-3">
                {cluster.keywords.slice(0, 5).map((keyword) => (
                  <li key={keyword} className="flex items-center gap-3 text-sm text-foreground/85">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span>{keyword}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

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
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary mb-4">Essential guide</span>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">{article.title}</h2>
                <p className="text-muted-foreground leading-relaxed line-clamp-4 mb-6">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Read the full guide <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          </section>
        )}

        <section className="mb-14 lg:mb-18" aria-labelledby="cluster-learn-heading">
          <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Know the territory</p><h2 id="cluster-learn-heading" className="font-display text-2xl sm:text-3xl font-semibold">What you'll explore</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cluster.keywords.slice(0, 8).map((keyword) => (
              <div key={keyword} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>{keyword}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 lg:mb-18" aria-labelledby="cluster-articles-heading">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Continue exploring</p><h2 id="cluster-articles-heading" className="font-display text-2xl sm:text-3xl font-semibold">Articles in this hub</h2></div>
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
              {relatedClusters.map((item) => <Link key={item.slug} to={`/topics/${item.slug}`} className="rounded-xl border border-border/50 bg-card/50 p-5 hover:border-primary/35 transition-colors"><h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3><p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p></Link>)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default TopicClusterPage;
