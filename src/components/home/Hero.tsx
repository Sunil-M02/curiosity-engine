import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { lazy, Suspense, useRef, useCallback } from 'react';
import { getFeaturedArticles, getLatestArticles, categoryInfo } from '@/data/articles';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// Lazy load particle field for better LCP
const ParticleField = lazy(() => import('@/components/effects/ParticleField').then(m => ({ default: m.ParticleField })));

export function Hero() {
  const featuredArticle = getFeaturedArticles()[0] ?? getLatestArticles(1)[0];
  // 4 latest articles for horizontal scroll, excluding the hero feature
  const scrollArticles = getLatestArticles(8)
    .filter((a) => a.id !== featuredArticle?.id)
    .slice(0, 4);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // 3D tilt for featured article card
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);
  
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }, [isMobile, prefersReducedMotion, x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  const enable3D = !isMobile && !prefersReducedMotion;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient with depth layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
      
      {/* Particle field - ambient motion (lazy loaded) */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      
      {/* Static light falloff layer - deep indigo, muted gold, soft cyan */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(240 50% 25% / 0.15) 0%, hsl(38 70% 50% / 0.08) 40%, hsl(190 70% 50% / 0.05) 70%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary glow - accent color */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(200 75% 55% / 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Subtle noise/grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container content-rail relative z-10 py-20 lg:py-28">
        {/* Editorial 60/40 split */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Left — 60% (3 of 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <span className="block uppercase tracking-[0.2em] text-foreground/60 mb-5" style={{ fontSize: '11px', fontWeight: 600 }}>
              CuriosityFields — Editorial
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold text-foreground leading-[1.05] tracking-tight mb-6">
              Where{' '}
              <span style={{ color: '#D4A843' }}>Curiosity</span>
              <br />
              Meets Discovery
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl max-w-xl mb-8 leading-relaxed">
              Long-form journalism on science, technology, AI, history, and the
              ideas shaping what comes next.
            </p>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-semibold border-b border-foreground/40 hover:border-primary pb-1"
            >
              Explore all topics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — 40% (2 of 5 cols) — single latest/featured card */}
          {featuredArticle && (
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={enable3D ? { 
                rotateX, 
                rotateY, 
                transformStyle: 'preserve-3d',
                perspective: 1200 
              } : undefined}
              onMouseMove={enable3D ? handleMouseMove : undefined}
              onMouseLeave={enable3D ? handleMouseLeave : undefined}
              className="relative lg:col-span-2"
            >
              <Link to={`/article/${featuredArticle.slug}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden elevated-shadow bg-card border border-border/50 transition-shadow duration-300 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.2)]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <OptimizedImage
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      articleTitle={featuredArticle.title}
                      category={featuredArticle.category}
                      lazy={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: categoryInfo[featuredArticle.category].color,
                        color: 'hsl(222, 47%, 6%)',
                      }}
                    >
                      {categoryInfo[featuredArticle.category].name}
                    </span>
                  </div>

                  <div className="p-6 lg:p-7">
                    <h2 className="font-display text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-3 leading-snug">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{format(new Date(featuredArticle.publishedAt), 'MMM d, yyyy')}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredArticle.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Horizontal scrollable row — 4 latest articles */}
        {scrollArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 lg:mt-20"
          >
            <div className="flex items-end justify-between mb-5">
              <span className="uppercase tracking-[0.18em] text-foreground/60" style={{ fontSize: '11px', fontWeight: 600 }}>
                Latest dispatches
              </span>
              <Link to="/categories" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                View all →
              </Link>
            </div>

            <div
              className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {scrollArticles.map((article) => {
                const color = categoryInfo[article.category].color;
                return (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="group flex-shrink-0 w-[260px] sm:w-[280px] snap-start rounded-xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_30px_hsl(var(--primary)/0.15)]"
                    style={{ borderLeft: `4px solid ${color}` }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <OptimizedImage
                        src={article.coverImage}
                        alt={article.title}
                        articleTitle={article.title}
                        category={article.category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="280px"
                      />
                    </div>
                    <div className="p-4">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2 uppercase tracking-wider"
                        style={{ backgroundColor: color, color: 'hsl(222, 47%, 6%)' }}
                      >
                        {categoryInfo[article.category].name}
                      </span>
                      <h3 className="font-display text-sm font-semibold text-foreground line-clamp-3 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Hero to content transition - gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
