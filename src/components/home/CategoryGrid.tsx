import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';

const categories = Object.keys(categoryInfo) as Category[];

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Explore by Topic
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the subjects that fuel your curiosity. From the cosmos to code, history to the horizon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const info = categoryInfo[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category}`}
                  className="group block p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift card-shadow hover-glow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg"
                      style={{ backgroundColor: info.color }}
                    />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {info.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {info.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                    Explore articles
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
