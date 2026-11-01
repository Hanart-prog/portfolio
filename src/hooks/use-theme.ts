import { useThemeStore, type ThemeStore } from '@/stores/theme-store';

export interface UseThemeReturn {
  theme: ThemeStore['theme'];
  isDarkTheme: boolean;
  isLightTheme: boolean;
  setTheme: ThemeStore['setTheme'];
  toggleTheme: ThemeStore['toggleTheme'];
}

export const useTheme = (): UseThemeReturn => {
  return useThemeStore();
};

export default useTheme;
