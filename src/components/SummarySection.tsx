import React, { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';

export const SummarySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            // Animate Outer Container
            animate(containerRef.current, {
              opacity: [0, 1],
              translateY: [32, 0],
              filter: ['blur(12px)', 'blur(0px)'],
              duration: 800,
              ease: 'outExpo',
            });

            // Animate Inner Summary Paragraphs with Stagger
            const innerItems = containerRef.current.querySelectorAll('.summary-anim-item');
            if (innerItems.length > 0) {
              animate(innerItems, {
                opacity: [0, 1],
                translateY: [18, 0],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 700,
                delay: stagger(100, { start: 150 }),
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
    <section className="relative w-full max-w-4xl mx-auto my-20 px-4 sm:px-6">
      <div
        id="summary-section-card"
        ref={containerRef}
        className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200 p-6 sm:p-12 shadow-xl text-center opacity-0"
      >
        {/* Permanent Terminal Node Dot Docked at Top Border of Summary Card (left-0 on Mobile, center on Desktop) */}
        <div className="flex absolute -top-2.5 left-0 md:left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full border-2 border-stone-400 bg-white shadow-md flex items-center justify-center ring-4 ring-stone-400/20">
            <div className="w-2 h-2 rounded-full bg-stone-700" />
          </div>
        </div>

        {/* Category Tag */}
        <div className="summary-anim-item opacity-0 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-mono tracking-widest uppercase mb-6">
          Conclusion & Academic Perspective
        </div>

        {/* Header */}
        <h2 className="summary-anim-item opacity-0 font-serif-display text-2xl sm:text-4xl text-stone-900 font-light leading-snug mb-6">
          บทสรุปและทัศนะทางวิชาการ
        </h2>

        {/* Thai Academic Narrative Paragraphs */}
        <div className="space-y-4 text-stone-600 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto font-thai-body text-left sm:text-center">
          <p className="summary-anim-item opacity-0">
            สวนลอยแห่งบาบิโลนยังคงเป็นสิ่งมหัศจรรย์ชิ้นเดียวใน 7 สิ่งมหัศจรรย์ของโลกโบราณที่ไม่พบหลักฐานทางโบราณคดีหรือจารึกร่วมสมัยในเมืองบาบิโลนจริง
          </p>
          <p className="summary-anim-item opacity-0">
            ข้อสันนิษฐานเรื่องการสับสนชื่อเมืองระหว่าง <strong className="font-thai-title text-emerald-800 font-semibold">นีเนเวห์ ("บาบิโลนใหม่")</strong> กับ <strong className="font-thai-title text-amber-800 font-semibold">บาบิโลน</strong> และกษัตริย์ <strong className="font-thai-title text-emerald-800 font-semibold">เซนนาเคอริบ</strong> กับ <strong className="font-thai-title text-amber-800 font-semibold">เนบูคัดเนซซาร์ที่ 2</strong> เปิดมุมมองใหม่ทางประวัติศาสตร์ว่า สวนลอยในตำนานอาจเคยดำรงอยู่อย่างยิ่งใหญ่จริงที่เมืองนีเนเวห์
          </p>
          <p className="summary-anim-item opacity-0 text-stone-500 text-xs sm:text-base pt-2 italic">
            สื่อการเรียนรู้นี้เสนอบันทึกและหลักฐานของทั้งสองฝั่ง เพื่อให้ผู้เรียนได้คิดวิเคราะห์หลักฐานทางประวัติศาสตร์ด้วยตนเองอย่างเปิดกว้าง
          </p>
        </div>
      </div>
    </section>
  );
};
