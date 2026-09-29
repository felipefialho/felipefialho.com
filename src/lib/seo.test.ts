import { describe, expect, it } from 'vitest';
import {
  PERSON_ID,
  PROFILES,
  WEBSITE_ID,
  blogPostingJsonLd,
  collectionPageJsonLd,
  createSitemapSerializer,
  homeJsonLd,
  loadSitemapPosts,
  parseSitemapPost,
  profilePageJsonLd,
  serializeJsonLd,
  type JsonLd,
  type SitemapPost,
} from './seo.ts';

const nodeOf = (data: JsonLd, type: string) => data['@graph'].find((node) => node['@type'] === type);

describe('serializeJsonLd', () => {
  it('escapes < so a title can never close the script tag', () => {
    const out = serializeJsonLd({ headline: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out).headline).toBe('</script><script>alert(1)</script>');
  });
});

describe('homeJsonLd', () => {
  it('declares the site name on the domain root, whatever the language', () => {
    const en = homeJsonLd({ lang: 'en', path: '/en/', title: 'Felipe Fialho', description: 'Bio' });
    expect(nodeOf(en, 'WebSite')).toMatchObject({
      '@id': WEBSITE_ID,
      url: 'https://felipefialho.com/',
      name: 'Felipe Fialho',
      publisher: { '@id': PERSON_ID },
    });
    expect(nodeOf(en, 'WebPage')).toMatchObject({ url: 'https://felipefialho.com/en/', inLanguage: 'en', about: { '@id': PERSON_ID } });
    expect(nodeOf(en, 'Person')?.['@id']).toBe(PERSON_ID);
  });
});

describe('profilePageJsonLd', () => {
  const data = profilePageJsonLd({
    lang: 'pt',
    path: '/hi/',
    title: 'Sobre',
    description: 'Bio',
    updated: new Date('2026-09-29T00:00:00Z'),
    image: '/assets/me.jpg',
  });

  it('makes the person the main entity of the about page', () => {
    expect(nodeOf(data, 'ProfilePage')).toMatchObject({
      '@id': 'https://felipefialho.com/hi/#webpage',
      url: 'https://felipefialho.com/hi/',
      inLanguage: 'pt-BR',
      dateModified: '2026-09-29T00:00:00.000Z',
      mainEntity: { '@id': PERSON_ID },
      isPartOf: { '@id': WEBSITE_ID },
    });
  });

  it('describes the person with job, employer, profiles and portrait', () => {
    expect(nodeOf(data, 'Person')).toMatchObject({
      '@id': PERSON_ID,
      name: 'Felipe Fialho',
      jobTitle: 'Staff Engineer',
      worksFor: { '@type': 'Organization', name: 'Juntos Somos Mais' },
      sameAs: [...PROFILES],
      image: 'https://felipefialho.com/assets/me.jpg',
    });
  });

  it('omits optional fields it was not given', () => {
    const bare = profilePageJsonLd({ lang: 'en', path: '/en/hi/', title: 'About', description: 'Bio' });
    expect(nodeOf(bare, 'ProfilePage')).not.toHaveProperty('dateModified');
    expect(nodeOf(bare, 'Person')).not.toHaveProperty('image');
  });
});

describe('collectionPageJsonLd', () => {
  it('builds Home > Blog for the blog index', () => {
    const data = collectionPageJsonLd({ lang: 'en', path: '/en/blog/', title: 'Blog', description: 'All posts' });
    expect(nodeOf(data, 'BreadcrumbList')?.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://felipefialho.com/en/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://felipefialho.com/en/blog/' },
    ]);
  });

  it('builds Home > Blog > #tag for tag archives', () => {
    const data = collectionPageJsonLd({
      lang: 'pt',
      path: '/blog/tags/css/',
      title: '#css',
      description: 'Posts',
      crumb: '#css',
    });
    const items = nodeOf(data, 'BreadcrumbList')?.itemListElement as { name: string; item: string }[];
    expect(items.map(({ name }) => name)).toEqual(['Início', 'Blog', '#css']);
    expect(items.at(-1)?.item).toBe('https://felipefialho.com/blog/tags/css/');
    expect(nodeOf(data, 'CollectionPage')).toMatchObject({ '@id': 'https://felipefialho.com/blog/tags/css/#webpage' });
  });
});

