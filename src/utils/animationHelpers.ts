import { animate, stagger } from 'animejs';

/**
 * Animate SVG Path stroke-dashoffset linked to scroll or progress value.
 */
export const updatePathDashOffset = (pathElement: SVGPathElement | null, progress: number) => {
  if (!pathElement) return;
  const pathLength = pathElement.getTotalLength();
  pathElement.style.strokeDasharray = `${pathLength}`;
  const offset = pathLength * (1 - progress);
  pathElement.style.strokeDashoffset = `${offset}`;
};

/**
 * Entrance animation for section headers or cards (Fade In + translateY + Blur to Focus)
 */
export const animateEntrance = (target: string | HTMLElement, delay: number = 0) => {
  return animate(target, {
    opacity: [0, 1],
    translateY: [24, 0],
    filter: ['blur(12px)', 'blur(0px)'],
    duration: 800,
    delay,
    ease: 'outCubic',
  });
};

/**
 * Word-by-word staggered entrance animation (Fade In + translateY + Blur to Focus per word)
 */
export const animateWordStagger = (targets: string | NodeList | HTMLElement[], startDelay: number = 0) => {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [20, 0],
    filter: ['blur(10px)', 'blur(0px)'],
    duration: 700,
    delay: stagger(100, { start: startDelay }),
    ease: 'outExpo',
  });
};

/**
 * Stagger entrance animation for multiple elements (e.g. card elements)
 */
export const animateStaggerEntrance = (targets: string | NodeList | HTMLElement[]) => {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [20, 0],
    filter: ['blur(4px)', 'blur(0px)'],
    duration: 700,
    delay: stagger(150, { start: 100 }),
    ease: 'outQuart',
  });
};
