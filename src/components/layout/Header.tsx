'use client';

import { useEffect, useRef, useState } from 'react';
import { isMobileMenu, toggleMobileMenu, useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n-client';
import { getScrollTop } from '@/lib/hooks';
import TLink from '@/components/shared/TLink';
import HamburgerIcon from './HamburgerIcon';

const SCROLL_BREAKPOINT = 300;

export default function Header() {
  const t = useT();
  const navRef = useRef<HTMLElement>(null);
  const currentPosition = useRef<number>(NaN);

  const [showMenu, setShowMenu] = useState(true);
  const [mobileMenuHeight, setMobileMenuHeight] = useState<number | undefined>(undefined);

  const mobileMenuOpened = useAppStore((s) => s.mobileMenuOpened);
  const animationCompleted = useAppStore((s) => s.animationCompleted);
  const fragment = useAppStore((s) => s.fragment);

  // @HostListener('window:scroll')
  useEffect(() => {
    const onScroll = () => {
      const e = getScrollTop();
      const prev = currentPosition.current;

      setShowMenu(e < prev || (e > prev && e < SCROLL_BREAKPOINT));
      currentPosition.current = e;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    if (!isMobileMenu()) {
      return;
    }

    if (useAppStore.getState().mobileMenuOpened && navRef.current) {
      setMobileMenuHeight(navRef.current.offsetHeight);
    }

    toggleMobileMenu();
  };

  const classes = [
    'dv-header',
    mobileMenuOpened ? 'open-mobile' : '',
    !showMenu || !animationCompleted ? 'slide-up' : '',
    animationCompleted ? 'black' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <div className="container">
        <TLink href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/logo.svg"
            className={`logo blink pointer${!mobileMenuOpened ? ' animate' : ''}`}
            alt="Datavallis logo"
          />
        </TLink>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="toggle-menu">
          <HamburgerIcon />
        </button>

        <div className="menu">
          <nav ref={navRef} style={mobileMenuHeight !== undefined ? { minHeight: mobileMenuHeight } : undefined}>
            <TLink onClick={toggleMenu} href="/" fragment="about" className={fragment === 'about' ? 'green-f' : undefined}>
              {t('menu.about')}
            </TLink>
            <TLink
              onClick={toggleMenu}
              href="/"
              fragment="services"
              className={fragment === 'services' ? 'green-f' : undefined}
            >
              {t('menu.services')}
            </TLink>
            <TLink
              onClick={toggleMenu}
              href="/"
              fragment="products"
              className={fragment === 'products' ? 'green-f' : undefined}
            >
              {t('menu.products')}
            </TLink>
            <TLink onClick={toggleMenu} href="/experience" activeClassName="green-f">
              {t('menu.experience')}
            </TLink>
            <TLink onClick={toggleMenu} href="/our-company" activeClassName="green-f">
              {t('menu.team')}
            </TLink>
            <TLink href="/careers" onClick={toggleMenu} activeClassName="green-f">
              {t('menu.careers')}
            </TLink>
            <a
              className="davidtacer-link"
              onClick={toggleMenu}
              href="https://www.davidtacer.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('menu.davidtacer')}
            </a>
          </nav>
          <div className="cta" onClick={toggleMenu}>
            <TLink href="/contact" activeClassName="green-f">
              {t('menu.cta.contact')}
            </TLink>
          </div>
        </div>
      </div>
    </header>
  );
}
