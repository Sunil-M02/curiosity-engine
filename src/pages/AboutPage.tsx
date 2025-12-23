import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { authors } from '@/data/articles';

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About CuriosityFields"
        description="CuriosityFields is a knowledge-first digital publication exploring science, technology, AI, history, astronomy, and future innovation."
        canonical="https://curiosityfields.com/about"
      />
      
      <div className="container py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'About' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            About <span className="text-gradient">CuriosityFields</span>
          </h1>
          
          <div className="prose prose-invert prose-lg">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              CuriosityFields is a knowledge-first digital publication dedicated to exploring the ideas that shape our understanding of the world. We cover science, technology, artificial intelligence, history, astronomy, and future innovation.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Our mission is simple: to spark curiosity and provide authoritative, accessible content that helps readers understand the most important developments in science and technology.
            </p>
          </div>

          <h2 className="font-display text-2xl font-semibold text-foreground mt-12 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {authors.map((author) => (
              <div key={author.id} className="p-6 rounded-xl bg-card border border-border/50">
                <img src={author.avatar} alt={author.name} className="w-16 h-16 rounded-full object-cover mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground">{author.name}</h3>
                <p className="text-primary text-sm mb-2">{author.role}</p>
                <p className="text-muted-foreground text-sm">{author.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
