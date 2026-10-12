import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.scss';
import Layout from '@/components/layout/Layout';
import { SITE_URL } from '@/lib/constants';
import { seo } from '@/lib/seo';

const SHARE_TITLE = 'DataVallis: Leaders in Blockchain Development and Digital Transformation';
const SHARE_DESCRIPTION =
  'As experts in blockchain development and digital transformation, our team has over a decade of experience in delivering top-notch solutions that help businesses thrive in the modern world. From custom blockchain development to digital transformation strategies, we have the skills and expertise to help your business succeed.';

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

        {/* Global site tag (gtag.js) - Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=UA-72564220-1" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-72564220-1');`}
        </Script>
      </body>
    </html>
  );
}
