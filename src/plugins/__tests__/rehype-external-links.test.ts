import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';
import rehypeExternalLinks from '../rehype-external-links.ts';

const render = async (markdown: string) =>
  (await markdownToHtml(markdown, { hastPlugins: [rehypeExternalLinks()] })).html;

describe('rehypeExternalLinks (markdown links)', () => {
  it('opens external links in a new tab with noopener', async () => {
    const html = await render('[a](https://example.com/x)');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener"');
  });

  it('treats protocol-relative links to other hosts as external', async () => {
    expect(await render('[a](//example.com/x)')).toContain('target="_blank"');
  });

  it.each([
    ['https://felipefialho.com/blog/'],
    ['https://www.felipefialho.com/blog/'],
    ['//felipefialho.com/blog/'],
    ['/blog/'],
    ['relative/page'],
    ['#hash'],
    ['mailto:me@example.com'],
  ])('leaves %s alone', async (href) => {
    const html = await render(`[a](${href})`);
    expect(html).not.toContain('target=');
    expect(html).not.toContain('rel=');
  });

  it('does not throw on a malformed absolute URL', async () => {
    // `https://` matches the absolute pattern but is rejected by the URL parser
    const html = await render('<div><a href="https://">x</a></div>');
    expect(html).not.toContain('target=');
  });
});

describe('rehypeExternalLinks (raw html anchors)', () => {
  it('patches external anchors inside html blocks', async () => {
    const html = await render('<div><a href="https://example.com/x" rel="nofollow">x</a></div>');
    expect(html).toContain('target="_blank"');
    expect(html).toMatch(/rel="nofollow noopener"/);
  });

  it('keeps a preset target and does not duplicate noopener', async () => {
    const html = await render('<div><a href="https://example.com" target="_self" rel="noopener">x</a></div>');
    expect(html).toContain('target="_self"');
    expect(html).not.toContain('_blank');
    expect(html.match(/noopener/g)).toHaveLength(1);
  });

  it('leaves internal anchors and html without anchors untouched', async () => {
    const html = await render('<div><a href="/blog/">x</a><span>y</span></div>');
    expect(html).not.toContain('target=');
    expect(html).not.toContain('noopener');
  });
});
