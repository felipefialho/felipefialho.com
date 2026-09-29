import { describe, expect, it } from 'vitest';
import { formatDate, formatDayMonth, isoDate, localePath, t } from './i18n.ts';

const sep28 = new Date('2020-09-28T12:00:00Z');
// Late on New Year's Eve in UTC, already 2018 in Asia/Tokyo: formatting must not follow the local zone
const yearEnd = new Date('2017-12-31T23:30:00Z');
const yearStart = new Date('2018-01-01T00:30:00Z');

describe('formatDate', () => {
  it('formats the long date per language', () => {
    expect(formatDate(sep28, 'pt')).toBe('28 de setembro de 2020');
    expect(formatDate(sep28, 'en')).toBe('September 28, 2020');
  });

  it('omits the year in the short style', () => {
    expect(formatDate(sep28, 'en', 'short')).toBe('Sep 28');
    expect(formatDate(sep28, 'pt', 'short')).not.toContain('2020');
  });

  it('keeps the UTC day across the year boundary', () => {
    expect(formatDate(yearEnd, 'en')).toBe('December 31, 2017');
    expect(formatDate(yearStart, 'en')).toBe('January 1, 2018');
  });
});

describe('formatDayMonth', () => {
  it('writes day then month in Portuguese, without the abbreviation dot', () => {
    expect(formatDayMonth(sep28, 'pt')).toBe('28 set');
  });

  it('writes month then day in English', () => {
    expect(formatDayMonth(sep28, 'en')).toBe('Sep 28');
  });

  it('keeps the UTC day across the year boundary', () => {
    expect(formatDayMonth(yearEnd, 'en')).toBe('Dec 31');
    expect(formatDayMonth(yearEnd, 'pt')).toBe('31 dez');
    expect(formatDayMonth(yearStart, 'en')).toBe('Jan 1');
  });
});

describe('isoDate', () => {
  it('returns the UTC calendar day', () => {
    expect(isoDate(yearEnd)).toBe('2017-12-31');
    expect(isoDate(yearStart)).toBe('2018-01-01');
  });
});

describe('localePath', () => {
  it('keeps Portuguese at the root and prefixes English', () => {
    expect(localePath('pt', '/blog/')).toBe('/blog/');
    expect(localePath('en', '/blog/')).toBe('/en/blog/');
  });
});

describe('t', () => {
  it('has the same keys in both languages', () => {
    const keys = (lang: 'pt' | 'en') => Object.keys(t(lang)).sort((a, b) => a.localeCompare(b));
    expect(keys('en')).toEqual(keys('pt'));
  });
});
