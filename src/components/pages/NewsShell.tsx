'use client';

import { useParams } from 'next/navigation';
import NewsListPage from './NewsListPage';

export default function NewsShell({ children }: { children: React.ReactNode }) {
  const params = useParams<{ category?: string; slug?: string }>();

  if (params.slug || !params.category) {
    return <>{children}</>;
  }

  return (
    <>
      <NewsListPage category={params.category} />
      {children}
    </>
  );
}
