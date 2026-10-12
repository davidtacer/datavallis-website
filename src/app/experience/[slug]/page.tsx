import type { Metadata } from 'next';
import ExperiencePage from '@/components/pages/ExperiencePage';
import { EXPERIENCES } from '@/lib/data/experiences';
import { pageMetadata, seo, truncate } from '@/lib/seo';
import { breadcrumbJsonLd, JsonLd } from '@/lib/jsonld';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);

  if (!experience) {
    return seo('experience.seo.title', 'experience.seo.description', '/experience', 'experience');
  }

  return pageMetadata({
    title: `${experience.linkDescription}: use cases | DATA VALLIS`,
    description: truncate(experience.excerpt),
    path: `/experience/${slug}`,
    image: `experience-${slug}`,
    type: 'article',
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);

  return (
    <>
      {experience && (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Experience', path: '/experience' },
            { name: experience.title, path: `/experience/${slug}` },
          ])}
        />
      )}
      <ExperiencePage slug={slug} key={slug} />
    </>
  );
}
