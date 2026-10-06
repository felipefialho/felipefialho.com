import { describe, expect, it } from 'vitest';
import remarkReadingTime from '../remark-reading-time.ts';

type After = NonNullable<ReturnType<typeof remarkReadingTime>['after']>;

const run = (text: string, data: object) => {
  const after = remarkReadingTime().after as After;
  const ctx = { data, textContent: () => text };
  return () => after({} as never, ctx as never);
};

const words = (count: number) => Array<string>(count).fill('word').join(' ');
const withAstro = () => ({ astro: { frontmatter: {} as Record<string, unknown> } });

describe('remarkReadingTime', () => {
  it('reports at least one minute for an empty body', () => {
    const data = withAstro();
    run('', data)();
    expect(data.astro.frontmatter.minutesRead).toBe(1);
  });

  it('rounds a roughly 600 word body up to 3 minutes', () => {
    const data = withAstro();
    run(words(600), data)();
    expect(data.astro.frontmatter.minutesRead).toBe(3);
  });

  it('does nothing when Astro did not provide frontmatter data', () => {
    const data = {};
    expect(run(words(600), data)).not.toThrow();
    expect(data).toEqual({});
  });
});
