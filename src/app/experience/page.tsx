import ExperiencePage from '@/components/pages/ExperiencePage';
import { seo } from '@/lib/seo';

export const metadata = seo('experience.seo.title', 'experience.seo.description', '/experience', 'experience');

export default function Page() {
  return <ExperiencePage />;
}
