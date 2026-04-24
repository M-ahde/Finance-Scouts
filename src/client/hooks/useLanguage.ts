import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { useLanguageContext, type Language } from '@/client/context/LanguageContext';

export function useLanguage() {
  const { i18n } = useTranslation();
  const { language, isRTL, direction, toggleLanguage, setLanguage } = useLanguageContext();

  const syncLanguage = useCallback(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    syncLanguage();
  }, [syncLanguage]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, [setLanguage]);

  return {
    currentLanguage: language,
    isRTL,
    direction,
    changeLanguage,
    toggleLanguage,
  };
}