import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Button } from '@/components/ui/button';
import { getAuthorById, articles } from '@/data/articles';

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const author = getAuthorById(id || '');
  const authorArticles = articles.filter(a => a.author.id === id);

  if (!author) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
            Author Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The author you're looking for doesn't exist.
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
        title={`${author.name} - CuriosityFields Author`}
        description={author.bio}
        canonical={`https://curiosityfields.com/author/${author.id}`}
        image={author.avatar}
      />
      
      <div className="container py-12 lg:py-20">
        <Breadcrumbs
          items={[
            { label: 'Authors' },
            { label: author.name }
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                {author.name}
              </h1>
              <p className="text-primary font-medium mb-4">{author.role}</p>
              <p className="text-muted-foreground text-lg mb-4">
                {author.bio}
              </p>
              <div className="flex gap-2">
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${author.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
            Articles by {author.name.split(' ')[0]} ({authorArticles.length})
          </h2>
          
          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {authorArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No articles published yet.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
