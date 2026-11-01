import { use, useDeferredValue } from 'react';
import { useLanguage, type Language } from '@/hooks/use-language';
import type { About } from '@/types/portfolio/about/about';
import type { Projects } from '@/types/portfolio/projects/projects';
import type { TechStack } from '@/types/portfolio/tech-stack/tech-stack';
import type { Trajectory } from '@/types/portfolio/trajectory/trajectory';

const portfolioLoaders = {
  about: {
    'en-US': () =>
      import('@/data/portfolio/en-us/about').then(({ about }) => about),
  },
  'tech-stack': {
    'en-US': () =>
      import('@/data/portfolio/common/tech-stack').then(
        ({ techStack }) => techStack,
      ),
  },
  trajectory: {
    'en-US': () =>
      import('@/data/portfolio/en-us/trajectory').then(
        ({ trajectory }) => trajectory,
      ),
  },
  projects: {
    'en-US': () =>
      import('@/data/portfolio/en-us/projects').then(
        ({ projects }) => projects,
      ),
  },
};

const portfolioPromises = new Map<
  string,
  ReturnType<(typeof portfolioLoaders)[keyof typeof portfolioLoaders][Language]>
>();

export function usePortfolio(section: 'about'): About;
export function usePortfolio(section: 'tech-stack'): TechStack;
export function usePortfolio(section: 'trajectory'): Trajectory;
export function usePortfolio(section: 'projects'): Projects;
export function usePortfolio(
  section: keyof typeof portfolioLoaders,
): About | TechStack | Trajectory | Projects {
  const language: Language = useDeferredValue(useLanguage().language);
  const cacheKey = `${section}:${language}`;
  const sectionDataPromise: ReturnType<
    (typeof portfolioLoaders)[keyof typeof portfolioLoaders][Language]
  > = portfolioPromises.get(cacheKey) ?? portfolioLoaders[section][language]();

  portfolioPromises.set(cacheKey, sectionDataPromise);
  return use(
    sectionDataPromise as Promise<About | TechStack | Trajectory | Projects>,
  );
}

export default usePortfolio;
