import { memo, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { sections, type Section } from '@/constants/sections';

interface NavbarItemsProps {
  items: readonly Section[];
  activeSectionId: Section['id'];
  activeTargetId: string;
  onNavigate: (targetId: string) => void;
  variant: 'desktop' | 'mobile';
}

export const NavbarItems = memo(
  ({
    items,
    activeSectionId,
    activeTargetId,
    onNavigate,
    variant,
  }: NavbarItemsProps): ReactElement => {
    const { t } = useTranslation();
    const isMobile: boolean = variant === 'mobile';

    return (
      <ul
        className={
          isMobile
            ? 'space-y-8 text-center'
            : 'flex w-max shrink-0 items-center gap-4 sm:gap-6'
        }
      >
        {items.map(({ id }: Section): ReactElement => {
          const label: string = t(`navigation.${id}`);

          return (
            <li
              key={id}
              className={
                isMobile
                  ? 'flex flex-col items-center gap-2'
                  : 'flex h-10 shrink-0 flex-col items-center justify-center gap-0'
              }
            >
              <button
                type="button"
                onClick={(): void => onNavigate(id)}
                className={
                  isMobile
                    ? `inline-block cursor-pointer text-3xl transition-all duration-300 ${id === activeSectionId ? 'font-bold text-[#191919] dark:text-white' : 'font-medium text-gray-500 hover:scale-110 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`
                    : `group relative cursor-pointer overflow-hidden rounded-full p-0 text-sm font-semibold transition-all duration-300 ${id === activeSectionId ? 'text-[#191919] dark:text-white' : 'text-gray-500 hover:text-[#191919] dark:text-gray-400 dark:hover:text-white'}`
                }
                aria-label={label}
                aria-current={id === activeSectionId ? 'location' : undefined}
              >
                {isMobile ? (
                  label
                ) : (
                  <span className="group relative block overflow-hidden whitespace-nowrap">
                    {id === activeSectionId ? (
                      label
                    ) : (
                      <>
                        <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-125%] group-hover:skew-y-8">
                          {label}
                        </span>
                        <span className="absolute top-0 left-0 translate-y-[125%] skew-y-8 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                          {label}
                        </span>
                      </>
                    )}
                  </span>
                )}
              </button>
              <fieldset
                className={`m-0 flex min-w-0 flex-row items-center justify-center gap-0 border-0 p-0 ${
                  isMobile ? '' : '-mt-0.5 h-3'
                }`}
                aria-label={label}
              >
                {(id === 'experience'
                  ? [
                      {
                        id: sections.experience.subsections.techStack.id,
                        label: t('techStack.title'),
                      },
                      {
                        id: sections.experience.subsections.trajectory.id,
                        label: t('experience.trajectory'),
                      },
                    ]
                  : [{ id, label }]
                ).map(({ id: targetId, label: targetLabel }) => {
                  return (
                    <button
                      key={targetId}
                      type="button"
                      onClick={(): void => onNavigate(targetId)}
                      aria-label={t('navigation.goToSection', {
                        section: targetLabel,
                      })}
                      aria-current={
                        targetId === activeTargetId ? 'location' : undefined
                      }
                      className={`group flex ${
                        isMobile ? 'size-6' : '-mr-0.5 size-3'
                      } cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#191919] dark:focus-visible:outline-white`}
                    >
                      <span
                        aria-hidden="true"
                        className={`rounded-full transition-all duration-200 ${
                          targetId === activeTargetId
                            ? 'size-2 bg-[#191919] dark:bg-white'
                            : 'size-1.5 bg-[#191919]/30 group-hover:bg-[#191919]/70 dark:bg-white/30 dark:group-hover:bg-white/70'
                        }`}
                      />
                    </button>
                  );
                })}
              </fieldset>
            </li>
          );
        })}
      </ul>
    );
  },
);
