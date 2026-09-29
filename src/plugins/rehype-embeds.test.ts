import { describe, expect, it } from 'vitest';
import { transformEmbeds } from './rehype-embeds.ts';
import { decodeEntities } from './utils/html-tags.ts';

const iframes = (html: string) => html.match(/<iframe\b/g)?.length ?? 0;
const withoutSrcdoc = (html: string) => html.replace(/\ssrcdoc="[^"]*"/, '');
const attr = (html: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(html)?.[1];

describe('transformEmbeds, YouTube', () => {
  it.each([
    ['youtube.com', 'https://www.youtube.com/embed/j5VcN8A_zqQ'],
    ['youtube-nocookie.com', 'https://www.youtube-nocookie.com/embed/j5VcN8A_zqQ?rel=0'],
    ['protocol-relative', '//www.youtube.com/embed/j5VcN8A_zqQ'],
  ])('turns a %s iframe into a facade that loads nothing', (_name, src) => {
    const out = transformEmbeds(`<iframe width="650" height="400" src="${src}" allowfullscreen></iframe>`, 'pt');
    expect(out).toContain('<figure class="embed embed-video">');
    expect(attr(out, 'src')).toBe('https://www.youtube-nocookie.com/embed/j5VcN8A_zqQ?autoplay=1');
    expect(attr(out, 'srcdoc')).toContain('Assistir v');
    expect(attr(out, 'loading')).toBe('lazy');
    expect(out).not.toContain('i.ytimg.com');
    expect(withoutSrcdoc(out)).not.toContain('width=');
  });

  it('uses the authored title, decoded once and escaped for the attribute', () => {
    const out = transformEmbeds('<iframe src="https://www.youtube.com/embed/abcdef123" title="Tom &amp; Jerry &quot;live&quot;"></iframe>', 'en');
    expect(attr(out, 'title')).toBe('Tom &amp; Jerry &quot;live&quot;');
    expect(decodeEntities(attr(out, 'srcdoc') ?? '')).toContain('<span>Tom &amp; Jerry &quot;live&quot;</span>');
  });

  it('falls back to a localized title', () => {
    expect(attr(transformEmbeds('<iframe src="https://www.youtube.com/embed/abcdef123"></iframe>', 'pt'), 'title')).toBe('Vídeo do YouTube');
    expect(attr(transformEmbeds('<iframe src="https://www.youtube.com/embed/abcdef123"></iframe>', 'en'), 'title')).toBe('YouTube video');
  });

  it('replaces a padding-bottom wrapper div with the figure', () => {
    const html = '<div style="position:relative;padding-bottom:56.25%;height:0"><iframe src="https://www.youtube.com/embed/abcdef123"></iframe></div>';
    const out = transformEmbeds(html, 'pt');
    expect(out).toMatch(/^<figure class="embed embed-video"><iframe /);
    expect(out).not.toContain('<div');
    expect(out).not.toContain('padding-bottom');
  });

  it('does not nest a figure inside an existing figure', () => {
    const out = transformEmbeds('<figure><iframe src="https://www.youtube.com/embed/abcdef123"></iframe></figure>', 'pt');
    expect(out.match(/<figure/g)).toHaveLength(1);
    expect(out).toContain('srcdoc=');
  });

  it('wraps two iframes in one string independently', () => {
    const html = '<iframe src="https://www.youtube.com/embed/aaaaaa1"></iframe>\n<iframe src="https://www.youtube.com/embed/bbbbbb2"></iframe>';
    const out = transformEmbeds(html, 'en');
    expect(iframes(out)).toBe(2);
    expect(out.match(/<figure class="embed embed-video">/g)).toHaveLength(2);
    expect(out).toContain('/embed/aaaaaa1?autoplay=1');
    expect(out).toContain('/embed/bbbbbb2?autoplay=1');
  });

  it('keeps a > inside a quoted attribute as part of the tag', () => {
    const out = transformEmbeds('<iframe title="a > b" src="https://www.youtube.com/embed/abcdef123"></iframe>', 'en');
    expect(attr(out, 'title')).toBe('a > b');
    expect(iframes(out)).toBe(1);
  });
});

describe('transformEmbeds, other iframes', () => {
  it('turns a CodePen iframe into a facade with the real URL as source', () => {
    const src = 'https://codepen.io/felipefialho/embed/yLgxdzR?default-tab=result';
    const out = transformEmbeds(`<iframe src="${src}" title="Pen" height="400"></iframe>`, 'en');
    expect(attr(out, 'src')).toBe(src);
    expect(attr(out, 'srcdoc')).toContain('Load pen on CodePen: Pen');
    expect(attr(out, 'loading')).toBe('lazy');
    expect(out).not.toContain('<figure');
  });

  it('wraps a padded CodePen iframe in an embed-codepen figure and drops its sizing', () => {
    const html = '<div style="padding-bottom: 60%"><iframe src="https://codepen.io/a/embed/b" width="100%" height="400" style="position:absolute"></iframe></div>';
    const out = transformEmbeds(html, 'pt');
    expect(out).toMatch(/^<figure class="embed embed-codepen">/);
    expect(withoutSrcdoc(out)).not.toMatch(/\s(?:width|height|style)=/);
  });

  it('falls back to a localized generic title', () => {
    expect(attr(transformEmbeds('<iframe src="https://example.com/x"></iframe>', 'pt'), 'title')).toBe('Conteúdo incorporado');
    expect(attr(transformEmbeds('<iframe src="https://example.com/x"></iframe>', 'en'), 'title')).toBe('Embedded content');
  });

  it('escapes quotes and ampersands in the title once, in the attribute and in the facade', () => {
    const out = transformEmbeds('<iframe src="https://example.com/x" title="Q&amp;A &quot;live&quot;"></iframe>', 'en');
    expect(attr(out, 'title')).toBe('Q&amp;A &quot;live&quot;');
    // The srcdoc attribute holds an escaped document, whose own text is escaped exactly once
    expect(decodeEntities(attr(out, 'srcdoc') ?? '')).toContain('<span>Q&amp;A &quot;live&quot;</span>');
  });

  it('leaves an authored srcdoc alone', () => {
    const out = transformEmbeds('<iframe src="https://example.com/x" srcdoc="&lt;p&gt;hi&lt;/p&gt;"></iframe>', 'en');
    expect(attr(out, 'srcdoc')).toBe('&lt;p&gt;hi&lt;/p&gt;');
  });

  it('does not touch html without iframes', () => {
    const html = '<p>hello</p><div style="padding-bottom:1px">x</div>';
    expect(transformEmbeds(html, 'pt')).toBe(html);
  });
});
