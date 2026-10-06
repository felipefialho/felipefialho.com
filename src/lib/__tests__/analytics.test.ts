// @vitest-environment happy-dom
// @vitest-environment-options {"settings": {"handleDisabledFileLoadingAsSuccess": true}}
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CONSENT_KEY, type ConsentParams } from '../consent.ts';

const GA_SRC = /googletagmanager\.com\/gtag\/js/;

// Listeners registered on window by earlier module loads must not leak into the next test
const listeners: Array<Parameters<typeof window.addEventListener>> = [];
const realAddEventListener = window.addEventListener.bind(window);

const load = async (hostname: string) => {
  vi.resetModules();
  vi.spyOn(window, 'addEventListener').mockImplementation((...args: Parameters<typeof window.addEventListener>) => {
    listeners.push(args);
    realAddEventListener(...args);
  });
  vi.stubGlobal('location', { ...window.location, hostname });
  // Run idle work inline so injection is observable synchronously
  vi.stubGlobal('requestIdleCallback', (callback: () => void) => callback());
  const mod = await import('../analytics.ts');
  mod.initAnalytics();
  return mod;
};

const emit = (detail: ConsentParams) => window.dispatchEvent(new CustomEvent('gtagconsent', { detail }));
const gtagScripts = () => [...document.head.querySelectorAll('script')].filter((s) => GA_SRC.test(s.src));
const store = (analytics: boolean) =>
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics, ads: false, v: 1, at: '2026-01-01T00:00:00.000Z' }));

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = '';
});

afterEach(() => {
  for (const [type, listener, options] of listeners.splice(0)) window.removeEventListener(type, listener, options);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('initAnalytics', () => {
  it('does not load gtag.js without analytics consent', async () => {
    await load('felipefialho.com');
    store(false);
    emit({ ad_storage: 'granted' });
    expect(gtagScripts()).toHaveLength(0);
  });

  it('loads gtag.js when analytics consent is already stored', async () => {
    store(true);
    await load('felipefialho.com');
    expect(gtagScripts()).toHaveLength(1);
  });

  it('never loads gtag.js outside the production host', async () => {
    store(true);
    await load('localhost');
    emit({ analytics_storage: 'granted' });
    expect(gtagScripts()).toHaveLength(0);
  });

  it('injects once however many times consent is granted', async () => {
    await load('felipefialho.com');
    emit({ analytics_storage: 'granted' });
    emit({ analytics_storage: 'granted' });
    expect(gtagScripts()).toHaveLength(1);
  });

  it('points the script at the exported GA id', async () => {
    const { GA_ID } = await load('felipefialho.com');
    emit({ analytics_storage: 'granted' });
    expect(gtagScripts()[0].src).toContain(`id=${GA_ID}`);
  });

  it('sets the ga-disable flag and clears _ga cookies when denied', async () => {
    const { GA_ID } = await load('felipefialho.com');
    document.cookie = '_ga=1; path=/';
    document.cookie = '_ga_ABC=2; path=/';
    document.cookie = 'keep=3; path=/';
    emit({ analytics_storage: 'denied' });
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`]).toBe(true);
    expect(document.cookie).not.toContain('_ga');
    expect(document.cookie).toContain('keep=3');
  });

  it('re-enables GA when consent is granted again', async () => {
    const { GA_ID } = await load('felipefialho.com');
    emit({ analytics_storage: 'denied' });
    emit({ analytics_storage: 'granted' });
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`]).toBe(false);
  });
});
