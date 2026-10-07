import { routeHome } from '../../src/lib/locale.ts';

/** Only `/` is handled, deep links keep the language they were shared in. */
export default (request: Request, context: { next: () => Promise<Response> }) => routeHome(request, () => context.next());

export const config = { path: '/' };
