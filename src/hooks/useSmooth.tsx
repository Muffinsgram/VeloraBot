import { useEffect, useCallback } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

export const useSmooth = () => {
  
  const easing = {
    
    easeOutSine: (x: number): number => Math.sin(x * Math.PI / 2),
    
    easeOutCubic: (x: number): number => 1 - Math.pow(1 - x, 3),
    
    easeOutQuint: (x: number): number => 1 - Math.pow(1 - x, 5),
  };

  const scrollToElement = useCallback((
    element: HTMLElement | null,
    options: SmoothScrollOptions = {}
  ) => {
    if (!element) return;

    const {
      duration = 1000,
      easing: easingFn = easing.easeOutCubic,
      offset = 0
    } = options;

    const start = window.pageYOffset;
    const elementTop = element.getBoundingClientRect().top;
    const target = start + elementTop - offset;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFn(progress);
      const currentPosition = start + (target - start) * easedProgress;
      
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const handleAnchorClick = useCallback((
    event: React.MouseEvent<HTMLAnchorElement>,
    options?: SmoothScrollOptions
  ) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;

    event.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    
    scrollToElement(element, options);
  }, [scrollToElement]);

  
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const handleNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          scrollToElement(element, { duration: 800 });
        }
      }
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, [scrollToElement]);

  return {
    scrollToElement,
    handleAnchorClick,
    easing
  };
};