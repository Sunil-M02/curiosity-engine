import { Category } from '@/data/articles';

// Topic-based fallback images using LOCAL assets (never breaks)
export const categoryFallbackImages: Record<Category, string> = {
  'science': '/images/defaults/science.jpg',
  'technology': '/images/defaults/technology.jpg',
  'artificial-intelligence': '/images/defaults/ai.jpg',
  'history': '/images/defaults/history.jpg',
  'astronomy': '/images/defaults/space.jpg',
  'future-innovation': '/images/defaults/future.jpg',
};

// Generic fallback for unknown categories (uses technology as a safe default)
export const genericFallbackImage = '/images/defaults/technology.jpg';

/**
 * Get a fallback image based on topic/category - always returns a local path
 */
export function getFallbackImage(category?: Category): string {
  if (category && categoryFallbackImages[category]) {
    return categoryFallbackImages[category];
  }
  return genericFallbackImage;
}

/**
 * Validate if an image URL is from an allowed source
 */
export function isAllowedImageSource(url: string): boolean {
  // Local assets are always allowed and preferred
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // Data URLs are allowed (for generated images)
  if (url.startsWith('data:')) {
    return true;
  }
  
  // Allowed CDN domains - only our own CDN, no external hotlinking
  const allowedDomains = [
    'cdn.curiosityfields.com',
    'curiosityfields.com',
    'www.curiosityfields.com',
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain));
  } catch {
    return false;
  }
}

/**
 * Check if URL is a local/self-hosted image (most reliable)
 */
export function isLocalImage(url: string): boolean {
  return url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.startsWith('data:');
}

/**
 * Generate contextual alt text from article data
 */
export function generateAltText(
  title: string,
  category?: Category,
  fallbackAlt?: string
): string {
  if (fallbackAlt && fallbackAlt.trim()) {
    return fallbackAlt;
  }
  
  // Generate descriptive alt text from title and category
  const categoryName = category ? getCategoryDisplayName(category) : '';
  const prefix = categoryName ? `${categoryName}: ` : '';
  
  return `${prefix}${title}`.slice(0, 125); // Keep alt text concise
}

/**
 * Get display name for category
 */
function getCategoryDisplayName(category: Category): string {
  const categoryNames: Record<Category, string> = {
    'science': 'Science',
    'technology': 'Technology',
    'artificial-intelligence': 'AI',
    'history': 'History',
    'astronomy': 'Space',
    'future-innovation': 'Innovation',
  };
  return categoryNames[category] || '';
}

/**
 * Generate responsive image srcset for optimized loading
 */
export function generateSrcSet(baseUrl: string, sizes: number[] = [400, 800, 1200]): string {
  // Only generate srcset for Unsplash images (they support dynamic sizing)
  if (!baseUrl.includes('unsplash.com')) {
    return '';
  }
  
  return sizes
    .map(size => {
      const url = baseUrl.replace(/w=\d+/, `w=${size}`);
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Get optimized image URL with proper sizing
 */
export function getOptimizedImageUrl(
  url: string,
  width: number = 1200,
  height?: number
): string {
  if (!url) return genericFallbackImage;
  
  // For Unsplash, update the width/height params
  if (url.includes('unsplash.com')) {
    let optimized = url.replace(/w=\d+/, `w=${width}`);
    if (height) {
      optimized = optimized.replace(/h=\d+/, `h=${height}`);
    }
    return optimized;
  }
  
  return url;
}

/**
 * Check if image URL is valid (basic validation)
 */
export function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  if (url.trim() === '') return false;
  
  // Data URLs are valid
  if (url.startsWith('data:image/')) return true;
  
  // Local paths are valid
  if (url.startsWith('/') || url.startsWith('./')) return true;
  
  // Check for valid URL format
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Log missing or broken images (for admin monitoring)
 */
export function logImageError(
  src: string,
  context: string,
  error?: Error
): void {
  if (import.meta.env.DEV) {
    console.warn(`[Image Error] ${context}:`, {
      src,
      error: error?.message,
      timestamp: new Date().toISOString(),
    });
  }
}
