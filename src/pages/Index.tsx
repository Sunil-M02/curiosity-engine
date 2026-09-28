import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Hero } from "@/components/home/Hero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Newsletter } from "@/components/home/Newsletter";
import { lazy, Suspense } from "react";

// Keep the cluster guide below the fold in a separate chunk so it does not compete with LCP.
const FeaturedTopicGuide = lazy(() => import("@/components/home/FeaturedTopicGuide").then((m) => ({ default: m.FeaturedTopicGuide })));

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CuriosityFields",
    description:
      "A knowledge-first digital publication exploring science, technology, AI, psychology, history, astronomy, and future innovation.",
    url: "https://www.curiosityfields.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.curiosityfields.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CuriosityFields",
    url: "https://www.curiosityfields.com",
    logo: "https://www.curiosityfields.com/logo.png",
    sameAs: ["https://twitter.com/curiosityfields", "https://linkedin.com/company/curiosityfields"],
  };

  return (
    <Layout>
      <SEO
        title="CuriosityFields — Where Curiosity Meets Discovery"
        description="Explore science, technology, AI, psychology, history, astronomy, and future innovation. Stories that expand how you see the world."
        canonical="https://www.curiosityfields.com"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <Hero />
      <div className="space-y-20">
        <FeaturedSection />
        <CategoryGrid />
        <Suspense fallback={null}>
          <FeaturedTopicGuide />
        </Suspense>
        <LatestArticles />
        <Newsletter />
      </div>
    </Layout>
  );
};

export default Index;
