import { useEffect, useRef, useState } from 'react';
import {
  sections,
  type Section,
  type SectionId,
  type SubsectionId,
} from '@/constants/sections';

export interface UseActiveSectionReturn {
  activeSectionId: SectionId;
  activeTargetId: SectionId | SubsectionId;
}

export const useActiveSection = (): UseActiveSectionReturn => {
  const frameId = useRef<number>(0);
  const [activeSection, setActiveSection] = useState<UseActiveSectionReturn>({
    activeSectionId: sections.home.id,
    activeTargetId: sections.home.id,
  });

  useEffect((): (() => void) => {
    const updateActiveSection = (): void => {
      const section: Section =
        (Object.values(sections) as Section[]).findLast(
          ({ id }) =>
            (document.getElementById(id)?.getBoundingClientRect().top ??
              Infinity) <=
            window.innerHeight * 0.35,
        ) ?? (sections.home as Section);

      setActiveSection((current: UseActiveSectionReturn) => {
        const activeTargetId =
          Object.values(section.subsections ?? {}).findLast(
            ({ id }) =>
              (document.getElementById(id)?.getBoundingClientRect().top ??
                Infinity) <=
              window.innerHeight * 0.35,
          )?.id ?? section.id;

        return current.activeSectionId === section.id &&
          current.activeTargetId === activeTargetId
          ? current
          : { activeSectionId: section.id, activeTargetId };
      });
    };

    const handleViewportChange = (): void => {
      if (frameId.current === 0) {
        frameId.current = window.requestAnimationFrame(() => {
          frameId.current = 0;
          updateActiveSection();
        });
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return (): void => {
      window.cancelAnimationFrame(frameId.current);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  return activeSection;
};

export default useActiveSection;
