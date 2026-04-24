import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getFeaturedArticles, getLatestArticles, categoryInfo } from '@/data/articles';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { SectionHeading } from '@/components/home/SectionHeading';

export function FeaturedSection() {
  // Combine featured + latest, dedupe, take up to 6
  const featured = getFeaturedArticles();
  const latest = getLatestArticles(8);
  const seen = new Set<string>();
  const slides = [...featured, ...latest].filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  }).slice(0, 6);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps', duration: 28 },
    [Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (!slides.length) return null;

  return (
    <section className="py-14 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-card/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <div className="container content-rail relative z-10">
        <div className="flex items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Curated Selection"
            title="Editor's Picks"
            description="Hand-selected stories that define the conversation."
          />

          <div className="hidden sm:flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous featured article"
              className="w-10 h-10 rounded-full border border-border/60 bg-card/40 text-foreground/70 hover:text-foreground hover:border-primary/50 hover:bg-card transition-all duration-200 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next featured article"
              className="w-10 h-10 rounded-full border border-border/60 bg-card/40 text-foreground/70 hover:text-foreground hover:border-primary/50 hover:bg-card transition-all duration-200 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden -mx-2"
          ref={emblaRef}
          style={{ transitionTimingFunction: 'ease-in-out' }}
        >
          <div className="flex">
            {slides.map((article) => {
              const color = categoryInfo[article.category].color;
              return (
                <div
                  key={article.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_70%] lg:flex-[0_0_55%] xl:flex-[0_0_48%] min-w-0 px-2"
                >
                  <Link
                    to={`/article/${article.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-card border border-border/50 transition-colors duration-300 hover:border-primary/40"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                        <OptimizedImage
                          src={article.coverImage}
                          alt={article.title}
                          articleTitle={article.title}
                          category={article.category}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <span
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: color, color: 'hsl(222, 47%, 6%)' }}
                        >
                          {categoryInfo[article.category].name}
                        </span>
                      </div>

                      <div className="p-6 lg:p-8 flex flex-col justify-center">
                        <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3 mb-3 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-5 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="group p-2 -m-2"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-400 ease-in-out ${
                    i === selectedIndex
                      ? 'w-8 bg-primary'
                      : 'w-1.5 bg-foreground/25 group-hover:bg-foreground/50'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
