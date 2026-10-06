import { beforeEach, describe, expect, it, vi } from 'vitest';

const getPosts = vi.hoisted(() => vi.fn());

vi.mock('astro:content', () => ({ getCollection: vi.fn() }));
vi.mock('../posts.ts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../posts.ts')>()),
  getPosts,
}));

const { feedResponse } = await import('../feed.ts');

const post = (id: string, tags: string[]) => ({
  id,
  data: { title: `Title ${id}`, description: `Desc ${id}`, date: new Date('2026-03-01T00:00:00Z'), tags },
});

const context = { site: new URL('https://felipefialho.com') } as Parameters<typeof feedResponse>[1];

beforeEach(() => {
  getPosts.mockReset();
  getPosts.mockResolvedValue([post('first', ['css', 'ai']), post('second', [])]);
});

describe('feedResponse', () => {
  it('builds a Portuguese feed with localized item links and categories', async () => {
    const xml = await (await feedResponse('pt', context)).text();
    expect(getPosts).toHaveBeenCalledWith('pt');
    expect(xml).toContain('<language>pt-BR</language>');
    expect(xml).toContain('<link>https://felipefialho.com/blog/first/</link>');
    expect(xml).toContain('<title>Title second</title>');
    expect(xml).toContain('<category>css</category>');
    expect(xml).toContain('<category>ai</category>');
  });

  it('builds an English feed under /en/', async () => {
    const xml = await (await feedResponse('en', context)).text();
    expect(getPosts).toHaveBeenCalledWith('en');
    expect(xml).toContain('<language>en</language>');
    expect(xml).toContain('<link>https://felipefialho.com/en/blog/first/</link>');
    expect(xml).toContain('Felipe Fialho (English)');
  });
});
