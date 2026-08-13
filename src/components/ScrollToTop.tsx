import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollToTop: React.FC = () => {
  const { scrollTop } = useScrollProgress();
  const isVisible = scrollTop > 350;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-stone-100 shadow-xl border border-stone-700 text-xs font-mono tracking-wider uppercase hover:bg-stone-800 transition-all duration-500 ease-in-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 blur-none pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 blur-md pointer-events-none'
      }`}
    >
      <svg className="w-4 h-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
      Top
    </button>
  );
};
