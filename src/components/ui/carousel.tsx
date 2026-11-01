import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];
type CarouselInstance = Exclude<CarouselApi, undefined>;
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];
type CarouselNavigationProps = React.ComponentProps<typeof Button> & {
  disableTooltip?: boolean;
};

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
  onSlideChange?: (api: CarouselInstance) => void;
} & React.ComponentProps<'div'>;

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: 'horizontal' | 'vertical';
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

const useCarousel = (): CarouselContextProps => {
  const context = React.useContext(CarouselContext);

  if (context === null) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

export const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  onSlideChange,
  plugins,
  className,
  children,
  ...props
}: CarouselProps): React.ReactElement => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = React.useState<boolean>(false);

  const onSelect = React.useCallback(
    (selectedApi: CarouselApi): void => {
      if (selectedApi === undefined) {
        return;
      }

      setCanScrollPrev(selectedApi.canScrollPrev());
      setCanScrollNext(selectedApi.canScrollNext());
      onSlideChange?.(selectedApi);
    },
    [onSlideChange],
  );

  const scrollPrev = React.useCallback((): void => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback((): void => {
    api?.scrollNext();
  }, [api]);

  React.useEffect(() => {
    if (api === undefined) {
      return;
    }

    setApi?.(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (api === undefined) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', onSelect);
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        className={cn('relative', className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const CarouselItem = ({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement => {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
};

export const CarouselPrevious = ({
  className,
  'aria-label': ariaLabel,
  disableTooltip = false,
  ...props
}: CarouselNavigationProps): React.ReactElement => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Tooltip open={disableTooltip ? false : undefined}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            'absolute size-8 rounded-full',
            orientation === 'horizontal'
              ? 'top-1/2 -left-4 -translate-y-1/2'
              : '-top-4 left-1/2 -translate-x-1/2 rotate-90',
            className,
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          aria-label={ariaLabel ?? 'Previous slide'}
          {...props}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">{ariaLabel ?? 'Previous slide'}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {ariaLabel ?? 'Previous slide'}
      </TooltipContent>
    </Tooltip>
  );
};

export const CarouselNext = ({
  className,
  'aria-label': ariaLabel,
  disableTooltip = false,
  ...props
}: CarouselNavigationProps): React.ReactElement => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Tooltip open={disableTooltip ? false : undefined}>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            'absolute size-8 rounded-full',
            orientation === 'horizontal'
              ? 'top-1/2 -right-4 -translate-y-1/2'
              : '-bottom-4 left-1/2 -translate-x-1/2 rotate-90',
            className,
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
          aria-label={ariaLabel ?? 'Next slide'}
          {...props}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">{ariaLabel ?? 'Next slide'}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        {ariaLabel ?? 'Next slide'}
      </TooltipContent>
    </Tooltip>
  );
};

export type { CarouselApi };
