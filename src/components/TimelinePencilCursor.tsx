import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const TimelinePencilCursor: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const hasCompletedRef = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial page load entrance animation
    if (cursorRef.current) {
      animate(cursorRef.current, {
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        translateY: [20, 0],
        duration: 800,
        delay: 1400,
        ease: 'outExpo',
      });
    }

    const handleScroll = () => {
      if (hasCompletedRef.current) return;

      const summaryElement = document.getElementById('summary-section-card');
      if (summaryElement) {
        const summaryRect = summaryElement.getBoundingClientRect();
        const cursorViewportY = window.innerHeight - 34;

        if (summaryRect.top <= cursorViewportY) {
          hasCompletedRef.current = true;
          setIsCompleted(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isCompleted || hasCompletedRef.current) return null;

  return (
    <div
      aria-hidden="true"
      className="flex fixed bottom-6 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-40 flex-col items-center pointer-events-none"
    >
      {/* Sleek Screen-Locked Pencil Head Cursor Node (Left-aligned on Mobile, Center-aligned on Desktop) */}
      <div
        ref={cursorRef}
        className="relative w-5 h-5 rounded-full border-2 border-stone-400 bg-white shadow-xl flex items-center justify-center ring-4 ring-stone-400/20 opacity-0"
      >
        <div className="w-2 h-2 rounded-full bg-stone-700" />
      </div>
    </div>
  );
};
