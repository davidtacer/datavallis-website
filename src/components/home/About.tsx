'use client';

import { useRef } from 'react';
import { useViewportNotifier } from '@/lib/hooks';
import { useT } from '@/lib/i18n-client';

export default function About({ onEnter }: { onEnter?: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useViewportNotifier(ref, onEnter);

  return (
    <div className="dv-about" id="about" ref={ref}>
      <div className="content flex">
        <h3 className="half p-l">{t('home.aboutUs')}</h3>
        <p className="half p-r">
          At Data Vallis Ltd., we’re a forward-thinking technology company dedicated to delivering optimized,
          cutting-edge solutions across diverse industries. Driven by passion, innovation, and a commitment to customer
          satisfaction, we harness the power of digital transformation to empower businesses and foster trust and
          transparency. Our team combines over a decade of expertise in software development and industry-specific
          business processes, ensuring reliable, advanced solutions for every client. Our vision is to be the premier
          global provider of next-generation IT solutions, recognized for excellence and adaptability.
        </p>
      </div>
    </div>
  );
}
