import type { HTMLAttributes, ReactElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type BadgeVariantSchema = {
  variant: { default: string; secondary: string; outline: string };
};

const badgeVariants: ReturnType<typeof cva<BadgeVariantSchema>> =
  cva<BadgeVariantSchema>(
    'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
    {
      variants: {
        variant: {
          default: 'border-transparent bg-primary text-primary-foreground',
          secondary:
            'border-transparent bg-secondary text-secondary-foreground',
          outline: 'text-foreground',
        },
      },
      defaultVariants: { variant: 'default' },
    },
  );

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({
  className,
  variant,
  ...props
}: BadgeProps): ReactElement => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { badgeVariants };
export default Badge;
