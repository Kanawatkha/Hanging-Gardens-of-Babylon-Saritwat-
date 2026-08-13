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
    <section id="summary-section-wrapper" className="relative w-full max-w-4xl mx-auto my-20 px-4 sm:px-6">
      <div
        id="summary-section-card"
        ref={containerRef}
        className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-stone-200 p-6 sm:p-12 shadow-xl text-center opacity-0"
      >
        {/* Permanent Terminal Node Dot Positioned Gracefully Lower at top-4 (left-0 on Mobile, center on Desktop) */}
        <div className="flex absolute top-4 left-0 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full border-2 border-stone-400 bg-white shadow-md flex items-center justify-center ring-4 ring-stone-400/20">
            <div className="w-2 h-2 rounded-full bg-stone-700" />
          </div>
        </div>

        {/* Category Tag */}
        <div className="summary-anim-item opacity-0 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-mono tracking-widest uppercase mb-6 pt-2">
          Conclusion & Academic Perspective
        </div>

        {/* Header (v2 Spec) */}
        <h2 className="summary-anim-item opacity-0 font-serif-display text-2xl sm:text-4xl text-stone-900 font-light leading-snug mb-3">
          Two Theories, One Open Question
        </h2>
        <h3 className="summary-anim-item opacity-0 font-thai-title text-xl sm:text-2xl text-stone-800 font-medium mb-8">
          สองทฤษฎี หนึ่งคำถามที่ยังไม่จบ
        </h3>

        {/* Thai Academic Narrative Paragraphs (v2 Spec) */}
        <div className="space-y-5 text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-thai-body text-left">
          <p className="summary-anim-item opacity-0">
            <strong className="font-thai-title text-stone-900">ทวนกันอีกครั้ง:</strong> ฝั่งหนึ่งมีจารึกร่วมสมัย ภาพสลักหิน และร่องน้ำยาว 80 กิโลเมตรที่ยังหาได้จริง แต่ชี้ไปที่เมืองที่ไม่มีใครเรียกว่า "บาบิโลน" มาก่อน ส่วนอีกฝั่งมีชื่อที่ทุกคนจำได้ มีตำนานที่เล่าซ้ำมากว่า 2 พันปี แต่ไม่มีจารึกจากเมืองนั้นเองสักแผ่นที่ยืนยัน
          </p>

          <p className="summary-anim-item opacity-0">
            ที่น่าสนใจคือ แม้แต่หลักฐานที่ดูเหมือนจะหนุนฝั่งบาบิโลนที่สุด ก็มีรอยร้าว — เบรอสซุสเป็นชาวบาบิโลนแท้ ๆ ที่เขียนถึงสวนนี้ไว้ตั้งแต่ราว 290 ปีก่อนคริสตกาล แต่สเตฟานี ดัลลีย์ ผู้เสนอทฤษฎีนีเนเวห์ ก็ยอมรับว่าต้องอธิบายข้อมูลของเบรอสซุสให้เข้ากับความสับสนเรื่องชื่อเมืองและชื่อกษัตริย์ให้ได้ ไม่ใช่ทุกคนในวงการเห็นด้วยกับเธอทั้งหมด และนีเนเวห์เองก็ยังถูกขุดค้นสำรวจน้อยกว่าที่ควรจะเป็น ส่วนหนึ่งเพราะสถานการณ์ความไม่สงบในพื้นที่
          </p>

          <blockquote className="summary-anim-item opacity-0 my-4 p-4 rounded-xl bg-stone-50 border-l-4 border-stone-400 italic text-stone-800 text-xs sm:text-sm font-sans">
            "It is stimulating to disagree!"
            <cite className="block not-italic font-thai-title text-stone-500 font-medium mt-1 text-xs sm:text-sm">
              — Dr. Stephanie Dalley (ความเห็นต่างทางวิชาการไม่ใช่ปัญหาที่ต้องรีบหาข้อสรุป แต่เป็นแรงผลักดันให้ค้นหาหลักฐานต่อไป)
            </cite>
          </blockquote>

          <p className="summary-anim-item opacity-0">
            World History Encyclopedia เองก็ทิ้งท้ายไว้แบบเปิดกว้างเหมือนกัน — ถ้าทฤษฎีนีเนเวห์ถูกปฏิเสธไปทั้งหมด คำตอบที่เป็นไปได้มากที่สุดอาจอยู่ตรงกลาง คือบาบิโลนอาจมีสวนอยู่จริงในขนาดที่เล็กกว่าตำนาน แล้วเรื่องราวก็ค่อย ๆ พองโตขึ้นตามการเล่าซ้ำหลายชั่วอายุคน ไม่ต่างจากวังโนซอสบนเกาะครีตที่ถูกเล่าจนกลายเป็นเขาวงกตในตำนาน
          </p>

          <p className="summary-anim-item opacity-0 text-stone-500 text-xs sm:text-sm pt-3 border-t border-stone-100 italic font-thai-title">
            <strong className="text-stone-800 font-semibold not-italic">คำถามที่ทิ้งไว้ให้คิดต่อ:</strong> ถ้าสวนนี้อยู่ที่นีเนเวห์จริงตามที่จารึกบอก แล้วทำไมโลกยังเรียกมันว่า "แห่งบาบิโลน" มาจนถึงทุกวันนี้
          </p>
        </div>
      </div>
    </section>
  );
};
