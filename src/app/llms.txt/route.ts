/**
 * /llms.txt - a concise, plain-text overview of Data Vallis for AI assistants and AI search engines
 * (https://llmstxt.org). Generated from the same data as the website.
 */
import { SITE_URL } from '@/lib/constants';
import { PRODUCTS } from '@/lib/data/products';
import { SERVICES } from '@/lib/data/services';
import { EXPERIENCES } from '@/lib/data/experiences';

export const dynamic = 'force-static';

export function GET() {
  const lines = [
    '# Data Vallis',
    '',
    '> Data Vallis (DATA VALLIS d.o.o.) is a Web3 development company from Maribor, Slovenia. It designs and builds smart contracts, decentralized applications (dApps) and decentralized infrastructure for clients, and runs Web3 products of its own: CHERR.IO, PollinationX, W3XShare and the PX dApp.',
    '',
    '- Founder: David Tacer',
    '- Headquarters: Ulica Šercerjeve brigade 5, 2000 Maribor, Slovenia',
    '- Contact: info@datavallis.com',
    '- Website: ' + SITE_URL,
    '- LinkedIn: https://www.linkedin.com/company/data-vallis/',
    '- X: https://x.com/DataVallis',
    '',
    '## Services',
    '',
    ...SERVICES.map((s) => `- **${s.title}** (${s.subtitle}): ${s.description}`),
    '',
    '## Own products',
    '',
    ...PRODUCTS.map((p) => {
      const extra = (p.links || []).map((l) => `${l.label}: ${l.url}`).join('; ');
      return `- [${p.name}](${p.url}) - ${p.title}${p.status ? ` (${p.status})` : ''}. ${p.excerpt}${extra ? ` ${extra}.` : ''}`;
    }),
    '',
    '## Industry experience',
    '',
    ...EXPERIENCES.map((e) => `- [${e.linkDescription}](${SITE_URL}/experience/${e.slug})`),
    '',
    '## Pages',
    '',
    `- [Home](${SITE_URL}/): positioning, services and products`,
    `- [About the company](${SITE_URL}/our-company): meaning of the brand, vision, mission and values`,
    `- [Contact](${SITE_URL}/contact): contact form and email`,
    `- [Careers](${SITE_URL}/careers): open applications`,
    `- [Media kit](${SITE_URL}/media-kit): logos, brand guidelines and company boilerplate`,
    '',
    '## Optional',
    '',
    `- [Legal notice](${SITE_URL}/legal-notice): company registration details`,
    `- [Privacy policy](${SITE_URL}/privacy-policy)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
