import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';
import { useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const categories = Object.keys(categoryInfo) as Category[];

// 3D Topic Card component
function TopicCard({ category, index }: { category: Category; index: number }) {
  const info = categoryInfo[category];
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);
  
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
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 } : undefined}
      onMouseMove={enable3D ? handleMouseMove : undefined}
      onMouseLeave={enable3D ? handleMouseLeave : undefined}
    >
      <Link
        to={`/category/${category}`}
        className="group block p-6 lg:p-7 rounded-2xl bg-card/90 border border-border/70 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.25)] backdrop-blur-sm"
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${info.color}25` }}
        >
          <div
            className="w-7 h-7 rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_var(--category-color)]"
            style={{ 
              backgroundColor: info.color,
              ['--category-color' as string]: info.color,
            }}
          />
        </div>
        
        <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
          {info.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
          {info.description}
        </p>
        
        <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold">
          Explore articles
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export function CategoryGrid() {
  return (
    <section className="py-14 lg:py-20 relative overflow-hidden">
      {/* Distinct section background with stronger separation */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary/50 to-card pointer-events-none" />
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container content-rail relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
            Knowledge Hubs
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Explore by Topic
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg font-medium">
            Curated deep-dives into the subjects that fuel curiosity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <TopicCard key={category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
