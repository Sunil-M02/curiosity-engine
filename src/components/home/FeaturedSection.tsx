import { motion } from 'framer-motion';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getFeaturedArticles } from '@/data/articles';
import { SectionHeading } from '@/components/home/SectionHeading';

export function FeaturedSection() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="py-14 lg:py-20 relative">
      {/* Section background for visual separation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-card/40 pointer-events-none" />
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="container content-rail relative z-10">
        <SectionHeading
          eyebrow="Curated Selection"
          title="Editor's Picks"
          description="Hand-selected stories that define the conversation."
        />

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
