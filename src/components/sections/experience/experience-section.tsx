import { useRef, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { Trajectory } from '@/types/portfolio/trajectory/trajectory';
import { SectionTitle } from '@/components/common/section-title';
import { ExperienceTechStack } from '@/components/sections/experience/tech-stack/experience-tech-stack';
import { ExperienceTrajectory } from '@/components/sections/experience/trajectory/experience-trajectory';
import { ExperienceHighlights } from '@/components/sections/experience/experience-highlights';
import { Image } from '@/components/common/image';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const ExperienceSection = (): ReactElement => {
  const { t } = useTranslation();
  const trajectory: Trajectory = usePortfolio('trajectory');
  const introRef = useRef<HTMLDivElement>(null);

  useScrollReveal(introRef, '[data-experience-reveal]');

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-gray-50 py-[clamp(6rem,12vh,10rem)] dark:bg-[#121212]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <SectionTitle>{t('experience.title')}</SectionTitle>
        <div
          ref={introRef}
          className="mb-[clamp(5rem,10vw,8rem)] flex flex-col gap-[clamp(2.5rem,5vw,5rem)] md:flex-row md:items-stretch"
        >
          <div
            data-experience-reveal
            className="flex w-full flex-col gap-[clamp(2.5rem,4vw,4rem)] md:flex-1"
          >
            <p className="w-full max-w-2xl text-left text-[clamp(1.0625rem,1.2vw,1.25rem)]/[1.65] font-normal tracking-[-0.015em] text-[#404040] dark:text-gray-300">
              {t('experience.description')}
            </p>
            <ExperienceHighlights />
          </div>
          <div
            data-experience-reveal
            className="relative h-80 w-full shrink-0 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-200 ring-inset hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgb(25_25_25/0.1)] motion-reduce:transform-none motion-reduce:transition-none sm:h-88 sm:w-72 md:h-auto lg:w-96 xl:w-xl dark:shadow-none dark:ring-0"
          >
            <Image
              alt="Hanat Sharif"
              buttonClassName="absolute inset-0 size-full cursor-zoom-in"
              className="size-full rounded-2xl object-cover object-top"
              src={trajectory.image}
            />
          </div>
        </div>
        <ExperienceTechStack />
        <ExperienceTrajectory />
      </div>
    </section>
  );
};

export default ExperienceSection;
