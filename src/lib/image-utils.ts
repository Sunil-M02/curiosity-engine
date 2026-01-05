import { Category } from '@/data/articles';

// Topic-based fallback images (using high-quality Unsplash images)
export const categoryFallbackImages: Record<Category, string> = {
  'science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=800&fit=crop',
  'technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop',
  'artificial-intelligence': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop',
  'history': 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=1200&h=800&fit=crop',
  'astronomy': 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=1200&h=800&fit=crop',
  'future-innovation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop',
};

// Generic fallback for unknown categories
export const genericFallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop';

/**
 * Get a fallback image based on topic/category
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
  // Local assets are always allowed
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // Data URLs are allowed (for generated images)
  if (url.startsWith('data:')) {
    return true;
  }
  
  // Allowed CDN domains
  const allowedDomains = [
    'images.unsplash.com',
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
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Image Error] ${context}:`, {
      src,
      error: error?.message,
      timestamp: new Date().toISOString(),
    });
  }
}
