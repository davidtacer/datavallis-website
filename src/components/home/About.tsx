'use client';

import { useRef } from 'react';
import { useViewportNotifier } from '@/lib/hooks';
import { useT } from '@/lib/i18n-client';

export default function About({ onEnter }: { onEnter?: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useViewportNotifier(ref, onEnter);

  return (
    <div className="dv-about" id="about" ref={ref}>
      <div className="content flex">
        <h2 className="h3 half p-l">{t('home.aboutUs')}</h2>
        <div className="half p-r">
          <p>
            Data Vallis is a Web3 development company from Maribor, Slovenia. For more than a decade we have been
            turning complex ideas into working software, and today we focus on what we know best: smart contracts,
            decentralized applications and the infrastructure behind them.
          </p>
          <p>
            We don&apos;t just build for clients. We design, launch and run Web3 products of our own, like CHERR.IO,
            PollinationX and the PX dApp, so we know what it takes to get a decentralized product from whiteboard to
            mainnet, and to keep it running once real users arrive.
          </p>
        </div>
      </div>
    </div>
  );
}
