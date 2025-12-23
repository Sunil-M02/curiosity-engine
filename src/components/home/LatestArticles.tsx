import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getLatestArticles } from '@/data/articles';

export function LatestArticles() {
  const articles = getLatestArticles(6);

  return (
    <section className="py-16 lg:py-24 bg-card/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
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
