import type { ComponentProps, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface NavbarMenuToggleProps extends ComponentProps<'button'> {
  isOpen: boolean;
}

export const NavbarMenuToggle = ({
  isOpen,
  ...props
}: NavbarMenuToggleProps): ReactElement => {
  const { t } = useTranslation();
  const label: string = t(
    isOpen ? 'navigation.closeMenu' : 'navigation.openMenu',
  );

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      {...props}
      className="relative flex size-9 items-center justify-center rounded-md p-2 text-[#191919] transition-all hover:bg-transparent hover:text-[#191919] focus-visible:ring-0 dark:text-white dark:hover:text-white"
      aria-label={label}
      aria-expanded={isOpen}
    >
      <span className="sr-only">{label}</span>
      <span className="flex h-5 w-6 flex-col justify-between">
        <span
          className={`block h-0.5 w-full transform bg-current transition-all duration-300 ${isOpen ? 'translate-y-2.25 rotate-45 starting:translate-y-0 starting:rotate-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'translate-x-6 opacity-0 starting:translate-x-0 starting:opacity-100' : ''}`}
        />
        <span
          className={`block h-0.5 w-full transform bg-current transition-all duration-300 ${isOpen ? '-translate-y-2.25 -rotate-45 starting:translate-y-0 starting:rotate-0' : ''}`}
        />
      </span>
    </Button>
  );
};
