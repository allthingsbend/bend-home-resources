import { getCollection, type CollectionEntry } from 'astro:content';

export type ResourceEntry = CollectionEntry<'resources'>;
export type HubEntry = CollectionEntry<'hubs'>;
export type ResourcePage = ResourceEntry['data'];
export type Hub = HubEntry['data'];

export function normalizePath(path: string) {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export async function getAllResourceEntries() {
  const entries = await getCollection('resources');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getPages() {
  return (await getAllResourceEntries()).filter((entry) => Boolean(entry.data.section));
}

export async function getTrustPages() {
  return (await getAllResourceEntries()).filter((entry) => !entry.data.section);
}

export async function getHubEntries() {
  const entries = await getCollection('hubs');
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getHubs() {
  const entries = await getHubEntries();
  return Object.fromEntries(entries.map((entry) => [entry.id, entry.data])) as Record<string, Hub>;
}

export function pageByPath(entries: ResourceEntry[], path: string) {
  const target = normalizePath(path);
  return entries.find((entry) => normalizePath(entry.data.path) === target);
}

export async function pagesForSection(section: string) {
  return (await getPages()).filter((entry) => entry.data.section === section);
}

export function labelForPath(path: string, entries: ResourceEntry[], hubs: Record<string, Hub>) {
  const normalized = normalizePath(path);
  const entry = pageByPath(entries, normalized);
  if (entry) return entry.data.title;
  const hubKey = normalized.replace(/^\//, '');
  if (hubs[hubKey]) return hubs[hubKey].title;
  if (normalized === '/') return 'Home';
  return normalized.split('/').filter(Boolean).pop()?.replaceAll('-', ' ') ?? path;
}
