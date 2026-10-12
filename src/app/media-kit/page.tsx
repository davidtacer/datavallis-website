import type { Metadata } from 'next';
import MediaKitPage from '@/components/pages/MediaKitPage';

export const metadata: Metadata = {
  title: 'Media kit & brand guidelines | DATA VALLIS',
  description:
    'Data Vallis logos, colors, typography, company description and press contact. Download the media kit with all logo variations in SVG and PNG.',
};

export default function Page() {
  return <MediaKitPage />;
}
