import { ScrollSmoother } from 'gsap/ScrollSmoother';

export const scrollTo = (targetId: string): void => {
  const target = document.getElementById(targetId);
  if (!target) {
    const observer = new MutationObserver(() => {
      if (!document.getElementById(targetId)) {
        return;
      }

      observer.disconnect();
      scrollTo(targetId);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 5000);
    return;
  }

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(
      target,
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      'top top',
    );
  } else {
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
};
