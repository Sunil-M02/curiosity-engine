import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getLatestArticles } from '@/data/articles';
import { SectionHeading } from '@/components/home/SectionHeading';

export function LatestArticles() {
  const articles = getLatestArticles(6);

  return (
    <section className="py-14 lg:py-20 relative">
      {/* Distinct background treatment */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-secondary/20 pointer-events-none" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container content-rail relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Fresh Reads"
            title="Latest Articles"
            description="Fresh perspectives on the ideas shaping our world."
          />

          <Link to="/categories" className="sm:mb-2">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
