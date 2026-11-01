import type { ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePortfolio } from '@/hooks/use-portfolio';
import type { About } from '@/types/portfolio/about/about';
import type { Specialty } from '@/types/portfolio/about/specialty';

export const AboutProfileSpecialties = (): ReactElement => {
  const about: About = usePortfolio('about');

  return (
    <div
      data-about-reveal
      className="mb-[clamp(2.5rem,4vw,4rem)] flex flex-wrap gap-2.5"
    >
      {about.specialties.map((specialty: Specialty): ReactElement => {
        const Icon: LucideIcon | undefined = specialty.icon;

        return (
          <Badge
            key={specialty.name}
            variant="secondary"
            className="inline-flex items-center gap-2 rounded-full border-0 bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-[#191919] shadow-[0_2px_6px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-200 ring-inset hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-[#2a2a2a]/80 dark:text-white dark:shadow-none dark:ring-0 dark:hover:bg-[#404040]"
          >
            {Icon && <Icon className="size-5" aria-hidden="true" />}
            {specialty.name}
          </Badge>
        );
      })}
    </div>
  );
};
