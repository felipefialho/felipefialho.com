import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Stable digest of any mix of strings and bytes; each part is delimited so ["ab", "c"] differs from ["a", "bc"]. */
export function hashOf(...parts: (string | Uint8Array)[]): string {
  const hash = createHash('sha256');
  for (const part of parts) hash.update(part).update('\0');
  return hash.digest('hex');
}

/** Returns the stored bytes for a key, or produces them once and stores them for the next run. */
export async function cached(dir: string, key: string, produce: () => Promise<Buffer>): Promise<Buffer> {
  const file = join(dir, key);
  try {
    return await readFile(file);
  } catch {
    // Miss: fall through and produce it
  }

  const data = await produce();
  try {
    await mkdir(dir, { recursive: true });
    // Write then rename so a concurrent or interrupted build never reads a half-written file
    const temp = `${file}.${process.pid}.tmp`;
    await writeFile(temp, data);
    await rename(temp, file);
  } catch {
    // The cache is an optimization: a read-only disk must not fail the build
  }
  return data;
}
