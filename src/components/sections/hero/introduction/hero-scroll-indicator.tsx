import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';
import { sections } from '@/constants/sections';
import { scrollTo } from '@/utils/scroll';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const HeroScrollIndicator = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(): void => scrollTo(sections.about.id)}
          className="group pointer-events-auto absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
          aria-label={t('hero.scrollToAbout')}
        >
          <ArrowDown
            className="size-7 text-[#191919] opacity-60 transition-all duration-300 ease-out group-hover:translate-y-1 group-hover:opacity-100 dark:text-white"
            aria-hidden="true"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {t('hero.scrollToAbout')}
      </TooltipContent>
    </Tooltip>
  );
};
