export const LANGS = ['pt', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const SITE_NAME = 'Felipe Fialho';

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
    cookies: 'Preferências de cookies',
    privacy: 'Política de privacidade',
    otherLang: 'Read in English',
    switchLang: 'English version',
    close: 'Fechar',
    mainNav: 'Principal',
    adjacentPosts: 'Posts vizinhos',
    lastUpdated: 'Atualizada em',
    codeOf: (title: string) => `Código do ${title}`,
    code: 'Código',
    feedTitle: 'Felipe Fialho',
    feedDescription: 'Front-end, CSS, carreira e AI, desde 2013.',
    homeDescription: 'Blog de Felipe Fialho sobre front-end, CSS, carreira e AI, escrito desde 2013.',
    hero: 'Escrevo sobre front-end, CSS, carreira e AI desde 2013.',
    fromLab: 'No Lab',
    allLab: 'Ver todos os projetos',
    archiveDescription: 'Todos os posts desde 2013, sobre front-end, CSS, carreira e AI.',
    archiveLede: (count: number) => `${count} posts escritos desde 2013. Os links em roxo são os que você já leu.`,
    tagLede: (count: number, tag: string) => `${count} posts com a tag #${tag}.`,
    labDescription: 'Projetos open source e experimentos de Felipe Fialho.',
    labLede: 'Projetos open source e experimentos que fiz ao longo dos anos. Alguns foram reconstruídos em 2026.',
    supportPost: 'Curtiu o post? Me paga um café',
    pixLabel: 'Chave Pix',
    copy: 'Copiar',
    copied: 'Copiado',
    copyFailed: 'Não foi possível copiar. Copie a chave manualmente.',
    sponsors: 'Apoiar no GitHub Sponsors',
    fix: 'Achou um erro? O blog é open source,',
    fixLink: 'edite o post no GitHub',
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
    cookies: 'Cookie preferences',
    privacy: 'Privacy policy',
    otherLang: 'Ler em português',
    switchLang: 'Versão em português',
    close: 'Close',
    mainNav: 'Main',
    adjacentPosts: 'Adjacent posts',
    lastUpdated: 'Last updated',
    codeOf: (title: string) => `${title} source code`,
    code: 'Code',
    feedTitle: 'Felipe Fialho (English)',
    feedDescription: 'Front-end, CSS, career and AI.',
    homeDescription: 'Felipe Fialho writes about front-end, CSS, career and AI, since 2013.',
    hero: 'I write about front-end, CSS, career and AI. Since 2013.',
    fromLab: 'From the Lab',
    allLab: 'See every project',
    archiveDescription: 'Every post in English, about front-end, CSS, career and AI.',
    archiveLede: (count: number) => `${count} posts translated to English. Links in purple are the ones you've already read.`,
    tagLede: (count: number, tag: string) => `${count} posts tagged #${tag}.`,
    labDescription: 'Open source projects and experiments by Felipe Fialho.',
    labLede: 'Open source projects and experiments I built over the years. Some were rebuilt in 2026.',
    supportPost: 'Enjoyed the post? Buy me a coffee',
    pixLabel: 'Pix key (Brazil)',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Could not copy. Copy the key by hand.',
    sponsors: 'Sponsor on GitHub',
    fix: 'Found a mistake? The blog is open source,',
    fixLink: 'edit the post on GitHub',
  },
} as const;

export const t = (lang: Lang) => UI[lang];

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
