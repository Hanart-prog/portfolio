import { useState, type MouseEvent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme, type UseThemeReturn } from '@/hooks/use-theme';

export const ThemeToggle = (): ReactElement => {
  const { t } = useTranslation();
  const { isDarkTheme, toggleTheme }: UseThemeReturn = useTheme();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleToggle = (event: MouseEvent<HTMLButtonElement>): void => {
    if (
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const { left, top, width, height } =
        event.currentTarget.getBoundingClientRect();

      document.documentElement.style.setProperty(
        '--theme-transition-x',
        `${left + width / 2}px`,
      );

      document.documentElement.style.setProperty(
        '--theme-transition-y',
        `${top + height / 2}px`,
      );

      const transition = document.startViewTransition(toggleTheme);
      setIsTransitioning(true);
      void transition.finished.finally(() => setIsTransitioning(false));
      return;
    }

    toggleTheme();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          aria-label={t('theme.toggle')}
          aria-pressed={isDarkTheme}
          className="group relative flex size-6 cursor-pointer items-center justify-center rounded-none p-0 text-[#191919] transition-colors duration-300 hover:bg-transparent hover:text-[#191919] focus-visible:ring-0 dark:text-white dark:hover:text-white"
        >
          <span
            className={`transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isTransitioning
                ? '-rotate-12'
                : 'group-hover:-rotate-12 group-active:-rotate-12'
            }`}
            aria-hidden="true"
          >
            {isDarkTheme ? (
              <Sun className="size-6" />
            ) : (
              <Moon className="size-6" />
            )}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        {t('theme.toggle')}
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
