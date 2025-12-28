import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';

const categories = Object.keys(categoryInfo) as Category[];

export function CategoryGrid() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Distinct section background with stronger separation */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary/40 to-card pointer-events-none" />
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4 border border-primary/20">
            Knowledge Hubs
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-5">
            Explore by Topic
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Curated deep-dives into the subjects that fuel your curiosity. From the cosmos to code, history to the horizon.
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
                  className="group block p-6 lg:p-8 rounded-2xl bg-card/80 border border-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)] backdrop-blur-sm"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${info.color}25` }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg transition-all duration-300 group-hover:shadow-[0_0_20px_var(--category-color)]"
                      style={{ 
                        backgroundColor: info.color,
                        ['--category-color' as any]: info.color,
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
          })}
        </div>
      </div>
    </section>
  );
}
