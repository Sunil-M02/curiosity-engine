import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryInfo, type Category } from '@/data/articles';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';

const categories = Object.keys(categoryInfo) as Category[];

// Social links - active with proper URLs
const socialLinks = [
  { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/curiosityfields' },
  { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/curiosityfields' },
  { icon: Twitter, label: 'X', url: 'https://x.com/curiosityfields' },
];

export function Footer() {
  const location = useLocation();
  const {
    email,
    setEmail,
    error,
    clearError,
    isSubmitting,
    isSuccess,
    handleSubmit,
  } = useNewsletterSubscription({ sourcePage: `${location.pathname}#footer` });

  return (
    <footer className="bg-card border-t border-border/50 mt-16">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">C</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                CuriosityFields
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Independent writing and research-driven stories exploring ideas that shape science, technology, and the future.
            </p>
            <Link
              to="/write-for-us"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Become a Contributor →
            </Link>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Topics</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/category/${category}`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {categoryInfo[category].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About CuriosityFields
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/write-for-us" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Write for Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Stay Curious</h4>
            
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground text-sm font-medium">You're subscribed. Welcome to CuriosityFields.</p>
                  <p className="text-muted-foreground text-xs mt-1">One thoughtful email per week.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="text-muted-foreground text-sm mb-4">
                  Get the latest discoveries delivered to your inbox.
                </p>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) clearError();
                    }}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2 bg-secondary border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                      error 
                        ? 'border-destructive focus:ring-destructive/50' 
                        : 'border-border focus:ring-primary/40 focus:border-primary/50'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-xs mt-2 font-medium"
                  >
                    {error}
                  </motion.p>
                )}
                <p className="text-muted-foreground text-xs mt-2">
                  No spam. One thoughtful email per week.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CuriosityFields. All rights reserved.
          </p>
          
          {/* Social Icons - Active State */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 -m-2"
                aria-label={`Follow us on ${social.label}`}
              >
                <social.icon 
                  className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-200"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
