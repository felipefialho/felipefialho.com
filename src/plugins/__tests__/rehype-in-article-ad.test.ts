import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';
import rehypeInArticleAd, { pickIndex } from '../rehype-in-article-ad.ts';

type Block = Parameters<typeof pickIndex>[0][number];

const el = (tagName: string): Block => ({ type: 'element', tagName, properties: {}, children: [] });
const raw: Block = { type: 'raw', value: '<div></div>' };
const blocks = (...tags: Array<string | Block>) => tags.map((tag) => (typeof tag === 'string' ? el(tag) : tag));

describe('pickIndex', () => {
  it('goes before the second h2 when there are at least three', () => {
    expect(pickIndex(blocks('p', 'h2', 'p', 'p', 'h2', 'p', 'h2', 'p'))).toBe(4);
  });

  it('slides past a demo block next to the second h2', () => {
    // Index 4 follows a pre and index 5 follows the heading, so the first boundary that fits is 6
    expect(pickIndex(blocks('h2', 'p', 'p', 'pre', 'h2', 'p', 'p', 'h2', 'p'))).toBe(6);
  });

  it('returns nothing under eight blocks when there are fewer than three h2', () => {
    expect(pickIndex(blocks('p', 'p', 'p', 'h2', 'p', 'p', 'p'))).toBeUndefined();
  });

  it('uses about 40% of a long body without headings', () => {
    expect(pickIndex(blocks(...Array<string>(10).fill('p')))).toBe(4);
  });

  it('never lands right after a heading', () => {
    // Target index 4 follows an h3, so the search moves on to index 5
    expect(pickIndex(blocks('p', 'p', 'p', 'h3', 'p', 'p', 'p', 'p', 'p', 'p'))).toBe(5);
  });

  it.each(['pre', 'figure', 'table', 'iframe', 'video'])('never sits next to a %s', (tag) => {
    const body = blocks('p', 'p', 'p', 'p', tag, 'p', 'p', 'p', 'p', 'p');
    const index = pickIndex(body);
    expect(index).toBeDefined();
    expect(index).not.toBe(4);
    expect(index).not.toBe(5);
  });

  it('never sits next to a code card', () => {
    const card: Block = { type: 'element', tagName: 'div', properties: { className: ['code-card'] }, children: [] };
    const index = pickIndex(blocks('p', 'p', 'p', 'p', card, 'p', 'p', 'p', 'p', 'p'));
    expect(index).toBeDefined();
    expect(index).not.toBe(4);
    expect(index).not.toBe(5);
  });

  it('never sits next to raw html', () => {
    const body = blocks('p', 'p', 'p', 'p', raw, 'p', 'p', 'p', 'p', 'p');
    const index = pickIndex(body);
    expect(index).toBeDefined();
    expect(index).not.toBe(4);
    expect(index).not.toBe(5);
  });

  it('returns nothing when every boundary is next to a demo', () => {
    expect(pickIndex(blocks('pre', 'pre', 'pre', 'pre', 'pre', 'pre', 'pre', 'pre'))).toBeUndefined();
  });
});

describe('rehypeInArticleAd', () => {
  const plugin = rehypeInArticleAd({ slot: '123', labels: { pt: 'Publicidade', en: 'Advertisement' } });
  const post = (dir: string) => new URL(`file://${process.cwd()}/content/${dir}/x.md`);
  const body = 'a\n\n## b\n\nc\n\n## d\n\ne\n\n## f\n\ng\n';

  it('inserts one labelled slot in a post', async () => {
    const { html } = await markdownToHtml(body, { hastPlugins: [plugin], fileURL: post('posts') });
    expect(html.match(/<aside/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Publicidade"');
    expect(html).toContain('data-ad-slot="123"');
  });

  it('labels English posts in English', async () => {
    const { html } = await markdownToHtml(body, { hastPlugins: [plugin], fileURL: post('posts-en') });
    expect(html).toContain('aria-label="Advertisement"');
  });

  it('skips documents that are not posts', async () => {
    const { html } = await markdownToHtml(body, { hastPlugins: [plugin], fileURL: post('pages') });
    expect(html).not.toContain('<aside');
  });
});
