'use client';

import { useLayoutEffect, useState } from 'react';
import { isMobileDevice } from '@/lib/hooks';

type Props = {
  open?: boolean;
  disable?: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * Port of AccordionComponent
 * - on desktop the `open` input drives the state (and header clicks are ignored when `disable` is set)
 * - on mobile the header toggles it
 */
export default function Accordion({ open, disable, header, children, onClick, className }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // initial value of the input (before first paint, so there is no opening transition)
  useLayoutEffect(() => {
    if (open !== undefined && !isMobileDevice()) {
      setIsOpened(!!open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @Input() set open(open) - applied synchronously, in the same render as the input change
  if (open !== prevOpen) {
    setPrevOpen(open);

    if (!isMobileDevice()) {
      setIsOpened(!!open);
    }
  }

  const toggle = () => {
    if (disable && !isMobileDevice()) {
      return;
    }

    setIsOpened((v) => !v);
  };

  return (
    <div className={`dv-accordion${className ? ' ' + className : ''}`} onClick={onClick}>
      <div className={`acc-header${isOpened ? ' highlight' : ''}`} onClick={toggle}>
        {header}
      </div>
      <div className={`acc-body${isOpened ? ' open' : ''}`}>{children}</div>
    </div>
  );
}
