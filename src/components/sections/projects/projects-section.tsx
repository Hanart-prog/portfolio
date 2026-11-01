import { useRef, useState, type MouseEvent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '@/components/common/section-title';
import { ProjectsPreview } from '@/components/sections/projects/projects-preview';
import ProjectCard from '@/components/sections/projects/card/project-card';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { Project } from '@/types/portfolio/projects/project';
import type { Projects } from '@/types/portfolio/projects/projects';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const INITIAL_PROJECT_COUNT = 2;

export const ProjectsSection = (): ReactElement => {
  const { t } = useTranslation();
  const { items }: Projects = usePortfolio('projects');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const showMoreScrollPosition = useRef<number>(0);

  useScrollReveal(projectsRef, '[data-project-card]', { scale: 0.97, y: 32 });

  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-gray-50 py-[clamp(6rem,12vh,10rem)] dark:bg-[#121212]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <SectionTitle description={t('projects.description')}>
          {t('projects.title')}
        </SectionTitle>
        <div
          ref={projectsRef}
          className="grid grid-cols-1 gap-[clamp(2rem,4vw,4rem)] md:grid-cols-2"
        >
          {items.slice(0, INITIAL_PROJECT_COUNT).map((project: Project) => (
            <ProjectCard
              key={project.name}
              images={project.images}
              title={project.name}
              description={project.description}
              tags={project.techStack}
              siteUrl={project.website}
            />
          ))}
        </div>
        {items.length > INITIAL_PROJECT_COUNT && (
          <div className="relative mt-[clamp(1rem,1.5vw,1.5rem)]">
            <ProjectsPreview isExpanded={isExpanded}>
              <div className="grid grid-cols-1 gap-[clamp(2rem,4vw,4rem)] md:grid-cols-2">
                {items.slice(INITIAL_PROJECT_COUNT).map((project: Project) => (
                  <ProjectCard
                    key={project.name}
                    images={project.images}
                    title={project.name}
                    description={project.description}
                    tags={project.techStack}
                    siteUrl={project.website}
                  />
                ))}
              </div>
            </ProjectsPreview>
            {!isExpanded && (
              <button
                type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>): void => {
                  showMoreScrollPosition.current =
                    ScrollSmoother.get()?.offset(
                      event.currentTarget,
                      'center center',
                      true,
                    ) ?? window.scrollY;
                  setIsExpanded(true);
                }}
                className="absolute inset-x-0 bottom-4 mx-auto cursor-pointer text-[0.9375rem]/[1.25] font-semibold tracking-[-0.005em] text-[#404040] underline decoration-[#a3a3a3] underline-offset-4 transition-colors hover:text-[#191919] sm:bottom-5 dark:text-gray-300 dark:decoration-[#525252] dark:hover:text-white"
              >
                {t('projects.showMore')}
              </button>
            )}
          </div>
        )}
        {isExpanded && (
          <div className="mt-[clamp(1.5rem,3vw,2.75rem)] flex justify-center">
            <button
              type="button"
              onClick={(): void => {
                const smoother = ScrollSmoother.get();

                if (smoother) {
                  smoother.scrollTo(showMoreScrollPosition.current, true);
                } else {
                  window.scrollTo({
                    top: showMoreScrollPosition.current,
                    behavior: 'smooth',
                  });
                }

                window.setTimeout(() => setIsExpanded(false), 350);
              }}
              className="cursor-pointer text-[0.9375rem]/[1.25] font-semibold tracking-[-0.005em] text-[#404040] underline decoration-[#a3a3a3] underline-offset-4 transition-colors hover:text-[#191919] dark:text-gray-300 dark:decoration-[#525252] dark:hover:text-white"
            >
              {t('projects.showLess')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
