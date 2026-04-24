import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { getLatestArticles, categoryInfo } from '@/data/articles';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const ParticleField = lazy(() =>
  import('@/components/effects/ParticleField').then((m) => ({ default: m.ParticleField }))
);

export function Hero() {
  const scrollArticles = getLatestArticles(6);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />

      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(240 50% 25% / 0.15) 0%, hsl(38 70% 50% / 0.08) 40%, hsl(190 70% 50% / 0.05) 70%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(200 75% 55% / 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container content-rail relative z-10 py-24 lg:py-32">
        {/* Centered editorial heading with breathing space */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span
            className="block uppercase tracking-[0.22em] text-foreground/60 mb-7"
            style={{ fontSize: '11px', fontWeight: 600 }}
          >
            CuriosityFields — Editorial
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold text-foreground leading-[1.08] tracking-tight mb-8">
            Where{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(120deg, #D4A843 0%, #E8C97A 35%, #6FB3D8 70%, #4A7EC7 100%)',
              }}
            >
              Curiosity
            </span>
            <br />
            Meets Discovery
          </h1>

          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Long-form journalism on science, technology, AI, history, and the ideas
            shaping what comes next.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:bg-primary/90 hover:gap-3"
            >
              Explore Topics
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="#latest"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors border-b border-foreground/30 hover:border-foreground pb-1"
            >
              Read latest
            </Link>
          </div>
        </motion.div>

        {/* Latest dispatches — horizontal snap row */}
        {scrollArticles.length > 0 && (
          <motion.div
            id="latest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 lg:mt-24"
          >
            <div className="flex items-end justify-between mb-5">
              <span
                className="uppercase tracking-[0.18em] text-foreground/60"
                style={{ fontSize: '11px', fontWeight: 600 }}
              >
                Latest dispatches
              </span>
              <Link
                to="/categories"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View all →
              </Link>
            </div>

            <div
              className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory hero-scroll-row"
              style={{ scrollbarWidth: 'thin', scrollBehavior: 'smooth' }}
            >
              {scrollArticles.map((article) => {
                const color = categoryInfo[article.category].color;
                return (
                  <Link
                    key={article.id}
                    to={`/article/${article.slug}`}
                    className="group flex-shrink-0 w-[260px] sm:w-[280px] snap-start rounded-xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
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

      {/* Hero to content transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
