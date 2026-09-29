import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const existing = vi.hoisted(() => new Set<string>());

vi.mock('node:fs', async (importOriginal) => ({
  ...(await importOriginal<typeof import('node:fs')>()),
  existsSync: (file: string) => existing.has(file),
}));

const { rewriteSrc } = await import('./remark-legacy-images.ts');

const PUBLIC = path.resolve(process.cwd(), 'public');
const MARKDOWN = path.resolve(process.cwd(), 'content/posts/2020-01-01-post.md');

beforeEach(() => {
  existing.clear();
  existing.add(path.join(PUBLIC, 'assets', 'posts', 'foo bar.png'));
  existing.add(path.join(PUBLIC, 'assets', 'posts', 'legacy.jpg'));
});

describe('rewriteSrc', () => {
  it.each([
    ['empty', ''],
    ['remote', 'https://example.com/legacy.jpg'],
    ['protocol-relative', '//example.com/legacy.jpg'],
    ['data URI', 'data:image/png;base64,AAAA'],
    ['hash', '#legacy.jpg'],
    ['already migrated', '/assets/posts/legacy.jpg'],
  ])('leaves a %s source untouched', (_name, src) => {
    expect(rewriteSrc(src, MARKDOWN)).toBeUndefined();
  });

  it('rewrites a legacy reference to the migrated basename', () => {
    expect(rewriteSrc('../images/legacy.jpg', MARKDOWN)).toBe('/assets/posts/legacy.jpg');
    expect(rewriteSrc('/images/2016/legacy.jpg', MARKDOWN)).toBe('/assets/posts/legacy.jpg');
  });

  it('URL-encodes the basename and decodes the reference first', () => {
    expect(rewriteSrc('img/foo%20bar.png', MARKDOWN)).toBe('/assets/posts/foo%20bar.png');
    expect(rewriteSrc('img/foo bar.png', MARKDOWN)).toBe('/assets/posts/foo%20bar.png');
  });

  it('ignores the query string and hash when matching', () => {
    expect(rewriteSrc('legacy.jpg?raw=1#top', MARKDOWN)).toBe('/assets/posts/legacy.jpg');
  });

  it('keeps a reference that already resolves to a file', () => {
    existing.add(path.resolve(path.dirname(MARKDOWN), 'legacy.jpg'));
    expect(rewriteSrc('legacy.jpg', MARKDOWN)).toBeUndefined();
    existing.add(path.join(PUBLIC, 'other', 'legacy.jpg'));
    expect(rewriteSrc('/other/legacy.jpg', MARKDOWN)).toBeUndefined();
  });

  it('keeps a reference whose basename was never migrated', () => {
    expect(rewriteSrc('img/missing.png', MARKDOWN)).toBeUndefined();
  });

  it('survives a malformed percent escape', () => {
    expect(rewriteSrc('img/100%.png', MARKDOWN)).toBeUndefined();
  });
});
