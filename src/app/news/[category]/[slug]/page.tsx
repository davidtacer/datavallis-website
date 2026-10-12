import type { Metadata } from 'next';
import { cache } from 'react';
import NewsDetailsPage from '@/components/pages/NewsDetailsPage';
import { getArticle } from '@/lib/api';
import { pageMetadata, seo, truncate } from '@/lib/seo';
import { stripHTML } from '@/lib/utils';

type Params = { params: Promise<{ category: string; slug: string }> };

// NOTE: the Angular app requested `/news/undefined/:slug` (typo `params.caregory`); kept identical
const loadArticle = cache(async (slug: string) => {
  try {
    return await getArticle('undefined', slug, { next: { revalidate: 300 } } as RequestInit);
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug);

  if (!article) {
    return { ...seo(), robots: { index: false, follow: true } };
  }

  return pageMetadata({
    title: `${article.title} | DATA VALLIS`,
    description: truncate(stripHTML(article.excerpt || '')),
    path: `/news/all/${slug}`,
    image: article.image || 'default',
    type: 'article',
    noindex: true, // news section is hidden for now
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const article = await loadArticle(slug);

  return <NewsDetailsPage slug={slug} initialArticle={article} key={slug} />;
}
