import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { TopicClusterDefinition } from '@/data/topicClusters';
import { getTopicClusterIcon } from '@/data/topicClusterIcons';
import { categoryInfo } from '@/data/articles';

interface TopicClusterCardProps {
  cluster: TopicClusterDefinition & { articles: import('@/data/articles').Article[] };
  href: string;
  compact?: boolean;
}

export function TopicClusterCard({ cluster, href, compact = false }: TopicClusterCardProps) {
  const Icon = getTopicClusterIcon(cluster.slug);
  const color = categoryInfo[cluster.category].color;

  return (
    <Link
      to={href}
      className={[
        'group block rounded-2xl border bg-card/70 backdrop-blur-sm',
        'transition-[border-color,background-color,transform,box-shadow] duration-300',
        'hover:-translate-y-1 hover:bg-card',
        compact ? 'p-5' : 'p-6',
      ].join(' ')}
      style={{ borderColor: `${color}45` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
          style={{ backgroundColor: `${color}18`, borderColor: `${color}30` }}
        >
          <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
        </div>
        <ArrowRight
          className="w-4 h-4 text-muted-foreground/60 mt-1 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mt-5 mb-2 group-hover:text-primary transition-colors">
        {cluster.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {cluster.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
        <span>{cluster.articles.length} {cluster.articles.length === 1 ? 'article' : 'articles'}</span>
        <span className="text-primary">Explore hub</span>
      </div>
    </Link>
  );
}
