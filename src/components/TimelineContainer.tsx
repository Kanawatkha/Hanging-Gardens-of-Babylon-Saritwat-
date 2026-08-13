import React, { useRef, useEffect } from 'react';
import { TimelineBlock } from '../types/timeline';
import { TimelineCard } from './TimelineCard';
import { animate, stagger } from 'animejs';

interface TimelineContainerProps {
  blocks: TimelineBlock[];
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({ blocks }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && headerRef.current) {
            const headerItems = headerRef.current.querySelectorAll('.column-header-item');
            if (headerItems.length > 0) {
              animate(headerItems, {
                opacity: [0, 1],
                translateY: [24, 0],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 750,
                delay: stagger(150, { start: 0 }),
                ease: 'outExpo',
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Column Headers for Desktop View with Anime.js Scroll Entrance */}
      <div
        ref={headerRef}
        className="hidden md:grid grid-cols-2 gap-24 lg:gap-28 mb-20 text-center border-b border-stone-200 pb-8"
      >
        <div className="column-header-item opacity-0 flex items-center justify-center gap-3 text-emerald-900 font-serif-display text-2xl font-light">
          <span className="w-3 h-3 rounded-full bg-emerald-600 shadow-sm" />
          <span className="font-thai-title">ทฤษฎีนีเนเวห์ (Nineveh Theory / ~700 BCE)</span>
        </div>
        <div className="column-header-item opacity-0 flex items-center justify-center gap-3 text-amber-900 font-serif-display text-2xl font-light">
          <span className="w-3 h-3 rounded-full bg-amber-600 shadow-sm" />
          <span className="font-thai-title">ทฤษฎีบาบิโลน (Babylon Theory / ~600 BCE)</span>
        </div>
      </div>

      {/* Mobile Column Header Badges */}
      <div className="md:hidden flex flex-col gap-2 mb-10 pl-10 pr-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium tracking-wide">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Nineveh Theory (~700 BCE)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Babylon Theory (~600 BCE)
          </span>
        </div>
      </div>

      {/* Timeline Event Blocks Grid */}
      <div className="space-y-16 sm:space-y-20 md:space-y-28">
        {blocks.map((block) => {
          const isLeft = block.side === 'left';

          return (
            <div
              key={block.id}
              className="timeline-block-row relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 lg:gap-28 items-start pl-10 md:pl-0"
            >
              {/* Central Desktop Node Dot, Opposite-Side Year Badge & Horizontal Branch Line */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-12 z-20 items-center justify-center pointer-events-none">
                {/* Year Badge Positioned on Open Opposite Side */}
                <div
                  className={`block-year-badge opacity-0 absolute -top-3.5 whitespace-nowrap px-3 py-0.5 rounded-full font-mono text-[11px] font-bold tracking-wider shadow-sm backdrop-blur-md border border-stone-300 bg-white/95 text-stone-800 z-30 ${
                    isLeft ? 'left-full ml-3' : 'right-full mr-3'
                  }`}
                >
                  {block.yearDisplay}
                </div>

                {/* Circular Node Dot Centered on Timeline Line */}
                <div
                  className={`block-node-dot opacity-0 w-4 h-4 rounded-full border-2 border-white shadow-md z-20 ${
                    isLeft
                      ? 'bg-emerald-600 shadow-emerald-600/40 ring-2 ring-emerald-500/20'
                      : 'bg-amber-600 shadow-amber-600/40 ring-2 ring-amber-500/20'
                  }`}
                />

                {/* Horizontal Branch Connector Line */}
                <div
                  style={{
                    transformOrigin: isLeft ? 'right center' : 'left center',
                  }}
                  className={`block-branch-line opacity-0 absolute top-1/2 -translate-y-1/2 h-[2px] z-10 ${
                    isLeft
                      ? 'right-1/2 w-12 lg:w-14 bg-emerald-500/80'
                      : 'left-1/2 w-12 lg:w-14 bg-amber-500/80'
                  }`}
                />
              </div>

              {/* Mobile Node Dot Positioned Centered Directly ON Left Vertical Line (x = 16px) */}
              <div className="md:hidden absolute top-12 left-0 -translate-x-1/2 z-20 pointer-events-none">
                <div
                  className={`block-node-dot opacity-0 w-4 h-4 rounded-full border-2 border-white shadow-md ${
                    isLeft
                      ? 'bg-emerald-600 shadow-emerald-600/40 ring-2 ring-emerald-500/20'
                      : 'bg-amber-600 shadow-amber-600/40 ring-2 ring-amber-500/20'
                  }`}
                />
              </div>

              {/* Mobile Horizontal Branch Connector Line Spanning from Line (16px) to Card Edge (56px) */}
              <div
                style={{ transformOrigin: 'left center' }}
                className={`block-branch-line opacity-0 md:hidden absolute top-14 left-0 h-[2px] z-10 w-10 ${
                  isLeft ? 'bg-emerald-500/80' : 'bg-amber-500/80'
                }`}
              />

              {/* Left Column (Nineveh) */}
              {isLeft ? (
                <div className="relative z-10 w-full">
                  {/* Mobile Year Badge Positioned Cleanly ABOVE Top-Left Corner of Card Box */}
                  <div className="md:hidden mb-2.5">
                    <span
                      className={`block-year-badge opacity-0 inline-block px-3 py-0.5 rounded-full font-mono text-[11px] font-bold tracking-wider border shadow-xs ${
                        isLeft
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                          : 'bg-amber-50 text-amber-950 border-amber-200'
                      }`}
                    >
                      {block.yearDisplay}
                    </span>
                  </div>
                  <TimelineCard block={block} />
                </div>
              ) : (
                <div className="hidden md:block min-h-[100px]" aria-hidden="true" />
              )}

              {/* Right Column (Babylon) */}
              {!isLeft ? (
                <div className="relative z-10 w-full">
                  {/* Mobile Year Badge Positioned Cleanly ABOVE Top-Left Corner of Card Box */}
                  <div className="md:hidden mb-2.5">
                    <span
                      className={`block-year-badge opacity-0 inline-block px-3 py-0.5 rounded-full font-mono text-[11px] font-bold tracking-wider border shadow-xs ${
                        isLeft
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                          : 'bg-amber-50 text-amber-950 border-amber-200'
                      }`}
                    >
                      {block.yearDisplay}
                    </span>
                  </div>
                  <TimelineCard block={block} />
                </div>
              ) : (
                <div className="hidden md:block min-h-[100px]" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
