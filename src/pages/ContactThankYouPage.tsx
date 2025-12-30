import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';

const ContactThankYouPage = () => {
  return (
    <Layout>
      <SEO 
        title="Message Sent - CuriosityFields" 
        description="Thank you for contacting CuriosityFields." 
        robots="noindex, follow"
      />
      
      <div className="container content-rail py-20 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>

          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Thanks for reaching out.
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            We've received your message and will respond within 24–48 hours.
          </p>

          <Link to="/">
            <Button variant="hero" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ContactThankYouPage;
