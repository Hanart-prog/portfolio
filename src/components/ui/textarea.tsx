import type { ComponentProps, ReactElement } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = ({
  className,
  ...props
}: ComponentProps<'textarea'>): ReactElement => {
  return (
    <textarea
      className={cn(
        'flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
