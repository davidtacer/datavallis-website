import ContactPage from '@/components/pages/ContactPage';
import { seo } from '@/lib/seo';

export const metadata = seo('contact.seo.title', 'contact.seo.description');

export default function Page() {
  return <ContactPage />;
}
