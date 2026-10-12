'use client';

import { useEffect, useRef, useState } from 'react';
import { useActivated, useViewportNotifier } from '@/lib/hooks';
import { useT } from '@/lib/i18n-client';
import { getDelay } from '@/lib/store';
import { EXPERIENCES } from '@/lib/data/experiences';
import VerticalTitle from '@/components/shared/VerticalTitle';
import Accordion from '@/components/shared/Accordion';
import DvLink from '@/components/shared/DvLink';

export default function Experiences({ onEnter }: { onEnter?: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activated = useActivated();

  const [openAccordion, setOpenAccordion] = useState(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useViewportNotifier(ref, onEnter);

  // ngAfterViewInit
  useEffect(() => {
    if (!activated) {
      return;
    }

    const id = setTimeout(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, getDelay());

    return () => clearTimeout(id);
  }, [activated]);

  return (
    <div className="dv-experiences" ref={ref}>
      <div className="content flex">
        {!!height && (
          <VerticalTitle title={t('home.experiences')} className="half" content={contentRef} style={{ height }} />
        )}

        <div className="experiences half" ref={contentRef}>
          {EXPERIENCES.map((experience, i) => (
            <Accordion
              key={experience.slug}
              open={i === openAccordion}
              disable={true}
              onClick={() => setOpenAccordion(i)}
              header={<div className="highlight-green pointer h4 experience-title">{experience.title}</div>}
            >
              <p>{experience.excerpt}</p>
              <DvLink route={'/experience/' + experience.slug} textKey={experience.linkDescription} />
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
