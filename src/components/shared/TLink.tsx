'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, MouseEvent, forwardRef } from 'react';
import { useNavigate } from '@/lib/navigation';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** routerLink */
  href: string;
  /** routerLink `fragment` */
  fragment?: string;
  /** routerLinkActive (non exact, like Angular's default) */
  activeClassName?: string;
};

/**
 * `<a routerLink>` replacement. Uses next/link for prefetching, but runs the navigation through
 * the transition logic (page overlay + 700ms delay) of the original Angular route guard.
 */
const TLink = forwardRef<HTMLAnchorElement, Props>(function TLink(
  { href, fragment, activeClassName, className, onClick, children, target, ...rest },
  ref
) {
  const navigate = useNavigate();
  const pathname = usePathname();
  const url = fragment ? `${href}#${fragment}` : href;

  const isActive =
    !!activeClassName && (pathname === href || (href !== '/' && pathname.startsWith(href.replace(/\/$/, '') + '/')));

  const classes = [className, isActive ? activeClassName : null].filter(Boolean).join(' ') || undefined;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    if (target && target !== '_self') {
      return;
    }

    e.preventDefault();
    navigate(url);
  };

  return (
    <Link ref={ref} href={url} scroll={false} className={classes} onClick={handleClick} target={target} {...rest}>
      {children}
    </Link>
  );
});

export default TLink;
