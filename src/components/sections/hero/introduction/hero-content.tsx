import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export const HeroContent = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="relative flex max-w-328 flex-col items-center text-center">
      <p className="mb-[clamp(1.5rem,2.5vw,2.25rem)] text-[clamp(0.9375rem,1.15vw,1.125rem)]/[1.4] font-medium tracking-[-0.01em] text-[#5f5f5f] [text-shadow:0_1px_12px_rgb(255_255_255/0.95)] dark:text-gray-300 dark:[text-shadow:0_2px_16px_rgb(0_0_0/0.95)]">
        {t('hero.role')}
      </p>
      <h1 className="relative z-10 text-[#191919] [text-shadow:0_1px_14px_rgb(255_255_255/0.9)] dark:text-white dark:[text-shadow:0_2px_18px_rgb(0_0_0/0.95)]">
        <span className="block text-[clamp(2.5rem,4.8vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.06em]">
          {t('hero.greeting')}{' '}
        </span>
        <span className="mt-[clamp(0.25rem,0.6vw,0.75rem)] block text-[clamp(5rem,11.5vw,12rem)] leading-[0.84] font-semibold tracking-[-0.05em]">
          Hanat Sharif!
        </span>
      </h1>
      <p className="mt-[clamp(2rem,3vw,3rem)] max-w-172 text-[clamp(1.125rem,1.4vw,1.375rem)]/[1.6] font-normal tracking-[-0.02em] text-[#404040] [text-shadow:0_1px_12px_rgb(255_255_255/0.95)] dark:text-gray-200 dark:[text-shadow:0_2px_16px_rgb(0_0_0/0.95)]">
        {t('hero.tagline')}
      </p>
    </div>
  );
};
