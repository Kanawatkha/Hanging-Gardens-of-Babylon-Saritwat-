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

    // Animate Thai Context Badge
    if (badgeRef.current) {
      animateEntrance(badgeRef.current, 1400);
    }
  }, []);

  const titleLine1Words = ['Hanging', 'Gardens'];
  const titleLine2Words = ['of', 'Babylon'];
  const subtitleWords = ['A', 'Scroll-Driven', 'Comparison', 'of', 'Two', 'Competing', 'Historical', 'Theories'];

  return (
    <header className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16 overflow-hidden bg-[#f5f5f5]">
      {/* Background Atmospheric Soft Pastel Orbs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-amber-100/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 left-1/4 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      {/* Hero Central Content Container */}
      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl text-center my-auto px-2 sm:px-4">
        {/* English Main Title */}
        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0c0a09] font-light leading-[1.02]">
          <div className="inline-block">
            {titleLine1Words.map((word, idx) => (
              <span key={`t1-${idx}`} className="hero-title-word inline-block mr-2 sm:mr-4 opacity-0">
                {word}
              </span>
            ))}
          </div>
          <br className="hidden sm:inline" />
          <div className="inline-block italic font-normal text-stone-800 ml-2 sm:ml-0">
            {titleLine2Words.map((word, idx) => (
              <span key={`t2-${idx}`} className="hero-title-word inline-block mr-2 sm:mr-4 opacity-0">
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* English Subtitle — Fits on 1 single line on Desktop */}
        <p className="mt-4 md:mt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl text-stone-600 font-serif-display italic max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto leading-relaxed whitespace-normal md:whitespace-nowrap">
          {subtitleWords.map((word, idx) => (
            <span key={`sub-${idx}`} className="hero-subtitle-word inline-block mr-1.5 sm:mr-2 opacity-0">
              {word}
            </span>
          ))}
        </p>

        {/* Enhanced Thai Storytelling Context Card — Wider on Desktop (max-w-5xl) to fit viewport without overflow */}
        <div
          ref={badgeRef}
          className="mt-6 md:mt-8 p-5 sm:p-7 md:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-stone-200 shadow-xl w-full max-w-3xl lg:max-w-5xl mx-auto text-stone-800 text-sm sm:text-base leading-relaxed space-y-3 md:space-y-4 text-left font-thai-body opacity-0"
        >
          <p className="font-thai-title font-medium text-base sm:text-lg md:text-xl text-stone-950 border-b border-stone-100 pb-2 md:pb-3">
            ใน 7 สิ่งมหัศจรรย์ของโลกยุคโบราณ มีอยู่ชิ้นเดียวที่ไม่มีใครหาเจอ
          </p>

          <p className="text-stone-700">
            พีระมิดกีซายังตั้งอยู่ที่กีซา วิหารอาร์เทมิสยังมีซากที่เอเฟซัส แต่ <strong className="font-thai-title font-semibold text-stone-900">"สวนลอยแห่งบาบิโลน"</strong> กลับเป็นสิ่งมหัศจรรย์เพียงหนึ่งเดียวที่นักโบราณคดีขุดค้นเมืองบาบิโลนมานานกว่าศตวรรษแล้วไม่พบร่องรอยใด ๆ เลย ไม่มีจารึกบาบิโลนสักแผ่นที่พูดถึงมัน ทั้งที่กษัตริย์เนบูคัดเนซซาร์ที่ 2 ผู้ถูกยกให้เป็นผู้สร้าง ทิ้งบันทึกงานก่อสร้างของพระองค์ไว้เป็นร้อยฉบับ
          </p>

          <p className="text-stone-700">
            แล้วถ้าสวนนี้ไม่เคยอยู่ที่บาบิโลนเลยล่ะ — นักวิชาการฝั่งหนึ่งยังยึดคำบอกเล่าของนักเขียนกรีก-โรมัน ว่าเนบูคัดเนซซาร์สร้างสวนนี้ให้พระนางอามิติส แต่นักวิชาการอีกฝั่งกลับชี้ไปที่เมืองคนละเมือง ห่างออกไปกว่า 300 ไมล์ทางเหนือ — <strong className="font-thai-title font-semibold text-emerald-850">นีเนเวห์</strong> เมืองหลวงของอัสซีเรีย ที่มีจารึกร่วมสมัย ภาพสลักหินนูนต่ำ และร่องน้ำยาว 80 กิโลเมตรที่ยังหาได้จริงในภูมิประเทศ
          </p>

          <p className="text-stone-600 text-xs sm:text-sm pt-2 italic border-t border-stone-100 font-thai-title">
            เลื่อนลงไปแล้วไล่ดูหลักฐานทีละชิ้นตามเส้นเวลาจริง แล้วลองตัดสินด้วยตัวเองว่าฝั่งไหนน่าเชื่อกว่ากัน
          </p>
        </div>
      </div>
    </header>
  );
};
