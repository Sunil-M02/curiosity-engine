import { useEffect, useRef, useMemo, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [isReady, setIsReady] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Determine particle count based on screen size
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 30;
    const width = window.innerWidth;
    if (width < 768) return 15; // Mobile
    if (width < 1024) return 25; // Tablet
    return 40; // Desktop
  }, []);

  // Defer initialization until after first content paint
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Use requestIdleCallback if available, otherwise setTimeout
    const deferInit = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setIsReady(true), { timeout: 500 });
      } else {
        setTimeout(() => setIsReady(true), 300);
      }
    };

    // Wait for LCP to complete before initializing
    deferInit();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15, // Very slow
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.25 + 0.05,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 70%, 70%, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isReady, particleCount, prefersReducedMotion]);

  // Don't render if reduced motion preferred or not ready
  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-40' : 'opacity-0'}`}
      aria-hidden="true"
    />
  );
}
