'use client';

import { useEffect, useState } from 'react';
import { getDelay, useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n-client';
import TLink from '@/components/shared/TLink';

export default function CookiesMsg() {
  const t = useT();
  const [show, setShow] = useState(false);
  const animationCompleted = useAppStore((s) => s.animationCompleted);
  const booted = useAppStore((s) => s.booted);

  useEffect(() => {
    if (!booted) {
      return;
    }

    const timeout = setTimeout(() => {
      let accepted: string | null = null;
      try {
        accepted = localStorage.getItem('cookies');
      } catch {
        /* storage not available */
      }
      setShow(!accepted);
    }, getDelay() + 2000);

    return () => clearTimeout(timeout);
  }, [booted]);

  const agreeToTerms = () => {
    try {
      localStorage.setItem('cookies', new Date().toDateString());
    } catch {
      /* storage not available */
    }

    setShow(false);
  };

  if (!animationCompleted) {
    return null;
  }

  return (
    <div className={`dv-cookies-msg${show ? ' show' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/icons/plus.svg" onClick={() => setShow(false)} className="pointer" alt="plus icon" />

      <p>{t('cookiesMsg')}</p>
      <button onClick={agreeToTerms} aria-label="accept cookies">
        {t('actions.accept')}
      </button>

      <TLink href="/cookies">Check cookies</TLink>
    </div>
  );
}
