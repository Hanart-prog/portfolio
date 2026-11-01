export type Language = 'en-US';

export interface UseLanguageReturn {
  language: Language;
}

export const useLanguage = (): UseLanguageReturn => ({ language: 'en-US' });

export default useLanguage;
