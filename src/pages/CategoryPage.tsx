import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getArticlesByCategory, categoryInfo, type Category } from '@/data/articles';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug as Category;
  const info = categoryInfo[category];
  const articles = getArticlesByCategory(category);

  if (!info) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/" className="text-primary hover:underline">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={`${info.name} Articles - CuriosityFields`}
        description={info.description}
        canonical={`https://curiosityfields.com/category/${category}`}
      />
      
      <div className="container py-12 lg:py-20">
        <Breadcrumbs
          items={[
            { label: 'Categories', href: '/categories' },
            { label: info.name }
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div
            className="inline-block w-16 h-2 rounded-full mb-6"
            style={{ backgroundColor: info.color }}
          />
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            {info.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {info.description}
          </p>
        </motion.div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No articles in this category yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
