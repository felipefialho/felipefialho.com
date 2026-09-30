import { describe, expect, it, vi } from 'vitest';

vi.mock('astro:content', () => ({ getCollection: vi.fn() }));

const { getFeatured, getTopTags } = await import('../posts.ts');

type Post = Parameters<typeof getTopTags>[0][number];

const post = (id: string, tags: string[] = [], draft = false) =>
  ({ id, data: { tags, draft, date: new Date('2026-01-01T00:00:00Z') } }) as unknown as Post;

describe('getFeatured', () => {
  it('leads with the newest post and lists the next ones', () => {
    const posts = ['a', 'b', 'c', 'd'].map((id) => post(id));
    const { featured, latest } = getFeatured(posts, 2);
    expect(featured?.id).toBe('a');
    expect(latest.map((entry) => entry.id)).toEqual(['b', 'c']);
  });

  it('skips drafts for both the featured post and the list', () => {
    const posts = [post('draft', [], true), post('b'), post('c', [], true), post('d')];
    const { featured, latest } = getFeatured(posts);
    expect(featured?.id).toBe('b');
    expect(latest.map((entry) => entry.id)).toEqual(['d']);
  });

  it('handles an empty collection', () => {
    expect(getFeatured([])).toEqual({ featured: undefined, latest: [] });
  });
});

describe('getTopTags', () => {
  const posts = [
    post('1', ['css', 'ai']),
    post('2', ['css', 'ai']),
    post('3', ['css', 'ai', 'rare']),
    post('4', ['ai', 'css', 'career']),
    post('5', ['career']),
    post('6', ['career']),
  ];

  it('orders by usage, alphabetical on ties, and drops tags without a page', () => {
    expect(getTopTags(posts)).toEqual(['ai', 'css', 'career']);
  });

  it('respects the limit', () => {
    expect(getTopTags(posts, 1)).toEqual(['ai']);
  });

  it('leads with pinned tags that have a page, then fills by usage', () => {
    expect(getTopTags(posts, 3, ['career', 'rare'])).toEqual(['career', 'ai', 'css']);
  });
});
