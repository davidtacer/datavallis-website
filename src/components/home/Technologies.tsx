'use client';

import { useEffect, useRef } from 'react';
import { useViewportNotifier } from '@/lib/hooks';
import { TECHNOLOGIES } from '@/lib/data/technologies';

const slideConfig = { slidesToShow: 1, dots: false, slidesToScroll: 4, variableWidth: true, arrows: false };

/**
 * Port of TechnologiesComponent. Uses the same jQuery slick-carousel that ngx-slick-carousel wraps,
 * so the carousel behaves exactly like the original.
 */
export default function Technologies({ onEnter }: { onEnter?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useViewportNotifier(ref, onEnter);

  useEffect(() => {
    let destroyed = false;
    let $carousel: any = null;

    (async () => {
      const { default: $ } = await import('jquery');
      (window as any).jQuery = (window as any).$ = $;
      // @ts-expect-error - slick-carousel has no type declarations
      await import('slick-carousel');

      if (destroyed || !carouselRef.current) {
        return;
      }

      $carousel = ($(carouselRef.current) as any).slick(slideConfig);
    })();

    return () => {
      destroyed = true;

      if ($carousel?.hasClass('slick-initialized')) {
        $carousel.slick('unslick');
      }
    };
  }, []);

  return (
    <div className="dv-technologies" ref={ref}>
      <div className="">
        <div className="tech-wrapper">
          <div className="carousel" ref={carouselRef}>
            {TECHNOLOGIES.map((technology) => (
              <div className="item" key={technology.name}>
                <div className="h4">{technology.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
