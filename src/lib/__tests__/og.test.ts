import { describe, expect, it } from 'vitest';
import { countLines, fitTitleSize } from '../og.ts';

describe('fitTitleSize', () => {
  it('keeps the largest size for the board sample title (68 chars, 3 lines)', () => {
    expect(fitTitleSize('Componentes nativos em 2026: o que o HTML e o CSS já fazem sozinhos')).toBe(72);
  });

  it('keeps short titles at the largest size', () => {
    expect(fitTitleSize('Hello')).toBe(72);
  });

  it('shrinks titles that no longer fit in three lines at 72px', () => {
    const long = 'Como eu reconstruí meu blog em 2026 usando Astro, vibe coding, muito café e um piano de bônus';
    expect(fitTitleSize(long)).toBeLessThan(72);
  });

  it('falls back to the smallest size for very long titles', () => {
    expect(fitTitleSize('palavra '.repeat(40).trim())).toBe(48);
  });
});

describe('countLines', () => {
  it('counts a single line for short text', () => {
    expect(countLines('short title', 72)).toBe(1);
  });

  it('does not split words that exceed a line', () => {
    expect(countLines('a'.repeat(200), 72)).toBe(1);
  });
});
