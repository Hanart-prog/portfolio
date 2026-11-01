import { useState, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  className: string;
  buttonClassName?: string;
  onExpand?: () => void;
}

export const Image = ({
  src,
  alt,
  className,
  buttonClassName = '',
  onExpand,
}: ImageProps): ReactElement => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const trigger = (
    <button
      type="button"
      aria-label={t('image.expand', { alt })}
      className={cn(
        'group/image relative block overflow-hidden',
        buttonClassName,
      )}
      onClick={onExpand}
    >
      {!isLoaded && (
        <Skeleton
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full rounded-none"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={(): void => {
          setIsLoaded(true);
        }}
        onError={() => setIsLoaded(true)}
        className={cn(
          className,
          'transition-opacity duration-500 motion-reduce:transition-none',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </button>
  );

  if (onExpand) {
    return trigger;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {isOpen && (
        <DialogContent
          onClick={(event): void => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <DialogTitle>{alt}</DialogTitle>
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="max-h-[90dvh] max-w-[92vw] object-contain"
          />
        </DialogContent>
      )}
    </Dialog>
  );
};
