import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="absolute inset-0 bg-card/90" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative px-6 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Stay Curious
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join over 10,000 readers who receive our weekly digest of the most fascinating 
              discoveries in science, technology, and beyond.
            </p>
            
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button variant="hero" size="lg" type="submit">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            
            <p className="text-muted-foreground text-sm mt-4">
              No spam. One thoughtful email a week.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
