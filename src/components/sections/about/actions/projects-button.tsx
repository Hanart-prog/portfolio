import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FolderGit2 } from 'lucide-react';
import { sections } from '@/constants/sections';
import { scrollTo } from '@/utils/scroll';

export const ProjectsButton = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={(): void => scrollTo(sections.projects.id)}
      className="inline-flex h-auto w-52 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-white px-6 py-3.5 text-base font-semibold whitespace-nowrap text-[#191919] shadow-[0_2px_6px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-300 ring-inset hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[0_8px_18px_rgb(25_25_25/0.1)] focus-visible:ring-2 focus-visible:ring-[#191919]/50 focus-visible:outline-none active:translate-y-0 active:shadow-[0_2px_6px_rgb(25_25_25/0.08)] motion-reduce:transform-none motion-reduce:transition-none dark:bg-[#2a2a2a]/80 dark:text-white dark:shadow-none dark:ring-0 dark:hover:bg-[#404040] dark:focus-visible:ring-white/50"
    >
      {t('about.viewProjects')}
      <FolderGit2 className="size-4.5" aria-hidden="true" />
    </button>
  );
};

export default ProjectsButton;
