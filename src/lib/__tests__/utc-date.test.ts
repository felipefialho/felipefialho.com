import { describe, expect, it } from 'vitest';
import { utcDate } from '../utc-date.ts';

describe('utcDate', () => {
  it('reads a quoted date-time without offset as UTC', () => {
    expect(utcDate.parse('2019-09-05 06:46:38').toISOString()).toBe('2019-09-05T06:46:38.000Z');
    expect(utcDate.parse('2019-09-05T06:46:38').toISOString()).toBe('2019-09-05T06:46:38.000Z');
  });

  it('reads a bare date as UTC midnight', () => {
    expect(utcDate.parse('2017-12-31').toISOString()).toBe('2017-12-31T00:00:00.000Z');
  });

  it('respects an explicit Z or offset', () => {
    expect(utcDate.parse('2019-09-05T06:46:38Z').toISOString()).toBe('2019-09-05T06:46:38.000Z');
    expect(utcDate.parse('2019-09-05T06:46:38+02:00').toISOString()).toBe('2019-09-05T04:46:38.000Z');
  });

  it('passes Date objects through, as unquoted YAML timestamps arrive', () => {
    const date = new Date('2020-01-02T03:04:05Z');
    expect(utcDate.parse(date).toISOString()).toBe('2020-01-02T03:04:05.000Z');
  });

  it('rejects text that is not a date', () => {
    expect(utcDate.safeParse('not a date').success).toBe(false);
  });
});
