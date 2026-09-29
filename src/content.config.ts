import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Tags written inconsistently over 13 years collapse into one spelling
const TAG_ALIASES: Record<string, string> = {
  frontend: 'front-end',
  segurança: 'seguranca',
};

const normalizeTag = (tag: string) => {
  const clean = tag.trim().toLowerCase();
  return TAG_ALIASES[clean] ?? clean;
};

// `2013-05-06-slug.md` and `2026-10-01-slug/index.md` both become `slug`
const slugFromPath = ({ entry }: { entry: string }) =>
  entry
    .replace(/\/index\.mdx?$/, '')
    .replace(/\.mdx?$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');

// Quoted dates without an offset ('2019-09-05 06:46:38') are read as UTC, like unquoted YAML timestamps,
// so the rendered day never depends on the build machine's timezone
const utcDate = z.preprocess((value) => {
  if (typeof value !== 'string' || /(Z|[+-]\d{2}:?\d{2})$/.test(value.trim())) return value;
  const [day, time = '00:00:00'] = value.trim().split(/[ T]/);
  return `${day}T${time}Z`;
}, z.coerce.date());

const postSchema = z.object({
  title: z.string(),
  date: utcDate,
  description: z.string(),
  tags: z.array(z.string()).default([]).transform((tags) => [...new Set(tags.filter(Boolean).map(normalizeTag))]),
  draft: z.boolean().default(false),
});

const posts = defineCollection({
  loader: glob({ pattern: ['*.md', '*/index.md'], base: './content/posts', generateId: slugFromPath }),
  schema: postSchema,
});

const postsEn = defineCollection({
  loader: glob({ pattern: ['*.md', '*/index.md'], base: './content/posts-en', generateId: slugFromPath }),
  schema: postSchema.extend({ translationOf: z.string() }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: utcDate.optional(),
  }),
});

const lab = defineCollection({
  loader: file('./content/lab/lab.json'),
  schema: ({ image }) =>
    z.object({
      url: z.url({ protocol: /^https?$/ }),
      repo: z.url({ protocol: /^https?$/ }).nullable(),
      year: z.string(),
      title: z.string(),
      description: z.object({ pt: z.string(), en: z.string() }),
      image: image(),
    }),
});

export const collections = { posts, postsEn, pages, lab };
