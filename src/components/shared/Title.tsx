'use client';

import { forwardRef, useEffect, useState } from 'react';
import { DEFAULT_BACKGROUND, BACKGROUND_ANIMATION_DURATION } from '@/lib/constants';
import { useAppStore } from '@/lib/store';
import { useActivated } from '@/lib/hooks';
import { activationDelay } from '@/lib/navigation';

export enum TitleSize {
  H2,
  H3,
}

const ANIMATION_DELAY = 500;

type Props = {
  title: string;
  size?: TitleSize;
  background?: string;
  children?: React.ReactNode;
};

/**
 * Port of TitleComponent (full-height page title that slides in)
 */
const Title = forwardRef<HTMLDivElement, Props>(function Title(
  { title, size = TitleSize.H2, background = DEFAULT_BACKGROUND, children },
  ref
) {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [slideIn, setSlideIn] = useState(false);
  const activated = useActivated();

  useEffect(() => {
    if (!activated) {
      return;
    }

    const timeout = useAppStore.getState().loaded ? ANIMATION_DELAY : BACKGROUND_ANIMATION_DURATION;
    const id = setTimeout(() => setSlideIn(true), timeout + activationDelay());

    return () => clearTimeout(id);
  }, [activated]);

  // @HostListener('window:scroll')
  useEffect(() => {
    const onScroll = () => {
      const verticalOffset =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      setScrolledToTop(verticalOffset === 0);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="dv-title" ref={ref}>
      <div className={`content p-l title-content${slideIn ? ' slide-in' : ''}`}>
        {size === TitleSize.H2 && <h2 dangerouslySetInnerHTML={{ __html: title }} />}
        {size === TitleSize.H3 && <h3 dangerouslySetInnerHTML={{ __html: title }} />}
        <div className="image-wrapper">
          <div className="cursor-block"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={background} className={scrolledToTop ? 'bg-reveal' : undefined} alt="valey" />
        </div>

        <div className="custom-content">{children}</div>
      </div>
    </div>
  );
});

export default Title;
