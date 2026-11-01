import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

interface ProjectsPreviewProps {
  children: ReactNode;
  isExpanded: boolean;
}

export const ProjectsPreview = ({
  children,
  isExpanded,
}: ProjectsPreviewProps): ReactElement => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  useLayoutEffect((): (() => void) | undefined => {
    const content: HTMLDivElement | null = contentRef.current;
    if (content === null) {
      return;
    }

    const observer: ResizeObserver = new ResizeObserver(() => {
      setContentHeight(content.scrollHeight);
    });

    observer.observe(content);
    setContentHeight(content.scrollHeight);

    return (): void => observer.disconnect();
  }, []);

  return (
    <div
      style={
        isExpanded
          ? { height: `${contentHeight}px` }
          : { transitionDuration: '1150ms' }
      }
      className="relative h-28 overflow-hidden transition-[height] duration-500 ease-out motion-reduce:transition-none sm:h-32"
    >
      <div
        ref={contentRef}
        className={isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}
        inert={!isExpanded}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-b from-gray-50/0 via-gray-50/75 to-gray-50 dark:from-[#121212]/0 dark:via-[#121212]/75 dark:to-[#121212]" />
        <div className="absolute -inset-x-1/4 -bottom-16 h-32 rounded-full bg-gray-50/90 blur-3xl dark:bg-[#121212]/90" />
      </div>
    </div>
  );
};
