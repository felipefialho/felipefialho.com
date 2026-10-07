import type { Lang } from './i18n.ts';

/** First-party cookie set by the language switch, it wins over the browser language. */
export const LANG_COOKIE = 'lang';

/** Public name of each language in the switch label and the cookie value. */
export const LANG_LABEL: Record<Lang, string> = { pt: 'br', en: 'en' };

const cookieLang = (cookie: string): Lang | undefined => {
  const match = new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=(br|en)(?:;|$)`).exec(cookie);
  return match?.[1] === 'br' ? 'pt' : (match?.[1] as Lang | undefined);
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

const VARY = 'Accept-Language, Cookie';

/** Homepage handler behind the edge function: serve pt as is, send everyone else to /en/ without caching the redirect. */
export const routeHome = async (request: Request, next: () => Promise<Response>): Promise<Response> => {
  const url = new URL(request.url);
  const lang = resolveLang(request.headers.get('cookie') ?? undefined, request.headers.get('accept-language') ?? undefined);

  if (lang === 'pt') {
    const response = await next();
    response.headers.append('vary', VARY);
    return response;
  }

  const target = new URL('/en/', url);
  target.search = url.search;
  return new Response(null, {
    status: 302,
    headers: { location: target.toString(), vary: VARY, 'cache-control': 'private, no-store' },
  });
};
