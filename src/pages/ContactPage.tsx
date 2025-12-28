import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  return (
    <Layout>
      <SEO title="Contact Us - CuriosityFields" description="Get in touch with the CuriosityFields team." canonical="https://curiosityfields.com/contact" />
      
      <div className="container py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-8">Have a question, story idea, or partnership inquiry? We'd love to hear from you.</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              <input type="email" placeholder="Your Email" className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
            </div>
            <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
            <textarea placeholder="Your Message" rows={6} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
            <Button variant="hero" size="lg" type="submit">Send Message</Button>
          </form>

          <div className="mt-12 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary" />
              <span>sunilfun009@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Mumbai, India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ContactPage;
