import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';

export type Language = 'en' | 'ar';

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Language;
  const isRTL = currentLanguage === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  const changeLanguage = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  }, [currentLanguage, changeLanguage]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
    
    // Update font family based on language
    if (isRTL) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [direction, currentLanguage, isRTL]);

  return {
    currentLanguage,
    isRTL,
    direction,
    changeLanguage,
    toggleLanguage,
  };
}
