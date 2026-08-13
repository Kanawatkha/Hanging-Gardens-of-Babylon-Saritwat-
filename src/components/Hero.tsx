import React, { useEffect, useRef } from 'react';
import { animateEntrance, animateWordStagger } from '../utils/animationHelpers';

export const Hero: React.FC = () => {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Animate Title words word-by-word
    animateWordStagger('.hero-title-word', 100);

    // Animate Subtitle words word-by-word
    animateWordStagger('.hero-subtitle-word', 700);

    // Animate Thai Badge
    if (badgeRef.current) {
      animateEntrance(badgeRef.current, 1400);
    }
  }, []);

  const titleLine1Words = ['Hanging', 'Gardens'];
  const titleLine2Words = ['of', 'Babylon'];
  const subtitleWords = ['A', 'Scroll-Driven', 'Comparison', 'of', 'Two', 'Competing', 'Historical', 'Theories'];

  return (
    <header className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24 overflow-hidden bg-[#f5f5f5]">
      {/* Background Atmospheric Soft Pastel Orbs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-amber-100/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 left-1/4 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-4xl text-center my-auto px-4">
        {/* English Main Title with Word-by-Word Split */}
        <h1 className="font-serif-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#0c0a09] font-light leading-[1.02]">
          <div className="inline-block">
            {titleLine1Words.map((word, idx) => (
              <span key={`t1-${idx}`} className="hero-title-word inline-block mr-3 sm:mr-5 opacity-0">
                {word}
              </span>
            ))}
          </div>
          <br />
          <div className="inline-block italic font-normal text-stone-800">
            {titleLine2Words.map((word, idx) => (
              <span key={`t2-${idx}`} className="hero-title-word inline-block mr-3 sm:mr-5 opacity-0">
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* English Subtitle with Word-by-Word Split */}
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-stone-600 font-serif-display italic max-w-2xl mx-auto leading-relaxed">
          {subtitleWords.map((word, idx) => (
            <span key={`sub-${idx}`} className="hero-subtitle-word inline-block mr-2 opacity-0">
              {word}
            </span>
          ))}
        </p>

        {/* Enhanced Thai Context Badge */}
        <div
          ref={badgeRef}
          className="mt-10 p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-stone-200 shadow-md max-w-2xl mx-auto text-stone-800 text-sm sm:text-base leading-relaxed opacity-0"
        >
          <p className="font-thai-body font-normal text-stone-700">
            ร่วมค้นหาความจริงของสิ่งมหัศจรรย์ยุคโบราณเพียงแห่งเดียวที่ไร้หลักฐานในบาบิโลน — ถอดรหัสข้อถกเถียงทางประวัติศาสตร์ระหว่าง{' '}
            <strong className="font-thai-title font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              ทฤษฎีนีเนเวห์ (Nineveh)
            </strong>{' '}
            ที่กล่าวถึงกษัตริย์ Sennacherib กับอภิมหาโครงการทางส่งน้ำ 80 กม. และจารึกอัสซีเรียจริง กับ{' '}
            <strong className="font-thai-title font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              ทฤษฎีบาบิโลน (Babylon)
            </strong>{' '}
            ตำนานสวนสวรรค์เพื่อมเหสี Amytis จากบันทึกคลาสสิกที่ยังไร้ร่องรอยโบราณคดี เรียงลำดับเปรียบเทียบตามเส้นเวลาจริง
          </p>
        </div>
      </div>
    </header>
  );
};
