import { pageMetadata } from '@/lib/seo';
import { translate } from '@/lib/i18n';

// the news section is currently hidden from the navigation -> keep it out of search results
export const metadata = pageMetadata({
  title: 'News | DATA VALLIS',
  description: translate('seo.description'),
  path: '/news/all',
  noindex: true,
});

// The list itself is rendered by NewsShell (app/news/layout.tsx) so that it stays mounted
// while switching between categories - like the reused Angular NewsPageComponent.
export default function Page() {
  return null;
}
