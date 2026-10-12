/** shared/utils/string.helpers.ts */
export const stripHTML = (HTML: string): string => {
  return HTML.replace(/<[^>]*>?/gm, '')
    .replace('&nbsp;', '')
    .replace('&ldquo;', '"')
    .replace('&rdquo;', '"');
};

/** Angular ViewportScroller.scrollToAnchor */
export function scrollToAnchor(anchor: string): void {
  const el = document.getElementById(anchor) || document.getElementsByName(anchor)[0];

  if (el) {
    const rect = el.getBoundingClientRect();
    window.scrollTo(rect.left + window.pageXOffset, rect.top + window.pageYOffset);
  }
}

/** Angular ViewportScroller.scrollToPosition */
export function scrollToPosition([x, y]: [number, number]): void {
  window.scrollTo(x, y);
}
