// @vitest-environment happy-dom
// @vitest-environment-options {"settings": {"handleDisabledFileLoadingAsSuccess": true}}
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CONSENT_ID, CONSENT_KEY } from '../consent.ts';

type ObserverCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;

const observers: Array<{ callback: ObserverCallback; options?: IntersectionObserverInit; observed: Element[] }> = [];

class FakeIntersectionObserver {
  record: (typeof observers)[number];
  constructor(callback: ObserverCallback, options?: IntersectionObserverInit) {
    this.record = { callback, options, observed: [] };
    observers.push(this.record);
  }
  observe(element: Element) {
    this.record.observed.push(element);
  }
  unobserve() {}
}

const slotHtml = (attrs = '') => `<div class="ad" data-ad-slot="111" ${attrs}></div>`;
const slot = () => document.querySelector<HTMLElement>('.ad')!;
const scripts = () => document.head.querySelectorAll('script[src*="adsbygoogle"]');
const ins = () => document.querySelector<HTMLElement>('ins.adsbygoogle');

// Listeners registered on window by earlier module loads must not leak into the next test
const listeners: Array<Parameters<typeof window.addEventListener>> = [];
const realAddEventListener = window.addEventListener.bind(window);

const load = async (html = slotHtml()) => {
  vi.resetModules();
  vi.spyOn(window, 'addEventListener').mockImplementation((...args: Parameters<typeof window.addEventListener>) => {
    listeners.push(args);
    realAddEventListener(...args);
  });
  document.body.innerHTML = html;
  delete window.adsbygoogle;
  const mod = await import('../ads.ts');
  mod.initAds();
  return mod;
};

const interact = (target: EventTarget = window) => target.dispatchEvent(new Event('pointerdown', { bubbles: true }));
const intersect = (target: Element) => observers.at(-1)!.callback([{ isIntersecting: true, target }]);
const reveal = () => {
  interact();
  intersect(slot());
};

beforeEach(() => {
  observers.length = 0;
  localStorage.clear();
  document.head.innerHTML = '';
  vi.useFakeTimers();
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
});

afterEach(() => {
  for (const [type, listener, options] of listeners.splice(0)) window.removeEventListener(type, listener, options);
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('initAds', () => {
  it('loads nothing before the first interaction', async () => {
    await load();
    expect(scripts()).toHaveLength(0);
    expect(observers).toHaveLength(0);
    expect(ins()).toBeNull();
  });

  it('does nothing when the page has no ad slots', async () => {
    await load('<p>no ads</p>');
    interact();
    expect(observers).toHaveLength(0);
  });

  it('ignores interactions inside the consent element', async () => {
    await load(`${slotHtml()}<div id="${CONSENT_ID}"><button id="ok"></button></div>`);
    interact(document.getElementById('ok')!);
    expect(observers).toHaveLength(0);
    interact();
    expect(observers).toHaveLength(1);
  });

  it('observes slots with a 600px margin and injects the tag once visible', async () => {
    await load();
    interact();
    expect(observers[0].options?.rootMargin).toBe('600px 0px');
    expect(observers[0].observed).toEqual([slot()]);
    expect(scripts()).toHaveLength(0);
    intersect(slot());
    expect(scripts()).toHaveLength(1);
    expect(ins()).not.toBeNull();
  });

  it('requests non-personalized ads when ads consent is absent', async () => {
    await load();
    reveal();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1);
  });

  it('keeps personalized ads when ads consent is granted', async () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, ads: true, v: 1, at: '2026-01-01T00:00:00.000Z' }));
    await load();
    reveal();
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBeUndefined();
  });

  it('hides every slot when the tag fails to load', async () => {
    await load();
    reveal();
    scripts()[0].dispatchEvent(new Event('error'));
    expect(slot().hidden).toBe(true);
    expect(slot().style.display).toBe('none');
  });

  it('hides a slot AdSense never answered for', async () => {
    await load();
    reveal();
    vi.advanceTimersByTime(4000);
    expect(slot().hidden).toBe(true);
  });

  it('keeps a slot that was filled in time', async () => {
    await load();
    reveal();
    ins()!.dataset.adStatus = 'filled';
    await vi.advanceTimersByTimeAsync(4000);
    expect(slot().hidden).toBe(false);
  });

  it('brings back a slot that fills after the timeout', async () => {
    await load();
    reveal();
    await vi.advanceTimersByTimeAsync(4000);
    expect(slot().hidden).toBe(true);
    ins()!.dataset.adStatus = 'filled';
    await vi.advanceTimersByTimeAsync(0);
    expect(slot().hidden).toBe(false);
    expect(slot().style.display).toBe('');
  });

  it('applies fixed dimensions to sized units', async () => {
    await load(slotHtml('data-ad-width="300" data-ad-height="250"'));
    reveal();
    expect(ins()!.style.display).toBe('inline-block');
    expect(ins()!.style.width).toBe('300px');
    expect(ins()!.style.height).toBe('250px');
  });

  it('centers in-article units and copies the layout data', async () => {
    await load(slotHtml('data-ad-layout="in-article" data-ad-format="fluid"'));
    reveal();
    expect(ins()!.style.textAlign).toBe('center');
    expect(ins()!.dataset.adLayout).toBe('in-article');
    expect(ins()!.dataset.adFormat).toBe('fluid');
  });

  it('fills a slot only once even when it intersects again', async () => {
    await load();
    reveal();
    intersect(slot());
    expect(document.querySelectorAll('ins.adsbygoogle')).toHaveLength(1);
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it('starts only on the first interaction', async () => {
    await load();
    interact();
    interact();
    expect(observers).toHaveLength(1);
  });
});
