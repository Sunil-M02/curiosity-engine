import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const TermsPage = () => {
  return (
    <Layout>
      <SEO title="Terms of Service - CuriosityFields" description="Read the terms of service for CuriosityFields." canonical="https://curiosityfields.com/terms" />
      
      <div className="container py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl article-content">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using CuriosityFields, you accept and agree to be bound by these Terms of Service.</p>
          
          <h2>2. Use of Content</h2>
          <p>All content on CuriosityFields is for informational purposes only. You may not reproduce, distribute, or create derivative works without permission.</p>
          
          <h2>3. User Conduct</h2>
          <p>You agree to use our services responsibly and not engage in any activity that could harm the platform or other users.</p>
          
          <h2>4. Intellectual Property</h2>
          <p>All content, trademarks, and intellectual property on CuriosityFields are owned by us or our licensors.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>CuriosityFields is provided "as is" without warranties. We are not liable for any damages arising from your use of our services.</p>
          
          <h2>6. Contact</h2>
          <p>For questions about these terms, contact us at legal@curiosityfields.com.</p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TermsPage;
