import { useRef, type ReactElement, type ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface SectionTitleProps {
  children: ReactNode;
  description?: ReactNode;
}

export const SectionTitle = ({
  children,
  description,
}: SectionTitleProps): ReactElement => {
  const titleRef = useRef<HTMLDivElement>(null);

  useScrollReveal(titleRef, '[data-section-title-reveal]', {
    stagger: 0.08,
    y: 18,
  });

  return (
    <div
      ref={titleRef}
      className={
        description
          ? 'mb-[clamp(3.5rem,5vw,4.5rem)]'
          : 'mb-[clamp(3.5rem,6vw,5.5rem)]'
      }
    >
      <div className="flex items-end gap-[clamp(1.25rem,3vw,2.75rem)]">
        <h2
          data-section-title-reveal
          className="text-[clamp(3.125rem,6.5vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.065em] whitespace-nowrap text-[#191919] dark:text-white"
        >
          {children}
        </h2>
        <Separator
          data-section-title-reveal
          className="mb-[0.12em] h-0.75 min-w-0 flex-1 rounded-full bg-gray-900/35 dark:bg-white/35"
        />
      </div>
      {description && (
        <p
          data-section-title-reveal
          className="mt-[clamp(1.75rem,3vw,2.75rem)] max-w-2xl text-[clamp(1.125rem,1.4vw,1.375rem)]/[1.6] font-normal tracking-[-0.02em] text-[#404040] dark:text-gray-300"
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
