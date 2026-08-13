import React, { useRef, useEffect } from 'react';
import { ReferenceItem } from '../types/timeline';
import { animate, stagger } from 'animejs';

interface ReferenceListProps {
  items: ReferenceItem[];
}

export const ReferenceList: React.FC<ReferenceListProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            // Animate Header Title and Subtitle
            const headerItems = containerRef.current.querySelectorAll('.ref-header-item');
            if (headerItems.length > 0) {
              animate(headerItems, {
                opacity: [0, 1],
                translateY: [20, 0],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 700,
                delay: stagger(100, { start: 0 }),
                ease: 'outExpo',
              });
            }

            // Animate Bibliography Cards with Stagger
            const cards = containerRef.current.querySelectorAll('.ref-card-item');
            if (cards.length > 0) {
              animate(cards, {
                opacity: [0, 1],
                translateY: [24, 0],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 700,
                delay: stagger(100, { start: 250 }),
                ease: 'outExpo',
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full max-w-5xl mx-auto my-16 px-6 pt-12 border-t border-stone-200">
      {/* Animated Header Section */}
      <div className="text-center mb-10">
        <h3 className="ref-header-item opacity-0 font-serif-display text-2xl sm:text-3xl text-stone-900 font-light">
          Academic Sources & Bibliography
        </h3>
        <p className="ref-header-item opacity-0 text-xs sm:text-sm text-stone-500 font-thai-body mt-1">
          เอกสารและบทความประวัติศาสตร์อ้างอิงทั้งหมดในโปรเจกต์ (docs/ Single Source of Truth)
        </p>
      </div>

      {/* Animated Bibliography Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((ref) => (
          <a
            key={ref.id}
            href={ref.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ref-card-item opacity-0 group p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                <span>{ref.year}</span>
                <svg className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <h4 className="font-sans font-medium text-stone-800 text-sm group-hover:text-stone-950 transition-colors line-clamp-2">
                {ref.title}
              </h4>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-sans">
              <span className="font-semibold text-stone-700">{ref.author}</span>
              <span className="text-stone-400 italic">{ref.publisher}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
