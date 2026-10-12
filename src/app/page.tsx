import HomePage from '@/components/home/HomePage';
import { JsonLd, productsJsonLd } from '@/lib/jsonld';
import { seo } from '@/lib/seo';

export const metadata = seo('seo.title', 'seo.description', '/', 'default');

export default function Page() {
  return (
    <>
      <JsonLd data={productsJsonLd()} />
      <HomePage />
    </>
  );
}
