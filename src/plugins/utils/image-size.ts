import { readFileSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import { PUBLIC_DIR } from './paths.ts';

export interface Size {
  width: number;
  height: number;
}

const cache = new Map<string, Size | null>();

function readSize(src: string): Size | null {
  try {
    const { width, height, orientation } = imageSize(readFileSync(path.join(PUBLIC_DIR, decodeURI(src))));
    // EXIF orientations 5 to 8 are rotated by 90 degrees
    return orientation && orientation >= 5 ? { width: height, height: width } : { width, height };
  } catch {
    return null;
  }
}

/** Intrinsic size of a file served from `public/`, or null when it cannot be read. */
export function publicImageSize(src: string): Size | null {
  const key = src.split(/[?#]/)[0];
  if (!cache.has(key)) cache.set(key, readSize(key));
  return cache.get(key) ?? null;
}
