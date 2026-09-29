import { AD_CLIENT } from './ad-config';
import { CONSENT_ID, readConsent, watchGoogleCmp } from './consent';

export { AD_CLIENT, END_SLOT, IN_ARTICLE_SLOT, SIDEBAR_SIZE, SIDEBAR_SLOT } from './ad-config';

const TAG_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
const INTERACTIONS = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;

type AdsQueue = object[] & { requestNonPersonalizedAds?: 0 | 1 };

declare global {
  interface Window {
    adsbygoogle?: AdsQueue;
  }
}

let tagInjected = false;

// Consent is read once per page view: a later change applies from the next page.
function injectTag(queue: AdsQueue): void {
  tagInjected = true;
  if (!readConsent()?.ads) queue.requestNonPersonalizedAds = 1;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = TAG_SRC;
  document.head.append(script);
  watchGoogleCmp();
}

function fill(slot: HTMLElement): void {
  const { adSlot, adFormat, adLayout, fullWidthResponsive, adWidth, adHeight } = slot.dataset;
  if (!adSlot || slot.querySelector('ins.adsbygoogle')) return;

  const queue = (window.adsbygoogle ??= []);
  if (!tagInjected) injectTag(queue);

  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.display = 'block';
  ins.dataset.adClient = AD_CLIENT;
  ins.dataset.adSlot = adSlot;
  if (adFormat) ins.dataset.adFormat = adFormat;
  if (adLayout) ins.dataset.adLayout = adLayout;
  if (fullWidthResponsive) ins.dataset.fullWidthResponsive = fullWidthResponsive;
  if (adLayout === 'in-article') ins.style.textAlign = 'center';
  // Fixed-size units take explicit dimensions instead of a responsive format
  if (adWidth && adHeight) Object.assign(ins.style, { display: 'inline-block', width: `${adWidth}px`, height: `${adHeight}px` });
  if (!import.meta.env.PROD) ins.dataset.adtest = 'on';

  slot.append(ins);
  queue.push({});
}

/**
 * Loads nothing until the first real interaction (so lab runs stay third-party free),
 * then fills each `.ad[data-ad-slot]` as it comes within 600px of the viewport.
 */
export function initAds(): void {
  const slots = document.querySelectorAll<HTMLElement>('.ad[data-ad-slot]');
  if (!slots.length) return;

  const controller = new AbortController();
  const start = (event: Event) => {
    // Answering the banner is not a signal to load ads with the old choice
    if (event.target instanceof Element && event.target.closest(`#${CONSENT_ID}`)) return;
    controller.abort();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        fill(entry.target as HTMLElement);
      }
    }, { rootMargin: '600px 0px' });
    slots.forEach((slot) => observer.observe(slot));
  };

  for (const type of INTERACTIONS) addEventListener(type, start, { passive: true, signal: controller.signal });
}
