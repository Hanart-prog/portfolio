import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps, ReactElement } from 'react';
import { cn } from '@/lib/utils';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

type DropdownMenuContentProps = ComponentProps<
  typeof DropdownMenuPrimitive.Content
> & {
  onOpenAutoFocus?: ComponentProps<
    typeof DropdownMenuPrimitive.Content
  >['onCloseAutoFocus'];
};

export const DropdownMenuContent = ({
  className,
  sideOffset = 10,
  ...props
}: DropdownMenuContentProps): ReactElement => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-60 min-w-40 rounded-2xl border border-[#191919]/20 bg-white/80 p-1.5 text-[#191919] shadow-lg backdrop-blur-md outline-none dark:border-white/25 dark:bg-black/65 dark:text-white',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export const DropdownMenuItem = ({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item>): ReactElement => (
  <DropdownMenuPrimitive.Item
    className={cn(
      'relative flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm outline-none transition-colors duration-150 hover:bg-[#191919]/5 focus:bg-[#191919]/5 data-disabled:pointer-events-none data-disabled:opacity-50 dark:hover:bg-white/10 dark:focus:bg-white/10',
      className,
    )}
    {...props}
  />
);
