'use client';

/**
 * Re-implementation of the Angular routing behaviour:
 *  - CanDeactivateGuard2 delays every guarded navigation by OVERLAY_ANIMATION_DURATION (700ms)
 *    while the black page overlay slides up and the content collapses.
 *  - Guards only run when Angular would run them (top level route change, or entering a news article).
 *  - Navigating to the same URL is ignored (onSameUrlNavigation: 'ignore').
 *  - Fragment-only navigation on the same page does not run the guard; the home page reacts to it.
 */
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { OVERLAY_ANIMATION_DURATION } from './constants';
import { runRouteGuard, useAppStore } from './store';

export const FRAGMENT_EVENT = 'dv:fragment';

type NavigationState = {
  pending: boolean; // a guarded navigation is waiting for the new route to render
  skipGuardFor: string | null; // pathname of a navigation that must not run the guard
  failsafe: ReturnType<typeof setTimeout> | null;
  activationAt: number; // when a back/forward navigation would have been activated by the Angular router
};

export const navigationState: NavigationState = {
  pending: false,
  skipGuardFor: null,
  failsafe: null,
  activationAt: 0,
};

/**
 * On browser back/forward Next.js renders the new page immediately, while Angular activated it only after
 * the guard's 700ms delay. Page timers add this remaining delay to stay in sync with the original.
 */
export const activationDelay = (): number => Math.max(0, navigationState.activationAt - Date.now());

const firstSegment = (path: string): string => path.split('/').filter(Boolean)[0] || '';
const isNewsArticle = (path: string): boolean => /^\/news\/[^/]+\/[^/]+\/?$/.test(path);

/** Would Angular run CanDeactivateGuard2 for this navigation? */
export function shouldRunGuard(from: string, to: string): boolean {
  if (from === to) {
    return false;
  }

  return firstSegment(from) !== firstSegment(to) || isNewsArticle(to);
}

/** Show the overlay for a guarded navigation; it is hidden once the new route has rendered (see Layout). */
function startGuardedNavigation(): void {
  const { loaded } = useAppStore.getState();

  if (!loaded) {
    // page is yet to be loaded - just let the intro finish
    runRouteGuard();
  } else {
    useAppStore.setState({ showPageOverlay: true });
    setTimeout(() => useAppStore.setState({ animateContent: true }), 5);
  }

  navigationState.pending = true;
}

export function finishGuardedNavigation(): void {
  navigationState.pending = false;

  if (navigationState.failsafe) {
    clearTimeout(navigationState.failsafe);
    navigationState.failsafe = null;
  }

  useAppStore.setState({ showPageOverlay: false, animateContent: false });
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);

      if (target.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }

      const path = target.pathname;
      const url = path + target.search + target.hash;
      const currentPath = window.location.pathname;
      const current = currentPath + window.location.search + window.location.hash;

      // onSameUrlNavigation: 'ignore'
      if (url === current || navigationState.pending) {
        return;
      }

      // same page, different fragment
      if (path === currentPath) {
        window.history.pushState(null, '', url);
        window.dispatchEvent(new CustomEvent(FRAGMENT_EVENT, { detail: target.hash.replace('#', '') || null }));
        return;
      }

      if (!shouldRunGuard(currentPath, path)) {
        navigationState.skipGuardFor = path;
        router.push(url, { scroll: false });
        return;
      }

      startGuardedNavigation();

      setTimeout(() => {
        router.push(url, { scroll: false });

        // never leave the overlay hanging if the navigation fails
        navigationState.failsafe = setTimeout(finishGuardedNavigation, 5000);
      }, OVERLAY_ANIMATION_DURATION);
    },
    [router]
  );
}
