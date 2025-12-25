import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { categoryInfo, type Category } from '@/data/articles';

const categories = Object.keys(categoryInfo) as Category[];

// Social links - currently inactive/placeholder
const socialLinks = [
  { icon: Instagram, label: 'Instagram', handle: '@CuriosityFields', active: false },
  { icon: Facebook, label: 'Facebook', handle: 'CuriosityFields', active: false },
  { icon: Twitter, label: 'X (Twitter)', handle: '@CuriosityFields', active: false },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Company</h4>
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
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest discoveries delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CuriosityFields. All rights reserved.
          </p>
          
          {/* Social Icons - Muted/Disabled State */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <div
                key={social.label}
                className="group relative"
                title={`${social.label} - Coming Soon`}
              >
                <social.icon 
                  className="w-5 h-5 text-muted-foreground/40 cursor-not-allowed transition-colors"
                />
                {/* Tooltip on hover */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-secondary text-xs text-muted-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
