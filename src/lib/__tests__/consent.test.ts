// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CONSENT_KEY, cmpConfirmed, inCmpRegion, readConsent, saveConsent } from '../consent.ts';

const stubTimeZone = (timeZone: string) => {
  vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(
    () => ({ resolvedOptions: () => ({ timeZone }) }) as Intl.DateTimeFormat,
  );
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('readConsent', () => {
  it('returns null when nothing is stored', () => {
    expect(readConsent()).toBeNull();
  });

  it('returns a valid stored choice', () => {
    const choice = { analytics: true, ads: false, v: 1, at: '2026-01-01T00:00:00.000Z' };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    expect(readConsent()).toEqual(choice);
  });

  it('returns null on corrupt JSON', () => {
    localStorage.setItem(CONSENT_KEY, '{not json');
    expect(readConsent()).toBeNull();
  });

  it('returns null on a wrong version', () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, ads: true, v: 2 }));
    expect(readConsent()).toBeNull();
  });

  it.each([
    ['string analytics', { analytics: 'true', ads: true, v: 1 }],
    ['numeric ads', { analytics: true, ads: 1, v: 1 }],
    ['missing ads', { analytics: true, v: 1 }],
    ['missing analytics', { ads: true, v: 1 }],
  ])('returns null on %s', (_name, value) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    expect(readConsent()).toBeNull();
  });

  it.each(['null', '"text"', '42', '[]'])('returns null when the stored value is %s', (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    expect(readConsent()).toBeNull();
  });

  it('returns null when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readConsent()).toBeNull();
  });
});

describe('saveConsent', () => {
  it('stores the choice and pushes it to Consent Mode', () => {
    window.gtag = vi.fn();
    const choice = saveConsent(true, false);
    expect(choice).toMatchObject({ analytics: true, ads: false, v: 1 });
    expect(readConsent()).toEqual(choice);
    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
  });
});

describe('inCmpRegion', () => {
  it.each(['Europe/Berlin', 'Europe/London'])('is true for %s', (zone) => {
    stubTimeZone(zone);
    expect(inCmpRegion()).toBe(true);
  });

  it.each(['America/Sao_Paulo', 'Europe/Moscow'])('is false for %s', (zone) => {
    stubTimeZone(zone);
    expect(inCmpRegion()).toBe(false);
  });

  it('is true once Google\'s CMP confirmed GDPR, whatever the zone', () => {
    stubTimeZone('America/Sao_Paulo');
    localStorage.setItem('consent-cmp', '1');
    expect(inCmpRegion()).toBe(true);
    expect(cmpConfirmed()).toBe(true);
  });

  it('is false when the zone cannot be resolved', () => {
    vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
      throw new Error('no Intl');
    });
    expect(inCmpRegion()).toBe(false);
  });
});
