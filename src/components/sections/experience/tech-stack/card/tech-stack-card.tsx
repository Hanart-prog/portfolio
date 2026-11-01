import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { TechStackCardItem } from '@/components/sections/experience/tech-stack/card/tech-stack-card-item';
import type { TechStackCategory } from '@/types/portfolio/tech-stack/tech-stack-category';

interface TechStackCardProps {
  stack: TechStackCategory;
}

export const TechStackCard = ({ stack }: TechStackCardProps): ReactElement => {
  const { t } = useTranslation();
  const { category, icon: CategoryIcon, items } = stack;

  return (
    <Card
      data-tech-stack-card
      className="group relative overflow-hidden rounded-2xl border-0 bg-white p-[clamp(1.5rem,2.5vw,2.25rem)] shadow-[0_10px_30px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-500 ease-out ring-inset hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgb(25_25_25/0.1)] motion-reduce:transform-none motion-reduce:transition-none dark:bg-[#1a1a1a] dark:shadow-none dark:ring-0"
    >
      <div className="pointer-events-none absolute right-0 bottom-0 -mr-10 -mb-10 size-40 origin-bottom-right text-black opacity-[0.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-3 group-hover:rotate-[-5deg] motion-reduce:transform-none motion-reduce:transition-none dark:text-[#999999] dark:opacity-[0.11]">
        <CategoryIcon className="size-full" aria-hidden="true" />
      </div>
      <div className="relative z-10">
        <div className="mb-[clamp(1.5rem,2.5vw,2rem)] flex items-center gap-3.5">
          <CategoryIcon
            className="size-7 shrink-0 text-[#191919] dark:text-white"
            aria-hidden="true"
          />
          <h3 className="text-[clamp(1.375rem,1.8vw,1.75rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-[#191919] dark:text-white">
            {t(`techStack.${category}`)}
          </h3>
        </div>
        <ul
          className="flex flex-wrap gap-2.5"
          aria-label={t(`techStack.${category}`)}
        >
          {items.map((item): ReactElement => (
            <TechStackCardItem key={item.name} item={item} />
          ))}
        </ul>
      </div>
    </Card>
  );
};
