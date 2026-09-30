import { markdownToHtml } from 'satteri';
import { describe, expect, it } from 'vitest';
import rehypeBlockquoteCite from '../rehype-blockquote-cite.ts';

const render = async (markdown: string) => (await markdownToHtml(markdown, { hastPlugins: [rehypeBlockquoteCite] })).html;

describe('rehypeBlockquoteCite', () => {
  it('marks a closing emphasized line as the citation', async () => {
    expect(await render('> Quote.\n>\n> *me, 2014*\n')).toContain('<p class="cite"><em>me, 2014</em></p>');
  });

  it('accepts a leading dash', async () => {
    expect(await render('> Quote.\n>\n> — *me, 2014*\n')).toContain('class="cite"');
  });

  it('leaves a quote without a citation alone', async () => {
    expect(await render('> Quote.\n>\n> More *text* here.\n')).not.toContain('cite');
  });

  it('never treats a lone emphasized paragraph as a citation', async () => {
    expect(await render('> *only this*\n')).not.toContain('cite');
  });
});
