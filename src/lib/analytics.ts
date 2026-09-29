import { readConsent } from './consent';

/** Keep in sync with the `config` call in ConsentHead.astro. */
export const GA_ID = 'G-TM1XEXQZ6B';

let injected = false;

const whenIdle = (callback: () => void) => {
  if ('requestIdleCallback' in window) requestIdleCallback(callback, { timeout: 3000 });
  else setTimeout(callback, 200);
};

const setDisabled = (disabled: boolean) => {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = disabled;
};

// Local builds and deploy previews never report to the production property
const IS_PRODUCTION_HOST = location.hostname === 'felipefialho.com';

function inject(): void {
  setDisabled(false);
  if (injected || !IS_PRODUCTION_HOST) return;
  injected = true;
  whenIdle(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.append(script);
  });
}

// Revoked mid-page: stop GA now and drop its first-party cookies.
function stop(): void {
  setDisabled(true);
  const domain = location.hostname.replace(/^www\./, '');
  for (const cookie of document.cookie.split('; ')) {
    const name = cookie.split('=')[0];
    if (!name.startsWith('_ga')) continue;
    for (const scope of ['', `; domain=.${domain}`]) document.cookie = `${name}=; max-age=0; path=/${scope}`;
  }
}

/**
 * Basic Consent Mode: gtag.js is only requested once analytics is granted,
 * either stored from a previous visit or given now (our banner or Google's CMP).
 */
export function initAnalytics(): void {
  if (readConsent()?.analytics) inject();
  addEventListener('gtagconsent', ({ detail }) => {
    if (detail.analytics_storage === 'granted') inject();
    else if (detail.analytics_storage === 'denied') stop();
  });
}
