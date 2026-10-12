import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { EXPERIENCES } from '@/lib/data/experiences';

// update when content changes significantly
const LAST_UPDATE = new Date('2026-10-12');

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: 'monthly' | 'yearly' = 'monthly') => ({
    url: SITE_URL + path,
    lastModified: LAST_UPDATE,
    changeFrequency,
    priority,
  });

  return [
    page('', 1),
    page('/experience', 0.8),
    ...EXPERIENCES.map((e) => page(`/experience/${e.slug}`, 0.7)),
    page('/our-company', 0.7),
    page('/contact', 0.8),
    page('/careers', 0.5),
    page('/media-kit', 0.5),
    page('/privacy-policy', 0.2, 'yearly'),
    page('/legal-notice', 0.2, 'yearly'),
    page('/cookies', 0.2, 'yearly'),
  ];
}
