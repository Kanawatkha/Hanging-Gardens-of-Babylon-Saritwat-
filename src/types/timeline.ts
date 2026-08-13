export type TheorySide = 'left' | 'right';

export interface TimelineBlock {
  id: string;
  side: TheorySide;
  yearDisplay: string;
  yearNumeric: number; // for chronological sorting verification (-705, -700, -689, -668, -605, -331, -290, -100, 1899)
  titleEN: string;
  titleTH: string;
  descriptionTH: string;
  quote?: {
    text: string;
    author: string;
  };
  sourceRef: string;
}

export interface ReferenceItem {
  id: string;
  author: string;
  year: string;
  title: string;
  publisher: string;
  sourceUrl: string;
}
