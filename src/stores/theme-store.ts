import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

export interface ThemeStore {
  theme: Theme;
  isDarkTheme: boolean;
  isLightTheme: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set): ThemeStore => {
      const applyTheme = (theme: Theme): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      };

      return {
        theme: 'dark',
        isDarkTheme: true,
        isLightTheme: false,
        setTheme: (theme: Theme): void => {
          applyTheme(theme);
          set({
            theme,
            isDarkTheme: theme === 'dark',
            isLightTheme: theme === 'light',
          });
        },
        toggleTheme: (): void => {
          set(
            (
              state: ThemeStore,
            ): Pick<ThemeStore, 'theme' | 'isDarkTheme' | 'isLightTheme'> => {
              const theme: Theme = state.theme === 'dark' ? 'light' : 'dark';
              applyTheme(theme);

              return {
                theme,
                isDarkTheme: theme === 'dark',
                isLightTheme: theme === 'light',
              };
            },
          );
        },
      };
    },
    {
      name: 'portfolio-theme',
      storage: createJSONStorage((): Storage => localStorage),
      partialize: (state: ThemeStore): Pick<ThemeStore, 'theme'> => ({
        theme: state.theme,
      }),
      onRehydrateStorage:
        (): ((state: ThemeStore | undefined, error?: unknown) => void) =>
        (state: ThemeStore | undefined, error?: unknown): void => {
          state?.setTheme(error || state?.theme !== 'light' ? 'dark' : 'light');
        },
    },
  ),
);

export default useThemeStore;
