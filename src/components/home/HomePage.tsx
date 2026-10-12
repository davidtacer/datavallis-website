'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppStore, getDelay, setFragment } from '@/lib/store';
import { useActivated, useViewportNotifier } from '@/lib/hooks';
import { FRAGMENT_EVENT, activationDelay } from '@/lib/navigation';
import { OVERLAY_ANIMATION_DURATION } from '@/lib/constants';
import { scrollToAnchor, scrollToPosition } from '@/lib/utils';
import { useT } from '@/lib/i18n-client';
import Title from '@/components/shared/Title';
import TLink from '@/components/shared/TLink';
import DvLink from '@/components/shared/DvLink';
import About from './About';
import Services from './Services';
import Products from './Products';
import Technologies from './Technologies';
import Experiences from './Experiences';
import ContactCta from './ContactCta';

/**
 * Port of HomePageComponent
 */
export default function HomePage() {
  const t = useT();
  const activated = useActivated();
  const [switchFragments, setSwitchFragments] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLImageElement>(null);

  const changeFragment = (fragment: string) => setFragment(fragment);

  useViewportNotifier(titleRef, () => changeFragment(''), undefined, 0.5);
  useViewportNotifier(codeRef, () => changeFragment('smartContract'));

  // this.route.fragment.subscribe(...)
  useEffect(() => {
    if (!activated) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const handleFragment = (fragment: string | null) => {
      if (fragment) {
        setSwitchFragments(true);

        const delay = !useAppStore.getState().loaded ? getDelay() + 10 : OVERLAY_ANIMATION_DURATION - 200;

        timeouts.push(
          setTimeout(() => {
            setSwitchFragments(false);
            scrollToAnchor(fragment);
          }, delay)
        );
      } else {
        scrollToPosition([0, 0]);
      }
    };

    const initialFragment = window.location.hash.replace('#', '') || null;
    const delay = activationDelay();

    if (delay) {
      timeouts.push(setTimeout(() => handleFragment(initialFragment), delay));
    } else {
      handleFragment(initialFragment);
    }

    const onFragment = (e: Event) => handleFragment((e as CustomEvent<string | null>).detail);
    const onPopState = () => {
      if (window.location.pathname === '/') {
        handleFragment(window.location.hash.replace('#', '') || null);
      }
    };

    window.addEventListener(FRAGMENT_EVENT, onFragment);
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener(FRAGMENT_EVENT, onFragment);
      window.removeEventListener('popstate', onPopState);
      timeouts.forEach(clearTimeout);
    };
  }, [activated]);

  // ngOnDestroy
  useEffect(() => {
    return () => setFragment(null);
  }, []);

  return (
    <div className="dv-home-page">
      <Title title={t('home.title')} ref={titleRef}>
        <div className="dv-home-hero">
          <p className="h6">{t('home.subtitle')}</p>
          <div className="ctas">
            <TLink className="cta-primary" href="/contact">
              {t('home.ctaPrimary')}
            </TLink>
            <DvLink route="/#products" textKey="home.ctaSecondary" open />
          </div>
        </div>
      </Title>

      <About onEnter={() => changeFragment('about')} />
      <div className="line"></div>
      <Services onEnter={() => changeFragment('services')} />
      <div className="line"></div>
      <Products onEnter={() => changeFragment('products')} />
      <div className="line"></div>
      <Technologies onEnter={() => changeFragment('technologies')} />

      <div className="line"></div>
      <Experiences onEnter={() => changeFragment('experience')} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={codeRef}
        src="/assets/images/code-snippet.png"
        width={1261}
        height={463}
        className="bg-reveal"
        alt="Smart contract"
      />

      <div className="line"></div>
      <ContactCta />

      <div className={`side-overlay${switchFragments ? ' animate' : ''}`}></div>
    </div>
  );
}
