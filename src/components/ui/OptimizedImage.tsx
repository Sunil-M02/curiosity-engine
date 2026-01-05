import { useState, useCallback, useEffect, ImgHTMLAttributes } from 'react';
import { Category } from '@/data/articles';
import {
  getFallbackImage,
  generateAltText,
  generateSrcSet,
  isValidImageUrl,
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
  const [imgSrc, setImgSrc] = useState<string>(() => 
    isValidImageUrl(src) ? src : getFallbackImage(category)
  );
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Update src when prop changes
  useEffect(() => {
    if (isValidImageUrl(src)) {
      setImgSrc(src);
      setHasError(false);
      setIsLoaded(false);
    } else {
      setImgSrc(getFallbackImage(category));
      setHasError(true);
    }
  }, [src, category]);

  const handleError = useCallback(() => {
    if (!hasError) {
      logImageError(src, articleTitle || 'Unknown context');
      setHasError(true);
      setImgSrc(getFallbackImage(category));
    }
  }, [src, category, articleTitle, hasError]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Generate contextual alt text if none provided
  const finalAlt = generateAltText(articleTitle || '', category, alt);
  
  // Ensure alt is never empty
  const safeAlt = finalAlt || 'Article illustration';

  // Generate srcset for responsive images
  const srcSet = generateSrcSet(imgSrc);

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
          srcSet={srcSet || undefined}
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
      srcSet={srcSet || undefined}
      sizes={sizes}
      {...props}
    />
  );
}
