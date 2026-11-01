import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

interface ScrollRevealOptions {
  scale?: number;
  stagger?: number;
  y?: number;
}

export const useScrollReveal = (
  scope: RefObject<HTMLElement | null>,
  selector: string,
  { scale = 1, stagger = 0.075, y = 14 }: ScrollRevealOptions = {},
): void => {
  useLayoutEffect((): (() => void) | undefined => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const root = scope.current;
    const elements = Array.from(
      root?.querySelectorAll<HTMLElement>(selector) ?? [],
    );

    if (!root || !elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        gsap.to(elements, {
          autoAlpha: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger,
          y: 0,
          scale: 1,
          clearProps: 'opacity,transform,visibility',
        });
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12%' },
    );

    gsap.set(elements, { autoAlpha: 0, scale, y });
    observer.observe(root);

    return (): void => {
      observer.disconnect();
      gsap.killTweensOf(elements);
      gsap.set(elements, { clearProps: 'transform,opacity,visibility' });
    };
  }, [scale, scope, selector, stagger, y]);
};

export default useScrollReveal;
