import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global Lenis smooth scrolling.
 * - Disabled on touch devices (preserves native momentum & avoids INP regressions)
 * - Disabled when user prefers reduced motion
 * - Initialized after first paint to protect LCP
 * - No layout/CLS impact (Lenis only hooks scroll events; no DOM wrapping)
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let cancelIdle: (() => void) | null = null;

    const start = () => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        lerp: 0.1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    // Defer init until after LCP / idle to keep page load snappy
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      cancelIdle = () => w.cancelIdleCallback?.(id);
    } else {
      const t = window.setTimeout(start, 600);
      cancelIdle = () => window.clearTimeout(t);
    }

    return () => {
      cancelIdle?.();
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
