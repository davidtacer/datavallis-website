import type { Metadata } from 'next';
import { translate } from './i18n';

/** SeoService.set / setDefault */
export function seo(titleKey: string = 'seo.title', descriptionKey: string = 'seo.description'): Metadata {
  return {
    title: translate(titleKey),
    description: translate(descriptionKey),
  };
}
