import { Link, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { categoryInfo, type Category } from '@/data/articles';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';
import { Logo } from '@/components/brand/Logo';

const categories = Object.keys(categoryInfo) as Category[];

// Social links with brand-accurate SVG icons
const socialLinks = [
  { 
    label: 'X', 
    url: 'https://x.com/curiosityfields',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    label: 'LinkedIn', 
    url: 'https://linkedin.com/company/curiosityfields',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  { 
    label: 'Instagram', 
    url: 'https://instagram.com/curiosityfields',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  { 
    label: 'Facebook', 
    url: 'https://facebook.com/curiosityfields',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
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
      <div className="container content-rail py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 items-start">
          {/* Brand */}
          <div>
            <Logo variant="full" size="md" className="mb-4" />
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
                    to={`/categories/${category}`}
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: categoryInfo[category].color }}
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
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 -m-2 text-muted-foreground hover:text-primary transition-all duration-150 hover:scale-105"
                aria-label={`Follow us on ${social.label}`}
              >
                <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-150" />
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
