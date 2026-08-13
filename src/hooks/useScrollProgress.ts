import { useState, useEffect } from 'react';

export interface ScrollState {
  scrollTop: number;
  scrollProgress: number; // 0.0 to 1.0
  scrollHeight: number;
  clientHeight: number;
}

export const useScrollProgress = (): ScrollState => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollTop: 0,
    scrollProgress: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? Math.min(Math.max(scrollTop / totalScrollable, 0), 1) : 0;

      setScrollState({
        scrollTop,
        scrollProgress: progress,
        scrollHeight,
        clientHeight,
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return scrollState;
};
