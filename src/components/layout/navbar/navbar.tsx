import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/common/logo';
import { NavbarItems } from '@/components/layout/navbar/navbar-items';
import { ThemeToggle } from '@/components/layout/preferences/theme-toggle';
import { NavbarMenuToggle } from '@/components/layout/navbar/navbar-menu-toggle';
import { sections, type Section } from '@/constants/sections';
import { useActiveSection } from '@/hooks/use-active-section';
import { useMobile } from '@/hooks/use-mobile';
import { useTheme, type UseThemeReturn } from '@/hooks/use-theme';
import { scrollTo } from '@/utils/scroll';

const items: Section[] = Object.values(sections);
const NavbarMenu = lazy(() =>
  import('@/components/layout/navbar/navbar-menu').then(
    ({ NavbarMenu: component }) => ({ default: component }),
  ),
);

export const Navbar = (): ReactElement => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile: boolean = useMobile();
  const { activeSectionId, activeTargetId } = useActiveSection();
  const { isDarkTheme }: UseThemeReturn = useTheme();

  useEffect((): (() => void) | undefined => {
    if (isMobile) {
      return undefined;
    }

    const frameId: number = requestAnimationFrame(() => setIsMenuOpen(false));
    return (): void => cancelAnimationFrame(frameId);
  }, [isMobile]);

  const navigateTo = useCallback((targetId: string): void => {
    scrollTo(targetId);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-3rem)] -translate-x-1/2 md:w-max"
        aria-label={t('navigation.title')}
      >
        <div
          className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full p-2 ring-1 ring-[#191919]/10 transition-opacity duration-260 ease-out dark:ring-white/10"
          style={{
            colorScheme: isDarkTheme ? 'dark' : 'light',
            background: isDarkTheme
              ? 'rgb(24 24 27 / 0.62)'
              : 'rgb(255 255 255 / 0.78)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.12)',
            backdropFilter: 'blur(14px) saturate(1.12)',
            boxShadow: isDarkTheme
              ? '0 8px 28px rgb(0 0 0 / 0.3)'
              : '0 8px 28px rgb(0 0 0 / 0.12)',
          }}
        >
          <div className="flex size-full items-center justify-center px-6 md:px-6 lg:px-10">
            <div className="hidden shrink-0 items-center gap-4 md:flex lg:gap-6">
              <NavbarItems
                items={items}
                activeSectionId={activeSectionId}
                activeTargetId={activeTargetId}
                onNavigate={navigateTo}
                variant="desktop"
              />
              <span
                className="h-4 w-px shrink-0 self-center bg-gray-400/80 dark:bg-gray-500"
                aria-hidden="true"
              />
              <ThemeToggle />
            </div>
            <div className="flex w-full items-center justify-between md:hidden">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <NavbarMenuToggle
                  isOpen={isMenuOpen}
                  onClick={(): void => setIsMenuOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isMobile && (
        <Suspense fallback={null}>
          <NavbarMenu
            isOpen={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            items={items}
            activeSectionId={activeSectionId}
            activeTargetId={activeTargetId}
            onNavigate={navigateTo}
          />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;
