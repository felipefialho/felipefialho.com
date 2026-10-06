/**
 * Consent state shared by the banner, GA4 and AdSense.
 * ConsentHead.astro reads the same storage key and record shape before any bundle runs.
 */
export const CONSENT_KEY = 'consent';
export const CONSENT_ID = 'consent';

// Set once Google's CMP (TCF) reports that GDPR applies to this visitor.
const CMP_KEY = 'consent-cmp';

// IANA zones of the EEA, UK and Switzerland, where Google's certified CMP shows its own message.
// Explicit on purpose: a `Europe/` prefix would also match Moscow, Istanbul, Kyiv and other non-CMP zones.
const CMP_TIME_ZONES: ReadonlySet<string> = new Set([
  // EU member states (capitals plus overseas-of-mainland zones)
  'Europe/Vienna', 'Europe/Brussels', 'Europe/Sofia', 'Europe/Zagreb', 'Asia/Nicosia', 'Asia/Famagusta',
  'Europe/Prague', 'Europe/Copenhagen', 'Europe/Tallinn', 'Europe/Helsinki', 'Europe/Mariehamn',
  'Europe/Paris', 'Europe/Berlin', 'Europe/Busingen', 'Europe/Athens', 'Europe/Budapest', 'Europe/Dublin',
  'Europe/Rome', 'Europe/Riga', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Malta', 'Europe/Amsterdam',
  'Europe/Warsaw', 'Europe/Lisbon', 'Atlantic/Azores', 'Atlantic/Madeira', 'Europe/Bucharest',
  'Europe/Bratislava', 'Europe/Ljubljana', 'Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary',
  'Europe/Stockholm',
  // Iceland, Norway, Liechtenstein
  'Atlantic/Reykjavik', 'Europe/Oslo', 'Arctic/Longyearbyen', 'Europe/Vaduz',
  // United Kingdom, Crown dependencies, Gibraltar
  'Europe/London', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man', 'Europe/Gibraltar',
  // Switzerland
  'Europe/Zurich',
]);

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
  v: 1;
  at: string;
}

type ConsentValue = 'granted' | 'denied';

export interface ConsentParams {
  ad_storage?: ConsentValue;
  ad_user_data?: ConsentValue;
  ad_personalization?: ConsentValue;
  analytics_storage?: ConsentValue;
}

interface TcData {
  gdprApplies?: boolean;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    googlefc?: {
      callbackQueue?: Array<Record<string, () => void>>;
      showRevocationMessage?: () => void;
    };
    __tcfapi?: (command: string, version: number, callback: (data: TcData, success: boolean) => void) => void;
  }

  interface WindowEventMap {
    gtagconsent: CustomEvent<ConsentParams>;
  }
}

const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage blocked: the choice lasts for this page view only
    }
  },
};

const isChoice = (data: unknown): data is ConsentChoice =>
  typeof data === 'object'
  && data !== null
  && 'v' in data && data.v === 1
  && 'analytics' in data && typeof data.analytics === 'boolean'
  && 'ads' in data && typeof data.ads === 'boolean';

export function readConsent(): ConsentChoice | null {
  try {
    const data: unknown = JSON.parse(storage.get(CONSENT_KEY) ?? 'null');
    return isChoice(data) ? data : null;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean, ads: boolean): ConsentChoice {
  const choice: ConsentChoice = { analytics, ads, v: 1, at: new Date().toISOString() };
  storage.set(CONSENT_KEY, JSON.stringify(choice));
  return choice;
}

const value = (granted: boolean): ConsentValue => (granted ? 'granted' : 'denied');

let applyingOwnUpdate = false;

/** Stores the visitor's choice and pushes it to Consent Mode (GA loads through the `gtagconsent` event). */
export function saveConsent(analytics: boolean, ads: boolean): ConsentChoice {
  const choice = writeConsent(analytics, ads);
  applyingOwnUpdate = true;
  try {
    window.gtag('consent', 'update', {
      ad_storage: value(ads),
      ad_user_data: value(ads),
      ad_personalization: value(ads),
      analytics_storage: value(analytics),
    });
  } finally {
    applyingOwnUpdate = false;
  }
  return choice;
}

/** True when Google's CMP already handles consent for this visitor, or probably will. */
export function inCmpRegion(): boolean {
  if (storage.get(CMP_KEY) === '1') return true;
  try {
    return CMP_TIME_ZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
}

/** True once Google's CMP confirmed GDPR applies (TCF `gdprApplies`). */
export const cmpConfirmed = (): boolean => storage.get(CMP_KEY) === '1';

/**
 * Call after the AdSense tag is injected. When Google's CMP applies, hides our banner
 * and mirrors the CMP's Consent Mode updates into our record so GA follows them on every page.
 */
export function watchGoogleCmp(): void {
  let applies = false;
  let pending: ConsentParams | null = null;

  const mirror = (params: ConsentParams) => {
    const current = readConsent();
    const analytics = params.analytics_storage ? params.analytics_storage === 'granted' : (current?.analytics ?? false);
    const ads = params.ad_personalization ? params.ad_personalization === 'granted' : (current?.ads ?? false);
    if (current?.analytics !== analytics || current.ads !== ads) writeConsent(analytics, ads);
  };

  addEventListener('gtagconsent', ({ detail }) => {
    if (applyingOwnUpdate) return;
    if (applies) mirror(detail);
    else pending = detail;
  });

  const fc = (window.googlefc ??= {});
  (fc.callbackQueue ??= []).push({
    CONSENT_DATA_READY: () => window.__tcfapi?.('addEventListener', 2, (data, success) => {
      if (!success || !data.gdprApplies || applies) return;
      applies = true;
      storage.set(CMP_KEY, '1');
      try {
        document.getElementById(CONSENT_ID)?.hidePopover();
      } catch {
        // Already hidden
      }
      if (pending) mirror(pending);
    }),
  });
}
