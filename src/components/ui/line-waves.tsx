import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
} from 'react';

interface LineWavesProps {
  color?: string;
  highlightColor?: string;
  lineCount?: number;
  lineWidth?: number;
  opacity?: number;
  baseIntensity?: number;
  speed?: number;
  intro?: boolean;
  isIntroActive?: boolean;
  onReady?: (isReady: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

const MAX_PIXEL_RATIO = 1.5;
const OVERFLOW_LINES = 8;
const FRAME_INTERVAL = 1000 / 30;

const hexToRgba = (color: string, opacity: number): string => {
  const value: string = color.replace('#', '');
  const normalized: string =
    value.length === 3
      ? value
          .split('')
          .map((character: string): string => character + character)
          .join('')
      : value;
  const red: number = Number.parseInt(normalized.slice(0, 2), 16);
  const green: number = Number.parseInt(normalized.slice(2, 4), 16);
  const blue: number = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgb(${red} ${green} ${blue} / ${opacity})`;
};

export const LineWaves = ({
  color = '#38bdf8',
  highlightColor = '#a5f3fc',
  lineCount = 54,
  lineWidth = 1,
  opacity = 1,
  baseIntensity = 0.34,
  speed = 0.22,
  intro = false,
  isIntroActive = true,
  onReady,
  className,
  style,
}: LineWavesProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect((): (() => void) | undefined => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const container: HTMLElement | null = canvas?.parentElement ?? null;

    if (!canvas || !container) {
      return undefined;
    }

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d', {
      desynchronized: true,
    });

    if (!context) {
      return undefined;
    }

    const prefersReducedMotion: boolean = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width: number = 0;
    let height: number = 0;
    let frame: number = 0;
    let startedAt: number | undefined;
    const introStartedAt: number = performance.now();
    let isVisible: boolean = true;
    let isDocumentVisible: boolean = !document.hidden;
    let lastDrawAt: number | undefined;
    let hasCanvasSize: boolean = false;
    let sharedWave: Float64Array = new Float64Array();
    let xPositions: Float64Array = new Float64Array();
    let horizontalPositions: Float64Array = new Float64Array();

    const resize = (): void => {
      const bounds: DOMRect = container.getBoundingClientRect();
      const pixelRatio: number = Math.min(
        window.devicePixelRatio || 1,
        MAX_PIXEL_RATIO,
      );

      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);

      const canvasWidth: number = Math.round(width * pixelRatio);
      const canvasHeight: number = Math.round(height * pixelRatio);
      if (
        hasCanvasSize &&
        canvas.width === canvasWidth &&
        canvas.height === canvasHeight
      ) {
        return;
      }

      const pointCount: number = Math.floor((width + 80) / 5) + 1;
      sharedWave = new Float64Array(pointCount);
      xPositions = new Float64Array(pointCount);
      horizontalPositions = new Float64Array(pointCount);

      for (let point = 0; point < pointCount; point += 1) {
        const x: number = point * 5 - 40;
        xPositions[point] = x;
        horizontalPositions[point] = x / width;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      hasCanvasSize = true;
    };

    const draw = (time: number): void => {
      if (!width || !height) {
        return;
      }

      const elapsed: number = prefersReducedMotion
        ? 0
        : ((time - (startedAt ?? time)) / 1000) * speed;
      const introOpacity: number =
        !intro || prefersReducedMotion
          ? 1
          : isIntroActive
            ? Math.min(1, Math.max(0, (time - introStartedAt) / 900))
            : 0;
      const spacing: number = height / (lineCount - 1);

      for (let point = 0; point < sharedWave.length; point += 1) {
        const horizontal: number = horizontalPositions[point]!;
        sharedWave[point] = Math.sin(horizontal * 3.2 + elapsed * 0.7) * 13;
      }

      context.clearRect(0, 0, width, height);
      context.lineWidth = lineWidth;
      context.lineCap = 'round';

      for (
        let index = -OVERFLOW_LINES;
        index < lineCount + OVERFLOW_LINES;
        index += 1
      ) {
        const progress: number = index / (lineCount - 1);
        const center: number = (progress - 0.5) * 2;
        const shimmer: number = Math.exp(
          -Math.pow(center - Math.sin(elapsed * 0.55) * 0.16, 2) * 11,
        );
        const intensity: number =
          (baseIntensity + shimmer * (1 - baseIntensity)) *
          opacity *
          introOpacity;

        context.beginPath();
        context.strokeStyle = hexToRgba(
          shimmer > 0.38 ? highlightColor : color,
          intensity,
        );

        for (let point = 0; point < sharedWave.length; point += 1) {
          const x: number = xPositions[point]!;
          const horizontal: number = horizontalPositions[point]!;
          const wave: number =
            Math.sin(horizontal * 8.4 + elapsed * 2.2 + index * 0.23) * 18 +
            Math.sin(horizontal * 17 - elapsed * 1.5 + index * 0.1) * 6 +
            sharedWave[point]!;
          const y: number =
            index * spacing + wave + (horizontal - 0.5) * height * -0.16;

          if (x === -40) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.stroke();
      }
    };

    const canAnimate = (): boolean =>
      isVisible && isDocumentVisible && !prefersReducedMotion && speed > 0;

    const animate = (time: number): void => {
      startedAt ??= time;
      if (lastDrawAt === undefined || time - lastDrawAt >= FRAME_INTERVAL) {
        draw(time);
        lastDrawAt = time;
      }

      if (canAnimate()) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const restart = (): void => {
      window.cancelAnimationFrame(frame);
      draw(performance.now());
      lastDrawAt = performance.now();

      onReady?.(true);

      if (canAnimate()) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const onVisibilityChange = (): void => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible && isVisible) {
        restart();
      } else {
        window.cancelAnimationFrame(frame);
      }
    };

    const resizeObserver: ResizeObserver = new ResizeObserver((): void => {
      resize();
      restart();
    });
    const visibilityObserver: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        isVisible = entry?.isIntersecting ?? false;

        if (isVisible) {
          restart();
        } else {
          window.cancelAnimationFrame(frame);
        }
      },
    );

    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    restart();

    return (): void => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [
    baseIntensity,
    color,
    highlightColor,
    intro,
    isIntroActive,
    lineCount,
    lineWidth,
    opacity,
    onReady,
    speed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
};
