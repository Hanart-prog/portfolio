import { useCallback, useEffect, useState, type ElementType } from 'react';

export interface UseLoadingReturn {
  isLoading: boolean;
  markAnimationComplete: () => void;
}

export const useLoading = (
  sections: readonly ElementType[],
): UseLoadingReturn => {
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  useEffect((): (() => void) => {
    const markPageReady = (observer: MutationObserver): void => {
      if (
        document.querySelectorAll('#smooth-content main > section').length ===
          sections.length &&
        document.querySelector('#smooth-content > footer')
      ) {
        observer.disconnect();
        void document.fonts.ready.then(() => setIsPageReady(true));
      }
    };

    const observer = new MutationObserver((_, activeObserver): void =>
      markPageReady(activeObserver),
    );

    observer.observe(document.body, { childList: true, subtree: true });

    markPageReady(observer);

    return (): void => observer.disconnect();
  }, [sections]);

  return {
    isLoading: !isPageReady || !isAnimationComplete,
    markAnimationComplete: useCallback(
      (): void => setIsAnimationComplete(true),
      [],
    ),
  };
};

export default useLoading;
