import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.scss';
import Layout from '@/components/layout/Layout';
import { GA_ID, SITE_URL } from '@/lib/constants';
import { seo } from '@/lib/seo';

const SHARE_TITLE = 'Data Vallis: Web3 development company';
const SHARE_DESCRIPTION =
  'We design and build smart contracts, dApps and decentralized infrastructure for clients, and run Web3 products of our own, like CHERR.IO and PollinationX.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...seo(),
  robots: { index: true, follow: true },
  icons: { icon: '/assets/images/colors.svg' },
  twitter: {
    card: 'summary',
    site: '@DataVallis',
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [`${SITE_URL}/assets/images/logo.svg`],
  },
  openGraph: {
    url: SITE_URL,
    type: 'website',
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [`${SITE_URL}/assets/images/logo.svg`],
  },
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
