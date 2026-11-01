import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariantSchema = {
  variant: { default: string; outline: string; ghost: string };
  size: { default: string; sm: string; lg: string; icon: string };
};

const buttonVariants: ReturnType<typeof cva<ButtonVariantSchema>> =
  cva<ButtonVariantSchema>(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          outline:
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
        },
        size: {
          default: 'h-9 px-4 py-2',
          sm: 'h-8 rounded-md px-3 text-xs',
          lg: 'h-10 rounded-md px-6',
          icon: 'size-9',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    },
  );

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  size,
  variant,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
};

export { buttonVariants };
export default Button;
