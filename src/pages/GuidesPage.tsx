import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { TopicClusterCard } from '@/components/topics/TopicClusterCard';
import { getActiveTopicClusters } from '@/data/topicClusters';
import { categoryInfo } from '@/data/articles';

const GuidesPage = () => {
  const clusters = getActiveTopicClusters();
  const categories = Array.from(new Set(clusters.map((cluster) => cluster.category)));

  return (
    <Layout>
      <SEO
        title="Knowledge Hubs - CuriosityFields"
        description="Explore CuriosityFields knowledge hubs: connected guides and articles organized around the subjects readers want to understand."
        canonical="https://www.curiosityfields.com/guides"
      />

      <div className="container content-rail py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Knowledge Hubs' }]} />

        <header className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Follow connected ideas</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-5">
            Explore Knowledge Hubs
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Start with a broad guide, understand the core idea, and then go deeper through related articles.
          </p>
        </header>

        <div className="space-y-16">
          {categories.map((category) => {
            const categoryClusters = clusters.filter((cluster) => cluster.category === category);
            if (!categoryClusters.length) return null;

            return (
              <section key={category} aria-labelledby={`${category}-hubs`}>
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: categoryInfo[category].color }}>
                      {categoryInfo[category].name}
                    </p>
                    <h2 id={`${category}-hubs`} className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                      Knowledge Hubs
                    </h2>
                  </div>
                  <Link to={`/categories/${category}`} className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    Explore category <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {categoryClusters.map((cluster) => (
                    <TopicClusterCard
                      key={cluster.slug}
                      cluster={cluster}
                      href={`/topics/${cluster.slug}`}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default GuidesPage;
