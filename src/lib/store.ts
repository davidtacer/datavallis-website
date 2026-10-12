'use client';

/**
 * Port of the Angular layout services:
 *  - PageLoaderService  (loaded, showPageOverlay, animateContent, activeRoute)
 *  - BackgroundService  (animationCompleted, showView, changingBackground, backgroundSrc)
 *  - MenuService        (mobileMenuOpened, fragment)
 *  - NewsService.categories
 */
import { create } from 'zustand';
import type { AnimationItem } from 'lottie-web';
import type { Category } from './models';
import {
  BACKGROUND_ANIMATION_DURATION,
  BACKGROUND_CHANGE_DURATION,
  DEFAULT_BACKGROUND,
  MOBILE_BREAKPOINT,
  OVERLAY_ANIMATION_DURATION,
} from './constants';

export interface AppState {
  // PageLoaderService
  loaded: boolean;
  showPageOverlay: boolean;
  animateContent: boolean;
  activeRoute: string | undefined;

  // BackgroundService
  isFirefox: boolean;
  animationCompleted: boolean;
  showView: boolean;
  changingBackground: boolean;
  backgroundSrc: string;

  // App bootstrap: Angular blocks bootstrap until the (delayed) initial navigation completes
  booted: boolean;

  // MenuService
  mobileMenuOpened: boolean;
  fragment: string | null;

  // NewsService
  categories: Category[];
}

export const useAppStore = create<AppState>(() => ({
  loaded: false,
  showPageOverlay: false,
  animateContent: false,
  activeRoute: undefined,

  isFirefox: false,
  animationCompleted: false,
  showView: false,
  changingBackground: false,
  backgroundSrc: DEFAULT_BACKGROUND,

  booted: false,

  mobileMenuOpened: false,
  fragment: null,

  categories: [],
}));

const set = useAppStore.setState;
const get = useAppStore.getState;

/** BackgroundService._DELAY */
export const getDelay = (): number => (get().isFirefox ? 1000 : BACKGROUND_ANIMATION_DURATION);

/**
 * PageLoaderService.animateLayout
 * @param animateOverlay tells if overlay should be animated (default: true)
 */
export function animateLayout(animateOverlay: boolean = true): void {
  set({ showPageOverlay: animateOverlay });

  setTimeout(() => set({ animateContent: true }), 5);

  setTimeout(
    () => set({ showPageOverlay: false, animateContent: false }),
    animateOverlay ? OVERLAY_ANIMATION_DURATION : 10
  );
}

/**
 * CanDeactivateGuard2.canActivate (without the returned delay, which is handled by the caller)
 * a) if page is yet to be loaded, leave it enough time to fire animation
 * b) if user change the route, animate overlay
 */
export function runRouteGuard(): void {
  if (!get().loaded) {
    setTimeout(() => {
      set({ loaded: true });
      animateLayout(false);
    }, getDelay());
  } else {
    animateLayout();
  }
}

/** BackgroundService.changeBackground */
export function changeBackground(src: string): void {
  set({ changingBackground: true });

  setTimeout(() => {
    set({ backgroundSrc: src, changingBackground: false });
  }, BACKGROUND_CHANGE_DURATION);
}

/** BackgroundService.initAnimation */
export function initAnimation(animationItem: AnimationItem | null): void {
  setTimeout(() => animationItem?.play(), 500);
  setTimeout(() => set({ showView: true }), 100);
}

/** MenuService.mobileMenu */
export const isMobileMenu = (): boolean => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;

/** MenuService.toggleMobileMenu */
export function toggleMobileMenu(newState: boolean = !get().mobileMenuOpened): void {
  if (!isMobileMenu()) {
    return;
  }

  set({ mobileMenuOpened: newState });
}

/** MenuService.fragment$.next */
export function setFragment(fragment: string | null): void {
  set({ fragment });
}

export function setActiveRoute(route: string): void {
  set({ activeRoute: route });
}
