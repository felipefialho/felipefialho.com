import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const REDIRECT_TARGET = /^(?:https:\/\/felipefialho\.com)?(\/blog\/[^\s*:]*)/;
// Section pages that exist besides individual posts
const KNOWN_PAGES = new Set(['/blog/']);

// Same rule as slugFromPath in content.config.ts
const slugOf = (entry: string) =>
  entry
    .replace(/\/index\.md$/, '')
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '');

const entries = (dir: string) =>
  readdirSync(path.join(ROOT, 'content', dir), { withFileTypes: true })
    .filter((item) => (item.isDirectory() ? true : item.name.endsWith('.md')))
    .map((item) => (item.isDirectory() ? `${item.name}/index.md` : item.name));

const frontmatter = (dir: string, entry: string) =>
  /^---\n([\s\S]*?)\n---/.exec(readFileSync(path.join(ROOT, 'content', dir, entry), 'utf8'))?.[1] ?? '';

const translationOf = (dir: string, entry: string) =>
  /^translationOf:\s*["']?([^"'\n]+?)["']?\s*$/m.exec(frontmatter(dir, entry))?.[1];

const duplicates = (slugs: string[]) => slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

const ptEntries = entries('posts');
const enEntries = entries('posts-en');
const ptSlugs = ptEntries.map(slugOf);
const enSlugs = enEntries.map(slugOf);

const redirects = readFileSync(path.join(ROOT, 'public', '_redirects'), 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split(/\s+/));

describe('content slugs', () => {
  it('finds posts to check', () => {
    expect(ptSlugs.length).toBeGreaterThan(0);
    expect(enSlugs.length).toBeGreaterThan(0);
  });

  it('keeps PT slugs unique', () => {
    expect(duplicates(ptSlugs)).toEqual([]);
  });

  it('keeps EN slugs unique', () => {
    expect(duplicates(enSlugs)).toEqual([]);
  });
});

describe('translations', () => {
  it.each(enEntries.map((entry) => [slugOf(entry), entry]))('%s points to an existing PT post', (_slug, entry) => {
    const target = translationOf('posts-en', entry);
    expect(target, 'translationOf is missing').toBeTruthy();
    expect(ptSlugs).toContain(target);
  });

  it('has at most one translation per PT post', () => {
    const targets = enEntries.map((entry) => translationOf('posts-en', entry) ?? '');
    expect(duplicates(targets)).toEqual([]);
  });
});

describe('_redirects', () => {
  const internal = redirects
    .map(([, target]) => REDIRECT_TARGET.exec(target)?.[1])
    .filter((target): target is string => Boolean(target));

  it('has internal targets to check', () => {
    expect(internal.length).toBeGreaterThan(0);
  });

  it.each([...new Set(internal)].map((target) => [target]))('%s points to an existing page', (target) => {
    const slug = /^\/blog\/([^/]+)\/$/.exec(target)?.[1];
    expect(slug ? ptSlugs.includes(slug) : KNOWN_PAGES.has(target)).toBe(true);
  });
});
