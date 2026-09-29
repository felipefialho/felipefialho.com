import { describe, expect, it } from 'vitest';
import { formatDate, formatMonth, isoDate, localePath, t } from './i18n.ts';

const sep28 = new Date('2020-09-28T12:00:00Z');
// Late on New Year's Eve in UTC, already 2018 in Asia/Tokyo: formatting must not follow the local zone
const yearEnd = new Date('2017-12-31T23:30:00Z');
const yearStart = new Date('2018-01-01T00:30:00Z');

describe('formatDate', () => {
  it('formats month and year per language, never the day', () => {
    expect(formatDate(sep28, 'pt')).toBe('setembro de 2020');
    expect(formatDate(sep28, 'en')).toBe('September 2020');
  });

  it('keeps the UTC month across the year boundary', () => {
    expect(formatDate(yearEnd, 'en')).toBe('December 2017');
    expect(formatDate(yearStart, 'en')).toBe('January 2018');
    expect(formatDate(yearStart, 'pt')).toBe('janeiro de 2018');
  });
});

describe('formatMonth', () => {
  it('abbreviates the month without the dot in Portuguese', () => {
    expect(formatMonth(sep28, 'pt')).toBe('set');
  });

  it('abbreviates the month in English', () => {
    expect(formatMonth(sep28, 'en')).toBe('Sep');
  });

  it('keeps the UTC month across the year boundary', () => {
    expect(formatMonth(yearEnd, 'en')).toBe('Dec');
    expect(formatMonth(yearEnd, 'pt')).toBe('dez');
    expect(formatMonth(yearStart, 'en')).toBe('Jan');
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
