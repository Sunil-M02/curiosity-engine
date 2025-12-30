import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, Share2, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Button } from '@/components/ui/button';
import { getArticleBySlug, getRelatedArticles, categoryInfo } from '@/data/articles';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/" className="text-primary hover:underline">
            Return to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedArticles = getRelatedArticles(article);
  const categoryColor = categoryInfo[article.category].color;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.coverImage,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "CuriosityFields Editorial"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CuriosityFields",
      "logo": {
        "@type": "ImageObject",
        "url": "https://curiosityfields.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://curiosityfields.com/article/${article.slug}`
    }
  };

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`https://curiosityfields.com/article/${article.slug}`}
        type="article"
        image={article.coverImage}
        noIndex={true}
        article={{
          publishedTime: article.publishedAt,
          section: categoryInfo[article.category].name,
          tags: article.tags
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article>
        {/* Hero Section */}
        <div className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative -mt-40 lg:-mt-60 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Breadcrumbs
              items={[
                { label: categoryInfo[article.category].name, href: `/category/${article.category}` },
                { label: article.title.slice(0, 40) + '...' }
              ]}
            />

            <div className="flex items-center gap-3 mb-6">
              <Link
                to={`/category/${article.category}`}
                className="px-3 py-1 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: categoryColor, color: 'hsl(222, 47%, 6%)' }}
              >
                {categoryInfo[article.category].name}
              </Link>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl mb-8">
              {article.excerpt}
            </p>

            {/* Editorial Desk Attribution */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-display font-semibold text-lg">CF</span>
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    Editorial Desk · CuriosityFields
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={async () => {
                    const shareUrl = window.location.href;
                    const shareData = {
                      title: article.title,
                      text: article.excerpt,
                      url: shareUrl
                    };
                    
                    if (navigator.share) {
                      try {
                        await navigator.share(shareData);
                      } catch (err) {
                        // User cancelled or error
                      }
                    } else {
                      await navigator.clipboard.writeText(shareUrl);
                      // TODO: Add toast notification
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(article.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                  }}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Article Content */}
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Publisher Attribution */}
            <div className="mt-12 p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-display font-bold text-2xl">CF</span>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Published by</p>
                  <h4 className="font-display text-xl font-semibold text-foreground mb-1">
                    CuriosityFields Editorial
                  </h4>
                  <p className="text-primary text-sm mb-2">Editorial Desk</p>
                  <p className="text-muted-foreground text-sm">
                    CuriosityFields is a knowledge-first digital publication focused on science, technology, 
                    artificial intelligence, history, astronomy, and future innovation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-card/30 py-16 lg:py-24">
            <div className="container">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {relatedArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default ArticlePage;
