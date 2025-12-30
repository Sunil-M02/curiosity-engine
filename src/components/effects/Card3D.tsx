import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 1-10, controls tilt intensity
  glowColor?: string;
}

export function Card3D({ 
  children, 
  className = '', 
  intensity = 5,
  glowColor = 'hsl(var(--primary))'
}: Card3DProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration for smooth animations
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  
  // Shadow and glow transforms
  const shadowX = useTransform(rotateY, [-intensity, intensity], [-8, 8]);
  const shadowY = useTransform(rotateX, [-intensity, intensity], [8, -8]);
  
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to -0.5 to 0.5
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  }, [isMobile, x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isMobile || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) => `${sx}px ${sy}px 30px -10px ${glowColor.replace(')', ' / 0.25)')}`
          ),
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
