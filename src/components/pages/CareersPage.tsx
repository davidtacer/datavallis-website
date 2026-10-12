'use client';

import { useT } from '@/lib/i18n-client';
import Title, { TitleSize } from '@/components/shared/Title';

export default function CareersPage() {
  const t = useT();

  return (
    <div className="dv-careers-page">
      <Title title={t('careers.title')} size={TitleSize.H3}>
        <h6 className="mobile">{t('careers.text')}</h6>
      </Title>

      <div className="content flex">
        <div className="h6 desktop">{t('careers.text')}</div>
        <div className="list">
          <div className="h4 green-f">{t('careers.placeholder')}</div>
        </div>
      </div>
    </div>
  );
}
