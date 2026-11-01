import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SocialNetworksVariant = 'icon' | 'pill';

interface SocialNetworksProps {
  variant?: SocialNetworksVariant;
  className?: string;
  iconClassName?: string;
}

export const SocialNetworks = ({
  variant = 'icon',
  className,
  iconClassName,
}: SocialNetworksProps): ReactElement => {
  const { t } = useTranslation();
  const isPillVariant: boolean = variant === 'pill';
  const socialNetworks = [
    {
      name: 'LinkedIn',
      label: t('social.linkedin'),
      href: 'https://www.linkedin.com/in/hanat-sharif/',
      icon: RiLinkedinFill,
      pillClassName: 'bg-[#0a66c2] hover:opacity-90',
    },
    {
      name: 'GitHub',
      label: t('social.github'),
      href: 'https://github.com/Hanart-prog',
      icon: RiGithubFill,
      pillClassName:
        'bg-[#191919] hover:opacity-80 dark:bg-white dark:text-[#191919]',
    },
  ];

  return (
    <div
      className={cn(
        isPillVariant ? 'flex flex-wrap gap-2' : 'flex gap-3',
        className,
      )}
    >
      {socialNetworks.map(
        ({ name, label, href, icon: Icon, pillClassName }) => {
          const link = (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                isPillVariant
                  ? `inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#191919]/40 focus-visible:outline-none active:translate-y-0 active:scale-[.98] motion-reduce:transform-none motion-reduce:transition-none ${pillClassName}`
                  : 'flex size-6 items-center justify-center text-[#191919] dark:text-white',
              )}
            >
              <Icon
                className={cn(
                  isPillVariant ? 'size-4' : 'size-5',
                  iconClassName,
                )}
                aria-hidden="true"
              />
              {isPillVariant && <span>{name}</span>}
            </a>
          );

          return isPillVariant ? (
            link
          ) : (
            <Tooltip key={label}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {label}
              </TooltipContent>
            </Tooltip>
          );
        },
      )}
    </div>
  );
};
