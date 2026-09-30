import { describe, expect, it } from 'vitest';
import { suggestPost, type PostSuggestion } from '../suggest-post.ts';

const post = (slug: string): PostSuggestion => ({ slug, title: slug, lang: 'pt', href: `/blog/${slug}/` });
const posts = [post('componentes-nativos-html-css-2026'), post('como-foi-reconstruir-meu-blog'), post('carreira-staff-engineer')];

describe('suggestPost', () => {
  it('matches a partial slug', () => {
    expect(suggestPost('/blog/componentes-nativos', posts)?.slug).toBe('componentes-nativos-html-css-2026');
  });

  it('ignores accents, case and extensions', () => {
    expect(suggestPost('/blog/Reconstruir-Meu-Blog.html', posts)?.slug).toBe('como-foi-reconstruir-meu-blog');
  });

  it('tolerates a truncated word', () => {
    expect(suggestPost('/blog/carreira-staff-eng', posts)?.slug).toBe('carreira-staff-engineer');
  });

  it('returns nothing below the threshold', () => {
    expect(suggestPost('/blog/o-post-que-voce-procurou', posts)).toBeUndefined();
    expect(suggestPost('/', posts)).toBeUndefined();
  });
});
