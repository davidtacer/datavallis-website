import NotFoundPage from '@/components/pages/NotFoundPage';
import { seo } from '@/lib/seo';

export const metadata = seo();

export default function NotFound() {
  return <NotFoundPage />;
}
