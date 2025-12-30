import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getFeaturedArticles } from '@/data/articles';

export function FeaturedSection() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="py-14 lg:py-20 relative">
      {/* Section background for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-card/40 pointer-events-none" />
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container content-rail relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4 border border-primary/20">
            Curated Selection
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-3">
            Editor's Picks
          </h2>
          <p className="text-muted-foreground text-lg">
            Hand-selected stories that define the conversation.
          </p>
        </motion.div>

        <div className="space-y-8">
          {featuredArticles.slice(0, 2).map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="featured" 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
