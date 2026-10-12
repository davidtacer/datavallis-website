import ExperiencePage from '@/components/pages/ExperiencePage';
import { EXPERIENCES } from '@/lib/data/experiences';
import { seo } from '@/lib/seo';

export const metadata = seo('experience.seo.title', 'experience.seo.description');

export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExperiencePage slug={slug} key={slug} />;
}
