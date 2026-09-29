import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
export const POST_ASSETS_DIR = path.join(PUBLIC_DIR, 'assets', 'posts');

export type Lang = 'pt' | 'en';

export const toFilePath = (fileURL: URL | undefined): string | undefined =>
  fileURL ? fileURLToPath(fileURL) : undefined;

const normalize = (file: string) => file.split(path.sep).join('/');

// Legacy posts live in `content/posts`, translations in `content/posts-en`
export const isPostFile = (file: string | undefined): file is string =>
  !!file && /\/content\/posts(?:-en)?\//.test(normalize(file));

export const langOf = (file: string | undefined): Lang =>
  file && normalize(file).includes('/content/posts-en/') ? 'en' : 'pt';
