import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'preferred-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ar') return stored;
  
  const browserLang = navigator.language?.split('-')[0];
  return browserLang === 'ar' ? 'ar' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    
    document.body.classList.remove('font-sans', 'font-arabic', 'dir-rtl', 'dir-ltr');
    document.body.classList.add(isRTL ? 'font-arabic' : 'font-sans', `dir-${direction}`);
  }, [language, isRTL, direction, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, isRTL, direction, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
}

export function useCurrentLanguage(): Language {
  const { language } = useLanguageContext();
  return language;
}

export function useIsRTL(): boolean {
  const { isRTL } = useLanguageContext();
  return isRTL;
}