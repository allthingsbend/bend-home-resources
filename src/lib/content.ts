import data from '../data/content.json';

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  callout?: string;
};

export type Faq = { question: string; answer: string };
export type Source = { name: string; url: string };

export type ResourcePage = {
  section?: string;
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  sections: ContentSection[];
  faqs: Faq[];
  related: string[];
  sources: Source[];
  lastReviewed: string;
};

export type Hub = {
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  eyebrow: string;
  featured: string[];
};

export const hubs = data.hubs as Record<string, Hub>;
export const pages = data.pages as ResourcePage[];
export const trustPages = data.trustPages as ResourcePage[];
export const allResourcePages = [...pages, ...trustPages];

export function normalizePath(path: string) {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export function pageByPath(path: string) {
  const target = normalizePath(path);
  return allResourcePages.find((page) => normalizePath(page.path) === target);
}

export function pagesForSection(section: string) {
  return pages.filter((page) => page.section === section);
}

export function labelForPath(path: string) {
  const normalized = normalizePath(path);
  const page = pageByPath(normalized);
  if (page) return page.title;
  const hubKey = normalized.replace(/^\//, '');
  if (hubs[hubKey]) return hubs[hubKey].title;
  if (normalized === '/') return 'Home';
  return normalized.split('/').filter(Boolean).pop()?.replaceAll('-', ' ') ?? path;
}
