'use client';

import { useT } from '@/lib/i18n-client';
import DvLink from '@/components/shared/DvLink';

export default function NotFoundPage() {
  const t = useT();

  return (
    <div className="dv-page-not-found">
      <div className="content">
        <div className="h1 green-f">404</div>
        <div className="h4">{t('pageNotFound.title')}</div>
        <div className="h6">{t('pageNotFound.text')}</div>
        <DvLink route="/" textKey="pageNotFound.cta" />
      </div>
    </div>
  );
}
