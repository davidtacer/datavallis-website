'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore, runRouteGuard, setActiveRoute } from '@/lib/store';
import { finishGuardedNavigation, navigationState, shouldRunGuard } from '@/lib/navigation';
import { OVERLAY_ANIMATION_DURATION } from '@/lib/constants';
import { useWindowWidth } from '@/lib/hooks';
import { getCategories } from '@/lib/api';
import { LanguageProvider } from '@/lib/i18n-client';
import Header from './Header';
import Background from './Background';
import Footer from './Footer';
import CookiesMsg from './CookiesMsg';
import Cursor from './Cursor';
import NavigationMenu from './NavigationMenu';

/**
 * Port of AppComponent + LayoutComponent (+ the initial navigation of CanDeactivateGuard2)
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const viewRef = useRef<HTMLDivElement>(null);
  const previousPath = useRef<string | null>(null);

  const mobileMenuOpened = useAppStore((s) => s.mobileMenuOpened);
  const animateContent = useAppStore((s) => s.animateContent);
  const showView = useAppStore((s) => s.showView);
  const showPageOverlay = useAppStore((s) => s.showPageOverlay);
  const backgroundSrc = useAppStore((s) => s.backgroundSrc);
  const animationCompleted = useAppStore((s) => s.animationCompleted);
  const booted = useAppStore((s) => s.booted);

  const windowWidth = useWindowWidth();

  // Initial navigation (router initialNavigation: 'enabledBlocking' + guard)
  useEffect(() => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    useAppStore.setState({ isFirefox });

    if (isFirefox) {
      setTimeout(() => useAppStore.setState({ animationCompleted: true }), 1000);
    }

    runRouteGuard();

    const initialRoute = window.location.pathname;

    setTimeout(() => {
      setActiveRoute(initialRoute);
      useAppStore.setState({ booted: true });
    }, OVERLAY_ANIMATION_DURATION);

    // AppComponent.ngOnInit -> NewsService.updateCategories()
    getCategories()
      .then((categories) => useAppStore.setState({ categories }))
      .catch((err) => console.error(err));
  }, []);

  // Route changes (layout effect: runs before the effects of the newly rendered page)
  useLayoutEffect(() => {
    const from = previousPath.current;
    previousPath.current = pathname;

    if (from === null || from === pathname) {
      return;
    }

    if (navigationState.pending) {
      // guarded navigation started by a link - the new route is rendered, hide the overlay
      finishGuardedNavigation();
      setActiveRoute(pathname);
      return;
    }

    if (navigationState.skipGuardFor === pathname) {
      navigationState.skipGuardFor = null;
      return;
    }

    // browser back / forward
    if (shouldRunGuard(from, pathname)) {
      navigationState.activationAt = Date.now() + OVERLAY_ANIMATION_DURATION;
      runRouteGuard();
      setTimeout(() => setActiveRoute(pathname), OVERLAY_ANIMATION_DURATION);
    }
  }, [pathname]);

  const isDesktop = windowWidth !== undefined && windowWidth > 768;

  return (
    <LanguageProvider>
      <div className="dv-layout">
        <Header />

        <div className={`page blink${!mobileMenuOpened ? ' animate' : ''}`} ref={viewRef}>
          <Background />

          <div className={`view${animateContent ? ' slide-down' : ''}${showView ? '' : ' not-ready'}`}>
            {children}
            <div className="line"></div>
            <Footer />
          </div>
        </div>

        <CookiesMsg />

        <div className={`page-loader${showPageOverlay ? ' show' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backgroundSrc} alt="Valey" height={1224} width={2186} />
        </div>

        {booted && isDesktop && animationCompleted && <Cursor />}
        {booted && isDesktop && <NavigationMenu viewRef={viewRef} />}
      </div>
    </LanguageProvider>
  );
}
