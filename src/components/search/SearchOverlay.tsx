import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, ArrowRight } from 'lucide-react';
import { articles, categoryInfo } from '@/data/articles';
import { format } from 'date-fns';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchOverlay({ isOpen, onClose, initialQuery = '' }: SearchOverlayProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Filter articles based on query
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    
    const searchTerm = debouncedQuery.toLowerCase();
    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(searchTerm);
      const excerptMatch = article.excerpt.toLowerCase().includes(searchTerm);
      const categoryMatch = categoryInfo[article.category].name.toLowerCase().includes(searchTerm);
      const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      return titleMatch || excerptMatch || categoryMatch || tagMatch;
    }).slice(0, 8);
  }, [debouncedQuery]);

  // Highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">{part}</mark>
      ) : part
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 pt-20 pb-6 px-4"
          >
            <div className="max-w-2xl mx-auto">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, topics, tags..."
                  className="w-full h-14 pl-12 pr-12 bg-card border border-border rounded-xl text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {debouncedQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="mt-3 bg-card border border-border rounded-xl overflow-hidden shadow-xl"
                  >
                    {results.length > 0 ? (
                      <div className="max-h-[60vh] overflow-y-auto">
                        {results.map((article, index) => (
                          <Link
                            key={article.id}
                            to={`/article/${article.slug}`}
                            onClick={onClose}
                            className="group block p-4 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={article.coverImage}
                                alt={article.title}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                                    style={{ 
                                      backgroundColor: categoryInfo[article.category].color,
                                      color: 'hsl(222, 47%, 6%)'
                                    }}
                                  >
                                    {categoryInfo[article.category].name}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                                  </span>
                                </div>
                                <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                  {highlightText(article.title, debouncedQuery)}
                                </h4>
                                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                  {highlightText(article.excerpt, debouncedQuery)}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                            </div>
                          </Link>
                        ))}
                        
                        {results.length >= 8 && (
                          <div className="p-3 text-center border-t border-border/50 bg-secondary/20">
                            <span className="text-sm text-muted-foreground">
                              Showing top 8 results
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground">
                          No articles found for "{debouncedQuery}"
                        </p>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                          Try different keywords or browse by topic
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Keyboard hint */}
              <div className="mt-3 text-center">
                <span className="text-xs text-muted-foreground">
                  Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">Esc</kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
