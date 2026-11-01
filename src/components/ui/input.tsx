import type { ComponentProps, ReactElement } from 'react';
import { cn } from '@/lib/utils';

export const Input = ({
  className,
  type,
  ...props
}: ComponentProps<'input'>): ReactElement => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
};

export default Input;
