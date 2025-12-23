import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Article, categoryInfo } from '@/data/articles';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

export function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const categoryColor = categoryInfo[article.category].color;

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative"
      >
        <Link to={`/article/${article.slug}`} className="block">
          <div className="relative aspect-[16/10] lg:aspect-[21/9] overflow-hidden rounded-2xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: categoryColor, color: 'hsl(222, 47%, 6%)' }}
                >
                  {categoryInfo[article.category].name}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </span>
              </div>
              
              <h2 className="font-display text-2xl lg:text-4xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              
              <p className="text-muted-foreground text-base lg:text-lg max-w-3xl mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-foreground font-medium text-sm">{article.author.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group"
      >
        <Link to={`/article/${article.slug}`} className="flex gap-4 items-start">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-24 h-24 rounded-lg object-cover flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <span
              className="text-xs font-medium"
              style={{ color: categoryColor }}
            >
              {categoryInfo[article.category].name}
            </span>
            <h3 className="font-display text-base font-medium text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-xs mt-2">
              {format(new Date(article.publishedAt), 'MMM d, yyyy')}
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: categoryColor, color: 'hsl(222, 47%, 6%)' }}
          >
            {categoryInfo[article.category].name}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
        </div>
        
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-foreground text-sm font-medium">{article.author.name}</p>
              <p className="text-muted-foreground text-xs">
                {format(new Date(article.publishedAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
