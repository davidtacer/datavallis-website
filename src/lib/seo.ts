import type { Metadata } from 'next';
import { translate } from './i18n';
import { SITE_URL } from './constants';

export const SITE_NAME = 'Data Vallis';
export const TWITTER_HANDLE = '@DataVallis';

/** Shorten text for meta descriptions (~155 characters, cut at a word boundary) */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();

  if (clean.length <= max) {
    return clean;
  }

  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,.;:-]+$/, '') + '…';
}

type PageSeo = {
  title: string;
  description: string;
  /** path of the page, e.g. "/contact" - used for the canonical URL and og:url */
  path: string;
  /** file name in /public/og (without extension), or an absolute image URL */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

/**
 * Complete metadata for a page: title, description, canonical URL, Open Graph and Twitter card.
 * (Next.js replaces the whole openGraph / twitter object of the layout, so every page sets all fields.)
 */
export function pageMetadata({
  title,
  description,
  path,
  image = 'default',
  imageAlt,
  type = 'website',
  noindex = false,
}: PageSeo): Metadata {
  const url = SITE_URL + (path === '/' ? '' : path);
  const imageUrl = /^https?:\/\//.test(image) ? image : `${SITE_URL}/og/${image}.jpg`;
  const isOwnImage = imageUrl.startsWith(`${SITE_URL}/og/`);
  const ogImage = {
    url: imageUrl,
    alt: imageAlt || title,
    ...(isOwnImage ? { width: 1200, height: 630, type: 'image/jpeg' } : {}),
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata from translation keys (SeoService.set / setDefault) */
export function seo(
  titleKey: string = 'seo.title',
  descriptionKey: string = 'seo.description',
  path: string = '/',
  image: string = 'default'
): Metadata {
  return pageMetadata({ title: translate(titleKey), description: translate(descriptionKey), path, image });
}
