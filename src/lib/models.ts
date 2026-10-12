export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface News {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  date: string;
  category: number;
  slug: string;
  related_article: string;
  categories?: Category[];
  tags?: Tag[];
}

export interface Experience {
  id?: number;
  title: string;
  productName?: string;
  productUrl?: string;
  excerpt: string;
  description?: string;
  slug: string;
  linkDescription: string;
}

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface FragmentItem {
  label: string;
  hash?: string;
  route?: string;
}

export interface Product {
  id: number;
  name: string;
  url: string;
  title: string;
  excerpt: string;
  /** e.g. "Public testnet beta" - only when known */
  status?: string;
  /** short facts shown as chips */
  tags: string[];
  /** extra links shown under the website link (testnet, documentation, ...) */
  links?: { label: string; url: string }[];
}

export interface Technology {
  id?: number;
  name: string;
  logo: string;
}
