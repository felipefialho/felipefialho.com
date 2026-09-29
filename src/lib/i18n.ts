export const LANGS = ['pt', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US' };

const UI = {
  pt: {
    blog: 'Blog',
    lab: 'Lab',
    about: 'Sobre',
    search: 'Buscar',
    searchPlaceholder: 'Buscar nos posts',
    theme: 'Alternar tema',
    skip: 'Pular para o conteúdo',
    readingTime: (min: number) => `${min} min de leitura`,
    toc: 'Neste post',
    previous: 'Anterior',
    next: 'Próximo',
    related: 'Leia também',
    allPosts: 'Todos os posts',
    latest: 'Posts recentes',
    ad: 'Publicidade',
    support: 'Curtiu? Apoie o blog',
    cookies: 'Preferências de cookies',
    privacy: 'Política de privacidade',
    otherLang: 'Read in English',
    close: 'Fechar',
  },
  en: {
    blog: 'Blog',
    lab: 'Lab',
    about: 'About',
    search: 'Search',
    searchPlaceholder: 'Search posts',
    theme: 'Toggle theme',
    skip: 'Skip to content',
    readingTime: (min: number) => `${min} min read`,
    toc: 'On this post',
    previous: 'Previous',
    next: 'Next',
    related: 'Read next',
    allPosts: 'All posts',
    latest: 'Latest posts',
    ad: 'Advertisement',
    support: 'Enjoyed it? Support the blog',
    cookies: 'Cookie preferences',
    privacy: 'Privacy policy',
    otherLang: 'Ler em português',
    close: 'Close',
  },
} as const;

export const t = (lang: Lang) => UI[lang];

export const langFromUrl = (url: URL): Lang => (url.pathname.startsWith('/en/') || url.pathname === '/en' ? 'en' : 'pt');

/** Prefixes a site path with the language segment (PT lives at the root). */
export const localePath = (lang: Lang, path: string) => (lang === 'pt' ? path : `/en${path}`);

export const formatDate = (date: Date, lang: Lang, style: 'long' | 'short' = 'long') =>
  new Intl.DateTimeFormat(HTML_LANG[lang], {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    ...(style === 'long' ? { year: 'numeric' } : {}),
    timeZone: 'UTC',
  }).format(date);

/** Compact archive date: "28 set" (PT) or "Sep 28" (EN). */
export const formatDayMonth = (date: Date, lang: Lang) => {
  const parts = new Intl.DateTimeFormat(HTML_LANG[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' }).formatToParts(date);
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const month = (parts.find((part) => part.type === 'month')?.value ?? '').replace('.', '');
  return lang === 'pt' ? `${day} ${month}` : `${month} ${day}`;
};

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
