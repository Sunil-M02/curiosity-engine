import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, Share2 } from 'lucide-react';
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
        <div className="container content-rail py-20 text-center">
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
        "url": "https://www.curiosityfields.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.curiosityfields.com/article/${article.slug}`
    }
  };

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`https://www.curiosityfields.com/article/${article.slug}`}
        type="article"
        image={article.coverImage}
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

        <div className="container content-rail relative -mt-40 lg:-mt-60 z-10">
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

              <div className="flex items-center gap-1">
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
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="group transition-all duration-150 hover:bg-primary/10"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(article.title);
                    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all duration-150" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="group transition-all duration-150 hover:bg-primary/10"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all duration-150" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="group transition-all duration-150 hover:bg-primary/10"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                  }}
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all duration-150" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Article Content */}
        <div className="container content-rail py-12">
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
            <div className="container content-rail">
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
