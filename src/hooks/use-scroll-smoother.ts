import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useScrollSmoother = (): void => {
  useEffect((): (() => void) | undefined => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const createSmoother = (): void => {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
      });
    };

    const useIdleCallback: boolean = 'requestIdleCallback' in window;
    const scheduled: number = useIdleCallback
      ? window.requestIdleCallback(createSmoother, { timeout: 1000 })
      : window.setTimeout(createSmoother, 250);

    return (): void => {
      if (useIdleCallback) {
        window.cancelIdleCallback(scheduled);
      } else {
        window.clearTimeout(scheduled);
      }

      ScrollSmoother.get()?.kill();
    };
  }, []);
};

export default useScrollSmoother;
