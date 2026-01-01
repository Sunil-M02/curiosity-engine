import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Hero } from "@/components/home/Hero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CuriosityFields",
    description:
      "A knowledge-first digital publication exploring science, technology, AI, history, astronomy, and future innovation.",
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
        title="CuriosityFields - Where Curiosity Meets Discovery"
        description="Explore the frontiers of science, technology, artificial intelligence, history, astronomy, and future innovation. Discover stories that expand your understanding of the world."
        canonical="https://www.curiosityfields.com"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <Hero />
      <FeaturedSection />
      <CategoryGrid />
      <LatestArticles />
      <Newsletter />
    </Layout>
  );
};

export default Index;
