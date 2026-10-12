import HomePage from '@/components/home/HomePage';
import { seo } from '@/lib/seo';

export const metadata = seo();

export default function Page() {
  return <HomePage />;
}
