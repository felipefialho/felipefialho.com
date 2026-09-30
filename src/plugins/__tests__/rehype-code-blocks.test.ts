import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';
import rehypeCodeBlocks from '../rehype-code-blocks.ts';

const labels = {
  pt: { copy: 'copiar', copied: 'copiado', failed: 'erro' },
  en: { copy: 'copy', copied: 'copied', failed: 'failed' },
};

const render = async (markdown: string, fileURL?: URL) =>
  (await markdownToHtml(markdown, { hastPlugins: [rehypeCodeBlocks({ labels })], fileURL })).html;

describe('rehypeCodeBlocks', () => {
  it('wraps a code block in a card with a copy button', async () => {
    const html = await render('```css\na {}\n```\n');
    expect(html).toContain('<div class="code-card"><div class="code-bar"');
    expect(html).toContain('data-copy-code=""');
    expect(html).toContain('>copiar</button>');
    expect(html.match(/code-card/g)).toHaveLength(1);
  });

  it('uses the English labels for translated posts', async () => {
    const html = await render('```\nx\n```\n', new URL('file:///repo/content/posts-en/a.md'));
    expect(html).toContain('>copy</button>');
  });

  it('wraps each block once', async () => {
    const html = await render('```js\na\n```\n\n```js\nb\n```\n');
    expect(html.match(/class="code-card"/g)).toHaveLength(2);
  });
});
