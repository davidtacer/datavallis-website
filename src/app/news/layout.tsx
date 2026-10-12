import NewsShell from '@/components/pages/NewsShell';

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <NewsShell>{children}</NewsShell>;
}
