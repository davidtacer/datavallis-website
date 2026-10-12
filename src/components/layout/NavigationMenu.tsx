'use client';

import { RefObject, useEffect, useState } from 'react';
import { HOME_PAGE_FRAGMENTS } from '@/lib/data/fragments';
import { useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n-client';
import { getScrollTop } from '@/lib/hooks';
import { scrollToPosition } from '@/lib/utils';
import TLink from '@/components/shared/TLink';

const TRACK_HEIGHT = 380;

/**
 * Port of NavigationMenuComponent (vertical fragment label + custom scroll bar on the left side)
 */
export default function NavigationMenu({ viewRef }: { viewRef: RefObject<HTMLDivElement | null> }) {
  const t = useT();
  const fragments = HOME_PAGE_FRAGMENTS;

  const [top, setTop] = useState<number | undefined>(undefined);
  const [translate, setTranslate] = useState<number | undefined>(undefined);
  const [showScrollBar, setShowScrollBar] = useState(true);

  const animationCompleted = useAppStore((s) => s.animationCompleted);

  // @HostListener('window:scroll')
  useEffect(() => {
    const onScroll = () => {
      const view = viewRef.current;

      if (!view) {
        return;
      }

      const perc = (getScrollTop() * 100) / view.scrollHeight;
      setTop((TRACK_HEIGHT * perc) / 100);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [viewRef]);

  // menuService.fragment$ subscription
  useEffect(() => {
    return useAppStore.subscribe((state, prev) => {
      if (state.fragment === prev.fragment) {
        return;
      }

      fragments.forEach((fragment, index) => {
        if (fragment.hash === state.fragment) {
          setTranslate(-15 * index);
        }
      });
    });
  }, [fragments]);

  // pageLoaderService.activeRoute$ subscription (BehaviorSubject - emits current value immediately)
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const onRoute = (newRoute: string | undefined) => {
      setShowScrollBar(newRoute === '/');

      if (newRoute === '/article') {
        timeouts.push(setTimeout(() => setTranslate(10), 500));
      } else if (newRoute !== '/') {
        timeouts.push(setTimeout(() => setTranslate(-5), 500));
      }
    };

    const current = useAppStore.getState().activeRoute;
    if (current !== undefined) {
      onRoute(current);
    }

    const unsubscribe = useAppStore.subscribe((state, prev) => {
      if (state.activeRoute !== prev.activeRoute && state.activeRoute !== undefined) {
        onRoute(state.activeRoute);
      }
    });

    return () => {
      unsubscribe();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const toTop = () => scrollToPosition([0, 0]);

  return (
    <div className="dv-navigation-menu">
      <div
        className={`side-navigation${showScrollBar ? ' scroll-bar' : ''}${!animationCompleted ? ' slide-out' : ''}`}
      >
        <div className="fragment">
          <div className="wrapper" style={translate !== undefined ? { transform: `translateY(${translate}px)` } : undefined}>
            {fragments.map((fragment, i) => (
              <label key={i}>
                {!fragment.route ? t(fragment.label) : <TLink href={fragment.route}>{t(fragment.label)}</TLink>}
              </label>
            ))}
          </div>
        </div>

        <div className="custom-scroll-bar">
          <div className="thumb" style={top !== undefined ? { transform: `translateY(${top}px)` } : undefined}></div>
          <div className="track"></div>
        </div>

        <label className="top">
          <div onClick={toTop} className="pointer">
            TO TOP
          </div>
        </label>
      </div>
    </div>
  );
}
