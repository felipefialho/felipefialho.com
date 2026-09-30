import { describe, expect, it, vi } from 'vitest';

const getCollection = vi.hoisted(() => vi.fn());

vi.mock('astro:content', () => ({ getCollection }));

const { getAdjacent, getPosts, getRelated, getTagCounts, getTranslationMap, groupByYear, postPath, tagLabel, tagPath, tagSlug, tagStaticPaths } =
  await import('../posts.ts');

type Post = Parameters<typeof getAdjacent>[0][number];

const post = (id: string, date: string, tags: string[] = [], translationOf?: string) =>
  ({ id, data: { tags, date: new Date(date), draft: false, translationOf } }) as unknown as Post;

const a = post('a', '2020-03-01T00:00:00Z', ['css', 'html']);
const b = post('b', '2020-02-01T00:00:00Z', ['css']);
const c = post('c', '2019-12-31T23:59:59Z', ['css', 'html', 'js']);
const d = post('d', '2019-01-01T00:00:00Z', ['career']);
const newestFirst = [a, b, c, d];

describe('tagSlug', () => {
  it('strips accents and joins words with hyphens', () => {
    expect(tagSlug('segurança')).toBe('seguranca');
    expect(tagSlug('front-end')).toBe('front-end');
    expect(tagSlug('web  performance!')).toBe('web-performance');
  });

  it('keeps non-ASCII tags from collapsing to an empty segment', () => {
    expect(tagSlug('日本')).toBe('tag-65e5-672c');
  });
});

describe('paths', () => {
  it('prefixes English paths', () => {
    expect(postPath('pt', 'x')).toBe('/blog/x/');
    expect(postPath('en', 'x')).toBe('/en/blog/x/');
    expect(tagPath('en', 'segurança')).toBe('/en/blog/tags/seguranca/');
  });
});

describe('getAdjacent', () => {
  it('returns the older and newer neighbours', () => {
    expect(getAdjacent(newestFirst, 'b')).toEqual({ older: c, newer: a });
  });

  it('has no newer post at the top and no older post at the bottom', () => {
    expect(getAdjacent(newestFirst, 'a')).toEqual({ older: b, newer: undefined });
    expect(getAdjacent(newestFirst, 'd')).toEqual({ older: undefined, newer: c });
  });

  it('returns nothing for an unknown id', () => {
    expect(getAdjacent(newestFirst, 'zzz')).toEqual({});
  });
});

describe('getRelated', () => {
  it('ranks by shared tags and excludes the post itself', () => {
    expect(getRelated(newestFirst, a).map((p) => p.id)).toEqual(['c', 'b']);
  });

  it('breaks ties with the newest post first', () => {
    const other = post('e', '2021-01-01T00:00:00Z', ['css']);
    // Each candidate shares only the css tag with b, so recency decides
    expect(getRelated([a, c, other], b).map((p) => p.id)).toEqual(['e', 'a', 'c']);
  });

  it('respects the limit', () => {
    expect(getRelated(newestFirst, a, 1).map((p) => p.id)).toEqual(['c']);
  });

  it('returns nothing when no tag is shared', () => {
    expect(getRelated(newestFirst, d)).toEqual([]);
  });
});

describe('getTagCounts', () => {
  it('counts posts per tag', () => {
    expect(Object.fromEntries(getTagCounts(newestFirst))).toEqual({ css: 3, html: 2, js: 1, career: 1 });
  });
});

describe('groupByYear', () => {
  it('groups by UTC year, keeping the input order', () => {
    const groups = groupByYear(newestFirst);
    expect(groups.map(([year, posts]) => [year, posts.map((p) => p.id)])).toEqual([
      [2020, ['a', 'b']],
      [2019, ['c', 'd']],
    ]);
  });
});

describe('getPosts and getTranslationMap', () => {
  it('sorts newest first', async () => {
    getCollection.mockResolvedValue([d, b, a, c]);
    expect((await getPosts('pt')).map((p) => p.id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('maps PT slugs to EN slugs and back', async () => {
    getCollection.mockResolvedValue([post('en-x', '2020-01-01T00:00:00Z', [], 'pt-x')]);
    const { ptToEn, enToPt } = await getTranslationMap();
    expect(ptToEn.get('pt-x')).toBe('en-x');
    expect(enToPt.get('en-x')).toBe('pt-x');
  });
});

describe('tagLabel', () => {
  it('uses the known display form and capitalizes the rest', () => {
    expect(tagLabel('css')).toBe('CSS');
    expect(tagLabel('javascript')).toBe('JavaScript');
    expect(tagLabel('soft skills')).toBe('Soft skills');
    expect(tagLabel('carreira')).toBe('Carreira');
  });
});

describe('tagStaticPaths', () => {
  it('links to the same tag in the other language, or to its blog index', async () => {
    const withTags = (tags: string[]) => [1, 2, 3].map((n) => post(`p${n}-${tags[0]}`, `2020-0${n}-01T00:00:00Z`, tags));
    getCollection.mockResolvedValue(withTags(['css']));
    const same = await tagStaticPaths('pt');
    expect(same[0].props.alternate).toBe('/en/blog/tags/css/');

    getCollection.mockImplementation(async (name: string) => withTags(name === 'posts' ? ['carreira'] : ['career']));
    const different = await tagStaticPaths('pt');
    expect(different[0].props.alternate).toBe('/en/blog/');
    expect(different[0].params.tag).toBe('carreira');
  });
});
