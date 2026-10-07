import { resolveLang } from '../../src/lib/locale.ts';

const VARY = 'Accept-Language, Cookie';

/** Opens the homepage in the visitor's language. Only `/` is handled, deep links keep the language they were shared in. */
export default async (request: Request, context: { next: () => Promise<Response> }) => {
  const lang = resolveLang(request.headers.get('cookie') ?? undefined, request.headers.get('accept-language') ?? undefined);

  if (lang === 'pt') {
    const response = await context.next();
    response.headers.append('vary', VARY);
    return response;
  }

  const target = new URL('/en/', request.url);
  target.search = new URL(request.url).search;
  return new Response(null, {
    status: 302,
    headers: { location: target.toString(), vary: VARY, 'cache-control': 'private, no-store' },
  });
};

export const config = { path: '/' };
