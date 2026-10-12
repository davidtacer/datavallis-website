import { seo } from '@/lib/seo';

export const metadata = seo();

// The list itself is rendered by NewsShell (app/news/layout.tsx) so that it stays mounted
// while switching between categories - like the reused Angular NewsPageComponent.
export default function Page() {
  return null;
}
