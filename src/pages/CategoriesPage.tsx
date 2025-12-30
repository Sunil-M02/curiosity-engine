import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { categoryInfo, type Category, getArticlesByCategory } from '@/data/articles';

const categories = Object.keys(categoryInfo) as Category[];

const CategoriesPage = () => {
  return (
    <Layout>
      <SEO
        title="All Categories - CuriosityFields"
        description="Explore all topics on CuriosityFields. From science and technology to history and space, find articles that fuel your curiosity."
        canonical="https://curiosityfields.com/categories"
      />
      
      <div className="container content-rail py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Categories' }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Explore All Topics
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dive into our curated collection of articles across science, technology, 
            history, and beyond. What sparks your curiosity today?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const info = categoryInfo[category];
            const articleCount = getArticlesByCategory(category).length;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category}`}
                  className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift card-shadow hover-glow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg"
                        style={{ backgroundColor: info.color }}
                      />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {info.name}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    {info.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    Browse articles
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
