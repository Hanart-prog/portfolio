import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground',
        className,
      )}
      {...props}
    />
  );
};

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return <div className={cn('p-6', className)} {...props} />;
};

export default Card;
