import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ExperienceTrajectoryTimeline } from '@/components/sections/experience/trajectory/experience-trajectory-timeline';
import { ExperienceTrajectoryWaves } from '@/components/sections/experience/trajectory/experience-trajectory-waves';
import { sections } from '@/constants/sections';
import { SubsectionTitle } from '@/components/common/subsection-title';

export const ExperienceTrajectory = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div
      id={sections.experience.subsections.trajectory.id}
      className="relative mt-[clamp(5.5rem,10vw,8rem)] scroll-mt-24"
    >
      <div className="relative z-10">
        <SubsectionTitle>{t('experience.trajectory')}</SubsectionTitle>
      </div>
      <div className="pt-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="relative">
          <ExperienceTrajectoryWaves />
          <div className="relative z-10 lg:w-1/2">
            <p className="mb-[clamp(2.5rem,4vw,4rem)] max-w-2xl text-[clamp(1.125rem,1.4vw,1.375rem)]/[1.6] font-normal tracking-[-0.02em] text-[#404040] dark:text-gray-300">
              {t('experience.trajectoryDescription')}
            </p>
            <div className="w-full max-w-3xl">
              <ExperienceTrajectoryTimeline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTrajectory;
