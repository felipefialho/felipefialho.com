import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PALETTE } from '../og.ts';

const tokens = readFileSync('src/styles/tokens.css', 'utf8');

// Dark half of `--name: light-dark(<light>, <dark>)`
const darkValue = (name: string): string | undefined =>
  new RegExp(`--${name}:\\s*light-dark\\([^,]+,\\s*(#[0-9a-f]{3,8})\\)`, 'i').exec(tokens)?.[1];

describe('OG palette', () => {
  it.each(Object.entries(PALETTE))('%s matches the dark value in tokens.css', (name, value) => {
    expect(darkValue(name)).toBe(value);
  });
});
