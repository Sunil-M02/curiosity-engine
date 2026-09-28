import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';
import { getTopicClustersByCategory } from '@/data/topicClusters';
import { getTopicClusterIcon } from '@/data/topicClusterIcons';
import { useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SectionHeading } from '@/components/home/SectionHeading';

const categories = Object.keys(categoryInfo) as Category[];

function TopicCard({ category, index }: { category: Category; index: number }) {
  const info = categoryInfo[category];
  const keyClusters = getTopicClustersByCategory(category).slice(0, 2);
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) / rect.width);
    y.set((event.clientY - (rect.top + rect.height / 2)) / rect.height);
  }, [isMobile, x, y]);

  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enable3D = !isMobile && !prefersReducedMotion;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 } : undefined}
      onMouseMove={enable3D ? handleMouseMove : undefined}
      onMouseLeave={enable3D ? handleMouseLeave : undefined}
    >
      <div
        className="p-6 lg:p-7 rounded-2xl bg-card/90 border border-border/70 backdrop-blur-sm"
        style={{ borderTopColor: info.color, borderTopWidth: '2px' }}
      >
        <Link to={`/categories/${category}`} className="group block">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${info.color}20` }}>
            <span className="w-6 h-6 rounded-lg" style={{ backgroundColor: info.color }} />
          </div>
          <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {info.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">{info.description}</p>
        </Link>

        {keyClusters.length > 0 && (
          <div className="mb-5 space-y-2" aria-label={`${info.name} knowledge hubs`}>
            {keyClusters.map((cluster) => {
              const Icon = getTopicClusterIcon(cluster.slug);
              return (
                <Link
                  key={cluster.slug}
                  to={`/topics/${cluster.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/30 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/35 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: info.color }} aria-hidden="true" />
                  <span className="truncate">{cluster.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        )}

        <Link to={`/categories/${category}`} className="inline-flex items-center gap-2 text-primary text-sm font-semibold">
          Explore category <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export function CategoryGrid() {
  return (
    <section className="py-14 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary/50 to-card pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container content-rail relative z-10">
        <SectionHeading
          eyebrow="Explore"
          title="Explore by Topic"
          description="Choose a broad subject, or jump directly into a connected knowledge hub."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => <TopicCard key={category} category={category} index={index} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4">
            Explore all knowledge hubs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
