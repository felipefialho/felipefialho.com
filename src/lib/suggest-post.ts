export interface PostSuggestion {
  slug: string;
  title: string;
  lang: 'pt' | 'en';
  href: string;
}

const tokenize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/** Same word, or one is a prefix of the other (truncated or mistyped tail). */
const sameToken = (a: string, b: string) => a === b || (Math.min(a.length, b.length) >= 4 && (a.startsWith(b) || b.startsWith(a)));

/** Dice coefficient over slug tokens: 0 when nothing is shared, 1 for identical words. */
const score = (query: string[], candidate: string[]) => {
  if (!query.length || !candidate.length) return 0;
  const shared = query.filter((token) => candidate.some((other) => sameToken(token, other))).length;
  return (2 * shared) / (query.length + candidate.length);
};

export const SUGGESTION_THRESHOLD = 0.4;

/** Best post for a missing URL, by token overlap of its last path segment with the slugs. Undefined when nothing is close. */
export function suggestPost(pathname: string, posts: PostSuggestion[]): PostSuggestion | undefined {
  const last = pathname.split('/').filter(Boolean).pop() ?? '';
  const query = tokenize(last.replace(/\.[a-z0-9]+$/i, ''));
  let best: PostSuggestion | undefined;
  let bestScore = 0;
  for (const post of posts) {
    const value = score(query, tokenize(post.slug));
    if (value > bestScore) {
      best = post;
      bestScore = value;
    }
  }
  return bestScore >= SUGGESTION_THRESHOLD ? best : undefined;
}
