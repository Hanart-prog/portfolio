import { useEffect, useLayoutEffect, useRef, type ReactElement } from 'react';
import gsap from 'gsap';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { About } from '@/types/portfolio/about/about';

interface LoadingProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

export const Loading = ({
  isVisible,
  onAnimationComplete,
}: LoadingProps): ReactElement => {
  const about: About = usePortfolio('about');
  const loaderRef = useRef<HTMLOutputElement>(null);

  useEffect((): (() => void) | undefined => {
    if (!isVisible) {
      return undefined;
    }

    document.documentElement.style.overflow = 'hidden';

    return (): void => {
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  useLayoutEffect((): (() => void) | undefined => {
    const loader = loaderRef.current;
    if (!loader) {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(
        loader,
        isVisible
          ? { autoAlpha: 1, clipPath: 'circle(150% at 50% 50%)' }
          : { autoAlpha: 0 },
      );

      if (isVisible) {
        onAnimationComplete();
      }

      return undefined;
    }

    const timeline = gsap.timeline();
    if (isVisible) {
      timeline.set(loader, {
        autoAlpha: 1,
        clipPath: 'circle(150% at 50% 50%)',
      });

      timeline
        .fromTo(
          '[data-loading-name]',
          { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)', x: -16 },
          {
            autoAlpha: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.55,
            ease: 'sine.out',
            x: 0,
          },
        )
        .fromTo(
          '[data-loading-wave]',
          { autoAlpha: 0, strokeDasharray: 240, strokeDashoffset: 240 },
          {
            autoAlpha: 0.85,
            duration: 1.45,
            ease: 'sine.inOut',
            strokeDashoffset: 0,
          },
          '-=0.65',
        )
        .to({}, { duration: 0.65 })
        .call(onAnimationComplete);
    } else {
      timeline
        .to('[data-loading-content]', {
          autoAlpha: 0,
          duration: 0.55,
          ease: 'sine.inOut',
          scale: 0.98,
          y: -12,
        })
        .to(
          loader,
          {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1.35,
            ease: 'power3.inOut',
          },
          '<0.05',
        )
        .set(loader, { autoAlpha: 0 });
    }

    return (): void => {
      timeline.kill();
    };
  }, [isVisible, onAnimationComplete]);

  return (
    <output
      ref={loaderRef}
      aria-live="polite"
      aria-hidden={!isVisible}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-white dark:bg-black ${
        isVisible ? '' : 'pointer-events-none'
      }`}
    >
      <span data-loading-content className="inline-flex flex-col items-center">
        <span
          data-loading-name
          className="inline-block pr-[0.12em] text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]"
        >
          {about.identity.firstName} {about.identity.lastName}
        </span>
        <svg
          className="mt-5 h-5 w-full overflow-visible text-[#1d4ed8]/70 dark:text-[#858585]"
          viewBox="0 0 240 20"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            data-loading-wave
            d="M0 10C20 10 20 4 40 4S60 16 80 16s20-12 40-12 20 12 40 12 20-12 40-12 20 6 40 6"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </output>
  );
};

export default Loading;
