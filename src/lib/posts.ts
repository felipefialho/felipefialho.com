import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Lang } from './i18n';

export type Post = CollectionEntry<'posts'> | CollectionEntry<'postsEn'>;

const COLLECTION = { pt: 'posts', en: 'postsEn' } as const;

/** Published posts for a language, newest first. */
export async function getPosts(lang: 'en'): Promise<CollectionEntry<'postsEn'>[]>;
export async function getPosts(lang: Lang): Promise<Post[]>;
export async function getPosts(lang: Lang): Promise<Post[]> {
  const entries: Post[] = await getCollection(COLLECTION[lang], ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** The newest published post and the `limit` posts right after it. Drafts never lead the home, even in dev. */
export function getFeatured<T extends Post>(posts: T[], limit = 6) {
  const published = posts.filter((post) => !post.data.draft);
  return { featured: published[0], latest: published.slice(1, 1 + limit) };
}

export const postPath = (lang: Lang, id: string) => localePath(lang, `/blog/${id}/`);

export const ogImagePath = (lang: Lang, id: string) => localePath(lang, `/og/${id}.jpg`);

/** Maps each PT slug to its EN translation slug and back, for hreflang and the language switch. */
export async function getTranslationMap() {
  // Same draft filter as the routes, so an unpublished translation never becomes a hreflang target
  const en = await getPosts('en');
  const ptToEn = new Map(en.map((entry) => [entry.data.translationOf, entry.id]));
  const enToPt = new Map(en.map((entry) => [entry.id, entry.data.translationOf]));
  return { ptToEn, enToPt };
}

/** Previous (older) and next (newer) posts around the given one. */
export function getAdjacent(posts: Post[], id: string): { older?: Post; newer?: Post } {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return {};
  return { older: posts[index + 1], newer: posts[index - 1] };
}

/** Up to `limit` posts sharing the most tags, newest first on ties. */
export function getRelated(posts: Post[], current: Post, limit = 3) {
  const tags = new Set(current.data.tags);
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({ post, score: post.data.tags.filter((tag) => tags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}

/** Tags with enough posts to deserve their own page. */
export const MIN_TAG_POSTS = 3;

export function getTagCounts(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return counts;
}

/** Topics the home leads with, in this order, when they have a tag page. */
export const HOME_TOPICS = ['ai', 'carreira', 'front-end', 'javascript', 'css', 'performance', 'html'] as const;

/**
 * Tags that have their own page: the pinned ones first (in their order), then the most used
 * (alphabetical on ties), up to the limit.
 */
export function getTopTags(posts: Post[], limit = 7, pinned: readonly string[] = []) {
  const ranked = [...getTagCounts(posts)]
    .filter(([, count]) => count >= MIN_TAG_POSTS)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
  const withPage = new Set(ranked);
  const first = pinned.filter((tag) => withPage.has(tag));
  return [...new Set([...first, ...ranked])].slice(0, limit);
}

export const tagSlug = (tag: string) => {
  const slug = tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  // Tags without any ASCII letter (e.g. CJK) would collapse to an empty segment
  return slug || `tag-${[...tag].map((char) => char.codePointAt(0)?.toString(16)).join('-')}`;
};

// Tags whose display form is not a plain capitalized word
const TAG_LABELS: Record<string, string> = {
  ai: 'AI',
  css: 'CSS',
  'css-in-js': 'CSS-in-JS',
  'css grid': 'CSS Grid',
  github: 'GitHub',
  html: 'HTML',
  javascript: 'JavaScript',
  spa: 'SPA',
  typescript: 'TypeScript',
  'web vitals': 'Web Vitals',
};

/** Display form of a normalized (lowercase) tag: "css" becomes "CSS", "soft skills" becomes "Soft skills". */
export const tagLabel = (tag: string) => TAG_LABELS[tag] ?? `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`;

export const tagPath = (lang: Lang, tag: string) => localePath(lang, `/blog/tags/${tagSlug(tag)}/`);

/** Groups posts by publication year, newest year first. */
export function groupByYear(posts: Post[]) {
  const years = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()];
}

/**
 * Static paths for the post pages of a language. Every path shares the same `posts` array
 * reference (no copy), which is cheaper than re-querying the collection once per page.
 */
export async function postStaticPaths(lang: Lang) {
  const posts = await getPosts(lang);
  const { ptToEn, enToPt } = await getTranslationMap();
  const translations = lang === 'pt' ? ptToEn : enToPt;
  const otherLang: Lang = lang === 'pt' ? 'en' : 'pt';
  return posts.map((post) => {
    const translation = translations.get(post.id);
    return {
      params: { slug: post.id },
      props: { post, posts, alternate: translation ? postPath(otherLang, translation) : undefined },
    };
  });
}

/** Static paths for the tag archives of a language. */
export async function tagStaticPaths(lang: Lang) {
  const otherLang: Lang = lang === 'pt' ? 'en' : 'pt';
  const [posts, otherPosts] = await Promise.all([getPosts(lang), getPosts(otherLang)]);
  const otherSlugs = new Set(tagsWithPage(otherPosts).map(tagSlug));
  return tagsWithPage(posts).map((tag) => ({
    params: { tag: tagSlug(tag) },
    props: {
      tag,
      posts: posts.filter((post) => post.data.tags.includes(tag)),
      // The same slug in the other language is the same topic; otherwise fall back to its blog index
      alternate: otherSlugs.has(tagSlug(tag)) ? tagPath(otherLang, tag) : localePath(otherLang, '/blog/'),
    },
  }));
}

const tagsWithPage = (posts: Post[]) =>
  [...getTagCounts(posts)].filter(([, count]) => count >= MIN_TAG_POSTS).map(([tag]) => tag);
