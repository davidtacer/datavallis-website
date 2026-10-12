/**
 * Port of ngx-translate setup (TranslateService + LanguageService).
 * Default language is English; like the Angular app, a previously stored
 * `localStorage.language` value is respected on the client.
 */
import en from '@/i18n/en.json';
import sl from '@/i18n/sl.json';

export type LanguageCode = 'en' | 'sl';
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

const DICTIONARIES: Record<LanguageCode, any> = { en, sl };

/** Same behaviour as ngx-translate's `instant`: returns the key when the translation is missing */
export function translate(key: string, lang: LanguageCode = DEFAULT_LANGUAGE): string {
  if (!key) {
    return key;
  }

  const value = key.split('.').reduce<any>((acc, part) => (acc == null ? acc : acc[part]), DICTIONARIES[lang]);

  return typeof value === 'string' ? value : key;
}
