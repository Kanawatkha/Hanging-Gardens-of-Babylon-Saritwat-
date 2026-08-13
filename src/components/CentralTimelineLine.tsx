import React, { useEffect, useRef } from 'react';

export const CentralTimelineLine: React.FC = () => {
  const lineRefDesktop = useRef<SVGLineElement>(null);
  const lineRefMobile = useRef<SVGLineElement>(null);
  const maxDrawnRef = useRef(0);

  useEffect(() => {
    const updateLineHeightSynchronously = () => {
      const mainElement = document.getElementById('main-content');
      const summaryWrapper = document.getElementById('summary-section-wrapper');

      if (mainElement) {
        const rect = mainElement.getBoundingClientRect();
        const cursorTopY = window.innerHeight - 34;
        const drawnPixels = cursorTopY - rect.top;

        let maxPixels = rect.height - 380;
        if (summaryWrapper) {
          const wrapperRect = summaryWrapper.getBoundingClientRect();
          // Stop line precisely at center of docked node dot (top-4 = 16px from wrapper top)
          maxPixels = wrapperRect.top - rect.top + 16;
        }

        const currentCalculated = Math.max(0, Math.min(drawnPixels, maxPixels));

        if (currentCalculated > maxDrawnRef.current) {
          maxDrawnRef.current = currentCalculated;
        }

        // Desktop straight central line mutation (>= 768px)
        if (lineRefDesktop.current) {
          lineRefDesktop.current.setAttribute('y2', `${maxDrawnRef.current}`);
        }

        // Mobile straight left-aligned line mutation (< 768px)
        if (lineRefMobile.current) {
          lineRefMobile.current.setAttribute('y2', `${maxDrawnRef.current}`);
        }
      }
    };

    window.addEventListener('scroll', updateLineHeightSynchronously, { passive: true });
    window.addEventListener('resize', updateLineHeightSynchronously, { passive: true });
    updateLineHeightSynchronously();

    return () => {
      window.removeEventListener('scroll', updateLineHeightSynchronously);
      window.removeEventListener('resize', updateLineHeightSynchronously);
    };
  }, []);

  return (
    <>
      {/* Desktop Central Straight Line (>= 768px) */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-0 flex-col items-center"
      >
        <svg className="w-full h-full" style={{ overflow: 'visible' }}>
          <line
            ref={lineRefDesktop}
            x1="24"
            y1="0"
            x2="24"
            y2="0"
            stroke="#a8a29e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Mobile Straight Left-Aligned Line (< 768px) - Aligned with px-4 sm:px-6 container padding */}
      <div
        aria-hidden="true"
        className="md:hidden absolute top-0 bottom-0 left-4 sm:left-6 -translate-x-1/2 w-12 pointer-events-none z-0 flex flex-col items-center"
      >
        <svg className="w-full h-full" style={{ overflow: 'visible' }}>
          <line
            ref={lineRefMobile}
            x1="24"
            y1="0"
            x2="24"
            y2="0"
            stroke="#a8a29e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};
