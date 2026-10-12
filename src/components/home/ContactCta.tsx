'use client';

import { useT } from '@/lib/i18n-client';
import TLink from '@/components/shared/TLink';

export default function ContactCta() {
  const t = useT();

  return (
    <div className="dv-contact-cta">
      <div className="h6">{t('home.contact.text')}</div>
      <TLink className="content" href="/contact">
        <label className="left" dangerouslySetInnerHTML={{ __html: t('home.contact.left') }} />
        <div className="pointer h1">{t('home.contact.cta')}</div>
        <label className="right" dangerouslySetInnerHTML={{ __html: t('home.contact.right') }} />
      </TLink>
    </div>
  );
}
