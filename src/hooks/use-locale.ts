import { useEffect } from 'react';
import { useLanguage, type UseLanguageReturn } from '@/hooks/use-language';
import i18n from '@/i18n';

export const useLocale = (): void => {
  const { language }: UseLanguageReturn = useLanguage();

  useEffect((): void => {
    document.documentElement.lang = language;
    void i18n.changeLanguage(language);

    const title: string = i18n.t('page.title', { lng: language });
    const description: string = i18n.t('page.description', { lng: language });
    const locale: string = language.replace('-', '_');

    document.title = title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description);

    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute('content', title);

    document
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.setAttribute('content', description);

    document
      .querySelector<HTMLMetaElement>('meta[property="og:locale"]')
      ?.setAttribute('content', locale);

    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
      ?.setAttribute('content', title);

    document
      .querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
      ?.setAttribute('content', description);
  }, [language]);
};

export default useLocale;
