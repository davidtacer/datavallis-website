'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

enum CursorState {
  Default = 1,
  Pointer = 2,
  BackgroundReveal = 3,
}

const CURSOR_OPTIONS = {
  default: { size: 8, borderWidth: 0, center: 8 },
  pointer: { size: 8, borderWidth: 2, center: 8 },
  backgroundReveal: { size: 224, borderWidth: 4, center: 0 },
};

type CursorSize = (typeof CURSOR_OPTIONS)['default'];

/**
 * Port of CursorComponent
 */
export default function Cursor() {
  const [state, setState] = useState<CursorState>(CursorState.Default);
  const [cursorSize, setCursorSize] = useState<CursorSize>(CURSOR_OPTIONS.default);
  const [left, setLeft] = useState<number | undefined>(undefined);
  const [top, setTop] = useState<number | undefined>(undefined);
  const [background, setBackground] = useState<CSSProperties>({});
  const [overField, setOverField] = useState(false);
  const stateRef = useRef(state);

  stateRef.current = state;

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const $tree = e.composedPath() as HTMLElement[];
      const $target = e.target as HTMLElement;
      const POINTER_EL = ['a', 'button'];
      const POINTER_CLASS = 'pointer';
      const REVEAL_CLASS = 'bg-reveal';

      const $img = $tree?.find((el) => el.classList?.contains(REVEAL_CLASS));

      let src = '';

      // native text cursor over form fields
      const tag = $target.tagName?.toLowerCase();
      setOverField(tag === 'input' || tag === 'textarea' || tag === 'select');

      if (
        POINTER_EL.includes($target.tagName?.toLowerCase()) ||
        $target.classList?.contains(POINTER_CLASS)
      ) {
        setState(CursorState.Pointer);
        setCursorSize(CURSOR_OPTIONS.pointer);
      } else if ($img) {
        setState(CursorState.BackgroundReveal);
        setCursorSize(CURSOR_OPTIONS.backgroundReveal);

        src = $img?.getAttribute('src') || '';
      } else if (!$tree?.find((el) => el.classList?.contains('dv-cursor'))) {
        setState(CursorState.Default);
        setCursorSize(CURSOR_OPTIONS.default);
      }

      let size = 3;
      const rect = $img?.getBoundingClientRect();

      if (rect) {
        size = 0;

        setBackground({
          backgroundImage: src ? `url(${src})` : 'none',
          backgroundSize: `${rect.width}px ${rect.height}px`,
          backgroundPosition: `${rect.x - e.x}px ${rect.y - e.y}px`,
        });
      }

      setLeft(e.x + size);
      setTop(e.y + size);
    };

    const onScroll = () => {
      if (stateRef.current === CursorState.BackgroundReveal) {
        setState(CursorState.Default);
        setCursorSize(CURSOR_OPTIONS.default);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const classes = [
    'dv-cursor',
    left === undefined || overField ? 'hide' : '',
    state === CursorState.Pointer ? 'state2' : '',
    state === CursorState.BackgroundReveal ? 'state3' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{
        ...background,
        left,
        top,
        width: cursorSize.size,
        height: cursorSize.size,
        borderWidth: cursorSize.borderWidth,
      }}
    >
      <div className="ball" style={{ width: cursorSize.center, height: cursorSize.center }}></div>
    </div>
  );
}
