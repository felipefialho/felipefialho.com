import { afterEach, describe, expect, it, vi } from 'vitest';

const publicImageSize = vi.hoisted(() => vi.fn());

vi.mock('./utils/image-size.ts', () => ({ publicImageSize }));

const load = async (netlify: boolean) => {
  vi.resetModules();
  vi.stubEnv('NETLIFY', netlify ? 'true' : '');
  return (await import('./rehype-image-attrs.ts')).imagePatch;
};

const SRC = '/assets/posts/photo.png';
const SIZE = { width: 1000, height: 500 };

afterEach(() => {
  vi.unstubAllEnvs();
  publicImageSize.mockReset();
});

describe('imagePatch', () => {
  it('always sets async decoding and lazy loading', async () => {
    const imagePatch = await load(false);
    expect(imagePatch({ src: 'https://example.com/a.png' })).toEqual({ decoding: 'async', loading: 'lazy' });
  });

  it.each([['eager'], ['lazy']])('keeps an authored loading="%s"', async (loading) => {
    const imagePatch = await load(false);
    expect(imagePatch({ loading })).not.toHaveProperty('loading');
  });

  it('treats a valueless or empty loading as not authored', async () => {
    const imagePatch = await load(false);
    expect(imagePatch({ loading: true })).toHaveProperty('loading', 'lazy');
    expect(imagePatch({ loading: '' })).toHaveProperty('loading', 'lazy');
  });

  it('adds both dimensions when neither is authored', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const imagePatch = await load(false);
    expect(imagePatch({ src: SRC })).toMatchObject({ width: '1000', height: '500' });
  });

  it('derives the height from an authored width, keeping the ratio', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const patch = (await load(false))({ src: SRC, width: '200' });
    expect(patch.height).toBe('100');
    expect(patch).not.toHaveProperty('width');
  });

  it('derives the width from an authored height, keeping the ratio', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const patch = (await load(false))({ src: SRC, height: 100 });
    expect(patch.width).toBe('200');
    expect(patch).not.toHaveProperty('height');
  });

  it('leaves both dimensions alone when both are authored', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const patch = (await load(false))({ src: SRC, width: '300', height: '300' });
    expect(patch).not.toHaveProperty('width');
    expect(patch).not.toHaveProperty('height');
  });

  it('does not derive from a non-numeric width such as a percentage', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const patch = (await load(false))({ src: SRC, width: '100%' });
    expect(patch).not.toHaveProperty('height');
  });

  it('skips sizing for non-local sources and unreadable files', async () => {
    const imagePatch = await load(false);
    expect(imagePatch({ src: '/other/a.png' })).toEqual({ decoding: 'async', loading: 'lazy' });
    expect(publicImageSize).not.toHaveBeenCalled();
    publicImageSize.mockReturnValue(null);
    expect(imagePatch({ src: SRC })).toEqual({ decoding: 'async', loading: 'lazy' });
  });

  describe('on the image CDN', () => {
    it('builds src, srcset and sizes without upscaling past the intrinsic width', async () => {
      publicImageSize.mockReturnValue(SIZE);
      const patch = (await load(true))({ src: SRC });
      const cdn = (width: number) => `/.netlify/images?url=${encodeURIComponent(SRC)}&w=${width}`;
      expect(patch.src).toBe(cdn(1000));
      expect(patch.srcset).toBe(`${cdn(400)} 400w, ${cdn(700)} 700w, ${cdn(1000)} 1000w`);
      expect(patch.sizes).toBe('(min-width: 48rem) 44rem, 100vw');
    });

    it('narrows sizes to a small authored width', async () => {
      publicImageSize.mockReturnValue(SIZE);
      expect((await load(true))({ src: SRC, width: '300' }).sizes).toBe('300px');
    });

    it('keeps the column sizes for a width of 700 or more', async () => {
      publicImageSize.mockReturnValue(SIZE);
      expect((await load(true))({ src: SRC, width: '700' }).sizes).toBe('(min-width: 48rem) 44rem, 100vw');
    });

    it('leaves formats the CDN does not convert untouched', async () => {
      publicImageSize.mockReturnValue(SIZE);
      const patch = (await load(true))({ src: '/assets/posts/anim.gif' });
      expect(patch).not.toHaveProperty('srcset');
    });
  });

  it('does not use the CDN outside Netlify', async () => {
    publicImageSize.mockReturnValue(SIZE);
    const patch = (await load(false))({ src: SRC });
    expect(patch).not.toHaveProperty('srcset');
    expect(patch).not.toHaveProperty('src');
  });
});
