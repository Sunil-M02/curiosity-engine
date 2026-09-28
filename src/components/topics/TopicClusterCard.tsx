import { Link } from 'react-router-dom';
import { ArrowRight, Layers3 } from 'lucide-react';
import type { TopicClusterDefinition } from '@/data/topicClusters';

interface TopicClusterCardProps {
  cluster: TopicClusterDefinition & { articles: import('@/data/articles').Article[] };
  href: string;
  compact?: boolean;
}

export function TopicClusterCard({ cluster, href, compact = false }: TopicClusterCardProps) {
  return (
    <Link
      to={href}
      className={[
        'group block rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm',
        'transition-[border-color,background-color,transform,box-shadow] duration-300',
        'hover:-translate-y-1 hover:border-primary/35 hover:bg-card',
        compact ? 'p-5' : 'p-6',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
          <Layers3 className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <ArrowRight
          className="w-4 h-4 text-muted-foreground/60 mt-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mt-5 mb-2 group-hover:text-primary transition-colors">
        {cluster.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {cluster.description}
      </p>

      <div className="mt-4 text-xs font-medium text-muted-foreground">
        {cluster.articles.length} {cluster.articles.length === 1 ? 'article' : 'articles'}
      </div>
    </Link>
  );
}
