import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import type { SitemapItem } from '@astrojs/sitemap';
import { HTML_LANG, LANGS, SITE_NAME, localePath, type Lang } from './i18n';
import { utcDate } from './utc-date';

export const SITE_URL = 'https://felipefialho.com/';
export const PERSON_ID = `${SITE_URL}#person`;
export const WEBSITE_ID = `${SITE_URL}#website`;

/** Profiles that describe the same person, for `sameAs` and `rel="me"`. */
export const PROFILES = [
  'https://github.com/felipefialho',
  'https://www.linkedin.com/in/felipefialho/',
  'https://x.com/felipefialho_',
  'https://www.youtube.com/@felipefialhodev',
] as const;

/** Robots directives for indexable pages: large image previews unlock Discover and rich snippets. */
export const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const ROBOTS_NOINDEX = 'noindex, follow';

const JOB_TITLE = 'Staff Engineer';
const EMPLOYER = { '@type': 'Organization', name: 'Juntos Somos Mais', url: 'https://juntossomosmais.com.br/' };
const KNOWS_ABOUT = ['Front-end', 'CSS', 'JavaScript', 'TypeScript', 'Software architecture', 'AI-assisted development'];

// OG cards rendered by src/lib/og.ts
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const BREADCRUMB_HOME: Record<Lang, string> = { pt: 'Início', en: 'Home' };
const BREADCRUMB_BLOG = 'Blog';

type Node = Record<string, unknown>;
export type JsonLd = { '@context': 'https://schema.org'; '@graph': Node[] };

const absolute = (sitePath: string) => new URL(sitePath, SITE_URL).href;
const graph = (...nodes: Node[]): JsonLd => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Serializes JSON-LD for a `<script>`, escaping `<` so content can never close the tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replaceAll('<', '\\u003c');

/** `image` is a portrait: a site path or absolute URL. */
/** Public, stable URL so the photo can be referenced from structured data */
export const PROFILE_PHOTO = '/assets/felipe-fialho.jpg';

export function personNode(image: string = PROFILE_PHOTO): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: JOB_TITLE,
    worksFor: EMPLOYER,
    knowsAbout: KNOWS_ABOUT,
    sameAs: [...PROFILES],
    ...(image && { image: absolute(image) }),
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: 'felipefialho.com',
    inLanguage: LANGS.map((lang) => HTML_LANG[lang]),
    publisher: { '@id': PERSON_ID },
  };
}

// Inline name and url keep the author valid for parsers that don't resolve @id references
const authorRef = () => ({ '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: SITE_URL });

export interface Crumb {
  name: string;
  /** Site path, e.g. /blog/ */
  path: string;
}

export function breadcrumbNode(pagePath: string, crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absolute(pagePath)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/** Home > Blog > current page. */
export const blogCrumbs = (lang: Lang, name: string, pagePath: string): Crumb[] => [
  { name: BREADCRUMB_HOME[lang], path: localePath(lang, '/') },
  { name: BREADCRUMB_BLOG, path: localePath(lang, '/blog/') },
  { name, path: pagePath },
];

interface PageInput {
  lang: Lang;
  /** Site path of the page, e.g. / or /en/hi/ */
  path: string;
  title: string;
  description: string;
}

interface ProfilePageInput extends PageInput {
  updated?: Date;
  /** Portrait of the owner, when the page shows one */
  image?: string;
}

/** Home page graph: Google reads the site name from a WebSite node on the domain root. */
export function homeJsonLd({ lang, path: pagePath, title, description }: PageInput): JsonLd {
  const url = absolute(pagePath);
  return graph(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: HTML_LANG[lang],
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
    },
    websiteNode(),
    personNode(),
  );
}

/** About page graph: a profile whose main entity is the site owner. */
export function profilePageJsonLd(input: ProfilePageInput): JsonLd {
  const { lang, path: pagePath, title, description, updated, image } = input;
  const url = absolute(pagePath);
  return graph(
    {
      '@type': 'ProfilePage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: HTML_LANG[lang],
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
      ...(updated && { dateModified: updated.toISOString() }),
    },
    personNode(image),
  );
}

interface CollectionPageInput extends PageInput {
  /** Breadcrumb label for this page; omit for the blog index itself */
  crumb?: string;
}

/** Blog index and tag archives. */
export function collectionPageJsonLd({ lang, path: pagePath, title, description, crumb }: CollectionPageInput): JsonLd {
  const url = absolute(pagePath);
  const crumbs = crumb
    ? blogCrumbs(lang, crumb, pagePath)
    : [{ name: BREADCRUMB_HOME[lang], path: localePath(lang, '/') }, { name: BREADCRUMB_BLOG, path: pagePath }];
  return graph(
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: HTML_LANG[lang],
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    breadcrumbNode(pagePath, crumbs),
  );
}

export interface BlogPostingInput {
  lang: Lang;
  /** Site path of the post, e.g. /blog/slug/ */
  path: string;
  title: string;
  description: string;
  published: Date;
  updated?: Date;
  /** Site path of the social card */
  image: string;
  tags: string[];
  wordCount?: number;
  /** Site path of the same post in the other language */
  translation?: string;
}

export function blogPostingJsonLd(input: BlogPostingInput): JsonLd {
  const { lang, title, description, published, updated, tags, wordCount, translation } = input;
  const url = absolute(input.path);
  const otherLang: Lang = lang === 'pt' ? 'en' : 'pt';
  // EN posts are translations of the PT originals, never the other way around
  const translationRef = translation && {
    '@type': 'BlogPosting',
    '@id': `${absolute(translation)}#article`,
    url: absolute(translation),
    inLanguage: HTML_LANG[otherLang],
  };
  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      mainEntityOfPage: url,
      headline: title,
      description,
      datePublished: published.toISOString(),
      dateModified: (updated ?? published).toISOString(),
      inLanguage: HTML_LANG[lang],
      image: { '@type': 'ImageObject', url: absolute(input.image), width: OG_WIDTH, height: OG_HEIGHT },
      author: authorRef(),
      publisher: { '@id': PERSON_ID },
      isPartOf: { '@id': WEBSITE_ID },
      ...(tags.length > 0 && { keywords: tags.join(', ') }),
      ...(wordCount && { wordCount }),
      ...(translationRef && (lang === 'en' ? { translationOfWork: translationRef } : { workTranslation: translationRef })),
    },
    breadcrumbNode(input.path, blogCrumbs(lang, title, input.path)),
    personNode(),
  );
}

