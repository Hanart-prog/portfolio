import { lazy, Suspense, type ReactElement } from 'react';
import { HeroSection } from '@/components/sections/hero/hero-section';
import { Loading } from '@/components/layout/loading';
import { useLocale } from '@/hooks/use-locale';
import { useScrollSmoother } from '@/hooks/use-scroll-smoother';
import { useLoading, type UseLoadingReturn } from '@/hooks/use-loading';
import Navbar from '@/components/layout/navbar/navbar';

const content = {
  sections: [
    lazy(() => import('@/components/sections/about/about-section')),
    lazy(() => import('@/components/sections/experience/experience-section')),
    lazy(() => import('@/components/sections/projects/projects-section')),
    lazy(() => import('@/components/sections/contact/contact-section')),
  ],
  footer: lazy(() => import('@/components/layout/footer')),
};

export const App = (): ReactElement => {
  useLocale();
  useScrollSmoother();
  const loading: UseLoadingReturn = useLoading(content.sections);
  return (
    <>
      <Loading
        isVisible={loading.isLoading}
        onAnimationComplete={loading.markAnimationComplete}
      />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <main>
            {content.sections.map((Section, index) => (
              <Suspense key={index} fallback={null}>
                <Section />
              </Suspense>
            ))}
          </main>
          <Suspense fallback={null}>
            <content.footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
