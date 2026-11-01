import type { ReactElement } from 'react';
import { Building2, CalendarDays, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Timeline, type TimelineItem } from '@/components/common/timeline';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { Education } from '@/types/portfolio/about/education';

export const EducationTimeline = (): ReactElement => {
  const { t } = useTranslation();
  const entries: Education[] = usePortfolio('about').education;

  return (
    <div className="mb-[clamp(3rem,5vw,4.5rem)]">
      <h5 className="mb-8 text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-[#191919] dark:text-white">
        {t('about.education')}
      </h5>
      <Timeline
        extendLastLine
        items={entries.map((entry): TimelineItem => {
          return {
            key: entry.institution,
            startDate: entry.endDate,
            endDate: entry.endDate,
            content: (
              <div>
                <time className="mb-3 grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-3 text-[0.9375rem]/[1.45] font-medium tracking-[-0.005em] text-[#6b6b6b] dark:text-gray-400">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4.5 justify-self-center text-[#6b6b6b] dark:text-gray-400"
                  />
                  <span>{entry.period}</span>
                </time>
                <h6 className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-3 text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight font-semibold tracking-[-0.02em] text-[#191919] dark:text-white">
                  <Building2
                    aria-hidden="true"
                    className="size-5 justify-self-center text-[#191919] dark:text-white"
                  />
                  <span>{entry.institution}</span>
                </h6>
                <p className="mt-3 grid grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-3 text-[1.0625rem]/[1.6] font-normal tracking-[-0.01em] text-[#525252] dark:text-gray-300">
                  <GraduationCap
                    aria-hidden="true"
                    className="size-5 justify-self-center text-[#525252] dark:text-gray-300"
                  />
                  <span>{entry.degree}</span>
                </p>
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default EducationTimeline;
