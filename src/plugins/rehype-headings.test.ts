import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';
import rehypeHeadings, { slugify } from './rehype-headings.ts';

const render = async (markdown: string) => (await markdownToHtml(markdown, { hastPlugins: [rehypeHeadings] })).html;

describe('slugify', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('drops punctuation but keeps letters with accents, digits and hyphens', () => {
    expect(slugify('Você já usa CSS3? Sim - talvez!')).toBe('você-já-usa-css3-sim---talvez');
  });

  it('returns an empty string when nothing survives', () => {
    expect(slugify('???')).toBe('');
  });
});

describe('rehypeHeadings', () => {
  it('turns a body h1 into h2 and wraps h2 and h3 in a link to their id', async () => {
    const html = await render('# Title\n\n### Sub\n');
    expect(html).toContain('<h2 id="title"><a href="#title">Title</a></h2>');
    expect(html).toContain('<h3 id="sub"><a href="#sub">Sub</a></h3>');
  });

  it('gives deeper headings an id without wrapping them', async () => {
    expect(await render('#### Deep\n')).toContain('<h4 id="deep">Deep</h4>');
  });

  it('dedupes repeated headings with a numeric suffix', async () => {
    const html = await render('## Same\n\n## Same\n\n## Same\n');
    expect(html).toContain('id="same"');
    expect(html).toContain('id="same-1"');
    expect(html).toContain('id="same-2"');
  });

  it('never takes an id reserved by the page chrome', async () => {
    const html = await render('## Search\n\n## Content\n');
    expect(html).toContain('id="search-1"');
    expect(html).toContain('id="content-1"');
    expect(html).not.toContain('id="search"');
  });

  it('falls back to "section" for headings without slug characters', async () => {
    expect(await render('## ???\n')).toContain('id="section"');
  });
});
