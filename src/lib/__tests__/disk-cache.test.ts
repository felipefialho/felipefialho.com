import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cached, hashOf } from '../disk-cache.ts';

describe('hashOf', () => {
  it('is stable for the same parts', () => {
    expect(hashOf('a', 'b')).toBe(hashOf('a', 'b'));
  });

  it('separates parts so that moving a character between them changes the digest', () => {
    expect(hashOf('ab', 'c')).not.toBe(hashOf('a', 'bc'));
  });

  it('treats strings and bytes with the same content alike', () => {
    expect(hashOf('abc')).toBe(hashOf(Buffer.from('abc')));
  });
});

describe('cached', () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'disk-cache-'));
  });

  afterEach(() => rm(dir, { recursive: true, force: true }));

  it('produces on a miss and reuses the stored bytes on the next call', async () => {
    const produce = vi.fn(async () => Buffer.from('card'));

    const first = await cached(dir, 'key', produce);
    const second = await cached(dir, 'key', produce);

    expect(first.toString()).toBe('card');
    expect(second.toString()).toBe('card');
    expect(produce).toHaveBeenCalledTimes(1);
  });

  it('keeps different keys apart', async () => {
    await cached(dir, 'one', async () => Buffer.from('1'));

    const two = await cached(dir, 'two', async () => Buffer.from('2'));

    expect(two.toString()).toBe('2');
  });

  it('leaves no temporary files behind', async () => {
    await cached(dir, 'key', async () => Buffer.from('card'));

    expect(await readdir(dir)).toEqual(['key']);
  });

  it('still returns the bytes when the cache directory cannot be written', async () => {
    const unwritable = join(dir, 'key');
    await cached(dir, 'key', async () => Buffer.from('taken'));

    // A file where the directory should be makes mkdir fail
    const data = await cached(unwritable, 'other', async () => Buffer.from('fresh'));

    expect(data.toString()).toBe('fresh');
  });
});
