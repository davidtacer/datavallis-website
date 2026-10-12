/**
 * Port of ApiService + HttpClientInterceptor + NewsService + ContactService
 */
import type { Category, News } from './models';
import { API_ENDPOINT, API_KEY, CDN } from './constants';

const headers = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'API-KEY': API_KEY,
});

const url = (route: string): string => (route.startsWith('http') ? route : API_ENDPOINT + route);

async function get<T = any>(route: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url(route), { ...init, headers: headers() });

  if (!response.ok) {
    throw new Error(`GET ${route} failed with ${response.status}`);
  }

  return response.json();
}

async function post<T = any>(route: string, body: unknown): Promise<T> {
  const response = await fetch(url(route), { method: 'POST', headers: headers(), body: JSON.stringify(body) });

  if (!response.ok) {
    throw new Error(`POST ${route} failed with ${response.status}`);
  }

  return response.json();
}

const addCdn = <T extends { image?: string }>(items: T[]): T[] => {
  items.forEach((item) => {
    if (item.image && !item.image.includes(CDN)) {
      item.image = CDN + item.image;
    }
  });

  return items;
};

export async function getCategories(): Promise<Category[]> {
  const response = await get<{ data: Category[] }>('/categories');
  return response.data;
}

export async function getNews(slug: string): Promise<News[]> {
  const response = await get<{ data: News[] }>(slug !== 'all' ? `/news/${slug}` : `/news`);
  return addCdn(response.data);
}

export async function getArticle(category: string, slug: string, init?: RequestInit): Promise<News | null> {
  const response = await get<{ data: News[] }>(`/news/${category}/${slug}`, init);
  return addCdn(response.data)[0] || null;
}

export function submitContactForm(data: Record<string, unknown>): Promise<unknown> {
  return post('/contact-form', data);
}
