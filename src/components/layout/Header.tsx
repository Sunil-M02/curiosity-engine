import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryInfo, type Category } from '@/data/articles';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { Logo } from '@/components/brand/Logo';
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
        isScrolled ? 'glass-effect border-b border-border/60' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container content-rail">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Logo variant="full" size="md" linkTo="/" />

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
                        <Link to={`/categories/${category}`} className="w-full">
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-0 right-0 z-50 h-screen w-[85%] max-w-sm bg-card border-l border-border/60 overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <span className="font-display text-base font-semibold text-foreground">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="px-3 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={{ fontSize: '20px', padding: '16px' }}
                    className={`block rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'text-primary'
                        : 'text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 px-4">Topics</p>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/categories/${category}`}
                      style={{ fontSize: '20px', padding: '16px' }}
                      className="block rounded-lg text-foreground hover:bg-secondary/60 transition-colors"
                    >
                      {categoryInfo[category].name}
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
