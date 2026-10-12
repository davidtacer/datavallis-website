import ContactPage from '@/components/pages/ContactPage';
import { seo } from '@/lib/seo';
import { JsonLd, pageJsonLd } from '@/lib/jsonld';

export const metadata = seo('contact.seo.title', 'contact.seo.description', '/contact', 'contact');

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd('ContactPage', '/contact', 'Contact Data Vallis')} />
      <ContactPage />
    </>
  );
}
