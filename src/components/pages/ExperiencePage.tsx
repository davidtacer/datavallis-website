'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n-client';
import { useActivated } from '@/lib/hooks';
import { EXPERIENCES } from '@/lib/data/experiences';
import type { Experience } from '@/lib/models';
import Title, { TitleSize } from '@/components/shared/Title';
import Accordion from '@/components/shared/Accordion';

/**
 * Port of ExperiencePageComponent (/experience and /experience/:slug)
 */
export default function ExperiencePage({ slug }: { slug?: string }) {
  const t = useT();
  const activated = useActivated();

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [active, setActive] = useState<Experience | null | undefined>(null);
  const [contentTopPosition, setContentTopPosition] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const changeContent = (experience: Experience | undefined, titleEl?: HTMLHeadingElement | null) => {
    setFadeOut(true);

    timeouts.current.push(setTimeout(() => setActive(experience), 300));

    if (titleEl) {
      timeouts.current.push(
        setTimeout(() => {
          setContentTopPosition(titleEl.offsetTop - (contentRef.current?.offsetTop || 0));
          setFadeOut(false);
        }, 400)
      );
    }
  };

  // ngAfterViewInit
  useEffect(() => {
    if (!activated) {
      return;
    }

    if (slug) {
      const index = EXPERIENCES.findIndex((experience) => experience.slug === slug);
      changeContent(EXPERIENCES[index], index > -1 ? titleRefs.current[index] : undefined);
    } else {
      changeContent(EXPERIENCES[0], titleRefs.current[0]);
    }

    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activated]);

  return (
    <div className="dv-experience-page">
      <Title title={t('experience.title')} size={TitleSize.H3} />

      <div className="content">
        <div className="flex">
          <div className="tabs">
            {EXPERIENCES.map((experience, i) => (
              <Accordion
                key={experience.slug}
                open={active === experience}
                disable={true}
                header={
                  <h4
                    className="highlight-green pointer exp-title"
                    onClick={() => changeContent(experience, titleRefs.current[i])}
                    ref={(el) => {
                      titleRefs.current[i] = el;
                    }}
                  >
                    {experience.title}
                  </h4>
                }
              >
                <div className="body exp-body">
                  {experience.productName && <p className="our-product">{t('experience.ourProduct')}</p>}

                  {experience.productName && (
                    <a href={experience.productUrl} target="_blank">
                      <div className="h6 pointer product-name">{experience.productName}</div>
                    </a>
                  )}

                  <div className="mobile" dangerouslySetInnerHTML={{ __html: experience.description || '' }} />
                </div>
              </Accordion>
            ))}
          </div>

          <div ref={contentRef} className="desktop">
            <div
              className={`tab-content${fadeOut ? ' fade-out' : ''}`}
              style={{ marginTop: contentTopPosition }}
              dangerouslySetInnerHTML={{ __html: active?.description || '' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