/* Sitemap: the content collections are not available in astro.config, so posts are read from disk */

export interface SitemapPost {
  lang: Lang;
  slug: string;
  date: Date;
  updated?: Date;
  /** PT slug this EN post translates */
  translationOf?: string;
}

// Same rule as slugFromPath in content.config.ts
const slugOf = (entry: string) =>
  entry
    .replace(/\/index\.mdx?$/, '')
    .replace(/\.mdx?$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');

const field = (frontmatter: string, name: string) =>
  new RegExp(`^${name}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, 'm').exec(frontmatter)?.[1];

/** Reads the fields the sitemap needs from a post's frontmatter; drafts return undefined. */
export function parseSitemapPost(lang: Lang, entry: string, source: string): SitemapPost | undefined {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
  if (field(frontmatter, 'draft') === 'true') return undefined;
  const date = field(frontmatter, 'date');
  if (!date) throw new Error(`Post ${entry} has no date`);
  const updated = field(frontmatter, 'updated');
  const translationOf = field(frontmatter, 'translationOf');
  return {
    lang,
    slug: slugOf(entry),
    date: utcDate.parse(date),
    ...(updated && { updated: utcDate.parse(updated) }),
    ...(translationOf && { translationOf }),
  };
}

const POST_DIRS: Record<Lang, string> = { pt: 'content/posts', en: 'content/posts-en' };

export function loadSitemapPosts(root: string): SitemapPost[] {
  return LANGS.flatMap((lang) => {
    const dir = path.join(root, POST_DIRS[lang]);
    return readdirSync(dir, { withFileTypes: true })
      .map((item) => (item.isDirectory() ? `${item.name}/index.md` : item.name))
      .filter((entry) => entry.endsWith('.md'))
      .map((entry) => parseSitemapPost(lang, entry, readFileSync(path.join(dir, entry), 'utf8')))
      .filter((post): post is SitemapPost => Boolean(post));
  });
}

const lastmodOf = (post: SitemapPost) => post.updated ?? post.date;

// A post scheduled for tomorrow must not claim a future lastmod
const notAfter = (date: Date, now: Date) => (date > now ? now : date);

// Pages paired by the integration (home, blog, lab...) mirror the in-page x-default, which points at PT
const withDefault = (links: SitemapItem['links']) => {
  const pt = links?.find((link) => link.lang === HTML_LANG.pt);
  return pt ? [...(links ?? []), { url: pt.url, lang: 'x-default' }] : links;
};

const newest = (posts: SitemapPost[]) =>
  posts.reduce<Date | undefined>((latest, post) => {
    const date = lastmodOf(post);
    return !latest || date > latest ? date : latest;
  }, undefined);

/**
 * Sitemap `serialize` hook: `lastmod` from post dates (home and blog index take the newest post)
 * and hreflang links for translated posts, whose slugs differ between languages.
 */
export function createSitemapSerializer(posts: SitemapPost[], now = new Date()) {
  const byPath = new Map(posts.map((post) => [localePath(post.lang, `/blog/${post.slug}/`), post]));
  const enByPt = new Map(posts.filter((post) => post.translationOf).map((post) => [post.translationOf, post]));
  const newestByPath = new Map<string, Date | undefined>(
    LANGS.flatMap((lang) => {
      const date = newest(posts.filter((post) => post.lang === lang));
      return [
        [localePath(lang, '/'), date],
        [localePath(lang, '/blog/'), date],
      ];
    }),
  );

  const translationLinks = (post: SitemapPost) => {
    const pt = post.lang === 'pt' ? post.slug : post.translationOf;
    const en = post.lang === 'en' ? post : pt && enByPt.get(pt);
    if (!pt || !en || !byPath.has(localePath('pt', `/blog/${pt}/`))) return undefined;
    const ptUrl = absolute(localePath('pt', `/blog/${pt}/`));
    return [
      { url: ptUrl, lang: HTML_LANG.pt },
      { url: absolute(localePath('en', `/blog/${en.slug}/`)), lang: HTML_LANG.en },
      { url: ptUrl, lang: 'x-default' },
    ];
  };

  return (item: SitemapItem): SitemapItem => {
    const pathname = new URL(item.url).pathname;
    const post = byPath.get(pathname);
    if (post) {
      const lastmod = notAfter(lastmodOf(post), now).toISOString();
      return { ...item, lastmod, links: translationLinks(post) ?? withDefault(item.links) };
    }
    const date = newestByPath.get(pathname);
    return { ...item, ...(date && { lastmod: notAfter(date, now).toISOString() }), links: withDefault(item.links) };
  };
}
