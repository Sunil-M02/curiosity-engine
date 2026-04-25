import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Article, categoryInfo } from '@/data/articles';
import { format } from 'date-fns';
import { useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

export function ArticleCard({ article, variant = 'default', index = 0 }: ArticleCardProps) {
  const categoryColor = categoryInfo[article.category].color;
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);
  
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }, [isMobile, x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const enable3D = !isMobile && !prefersReducedMotion;

  if (variant === 'featured') {
    return (
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        onMouseMove={enable3D ? handleMouseMove : undefined}
        onMouseLeave={enable3D ? handleMouseLeave : undefined}
        className="group relative"
      >
        <Link to={`/article/${article.slug}`} className="block">
          <div className="relative aspect-[16/10] lg:aspect-[21/9] overflow-hidden rounded-2xl">
            <OptimizedImage
              src={article.coverImage}
              alt={article.title}
              articleTitle={article.title}
              category={article.category}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            
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
              
              <h2 className="font-display text-2xl lg:text-4xl font-semibold text-foreground mb-3 transition-colors duration-200 group-hover:text-[#D4A843]">
                {article.title}
              </h2>
              
              <p className="text-muted-foreground text-base lg:text-lg max-w-3xl mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              
              {/* Editorial Desk attribution instead of author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-display font-semibold text-sm">CF</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">The CuriosityFields Team</p>
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
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <OptimizedImage
            src={article.coverImage}
            alt={article.title}
            articleTitle={article.title}
            category={article.category}
            className="w-full h-full object-cover"
            sizes="96px"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="text-xs font-medium"
              style={{ color: categoryColor }}
            >
              {categoryInfo[article.category].name}
            </span>
            <h3 className="font-display text-base font-medium text-foreground mt-1 transition-colors duration-200 group-hover:text-[#D4A843] line-clamp-2">
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
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 } : undefined}
      onMouseMove={enable3D ? handleMouseMove : undefined}
      onMouseLeave={enable3D ? handleMouseLeave : undefined}
      className="group"
    >
      <Link to={`/article/${article.slug}`} className="block">
        {/* Card — no transform; title color shifts on hover */}
        <div className="rounded-xl bg-card border border-border/40 overflow-hidden transition-colors duration-200 hover:border-primary/30">
          <div className="relative aspect-[16/10] overflow-hidden">
            <OptimizedImage
              src={article.coverImage}
              alt={article.title}
              articleTitle={article.title}
              category={article.category}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: categoryColor, color: 'hsl(222, 47%, 6%)' }}
              >
                {categoryInfo[article.category].name}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </span>
            </div>
            
            <h3 className="font-display text-xl font-bold text-foreground mb-2 transition-colors duration-200 group-hover:text-[#D4A843] line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            
            {/* Editorial attribution instead of author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-display font-semibold text-xs">CF</span>
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">The CuriosityFields Team</p>
                  <p className="text-muted-foreground text-xs">
                    {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
