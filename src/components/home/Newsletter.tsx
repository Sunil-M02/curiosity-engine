import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';

export function Newsletter() {
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  
  const {
    email,
    setEmail,
    error,
    clearError,
    isSubmitting,
    isSuccess,
    handleSubmit,
  } = useNewsletterSubscription({ sourcePage: location.pathname });
  
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  []);

  if (isSuccess) {
    return (
      <section className="py-12 lg:py-16">
        <div className="container content-rail">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-10" />
            <div className="absolute inset-0 bg-card/90" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />
            
            <div className="relative px-6 py-14 lg:px-16 lg:py-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              </motion.div>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                You're subscribed. Welcome to CuriosityFields.
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                One thoughtful email per week. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container content-rail">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background with aura effect */}
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="absolute inset-0 bg-card/90" />
          
          {/* Animated aura glows - respect reduced motion */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            animate={!prefersReducedMotion ? { 
              opacity: isFocused ? 0.4 : 0.2,
              scale: isFocused ? 1.1 : 1
            } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
            animate={!prefersReducedMotion ? { 
              opacity: isFocused ? 0.35 : 0.2,
              scale: isFocused ? 1.1 : 1
            } : undefined}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          
          {/* Subtle grain texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative px-6 py-14 lg:px-16 lg:py-16 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Stay Curious
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join over 10,000 readers who receive our weekly digest of the most fascinating 
              discoveries in science, technology, and beyond.
            </p>
            
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) clearError();
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className={`w-full px-5 py-3 rounded-xl bg-secondary border text-foreground placeholder:text-muted-foreground/70 transition-all duration-150 focus:outline-none ${
                    error 
                      ? 'border-destructive focus:ring-2 focus:ring-destructive/50' 
                      : 'border-border focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                type="submit"
                disabled={isSubmitting}
                className="transition-all duration-150 hover:shadow-[0_0_24px_hsl(var(--primary)/0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-3 font-medium"
              >
                {error}
              </motion.p>
            )}
            
            <p className="text-muted-foreground text-sm mt-4">
              No spam. One thoughtful email per week.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
