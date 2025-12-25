import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getLatestArticles } from '@/data/articles';

export function LatestArticles() {
  const articles = getLatestArticles(6);

  return (
    <section className="py-16 lg:py-24 relative">
      {/* Distinct background treatment */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium uppercase tracking-wider mb-4">
              Fresh Reads
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Latest Articles
            </h2>
            <p className="text-muted-foreground">
              Fresh perspectives on the ideas shaping our world.
            </p>
          </div>
          
          <Link to="/categories">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
