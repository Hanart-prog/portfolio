import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () =>
      typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect((): (() => void) => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateIsMobile = (): void => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateIsMobile);
    return (): void => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  return isMobile;
};

export default useMobile;
