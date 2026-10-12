'use client';

import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n-client';
import { useActivated } from '@/lib/hooks';
import { changeBackground, setActiveRoute } from '@/lib/store';
import { getArticle } from '@/lib/api';
import { DEFAULT_BACKGROUND } from '@/lib/constants';
import type { News } from '@/lib/models';
import Title, { TitleSize } from '@/components/shared/Title';
import TLink from '@/components/shared/TLink';

/**
 * Port of NewsDetailsPageComponent (/news/:category/:slug)
 * The article is fetched on the server (for SEO); if that fails it is fetched again in the browser.
 */
export default function NewsDetailsPage({ slug, initialArticle }: { slug: string; initialArticle: News | null }) {
  const t = useT();
  const activated = useActivated();
  const [article, setArticle] = useState<News | null>(initialArticle);

  useEffect(() => {
    if (!activated) {
      return;
    }

    setActiveRoute('/article');

    let cancelled = false;

    const apply = (item: News | null) => {
      if (cancelled || !item) {
        return;
      }

      setArticle(item);
      changeBackground(item.image);
    };

    if (initialArticle && initialArticle.slug === slug) {
      apply(initialArticle);
    } else {
      setArticle(null);
      // NOTE: the Angular app requested `/news/undefined/:slug` (typo `params.caregory`); kept identical
      getArticle('undefined', slug)
        .then(apply)
        .catch((err) => console.error(err));
    }

    return () => {
      cancelled = true;
    };
  }, [slug, initialArticle, activated]);

  // ngOnDestroy
  useEffect(() => {
    return () => changeBackground(DEFAULT_BACKGROUND);
  }, []);

  return (
    <div className="dv-news-details-page">
      {article && (
        <div className="view-wrapper">
          <Title title={article.title} background={article.image} size={TitleSize.H3}>
            <div className="h6 article-date">{article.date}</div>
            <div className="categories">
              {article.categories?.map((category) => (
                <label key={category.id}>
                  <TLink className="green-f" href={`/news/${category.slug}`}>
                    {category.name}
                  </TLink>
                </label>
              ))}

              {article.tags?.map((tag) => (
                <label key={tag.id}> {tag.name} </label>
              ))}
            </div>
          </Title>

          <div className="article">
            <div className="content">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
              {article.related_article && (
                <div className="h6 more-link">
                  <TLink href={`/news/all/${article.related_article}`}> {t('news.more')} </TLink>
                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                  <img src="/assets/icons/random.png" height={23} width={26} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
