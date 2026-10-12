# datavallis.com – Next.js

1:1 port of the Angular 12 (Universal) website to **Next.js 16 (App Router) + React 19 + TypeScript + SCSS**.

## Getting started

```bash
cp .env.example .env.local   # fill in NEXT_PUBLIC_API_KEY (same value as in the Angular environment.prod.ts)
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
src/lib/api.ts            ApiService + interceptor + NewsService + ContactService
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
- `/sitemap.xml`, `/robots.txt` and the Google Analytics tag are unchanged.
