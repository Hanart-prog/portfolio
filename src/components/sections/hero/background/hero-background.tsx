import { type ReactElement } from 'react';
import { LineWaves } from '@/components/ui/line-waves';

interface HeroBackgroundProps {
  isDarkTheme: boolean;
}

export const HeroBackground = ({
  isDarkTheme,
}: HeroBackgroundProps): ReactElement => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <LineWaves
        key={isDarkTheme ? 'dark-waves' : 'light-waves'}
        className="pointer-events-none absolute inset-0 size-full"
        color={isDarkTheme ? '#858585' : '#1d4ed8'}
        highlightColor={isDarkTheme ? '#aaaaaa' : '#0ea5e9'}
        lineCount={34}
        lineWidth={isDarkTheme ? 1.3 : 1.05}
        opacity={isDarkTheme ? 0.8 : 0.75}
        baseIntensity={isDarkTheme ? 0.82 : 0.34}
        speed={0.16}
      />
      {isDarkTheme ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[48%] left-1/2 h-[62vh] max-h-176 w-[84vw] max-w-6xl -translate-1/2 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.52) 55%, rgba(0, 0, 0, 0.14) 88%, transparent 100%)',
          }}
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.5) 52%, rgba(255, 255, 255, 0.1) 82%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
};
