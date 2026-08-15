import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const sourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    section: z.string().optional(),
    slug: z.string(),
    path: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    intro: z.string(),
    faqs: z.array(faqSchema).default([]),
    related: z.array(z.string()).default([]),
    sources: z.array(sourceSchema).default([]),
    lastReviewed: z.string(),
    order: z.number().int().nonnegative(),
  }),
});

const hubs = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/hubs' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    intro: z.string(),
    eyebrow: z.string(),
    featured: z.array(z.string()),
    order: z.number().int().nonnegative(),
  }),
});

export const collections = { resources, hubs };
