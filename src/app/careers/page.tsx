import CareersPage from '@/components/pages/CareersPage';
import { seo } from '@/lib/seo';

export const metadata = seo('careers.seo.title', 'careers.seo.description', '/careers', 'careers');

export default function Page() {
  return <CareersPage />;
}
