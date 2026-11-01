import {
  useLayoutEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { isOngoing } from '@/utils/date';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineItem {
  key: string;
  content: ReactNode;
  startDate: string;
  endDate: string | undefined;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  itemClassName?: string;
  leadingLineClassName?: string;
  lineClassName?: string;
  connectionClassName?: string;
  extendLastLine?: boolean;
  animateItems?: boolean;
}

export const Timeline = ({
  items,
  className,
  itemClassName,
  leadingLineClassName,
  lineClassName = 'bg-[#191919] dark:bg-white',
  connectionClassName = '-bottom-10',
  extendLastLine = false,
  animateItems = true,
}: TimelineProps): ReactElement => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect((): (() => void) | undefined => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const root = timelineRef.current;
    if (!root) {
      return undefined;
    }

    const context = gsap.context(() => {
      const line = root.querySelector<HTMLElement>('[data-timeline-line]');
      const entries = root.querySelectorAll<HTMLElement>(
        '[data-timeline-item]',
      );

      if (animateItems) {
        gsap.set(entries, { autoAlpha: 0, x: -12 });
        gsap.to(entries, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          x: 0,
          clearProps: 'opacity,transform,visibility',
          scrollTrigger: { trigger: root, start: 'top 90%', once: true },
        });
      }

      if (!line) {
        return;
      }

      gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
      ScrollTrigger.create({
        trigger: root,
        start: 'top 78%',
        end: 'bottom 78%',
        onUpdate: ({ progress }) => {
          gsap.set(line, {
            scaleY: Math.max(
              Number(gsap.getProperty(line, 'scaleY')),
              progress,
            ),
          });
        },
      });
    }, root);

    return (): void => context.revert();
  }, [animateItems]);

  return (
    <div ref={timelineRef} className={cn('relative', className)}>
      {leadingLineClassName && (
        <div className={cn('absolute', leadingLineClassName)} />
      )}
      {extendLastLine && items.length > 0 && (
        <span
          data-timeline-line
          className={cn(
            'absolute top-4 bottom-0 left-2.5 w-0.5',
            lineClassName,
          )}
          aria-hidden="true"
        />
      )}

      {items.map((item: TimelineItem, index: number): ReactElement => {
        const hasNextItem = index < items.length - 1;
        const ongoing = isOngoing(item.endDate);

        return (
          <div
            data-timeline-item
            className={cn(
              'relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 sm:gap-x-5',
              'pb-[clamp(3.5rem,5vw,5rem)] last:pb-0',
              itemClassName,
            )}
            key={item.key}
          >
            <div className="relative">
              {hasNextItem && !extendLastLine && (
                <span
                  className={cn(
                    'absolute top-4 left-2.5 w-0.5',
                    connectionClassName,
                    lineClassName,
                  )}
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  'absolute top-1 left-0.5 z-10 size-5 rounded-full',
                  ongoing ? 'border-[3px]' : lineClassName,
                )}
                style={
                  ongoing
                    ? {
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--foreground)',
                      }
                    : undefined
                }
                aria-hidden="true"
              />
            </div>
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
