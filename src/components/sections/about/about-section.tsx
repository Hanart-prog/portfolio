import { useRef, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '@/components/common/section-title';
import { usePortfolio } from '@/hooks/use-portfolio';
import { CvButton } from '@/components/sections/about/actions/cv-button';
import { ProjectsButton } from '@/components/sections/about/actions/projects-button';
import { EducationTimeline } from '@/components/sections/about/education/education-timeline';
import { AboutProfile } from '@/components/sections/about/profile/about-profile';
import { AboutProfileSpecialties } from '@/components/sections/about/profile/about-profile-specialties';
import type { About } from '@/types/portfolio/about/about';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const AboutSection = (): ReactElement => {
  const { t } = useTranslation();
  const about: About = usePortfolio('about');
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contentRef, '[data-about-reveal]', { y: 18 });

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gray-50 py-[clamp(6rem,12vh,10rem)] dark:bg-[#121212]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <SectionTitle>{t('about.title')}</SectionTitle>
        <div
          ref={contentRef}
          className="flex flex-col items-start gap-[clamp(2.5rem,5vw,5rem)] md:flex-row md:items-stretch"
        >
          <AboutProfile />
          <div className="flex-1">
            <div data-about-reveal className="mb-[clamp(1.75rem,3vw,2.5rem)]">
              <h3 className="text-[clamp(2rem,3.5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.055em] text-[#4d4d4d] dark:text-neutral-400">
                {about.identity.firstName}
              </h3>
              <h4 className="text-[clamp(3.5rem,6.5vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.065em] text-[#191919] dark:text-white">
                {about.identity.lastName}
              </h4>
            </div>
            <AboutProfileSpecialties />
            <p
              data-about-reveal
              className="mb-[clamp(3rem,5vw,4.5rem)] max-w-3xl text-[clamp(1.0625rem,1.2vw,1.25rem)]/[1.65] font-normal tracking-[-0.015em] text-[#404040] dark:text-gray-300"
            >
              {about.introduction.biography}
            </p>
            <EducationTimeline />
            <div
              data-about-reveal
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <CvButton />
              <ProjectsButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
