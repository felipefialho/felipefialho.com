import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

const dir = mkdtempSync(path.join(tmpdir(), 'image-size-'));

vi.mock('../paths.ts', () => ({ PUBLIC_DIR: dir }));

const { publicImageSize } = await import('../image-size.ts');

const png = (width: number, height: number) =>
  sharp({ create: { width, height, channels: 3, background: '#fff' } }).png().toBuffer();

beforeAll(async () => {
  mkdirSync(path.join(dir, 'assets'));
  writeFileSync(path.join(dir, 'assets', 'wide.png'), await png(40, 20));
  writeFileSync(path.join(dir, 'assets', 'with space.png'), await png(10, 30));
  const rotated = await sharp({ create: { width: 40, height: 20, channels: 3, background: '#fff' } })
    .withMetadata({ orientation: 6 })
    .jpeg()
    .toBuffer();
  writeFileSync(path.join(dir, 'assets', 'rotated.jpg'), rotated);
});

afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('publicImageSize', () => {
  it('reads the intrinsic size of a public file', () => {
    expect(publicImageSize('/assets/wide.png')).toEqual({ width: 40, height: 20 });
  });

  it('swaps the sides for EXIF orientations of 5 or more', () => {
    expect(publicImageSize('/assets/rotated.jpg')).toEqual({ width: 20, height: 40 });
  });

  it('decodes percent-encoded paths', () => {
    expect(publicImageSize('/assets/with%20space.png')).toEqual({ width: 10, height: 30 });
  });

  it('strips the query and hash before resolving the file', () => {
    expect(publicImageSize('/assets/wide.png?v=2#top')).toEqual({ width: 40, height: 20 });
  });

  it('returns null for a missing file', () => {
    expect(publicImageSize('/assets/missing.png')).toBeNull();
  });

  it('caches results, including misses', async () => {
    const file = path.join(dir, 'assets', 'late.png');
    expect(publicImageSize('/assets/late.png')).toBeNull();
    writeFileSync(file, await png(5, 5));
    expect(publicImageSize('/assets/late.png')).toBeNull();
  });
});
