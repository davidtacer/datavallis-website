'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LanguageCode, translate } from './i18n';

const LanguageContext = createContext<LanguageCode>(DEFAULT_LANGUAGE);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // LanguageService.init(): if user already selected the language, use it, otherwise use default
    try {
      const stored = localStorage.getItem('language') as LanguageCode | null;
      if (stored && stored !== lang && (stored === 'en' || stored === 'sl')) {
        setLang(stored);
      }
    } catch {
      /* storage not available */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

/** `| translate` pipe */
export function useT() {
  const lang = useContext(LanguageContext);
  return useCallback((key: string) => translate(key, lang), [lang]);
}
