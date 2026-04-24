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
        canonical="https://www.curiosityfields.com/categories"
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
            const categoryArticles = getArticlesByCategory(category);
            const articleCount = categoryArticles.length;
            const recent = [...categoryArticles]
              .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
              .slice(0, 2);
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/categories/${category}`}
                  className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift card-shadow hover-glow category-card"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: info.color,
                    ['--category-color' as string]: info.color,
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="uppercase tracking-[0.18em] font-semibold"
                      style={{ fontSize: '11px', color: info.color }}
                    >
                      {info.name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {info.name}
                  </h2>
                  
                  <p className="text-muted-foreground mb-5">
                    {info.description}
                  </p>

                  {recent.length > 0 && (
                    <ul className="space-y-1.5 mb-6 border-t border-border/40 pt-4">
                      {recent.map((a) => (
                        <li
                          key={a.id}
                          className="text-muted-foreground/90 line-clamp-1"
                          style={{ fontSize: '12px', lineHeight: 1.5 }}
                        >
                          <span style={{ color: info.color }} className="mr-2">›</span>
                          {a.title}
                        </li>
                      ))}
                    </ul>
                  )}
                  
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