describe('blogPostingJsonLd', () => {
  const base = {
    title: 'Post',
    description: 'About',
    published: new Date('2020-01-02T03:04:05Z'),
    tags: ['css', 'html'],
  };
  const pt = blogPostingJsonLd({
    ...base,
    lang: 'pt',
    path: '/blog/post/',
    image: '/og/post.jpg',
    translation: '/en/blog/post-en/',
    wordCount: 900,
  });
  const article = nodeOf(pt, 'BlogPosting');

  it('fills the properties Google recommends', () => {
    expect(article).toMatchObject({
      '@id': 'https://felipefialho.com/blog/post/#article',
      headline: 'Post',
      datePublished: '2020-01-02T03:04:05.000Z',
      dateModified: '2020-01-02T03:04:05.000Z',
      inLanguage: 'pt-BR',
      image: { url: 'https://felipefialho.com/og/post.jpg', width: 1200, height: 630 },
      author: { '@id': PERSON_ID, name: 'Felipe Fialho', url: 'https://felipefialho.com/' },
      publisher: { '@id': PERSON_ID },
      isPartOf: { '@id': WEBSITE_ID },
      keywords: 'css, html',
      wordCount: 900,
    });
  });

  it('links the PT original to its translation and back', () => {
    expect(article?.workTranslation).toMatchObject({ '@id': 'https://felipefialho.com/en/blog/post-en/#article', inLanguage: 'en' });
    const en = nodeOf(
      blogPostingJsonLd({ ...base, lang: 'en', path: '/en/blog/post-en/', image: '/en/og/post-en.jpg', translation: '/blog/post/' }),
      'BlogPosting',
    );
    expect(en?.translationOfWork).toMatchObject({ '@id': 'https://felipefialho.com/blog/post/#article', inLanguage: 'pt-BR' });
    expect(en).not.toHaveProperty('workTranslation');
  });

  it('uses the update date when there is one and skips empty optional fields', () => {
    const data = blogPostingJsonLd({
      ...base,
      tags: [],
      lang: 'pt',
      path: '/blog/x/',
      image: '/og/x.jpg',
      updated: new Date('2024-05-06T00:00:00Z'),
    });
    const node = nodeOf(data, 'BlogPosting');
    expect(node?.dateModified).toBe('2024-05-06T00:00:00.000Z');
    expect(node).not.toHaveProperty('keywords');
    expect(node).not.toHaveProperty('wordCount');
    expect(node).not.toHaveProperty('workTranslation');
  });

  it('ends the breadcrumb on the post itself', () => {
    const items = nodeOf(pt, 'BreadcrumbList')?.itemListElement as { name: string; item: string }[];
    expect(items.map(({ name }) => name)).toEqual(['Início', 'Blog', 'Post']);
    expect(items.at(-1)?.item).toBe('https://felipefialho.com/blog/post/');
  });

  it('ships the Person node the author @id points to', () => {
    expect(nodeOf(pt, 'Person')?.['@id']).toBe(PERSON_ID);
  });
});

describe('parseSitemapPost', () => {
  it('reads unquoted and quoted dates as UTC and slugs like the collection', () => {
    const post = parseSitemapPost('en', '2020-01-02-hello.md', '---\ntitle: \'Hi\'\ndate: \'2020-01-02 10:00:00\'\ntranslationOf: ola\n---\nBody');
    expect(post).toEqual({ lang: 'en', slug: 'hello', date: new Date('2020-01-02T10:00:00Z'), translationOf: 'ola' });
    expect(parseSitemapPost('pt', '2026-10-01-x/index.md', '---\ndate: 2026-10-01 00:00:01\nupdated: 2026-10-05\n---')).toEqual({
      lang: 'pt',
      slug: 'x',
      date: new Date('2026-10-01T00:00:01Z'),
      updated: new Date('2026-10-05T00:00:00Z'),
    });
  });

  it('skips drafts', () => {
    expect(parseSitemapPost('pt', 'a.md', '---\ndate: 2020-01-01\ndraft: true\n---')).toBeUndefined();
  });

  it('fails loudly without a date', () => {
    expect(() => parseSitemapPost('pt', 'a.md', '---\ntitle: x\n---')).toThrow(/no date/);
  });

  it('parses every real post', () => {
    const posts = loadSitemapPosts(process.cwd());
    expect(posts.filter(({ lang }) => lang === 'pt').length).toBeGreaterThan(0);
    expect(posts.every(({ date }) => !Number.isNaN(date.valueOf()))).toBe(true);
  });
});

describe('createSitemapSerializer', () => {
  const posts: SitemapPost[] = [
    { lang: 'pt', slug: 'ola', date: new Date('2020-01-01T00:00:00Z') },
    { lang: 'pt', slug: 'novo', date: new Date('2021-06-01T00:00:00Z'), updated: new Date('2022-01-01T00:00:00Z') },
    { lang: 'pt', slug: 'amanha', date: new Date('2030-01-01T00:00:00Z') },
    { lang: 'en', slug: 'hello', date: new Date('2020-02-01T00:00:00Z'), translationOf: 'ola' },
  ];
  const now = new Date('2025-01-01T00:00:00Z');
  const serialize = createSitemapSerializer(posts, now);
  const url = (path: string) => `https://felipefialho.com${path}`;

  it('uses the post date, or its update date, as lastmod', () => {
    expect(serialize({ url: url('/blog/ola/') }).lastmod).toBe('2020-01-01T00:00:00.000Z');
    expect(serialize({ url: url('/blog/novo/') }).lastmod).toBe('2022-01-01T00:00:00.000Z');
  });

  it('never emits a future lastmod', () => {
    expect(serialize({ url: url('/blog/amanha/') }).lastmod).toBe(now.toISOString());
    expect(serialize({ url: url('/') }).lastmod).toBe(now.toISOString());
  });

  it('dates the home and blog index by the newest post of their language', () => {
    expect(serialize({ url: url('/en/') }).lastmod).toBe('2020-02-01T00:00:00.000Z');
    expect(serialize({ url: url('/en/blog/') }).lastmod).toBe('2020-02-01T00:00:00.000Z');
  });

  it('links translated posts even though their slugs differ', () => {
    const expected = [
      { url: url('/blog/ola/'), lang: 'pt-BR' },
      { url: url('/en/blog/hello/'), lang: 'en' },
      { url: url('/blog/ola/'), lang: 'x-default' },
    ];
    expect(serialize({ url: url('/blog/ola/') }).links).toEqual(expected);
    expect(serialize({ url: url('/en/blog/hello/') }).links).toEqual(expected);
    expect(serialize({ url: url('/blog/novo/') }).links).toBeUndefined();
  });

  it('adds x-default to pages the integration already paired, and leaves other pages alone', () => {
    const links = [
      { url: url('/lab/'), lang: 'pt-BR' },
      { url: url('/en/lab/'), lang: 'en' },
    ];
    const item = serialize({ url: url('/en/lab/'), links });
    expect(item.links).toEqual([...links, { url: url('/lab/'), lang: 'x-default' }]);
    expect(item).not.toHaveProperty('lastmod');
    expect(serialize({ url: url('/policies/') })).toEqual({ url: url('/policies/') });
  });
});
