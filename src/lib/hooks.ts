'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { useAppStore } from './store';

/**
 * Port of EnterTheViewportNotifierDirective (IntersectionObserver, default threshold 0.25)
 */
export function useViewportNotifier(
  ref: RefObject<Element | null>,
  onEnter?: () => void,
  onLeave?: () => void,
  threshold: number = 0.25
): void {
  const enterRef = useRef(onEnter);
  const leaveRef = useRef(onLeave);

  enterRef.current = onEnter;
  leaveRef.current = onLeave;

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enterRef.current?.();
          } else {
            leaveRef.current?.();
          }
        });
      },
      { root: null, rootMargin: '0px', threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, threshold]);
}

/**
 * Angular creates page components only once the (delayed) initial navigation is complete.
 * Effects that depend on that moment (timers, measurements) wait for this flag.
 */
export function useActivated(): boolean {
  return useAppStore((s) => s.booted);
}

/** `window.innerWidth` that updates on resize; undefined on the server / before mount */
export function useWindowWidth(): number | undefined {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);

    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}

/** DeviceService.isMobile - evaluated once (as in the Angular service) */
let deviceIsMobile: boolean | undefined;

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (deviceIsMobile === undefined) {
    deviceIsMobile = window.innerWidth <= 768;
  }

  return deviceIsMobile;
}

/** document.scrollingElement.scrollTop */
export const getScrollTop = (): number =>
  (document.scrollingElement || document.documentElement).scrollTop;
