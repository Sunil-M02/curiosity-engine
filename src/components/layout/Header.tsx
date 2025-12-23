import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryInfo, type Category } from '@/data/articles';

const categories = Object.keys(categoryInfo) as Category[];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              CuriosityFields
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {categoryInfo[category].name}
              </Link>
            ))}
            <Link
              to="/categories"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              More
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/about">
              <Button variant="outline" size="sm">About</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-effect border-b border-border/50 overflow-hidden"
          >
            <div className="container py-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="px-4 py-3 rounded-lg bg-secondary/50 text-sm text-secondary-foreground hover:bg-secondary transition-colors"
                  >
                    {categoryInfo[category].name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Link to="/about" className="flex-1">
                  <Button variant="outline" className="w-full">About</Button>
                </Link>
                <Link to="/contact" className="flex-1">
                  <Button variant="default" className="w-full">Contact</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
