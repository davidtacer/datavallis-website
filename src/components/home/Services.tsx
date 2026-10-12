'use client';

import { useRef } from 'react';
import { useViewportNotifier } from '@/lib/hooks';
import { useT } from '@/lib/i18n-client';
import { SERVICES } from '@/lib/data/services';

export default function Services({ onEnter }: { onEnter?: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useViewportNotifier(ref, onEnter);

  return (
    <div className="dv-services" id="services" ref={ref}>
      <div className="container">
        <div className="content p-l">
          <h2 className="h3 section-title">{t('home.ourServices')}</h2>

          <div className="flex">
            {SERVICES.map((service) => (
              <div className="item flex-3" key={service.id}>
                <div className="green-f h6">{service.title}</div>
                <div className="h6">{service.subtitle}</div>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
