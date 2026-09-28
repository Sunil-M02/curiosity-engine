import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Layers3 } from 'lucide-react';
import { getClusterFeaturedArticle, getFeaturedTopicCluster } from '@/data/topicClusters';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export function FeaturedTopicGuide() {
  const cluster = getFeaturedTopicCluster();
  if (!cluster) return null;

  const article = getClusterFeaturedArticle(cluster);
  if (!article) return null;

  return (
    <section id="featured-guide" className="py-14 sm:py-16 lg:py-20 relative">
      <div className="container content-rail">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Start Exploring
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
              Featured Knowledge Hub
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Start with one connected idea, then follow the concepts around it.
            </p>
          </div>
          <Link
            to="/guides"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-foreground/75 hover:text-primary transition-colors"
          >
            View all hubs
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <Link
          to={`/topics/${cluster.slug}`}
          className="group grid grid-cols-1 md:grid-cols-[minmax(240px,0.8fr)_1.2fr] overflow-hidden rounded-2xl border border-border/50 bg-card/70 hover:border-primary/35 transition-[border-color,background-color] duration-300"
        >
          <div className="relative aspect-[16/9] md:aspect-auto min-h-[220px] overflow-hidden">
            <OptimizedImage
              src={article.coverImage}
              alt={`${cluster.name} knowledge hub`}
              articleTitle={article.title}
              category={article.category}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/55 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                <Layers3 className="w-3.5 h-3.5" aria-hidden="true" />
                {cluster.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                {cluster.articles.length} connected articles
              </span>
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
              Explore {cluster.name}
            </h3>

            <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-4 max-w-2xl">
              {cluster.description}
            </p>

            <p className="text-sm text-muted-foreground mb-6">
              Featured guide: <span className="text-foreground">{article.title}</span>
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              Start exploring
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-2 mt-5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {article.readTime} min read
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
