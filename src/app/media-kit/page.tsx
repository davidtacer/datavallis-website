import MediaKitPage from '@/components/pages/MediaKitPage';

import { pageMetadata } from '@/lib/seo';
import { JsonLd, pageJsonLd } from '@/lib/jsonld';

export const metadata = pageMetadata({
  title: 'Media kit & brand guidelines | DATA VALLIS',
  description:
    'Data Vallis logos, colors, typography, company description and press contact. Download all logo variations in SVG and PNG.',
  path: '/media-kit',
  image: 'media-kit',
});

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd('WebPage', '/media-kit', 'Data Vallis media kit & brand guidelines')} />
      <MediaKitPage />
    </>
  );
}
