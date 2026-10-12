import TeamPage from '@/components/pages/TeamPage';
import { seo } from '@/lib/seo';

export const metadata = seo('team.seo.title', 'team.seo.description');

export default function Page() {
  return <TeamPage />;
}
