import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';
import { getTopicClustersByCategory } from '@/data/topicClusters';
import { SectionHeading } from '@/components/home/SectionHeading';

const categories = Object.keys(categoryInfo) as Category[];

function TopicCard({ category, index }: { category: Category; index: number }) {
  const info = categoryInfo[category];
  const hubCount = getTopicClustersByCategory(category).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        className="h-full p-6 lg:p-7 rounded-2xl bg-card/80 border border-border/60 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-card hover:border-primary/30"
        style={{ borderTopColor: info.color, borderTopWidth: '2px' }}
      >
        <Link to={`/categories/${category}`} className="group block">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${info.color}20` }}>
            <span className="w-5 h-5 rounded-md" style={{ backgroundColor: info.color }} />
          </div>
          <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {info.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{info.description}</p>
        </Link>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {hubCount} {hubCount === 1 ? 'knowledge hub' : 'knowledge hubs'}
          </span>
          <Link
            to={`/categories/${category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore category
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
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
