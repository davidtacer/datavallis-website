/**
 * schema.org structured data (JSON-LD) - helps Google and AI search engines understand
 * who Data Vallis is, what it offers and which products it runs.
 */
import { SITE_URL } from './constants';
import { translate } from './i18n';
import { PRODUCTS } from './data/products';
import { SERVICES } from './data/services';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // escape "<" so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export const organizationJsonLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Data Vallis',
  legalName: 'DATA VALLIS d.o.o.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og/default.jpg`,
  description: translate('seo.description'),
  slogan: 'Dream · Desire · Develop',
  email: 'info@datavallis.com',
  telephone: '+386 69 607 847',
  vatID: 'SI89424999',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ulica Šercerjeve brigade 5',
    postalCode: '2000',
    addressLocality: 'Maribor',
    addressCountry: 'SI',
  },
  founder: {
    '@type': 'Person',
    name: 'David Tacer',
    url: 'https://www.davidtacer.com',
  },
  sameAs: ['https://www.linkedin.com/company/data-vallis/', 'https://x.com/DataVallis'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'info@datavallis.com',
    availableLanguage: ['English', 'Slovenian'],
  },
  knowsAbout: [
    'Web3',
    'Blockchain',
    'Smart contracts',
    'Solidity',
    'Decentralized applications (dApps)',
    'Decentralized storage',
    'IPFS',
    'Polygon',
    'Digital transformation',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web3 development services',
    itemListElement: SERVICES.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: { '@id': ORG_ID },
      },
    })),
  },
});

export const websiteJsonLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Data Vallis',
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
});

export const productsJsonLd = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Products built and run by Data Vallis',
  itemListElement: PRODUCTS.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'SoftwareApplication',
      name: product.name,
      url: product.url,
      description: product.excerpt,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      publisher: { '@id': ORG_ID },
      ...(product.links?.length ? { sameAs: product.links.map((l) => l.url) } : {}),
    },
  })),
});

export const pageJsonLd = (type: string, path: string, name: string): Json => ({
  '@context': 'https://schema.org',
  '@type': type,
  url: SITE_URL + path,
  name,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): Json => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: SITE_URL + (item.path === '/' ? '' : item.path),
  })),
});
