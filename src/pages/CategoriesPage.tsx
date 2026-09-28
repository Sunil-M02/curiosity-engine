import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Atom, Cpu, Brain, Landmark, Telescope, Rocket, type LucideIcon } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { categoryInfo, type Category, getArticlesByCategory } from '@/data/articles';
import { getActiveTopicClusters } from '@/data/topicClusters';

const categories = Object.keys(categoryInfo) as Category[];

const categoryIcons: Record<Category, LucideIcon> = {
  science: Atom,
  technology: Cpu,
  'artificial-intelligence': Brain,
  history: Landmark,
  astronomy: Telescope,
  'future-innovation': Rocket,
  'psychology-mind': Brain,
};

const CategoriesPage = () => {
  const hubs = getActiveTopicClusters();

  return (
    <Layout>
      <SEO
        title="All Categories - CuriosityFields"
        description="Explore the seven broad categories of CuriosityFields, then dive into connected knowledge hubs and articles."
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Browse the big picture</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Explore All Categories
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start with a broad subject, then follow connected ideas through CuriosityFields knowledge hubs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const info = categoryInfo[category];
            const articleCount = getArticlesByCategory(category).length;
            const clusterCount = hubs.filter((hub) => hub.category === category).length;
            const Icon = categoryIcons[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  to={`/categories/${category}`}
                  className="group block p-7 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift card-shadow hover-glow category-card"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: info.color,
                    ['--category-color' as string]: info.color,
                  }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${info.color}1F`,
                        boxShadow: `0 0 24px ${info.color}33`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <span className="text-muted-foreground text-sm">{articleCount} articles</span>
                  </div>

                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {info.name}
                  </h2>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {info.description}
                  </p>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">{clusterCount} knowledge hubs</span>
                    <span className="inline-flex items-center gap-2 text-primary font-medium">
                      Explore category
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <section className="mt-20 lg:mt-24" aria-labelledby="popular-hubs-heading">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Go deeper</p>
              <h2 id="popular-hubs-heading" className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Knowledge Hubs
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Connected starting points for exploring a subject without browsing isolated articles.
              </p>
            </div>
            <Link to="/guides" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary">
              View all hubs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hubs.slice(0, 6).map((hub) => (
              <Link
                key={hub.slug}
                to={`/topics/${hub.slug}`}
                className="rounded-xl border border-border/50 bg-card/60 p-5 hover:border-primary/35 hover:bg-card transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-primary mb-2">{categoryInfo[hub.category].name}</p>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{hub.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{hub.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
