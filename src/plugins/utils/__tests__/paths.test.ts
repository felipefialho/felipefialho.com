import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { PUBLIC_DIR, isPostFile, langOf, toFilePath } from '../paths.ts';

const ROOT = '/repo';

describe('langOf', () => {
  it('detects English posts', () => {
    expect(langOf(`${ROOT}/content/posts-en/2026-01-01-a.md`)).toBe('en');
  });

  it('detects Portuguese posts', () => {
    expect(langOf(`${ROOT}/content/posts/2026-01-01-a.md`)).toBe('pt');
  });

  it('falls back to Portuguese for undefined and non-post files', () => {
    expect(langOf(undefined)).toBe('pt');
    expect(langOf(`${ROOT}/content/pages/about.md`)).toBe('pt');
  });
});

describe('isPostFile', () => {
  it.each([
    [`${ROOT}/content/posts/a.md`, true],
    [`${ROOT}/content/posts-en/a.md`, true],
    [`${ROOT}/content/pages/a.md`, false],
    [`${ROOT}/content/posts-draft/a.md`, false],
    [undefined, false],
    ['', false],
  ])('%s -> %s', (file, expected) => {
    expect(isPostFile(file)).toBe(expected);
  });
});

describe('toFilePath', () => {
  it('converts a file URL and passes undefined through', () => {
    expect(toFilePath(new URL('file:///repo/a.md'))).toBe('/repo/a.md');
    expect(toFilePath(undefined)).toBeUndefined();
  });
});

describe('PUBLIC_DIR', () => {
  it('points at public/ in the working directory', () => {
    expect(PUBLIC_DIR).toBe(path.resolve(process.cwd(), 'public'));
  });
});
