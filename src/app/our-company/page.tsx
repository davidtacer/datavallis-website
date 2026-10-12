import TeamPage from '@/components/pages/TeamPage';
import { seo } from '@/lib/seo';
import { JsonLd, pageJsonLd } from '@/lib/jsonld';

export const metadata = seo('team.seo.title', 'team.seo.description', '/our-company', 'our-company');

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd('AboutPage', '/our-company', 'About Data Vallis')} />
      <TeamPage />
    </>
  );
}
