'use client';

import { useEffect, useRef } from 'react';
import { initAnimation, useAppStore } from '@/lib/store';

/**
 * Port of BackgroundComponent (ng-lottie with /assets/landscape-smaller.json)
 */
export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  const loaded = useAppStore((s) => s.loaded);
  const activeRoute = useAppStore((s) => s.activeRoute);
  const animationCompleted = useAppStore((s) => s.animationCompleted);
  const changingBackground = useAppStore((s) => s.changingBackground);
  const backgroundSrc = useAppStore((s) => s.backgroundSrc);
  const isFirefox = useAppStore((s) => s.isFirefox);
  const booted = useAppStore((s) => s.booted);

  useEffect(() => {
    if (!booted || !containerRef.current) {
      return;
    }

    let destroyed = false;
    let animation: import('lottie-web').AnimationItem | null = null;

    import('lottie-web').then(({ default: lottie }) => {
      if (destroyed || !containerRef.current) {
        return;
      }

      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/assets/landscape-smaller.json',
      });

      animation.addEventListener('complete', () => useAppStore.setState({ animationCompleted: true }));

      // (animationCreated)="backgroundService.initAnimation($event)"
      initAnimation(animation);
    });

    return () => {
      destroyed = true;
      animation?.destroy();
    };
  }, [booted]);

  const classes = ['dv-background', !loaded ? 'load-animation' : '', activeRoute !== '/' ? 'grey' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="overlay"></div>
      <div
        className={`lottie${isFirefox ? ' firefox' : ''}${animationCompleted ? ' fade-out' : ''}`}
      >
        <div ref={containerRef} style={{ height: '100%' }}></div>
      </div>
      <div className={`firefox-mock${animationCompleted ? ' show' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundSrc}
          height={1224}
          width={2186}
          alt="Valey"
          className={changingBackground ? 'fade-out' : undefined}
        />
      </div>
    </div>
  );
}
