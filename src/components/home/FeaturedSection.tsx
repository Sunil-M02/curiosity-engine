import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getFeaturedArticles } from '@/data/articles';

export function FeaturedSection() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
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
