'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { getDelay, useAppStore } from '@/lib/store';
import { getScrollTop, useActivated } from '@/lib/hooks';

type Props = {
  title: string;
  content: RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Port of VerticalTitleComponent (outlined, rotated title that moves while scrolling)
 */
export default function VerticalTitle({ title, content, className, style }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heightRef = useRef(0);

  const [height, setHeight] = useState(0);
  const [transform, setTransform] = useState<string | undefined>(undefined);

  const activated = useActivated();

  heightRef.current = height;

  // ngAfterViewInit -> getProperties()
  useEffect(() => {
    if (!activated) {
      return;
    }

    const delay = useAppStore.getState().animationCompleted ? 50 : getDelay();

    const id = setTimeout(() => {
      if (titleRef.current) {
        setHeight(titleRef.current.scrollWidth);
      }
    }, delay + 200);

    return () => clearTimeout(id);
  }, [activated]);

  // @HostListener('window:scroll')
  useEffect(() => {
    const onScroll = () => {
      const contentEl = content.current;
      const titleEl = titleRef.current;

      if (!contentEl || !titleEl) {
        return;
      }

      const scrollTop = getScrollTop();
      const x = scrollTop + window.innerHeight - contentEl.offsetTop;

      if (window.innerWidth <= 768) {
        const startPosition = window.innerHeight - titleEl.offsetHeight;

        if (x > 0) {
          const positionX = -100 + ((x * 100) / startPosition) * 2;

          setTransform(`translateX(${positionX}%)`);
        }

        return;
      }

      if (x > 0) {
        const h = heightRef.current;
        const startPosition = h + window.innerHeight / 2;
        const FACTOR = !h ? 1 : h / contentEl.scrollHeight;

        const positionY = -1 * (startPosition - x * (FACTOR + 1));

        setTransform(`matrix(0, -1, 1, 0, 0, ${positionY})`);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [content]);

  return (
    <div className={`dv-vertical-title${className ? ' ' + className : ''}`} style={style}>
      <div className="vt-wrapper" style={height ? { height } : undefined}>
        <h1 ref={titleRef} style={transform ? { transform } : undefined}>
          {title}
        </h1>
      </div>
    </div>
  );
}
