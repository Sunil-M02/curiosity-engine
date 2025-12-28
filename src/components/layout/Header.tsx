import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryInfo, type Category } from '@/data/articles';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = Object.keys(categoryInfo) as Category[];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Topics', href: '/categories', hasDropdown: true },
  { label: 'Write for Us', href: '/write-for-us' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    setIsSearchOpen(false);
  }, [location]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

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
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`px-3 py-2 text-sm flex items-center gap-1 transition-colors link-underline ${
                        isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} asChild>
                        <Link to={`/category/${category}`} className="w-full">
                          {categoryInfo[category].name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 text-sm transition-colors link-underline ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions - Search Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </Button>
          </div>

          {/* Search Overlay */}
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

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
              {/* Main Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Topic Categories */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-4">Topics</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category}`}
                      className="px-4 py-2 rounded-lg bg-secondary/30 text-sm text-secondary-foreground hover:bg-secondary transition-colors"
                    >
                      {categoryInfo[category].name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
