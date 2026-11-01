import type { ReactElement } from 'react';
import { Image } from '@/components/common/image';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { About } from '@/types/portfolio/about/about';

export const AboutProfile = (): ReactElement => {
  const about: About = usePortfolio('about');

  return (
    <div data-about-reveal className="w-full shrink-0 md:w-auto">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-[0_10px_30px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-200 ring-inset hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgb(25_25_25/0.1)] motion-reduce:transform-none motion-reduce:transition-none sm:mx-auto sm:h-88 sm:w-72 md:mx-0 dark:shadow-none dark:ring-0">
        <Image
          src={about.identity.image}
          alt={`${about.identity.firstName} ${about.identity.lastName}`}
          buttonClassName="absolute inset-0 size-full cursor-zoom-in"
          className="size-full object-cover object-top"
        />
      </div>
    </div>
  );
};
