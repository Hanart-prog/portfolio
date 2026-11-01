import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { SocialNetworks } from '@/components/common/social-networks';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/use-theme';
import { sections } from '@/constants/sections';
import { HeroBackground } from '@/components/sections/hero/background/hero-background';
import { HeroContent } from '@/components/sections/hero/introduction/hero-content';
import { HeroScrollIndicator } from '@/components/sections/hero/introduction/hero-scroll-indicator';

export const HeroSection = (): ReactElement => {
  const { t } = useTranslation();
  const { isDarkTheme } = useTheme();

  return (
    <section
      id={sections.home.id}
      className="relative box-border h-dvh overflow-hidden border-b border-[#191919] bg-white dark:border-b-0 dark:bg-black"
    >
      <HeroBackground isDarkTheme={isDarkTheme} />
      <div className="pointer-events-auto absolute bottom-8 left-8 z-20 flex flex-col gap-3">
        <SocialNetworks className="flex-col gap-3" iconClassName="size-6" />
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="mailto:sharifhanat359@gmail.com"
              className="flex size-6 items-center justify-center text-[#191919] transition-opacity duration-300 hover:opacity-60 dark:text-white"
              aria-label={t('contact.email')}
            >
              <Mail className="size-6" aria-hidden="true" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {t('contact.email')}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-24 sm:px-12 md:px-24">
        <HeroContent />
        <HeroScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
