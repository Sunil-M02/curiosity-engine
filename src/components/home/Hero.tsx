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
  const featured = getLatestArticles(1)[0];
  const featuredColor = featured ? categoryInfo[featured.category].color : '#D4A843';

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
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

      <div className="container content-rail relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-left"
          >
            <span
              className="block uppercase tracking-[0.22em] text-foreground/60 mb-7"
              style={{ fontSize: '11px', fontWeight: 600 }}
            >
              CuriosityFields — Editorial
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-semibold text-foreground leading-[1.05] tracking-tight mb-8">
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

            <p className="text-muted-foreground text-lg lg:text-xl max-w-xl mb-10 leading-relaxed">
              Long-form journalism on science, technology, AI, history, and the
              ideas shaping what comes next.
            </p>

            <div className="flex items-center gap-6">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all duration-200 hover:bg-primary/90 hover:gap-3"
              >
                Explore Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="#featured"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors border-b border-foreground/30 hover:border-foreground pb-1"
              >
                Read featured
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — featured article card */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:pl-4"
            >
              <Link
                to={`/article/${featured.slug}`}
                className="group block rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 shadow-2xl shadow-black/30"
                style={{ borderLeft: `4px solid ${featuredColor}` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <OptimizedImage
                    src={featured.coverImage}
                    alt={featured.title}
                    articleTitle={featured.title}
                    category={featured.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span
                    className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: featuredColor, color: 'hsl(222, 47%, 6%)' }}
                  >
                    {categoryInfo[featured.category].name}
                  </span>
                </div>
                <div className="p-6 lg:p-7">
                  <h2 className="font-display text-2xl lg:text-3xl font-semibold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground text-sm lg:text-base line-clamp-2 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hero to content transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
