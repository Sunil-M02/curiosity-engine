import { useState, useCallback, useEffect, ImgHTMLAttributes } from 'react';
import { Category } from '@/data/articles';
import {
  getFallbackImage,
  generateAltText,
  isLocalImage,
  logImageError,
} from '@/lib/image-utils';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  alt: string;
  category?: Category;
  articleTitle?: string;
  /**
   * Enable lazy loading (default: true for images below fold)
   */
  lazy?: boolean;
  /**
   * Responsive sizes for srcset generation
   */
  sizes?: string;
  /**
   * Additional class for the wrapper
   */
  wrapperClassName?: string;
  /**
   * Show loading skeleton
   */
  showSkeleton?: boolean;
}

/**
 * Get the best initial source - prefer local images, fallback for external
 */
function getInitialSrc(src: string | undefined | null, category?: Category): string {
  // No source provided
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return getFallbackImage(category);
  }
  
  // Local images are always safe to use
  if (isLocalImage(src)) {
    return src;
  }
  
  // External URLs - try them but be ready to fallback
  try {
    new URL(src);
    return src;
  } catch {
    return getFallbackImage(category);
  }
}

export function OptimizedImage({
  src,
  alt,
  category,
  articleTitle,
  lazy = true,
  sizes,
  className,
  wrapperClassName,
  showSkeleton = false,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => getInitialSrc(src, category));
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Update src when prop changes
  useEffect(() => {
    const newSrc = getInitialSrc(src, category);
    setImgSrc(newSrc);
    setHasError(false);
    setIsLoaded(false);
    setRetryCount(0);
  }, [src, category]);

  const handleError = useCallback(() => {
    // Only log and fallback once per image
    if (!hasError) {
      logImageError(src, articleTitle || 'Unknown context');
      setHasError(true);
      
      // Switch to local fallback immediately
      const fallback = getFallbackImage(category);
      setImgSrc(fallback);
      
      // If fallback also fails (shouldn't happen with local images), increment retry
      setRetryCount(prev => prev + 1);
    } else if (retryCount < 2) {
      // Ultimate fallback - just use generic
      setImgSrc('/images/defaults/technology.jpg');
      setRetryCount(prev => prev + 1);
    }
  }, [src, category, articleTitle, hasError, retryCount]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Generate contextual alt text if none provided
  const finalAlt = generateAltText(articleTitle || '', category, alt);
  
  // Ensure alt is never empty
  const safeAlt = finalAlt || 'Article illustration';

  if (showSkeleton) {
    return (
      <div className={cn('relative overflow-hidden', wrapperClassName)}>
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={safeAlt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
          sizes={sizes}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={safeAlt}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      sizes={sizes}
      {...props}
    />
  );
}
