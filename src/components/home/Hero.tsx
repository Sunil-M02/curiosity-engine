import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { lazy, Suspense, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { getFeaturedArticles, categoryInfo } from '@/data/articles';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy load particle field for better LCP
const ParticleField = lazy(() => import('@/components/effects/ParticleField').then(m => ({ default: m.ParticleField })));

export function Hero() {
  const featuredArticle = getFeaturedArticles()[0];
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
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Discover the world's most fascinating ideas</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6">
              Where{' '}
              <span className="text-gradient">Curiosity</span>
              {' '}Meets Discovery
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-8">
              Explore the frontiers of science, technology, and human achievement. 
              From quantum realms to distant galaxies, uncover stories that expand your understanding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={`/article/${featuredArticle?.slug}`}>
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Reading
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  Explore Topics
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Featured Article Preview with 3D tilt */}
          {featuredArticle && (
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={enable3D ? { 
                rotateX, 
                rotateY, 
                transformStyle: 'preserve-3d',
                perspective: 1200 
              } : undefined}
              onMouseMove={enable3D ? handleMouseMove : undefined}
              onMouseLeave={enable3D ? handleMouseLeave : undefined}
              className="relative"
            >
              <Link to={`/article/${featuredArticle.slug}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden elevated-shadow transition-shadow duration-300 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.2)]">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{ 
                        backgroundColor: categoryInfo[featuredArticle.category].color,
                        color: 'hsl(222, 47%, 6%)'
                      }}
                    >
                      Featured
                    </span>
                    <h2 className="font-display text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>

                {/* Static decorative depth elements - no animation */}
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary/15 rounded-full blur-2xl pointer-events-none"
                />
                <div 
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none"
                />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Hero to content transition - gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
