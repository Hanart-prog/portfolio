import type { ReactElement } from 'react';
import type { TechStackItem } from '@/types/portfolio/tech-stack/tech-stack-item';

interface TechStackCardItemProps {
  item: TechStackItem;
}

export const TechStackCardItem = ({
  item,
}: TechStackCardItemProps): ReactElement => {
  const { name, icon: Icon } = item;

  return (
    <li className="inline-flex items-center gap-2 rounded-full border-0 bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-[#191919] shadow-[0_2px_6px_rgb(25_25_25/0.08)] ring-1 ring-[#191919]/15 transition-all duration-200 ring-inset hover:-translate-y-0.5 hover:bg-gray-100 dark:bg-[#2a2a2a] dark:text-white dark:shadow-none dark:ring-0 dark:hover:bg-[#404040]">
      <Icon
        className="size-5 shrink-0 text-[#191919] dark:text-white"
        aria-hidden="true"
      />
      <span>{name}</span>
    </li>
  );
};
