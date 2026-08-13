import React, { useRef, useEffect } from 'react';
import { TimelineBlock } from '../types/timeline';
import { animate, stagger } from 'animejs';

interface TimelineCardProps {
  block: TimelineBlock;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ block }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = block.side === 'left';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            // Find parent block row container to synchronize branch line and card entrance
            const blockRow = cardRef.current.closest('.timeline-block-row');
            if (blockRow) {
              const nodeDots = blockRow.querySelectorAll('.block-node-dot');
              const yearBadges = blockRow.querySelectorAll('.block-year-badge');
              const branchLines = blockRow.querySelectorAll('.block-branch-line');

              // Step 1 (0ms): Fade in Node Dots & Year Badges (Animate ALL matched elements in DOM)
              if (nodeDots.length > 0) {
                animate(nodeDots, {
                  opacity: [0, 1],
                  duration: 300,
                  ease: 'outQuad',
                });
              }
              if (yearBadges.length > 0) {
                animate(yearBadges, {
                  opacity: [0, 1],
                  duration: 300,
                  ease: 'outQuad',
                });
              }

              // Step 2 (150ms): Draw Branch Lines Horizontally towards Card
              if (branchLines.length > 0) {
                animate(branchLines, {
                  scaleX: [0, 1],
                  opacity: [0, 1],
                  duration: 350,
                  delay: 150,
                  ease: 'outQuad',
                });
              }
            }

            // Step 3 (380ms): Card Entrance Fades & Blurs in in PERFECT SYNC as Branch Line touches Card
            animate(cardRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              filter: ['blur(12px)', 'blur(0px)'],
              duration: 650,
              delay: 380,
              ease: 'outExpo',
            });

            // Step 4 (480ms): Stagger Inner Card Elements
            const innerItems = cardRef.current.querySelectorAll('.card-anim-item');
            if (innerItems.length > 0) {
              animate(innerItems, {
                opacity: [0, 1],
                translateY: [16, 0],
                filter: ['blur(8px)', 'blur(0px)'],
                duration: 600,
                delay: stagger(70, { start: 480 }),
                ease: 'outExpo',
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative w-full rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 opacity-0 ${
        isLeft ? 'border-l-4 border-l-emerald-600' : 'border-r-4 border-r-amber-600'
      }`}
    >
      {/* Flush Top Image Section with Smooth Hover Zoom */}
      {block.imageUrl ? (
        <div className="card-anim-item opacity-0 relative w-full h-48 sm:h-64 bg-stone-100 overflow-hidden border-b border-stone-200/80">
          <img
            src={block.imageUrl}
            alt={block.imageAlt || block.titleEN}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Subtle Bottom Gradient Edge for Seamless Visual Transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      ) : (
        /* Fallback Placeholder */
        <div
          aria-hidden="true"
          className="card-anim-item opacity-0 relative w-full h-48 sm:h-60 bg-stone-100 border-b border-stone-200/80 flex flex-col items-center justify-center p-4 overflow-hidden"
        >
          <svg className="absolute inset-0 w-full h-full text-stone-200/80 opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <span className="relative z-10 text-xs font-mono tracking-widest text-stone-400 uppercase font-medium">
            Historical Image
          </span>
        </div>
      )}

      {/* Card Content Section */}
      <div className="p-6 sm:p-8">
        {/* Theory Tag */}
        <div className="card-anim-item opacity-0 mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase ${
              isLeft
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}
          >
            {isLeft ? 'Nineveh Theory' : 'Babylon Theory'}
          </span>
        </div>

        {/* Titles */}
        <h3 className="card-anim-item opacity-0 font-serif-display text-2xl sm:text-3xl text-stone-950 font-light leading-snug">
          {block.titleEN}
        </h3>
        <h4 className="card-anim-item opacity-0 font-thai-title text-base sm:text-lg font-medium text-stone-800 mt-1 mb-4">
          {block.titleTH}
        </h4>

        {/* Thai Paragraph Description */}
        <div className="card-anim-item opacity-0 font-thai-body text-stone-600 text-sm sm:text-base leading-relaxed font-normal space-y-3">
          {block.descriptionTH.split('\n\n').map((paragraph, pIdx) => (
            <p key={`p-${pIdx}`}>{paragraph}</p>
          ))}
        </div>

        {/* Optional Historical Quote */}
        {block.quote && (
          <blockquote className="card-anim-item opacity-0 mt-5 p-4 rounded-xl bg-stone-50 border-l-3 border-stone-400 text-stone-700 italic text-xs sm:text-sm leading-relaxed">
            "{block.quote.text}"
            <cite className="block not-italic font-sans font-medium text-stone-500 mt-2 text-xs">
              — {block.quote.author}
            </cite>
          </blockquote>
        )}
      </div>
    </div>
  );
};
