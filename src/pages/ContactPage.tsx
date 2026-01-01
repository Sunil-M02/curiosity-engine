import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/seo/SEO';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          source_page: '/contact',
        },
      });

      if (error) {
        console.error('Submission error:', error);
        toast.error('Failed to send message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Redirect to thank-you page on success
      navigate('/contact/thank-you');
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Something went wrong. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO title="Contact Us - CuriosityFields" description="Get in touch with the CuriosityFields team." canonical="https://www.curiosityfields.com/contact" />
      
      <div className="container content-rail py-12 lg:py-20">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-8">Have a question, story idea, or partnership inquiry? We'd love to hear from you.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-opacity disabled:opacity-50" 
                required 
                disabled={isSubmitting}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                maxLength={255}
                className="px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-opacity disabled:opacity-50" 
                required 
                disabled={isSubmitting}
              />
            </div>
            <input 
              type="text" 
              name="subject"
              placeholder="Subject" 
              value={formData.subject}
              onChange={handleChange}
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-opacity disabled:opacity-50" 
              required 
              disabled={isSubmitting}
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows={6} 
              value={formData.message}
              onChange={handleChange}
              maxLength={5000}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-opacity disabled:opacity-50" 
              required 
              disabled={isSubmitting}
            />
            
            <Button 
              variant="hero" 
              size="lg" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
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
