import type { ReactElement } from 'react';
import { Building2, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Timeline, type TimelineItem } from '@/components/common/timeline';
import { Badge } from '@/components/ui/badge';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { Trajectory } from '@/types/portfolio/trajectory/trajectory';
import type { TrajectoryItem } from '@/types/portfolio/trajectory/trajectory-item';
import { formatDate } from '@/utils/date';

export const ExperienceTrajectoryTimeline = (): ReactElement => {
  const { t } = useTranslation();
  const trajectory: Trajectory = usePortfolio('trajectory');

  return (
    <Timeline
      className="md:col-start-1"
      extendLastLine
      animateItems={false}
      items={trajectory.items.map(
        (experience: TrajectoryItem): TimelineItem => {
          const endDate: string = experience.endDate
            ? formatDate(experience.endDate)
            : t('experience.present');

          return {
            key: `${experience.name}-${experience.startDate}`,
            startDate: experience.startDate,
            endDate: experience.endDate,
            content: (
              <article>
                <time className="mb-3 grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 text-[0.9375rem]/[1.45] font-medium tracking-[-0.005em] text-[#6b6b6b] dark:text-gray-400">
                  <CalendarDays
                    aria-hidden="true"
                    className="size-4.5 justify-self-center text-[#6b6b6b] dark:text-gray-400"
                  />
                  <span>
                    {formatDate(experience.startDate)} – {endDate}
                  </span>
                </time>
                <h4 className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-[#191919] dark:text-white">
                  <span className="flex size-8 items-center justify-center self-start overflow-hidden rounded-md bg-white p-0.5 ring-1 ring-[#191919]/15 ring-inset dark:ring-0">
                    <img
                      src={experience.logo}
                      alt=""
                      className="size-full object-contain"
                    />
                  </span>
                  <span>{experience.position}</span>
                </h4>
                <p className="mt-3 grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 text-[1.0625rem]/[1.6] font-normal tracking-[-0.01em] text-[#525252] dark:text-gray-300">
                  <Building2
                    aria-hidden="true"
                    className="size-4.5 justify-self-center text-[#525252] dark:text-gray-300"
                  />
                  <span className="min-w-0">{experience.name}</span>
                </p>
                <p className="mt-5 max-w-xl text-[1.0625rem]/[1.6] font-normal tracking-[-0.01em] text-[#666666] dark:text-gray-400">
                  {experience.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {experience.techStack.map((technology): ReactElement => {
                    const Icon = technology.icon;

                    return (
                      <Badge
                        className="inline-flex items-center gap-2 rounded-full border-0 bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-[#191919] shadow-[0_2px_6px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-200 ring-inset hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-[#2a2a2a]/80 dark:text-white dark:shadow-none dark:ring-0 dark:hover:bg-[#404040]"
                        key={technology.name}
                        variant="secondary"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-[#191919] dark:text-white"
                        />
                        {technology.name}
                      </Badge>
                    );
                  })}
                </div>
              </article>
            ),
          };
        },
      )}
    />
  );
};

export default ExperienceTrajectoryTimeline;
