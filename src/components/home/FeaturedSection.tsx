import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getFeaturedArticles } from '@/data/articles';

export function FeaturedSection() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="py-16 lg:py-24 relative">
      {/* Section background for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-4">
            Curated Selection
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Editor's Picks
          </h2>
          <p className="text-muted-foreground">
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
