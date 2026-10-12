import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.scss';
import Layout from '@/components/layout/Layout';
import { GA_ID, SITE_URL } from '@/lib/constants';
import { seo } from '@/lib/seo';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...seo(),
  applicationName: 'Data Vallis',
  authors: [{ name: 'DATA VALLIS d.o.o.', url: SITE_URL }],
  publisher: 'DATA VALLIS d.o.o.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Layout>{children}</Layout>

        {/* Google Analytics 4 (the old Universal Analytics tag UA-72564220-1 stopped collecting data in 2023) */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
