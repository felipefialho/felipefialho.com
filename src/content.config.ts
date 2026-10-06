import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { utcDate } from './lib/utc-date';

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

// Letters and digits first, then only spaces and . + # - (stray quotes or brackets mean broken frontmatter)
const VALID_TAG = /^[\p{L}\p{N}][\p{L}\p{N} .+#-]*$/u;

const postSchema = z.object({
  title: z.string(),
  date: utcDate,
  description: z.string(),
  tags: z
    .array(z.string())
    .default([])
    .transform((tags, ctx) => {
      const normalized = [...new Set(tags.filter(Boolean).map(normalizeTag))];
      for (const tag of normalized.filter((item) => !VALID_TAG.test(item))) {
        ctx.addIssue({ code: 'custom', message: `Invalid tag ${JSON.stringify(tag)}: check quotes and brackets in the tags frontmatter` });
      }
      return normalized;
    }),
  draft: z.boolean().default(false),
  /** Before/after code shown on the home's featured card */
  teaser: z
    .object({
      before: z.object({ label: z.string(), code: z.string() }),
      after: z.object({ label: z.string(), code: z.string() }),
    })
    .optional(),
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
      /** Short line for the home cards; falls back to description */
      short: z.object({ pt: z.string(), en: z.string() }).optional(),
      /** Display string, e.g. "+20K" */
      stars: z.string().optional(),
      rebuilt: z.boolean().default(false),
      image: image().optional(),
    }),
});

export const collections = { posts, postsEn, pages, lab };
