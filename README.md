# datavallis.com – Next.js

1:1 port of the Angular 12 (Universal) website to **Next.js 16 (App Router) + React 19 + TypeScript + SCSS**.

## Getting started

```bash
cp .env.example .env.local   # fill in the API key (news) and the Klaviyo key + list ID (contact form)
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Node.js 20+ is required.

## Structure

```
public/assets/            all original assets (same URLs as before: /assets/...)
src/app/                  routes (one folder per Angular route) + SEO metadata
src/components/layout/    Layout (AppComponent + LayoutComponent), Header, Background (lottie),
                          Cursor, NavigationMenu, Footer, CookiesMsg
src/components/shared/    Title, VerticalTitle, DvLink, Accordion, Page, TLink (routerLink)
src/components/home/      home page sections
src/components/pages/     other pages
src/lib/store.ts          PageLoaderService + BackgroundService + MenuService (zustand)
src/lib/navigation.ts     CanDeactivateGuard2 – page overlay + 700 ms delay between pages
src/lib/api.ts            ApiService + interceptor + NewsService
src/app/api/contact/      contact form endpoint -> Klaviyo (src/lib/klaviyo.ts)
src/lib/data/             experiences, services, products, technologies, fragments
src/i18n/                 en.json / sl.json (ngx-translate files)
src/styles/               original global SCSS + component styles
```

## Notes on the port

- **Styles** are the original SCSS. Angular's view encapsulation is replaced by a root class per component
  (`.dv-header`, `.dv-title`, ...), so every component style is scoped to its component.
- **Page transitions**: internal links use `TLink`, which runs the same logic as `CanDeactivateGuard2`
  (black overlay slides up, content collapses, new page after 700 ms). The guard only runs where Angular ran it
  (e.g. switching news categories has no transition, opening an article does).
- **Intro animation**: same `lottie-web` animation and timings (3 s intro, 1 s on Firefox with the static image).
- **Carousel**: the technologies slider uses the same jQuery `slick-carousel` that `ngx-slick-carousel` wrapped.
- **SEO**: every route has server rendered HTML and the same title/description as `SeoService`.
  News articles are fetched on the server (with a client-side fallback); unknown URLs return a real 404.
- The article request keeps the original URL format `/news/undefined/:slug` (typo `params.caregory` in Angular),
  so the API behaves exactly as before.
- **Contact form** posts to `/api/contact` (server). It upserts the Klaviyo profile (name, company, message),
  subscribes it to email marketing on `KLAVIYO_LIST_ID` (consent = GDPR checkbox) and tracks a `Contact Form Submitted` event,
  which can trigger a Klaviyo flow (e.g. notify info@datavallis.com).
- `/sitemap.xml`, `/robots.txt` and the Google Analytics tag are unchanged.

## SEO & AI search

- Every page sets its own title, description, canonical URL, Open Graph and Twitter card via `pageMetadata()` (`src/lib/seo.ts`).
- Share images (1200×630) live in `public/og/`; regenerate them with `node scripts/make_og.js` after changing headlines.
- Structured data (schema.org JSON-LD) in `src/lib/jsonld.tsx`: Organization, WebSite, products (SoftwareApplication), breadcrumbs, page types.
- `/sitemap.xml`, `/robots.txt` (AI crawlers explicitly allowed), `/manifest.webmanifest` and `/llms.txt` are generated from the site data in `src/app/`.
- The hidden news section is marked `noindex`.
- Logo variations for the media kit: `python3 scripts/make_logos.py public/assets/images/logo.svg public/media-kit/logos`.
