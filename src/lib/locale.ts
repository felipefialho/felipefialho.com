import type { Lang } from './i18n.ts';

/** First-party cookie set by the language switch, it wins over the browser language. */
export const LANG_COOKIE = 'lang';

const cookieLang = (cookie: string): Lang | undefined => {
  const match = new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=(pt|en)(?:;|$)`).exec(cookie);
  return match?.[1] as Lang | undefined;
};

/** Browser language: Portuguese in any variant, or none declared, stays pt; everything else gets en. */
const browserLang = (acceptLanguage: string): Lang => {
  const ranked = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [tag = '', ...params] = part.trim().split(';');
      const q = params.map((param) => /^\s*q\s*=\s*([\d.]+)\s*$/i.exec(param)?.[1]).find(Boolean);
      return { tag: tag.trim().toLowerCase(), q: q === undefined ? 1 : Number(q), index };
    })
    .filter(({ tag, q }) => tag !== '' && tag !== '*' && q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  const primary = ranked[0]?.tag.split('-')[0];
  return primary === undefined || primary === 'pt' ? 'pt' : 'en';
};

/** Language to open the homepage in: an explicit switch beats the browser setting. */
export const resolveLang = (cookie: string = '', acceptLanguage: string = ''): Lang =>
  cookieLang(cookie) ?? browserLang(acceptLanguage);
