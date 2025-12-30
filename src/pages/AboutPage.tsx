import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About CuriosityFields"
        description="CuriosityFields is a knowledge-first digital publication exploring science, technology, AI, history, astronomy, and future innovation."
        canonical="https://curiosityfields.com/about"
      />
      
      <div className="container content-rail py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            About <span className="text-gradient">CuriosityFields</span>
          </h1>
          
          <div className="prose prose-invert prose-lg space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              CuriosityFields is a knowledge-first digital publication dedicated to exploring the ideas that shape our understanding of the world. We cover science, technology, artificial intelligence, history, astronomy, and future innovation.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our mission is simple: to spark curiosity and provide authoritative, accessible content that helps readers understand the most important developments in science and technology.
            </p>
          </div>

          <h2 className="font-display text-2xl font-semibold text-foreground mt-16 mb-6">Our Editorial Approach</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Research-First Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece we publish begins with thorough research. We consult primary sources, peer-reviewed studies, and expert analysis to ensure our content reflects the current state of knowledge—not speculation or hype.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Editorial Independence</h3>
              <p className="text-muted-foreground leading-relaxed">
                CuriosityFields operates with complete editorial independence. Our coverage is shaped by what matters to curious readers, not by commercial interests or trending algorithms. We choose depth over clicks.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Accuracy & Fact-Checking</h3>
              <p className="text-muted-foreground leading-relaxed">
                We hold ourselves to rigorous standards of accuracy. Claims are verified, sources are cited, and corrections are made transparently when errors occur. Trust is earned through consistency.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Curated, Not Crowded</h3>
              <p className="text-muted-foreground leading-relaxed">
                We deliberately focus on six core topics: science, technology, AI, history, astronomy, and future innovation. This allows us to go deeper rather than wider—offering substantive analysis instead of surface-level coverage.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Accessible Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complex ideas deserve clear explanations. We translate technical subjects into accessible language without sacrificing nuance, helping readers engage with ideas that might otherwise feel out of reach.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
