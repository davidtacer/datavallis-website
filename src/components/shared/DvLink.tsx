'use client';

import { useT } from '@/lib/i18n-client';
import TLink from './TLink';

type Props = {
  route?: string;
  external?: string;
  newTab?: boolean;
  textKey?: string;
  onClick?: () => void;
  /** always show the text (not only on hover) */
  open?: boolean;
};

/**
 * Port of LinkComponent (uppercase text link with animated arrow)
 */
export default function DvLink({ route, external, newTab, textKey = 'actions.seeMore', onClick, open }: Props) {
  const t = useT();
  const target = newTab ? '_blank' : '_self';

  return (
    <div className={`dv-link${open ? ' open' : ''}`} onClick={onClick}>
      <div className="link-wrapper">
        {route && (
          <TLink href={route} target={target}>
            {t(textKey)}
          </TLink>
        )}
        {external && (
          <a href={external} target={target}>
            {t(textKey)}
          </a>
        )}
        {!external && !route && <a>{t(textKey)}</a>}

        <div className="arrow">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/arrow.svg" className="long" alt="arrow" />
        </div>
      </div>
    </div>
  );
}
