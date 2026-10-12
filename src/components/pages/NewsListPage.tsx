'use client';

import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n-client';
import { useActivated } from '@/lib/hooks';
import { getDelay, setActiveRoute, useAppStore } from '@/lib/store';
import { getNews } from '@/lib/api';
import { stripHTML } from '@/lib/utils';
import type { News } from '@/lib/models';
import Title, { TitleSize } from '@/components/shared/Title';
import DvLink from '@/components/shared/DvLink';
import TLink from '@/components/shared/TLink';

/**
 * Port of NewsPageComponent (/news/:category)
 */
export default function NewsListPage({ category }: { category: string }) {
  const t = useT();
  const activated = useActivated();
  const categories = useAppStore((s) => s.categories);

  const [news, setNews] = useState<News[]>([]);
  const [slideIn, setSlideIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const appliedFilter = category;

  // ngOnInit
  useEffect(() => {
    if (!activated) {
      return;
    }

    const timeout = useAppStore.getState().animationCompleted ? 1000 : getDelay() + 500;
    const id = setTimeout(() => setSlideIn(true), timeout);

    setActiveRoute('/news');

    return () => clearTimeout(id);
  }, [activated]);

  // this.route.params.subscribe(...)
  useEffect(() => {
    if (!activated) {
      return;
    }

    let cancelled = false;
    setLoading(true);

    getNews(appliedFilter)
      .then((items) => {
        if (!cancelled) {
          setNews(items);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
    };
  }, [appliedFilter, activated]);

  return (
    <div className="dv-news-page">
      <Title title={t('news.title')} size={TitleSize.H3} />

      <div className="content p-l p-r ">
        <div className={`filters flex${slideIn ? ' slide-in' : ''}`}>
          <TLink className={`h5${appliedFilter === 'all' ? ' green-f' : ''}`} href="/news/all">
            {t('news.filter.all')}
          </TLink>
          {categories.map((filter) => (
            <TLink
              key={filter.id}
              className={`h5${filter.slug === appliedFilter ? ' green-f' : ''}`}
              href={`/news/${filter.slug}`}
            >
              {filter.name}
            </TLink>
          ))}
        </div>
      </div>

      <div className="line"></div>

      <div className="news-list content">
        {news.map((newsItem) => (
          <div className="item" key={newsItem.id}>
            <div className="img-wrapper">
              <TLink href={`/news/${appliedFilter}/${newsItem.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img width={663} height={300} className="pointer news-image" src={newsItem.image} />
              </TLink>
            </div>

            <div className="header flex">
              <TLink href={`/news/${appliedFilter}/${newsItem.slug}`}>
                <label className="h6 pointer">{newsItem.title}</label>
              </TLink>
              <span>{newsItem.date}</span>
            </div>

            <p>{stripHTML(newsItem.excerpt || '')}</p>

            <DvLink route={'/news/' + appliedFilter + '/' + newsItem.slug} />
          </div>
        ))}

        {!news.length && !loading && <div className="h4 green-f">{t('news.placeholder')}</div>}
      </div>
    </div>
  );
}
