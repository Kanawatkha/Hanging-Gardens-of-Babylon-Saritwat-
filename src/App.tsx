import React from 'react';
import { Hero } from './components/Hero';
import { CentralTimelineLine } from './components/CentralTimelineLine';
import { TimelineContainer } from './components/TimelineContainer';
import { SummarySection } from './components/SummarySection';
import { ReferenceList } from './components/ReferenceList';
import { ScrollToTop } from './components/ScrollToTop';
import { TimelinePencilCursor } from './components/TimelinePencilCursor';
import { timelineBlocks, referenceItems } from './data/timelineData';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#0c0a09] font-sans selection:bg-amber-200 selection:text-amber-950 pb-16 overflow-x-hidden">
      <Hero />
      <main id="main-content" className="relative w-full mx-auto overflow-x-hidden">
        <CentralTimelineLine />
        <TimelineContainer blocks={timelineBlocks} />
        <SummarySection />
        <ReferenceList items={referenceItems} />
      </main>
      <ScrollToTop />
      <TimelinePencilCursor />
    </div>
  );
};

export default App;
