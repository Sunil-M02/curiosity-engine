import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Send, 
  Award, 
  BookOpen,
  Lightbulb,
  Target,
  PenTool,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const topics = [
  { name: 'Science', description: 'Physics, biology, chemistry, environmental science, and breakthroughs' },
  { name: 'Technology', description: 'Software, hardware, digital innovation, and tech trends' },
  { name: 'Artificial Intelligence', description: 'Machine learning, AI ethics, automation, and the future of AI' },
  { name: 'History', description: 'Ancient civilizations, historical events, archaeology, and lessons from the past' },
  { name: 'Astronomy & Space', description: 'Exploration, cosmology, astrophysics, and space missions' },
  { name: 'Future Innovation', description: 'Emerging technologies, predictions, and transformative ideas' },
];

const benefits = [
  { icon: Award, title: 'Author Attribution', description: 'Full byline with your bio, photo, and links to your portfolio' },
  { icon: Users, title: 'Audience Reach', description: 'Expose your work to our growing community of curious readers' },
  { icon: BookOpen, title: 'Editorial Support', description: 'Work with our editors to refine and polish your piece' },
  { icon: Target, title: 'Topic Authority', description: 'Build your reputation as a subject matter expert' },
];

const guidelines = [
  { icon: Lightbulb, title: 'Original Insights', description: 'We value fresh perspectives and unique angles, not rehashed content' },
  { icon: FileText, title: 'Research-Backed', description: 'Support claims with credible sources and data' },
  { icon: Shield, title: 'Non-Promotional', description: 'No advertorials, affiliate content, or brand promotions' },
  { icon: PenTool, title: 'Well-Written', description: 'Clear, engaging prose with proper structure and grammar' },
];

export default function WriteForUsPage() {
  const breadcrumbItems = [
    { label: 'Write for Us' },
  ];

  return (
    <Layout>
      <SEO
        title="Write for Us"
        description="Join CuriosityFields as a contributor. Share your expertise in science, technology, AI, history, astronomy, and future innovation with our curious community."
        canonical="https://www.curiosityfields.com/write-for-us"
      />

      <div className="pt-24 lg:pt-32">
        <div className="container content-rail">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Write for <span className="text-gradient">CuriosityFields</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Share your knowledge and passion with readers who crave depth, clarity, and original thinking.
            </p>
          </motion.div>

          {/* Who Can Write Section */}
          <motion.section 
            className="max-w-4xl mx-auto mb-20"
            {...fadeInUp}
          >
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Who Can Write for CuriosityFields?
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We welcome contributions from researchers, academics, industry professionals, science communicators, 
                journalists, and passionate enthusiasts. Whether you're a PhD candidate or a self-taught expert, 
                what matters most is your ability to explain complex ideas clearly and your commitment to accuracy.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Subject matter experts with deep knowledge in our topic areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Science writers and journalists with a track record of quality work</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Passionate individuals who can transform complexity into clarity</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Topics We Accept */}
          <motion.section 
            className="max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
              Topics We Accept
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  className="p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Editorial Guidelines */}
          <motion.section 
            className="max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
              Editorial & Quality Guidelines
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              We maintain high standards to ensure every article provides genuine value to our readers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidelines.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4 p-6 bg-secondary/30 rounded-xl"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Submission Process */}
          <motion.section 
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
              Submission Process
            </h2>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Pitch Your Idea', description: 'Send us a brief outline (150-300 words) explaining your topic, angle, and why it matters to our audience.' },
                { step: 2, title: 'Editorial Review', description: "Our team reviews pitches within 5-7 business days. We'll provide feedback or request the full draft." },
                { step: 3, title: 'Write & Submit', description: 'Write your article (1,500-3,000 words) following our style guide. Include sources and suggested images.' },
                { step: 4, title: 'Edit & Publish', description: 'Work with our editors on revisions. Once finalized, your article goes live with full author attribution.' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-display font-bold">{item.step}</span>
                  </div>
                  <div className="flex-1 pb-6 border-b border-border/50 last:border-0">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Author Benefits */}
          <motion.section 
            className="max-w-5xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
              Author Benefits & Attribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="p-6 bg-card rounded-xl border border-border/50"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="max-w-3xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-card p-10 md:p-14 rounded-2xl border border-border/50 glow-primary">
              <Send className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Ready to Share Your Knowledge?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                We're excited to hear your ideas. Pitch us your article concept and join our community of curious minds.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                  Submit Your Pitch
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}