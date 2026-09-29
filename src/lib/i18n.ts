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
    moreAbout: 'Mais sobre mim',
    search: 'Buscar',
    searchPosts: 'Buscar nos posts',
    searchPlaceholder: 'Buscar nos posts',
    theme: 'Ativar modo escuro',
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
    viewProject: 'Ver projeto',
    codeOnGithub: 'Código no GitHub',
    labShot: (title: string) => `Screenshot do ${title}`,
    code: 'Código',
    feedTitle: 'Felipe Fialho',
    feedDescription: 'Front-end, CSS, carreira e AI, desde 2013.',
    homeTitle: 'Felipe Fialho: Staff Engineer, front-end e AI',
    photoAlt: 'Felipe Fialho palestrando em uma conferência',
    homeDescription: 'Felipe Fialho, Staff Engineer. Arquitetura de sistemas Front-end, desenvolvimento com AI, blog e projetos open source.',
    role: 'Staff Engineer',
    roleFocus: 'Arquitetura de sistemas Front-end e desenvolvimento com AI',
    contact: 'Contato',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'E-mail',
    youtube: 'YouTube',
    archiveDescription: 'Todos os posts desde 2013, sobre front-end, CSS, carreira e AI.',
    archiveLede: (count: number) => `${count} posts escritos desde 2013.`,
    tagTitle: (tag: string) => `Posts sobre ${tag}`,
    tagLede: (count: number, tag: string) => `${count} posts sobre ${tag}, do mais recente ao mais antigo.`,
    tagDescription: (count: number, tag: string, titles: string[]) =>
      `${count} posts sobre ${tag}, incluindo ${titles.join(' e ')}.`,
    morePostsOtherLang: 'Veja também os posts em inglês',
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
    moreAbout: 'More about me',
    search: 'Search',
    searchPosts: 'Search posts',
    searchPlaceholder: 'Search posts',
    theme: 'Enable dark mode',
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
    viewProject: 'View project',
    codeOnGithub: 'Code on GitHub',
    labShot: (title: string) => `${title} screenshot`,
    code: 'Code',
    feedTitle: 'Felipe Fialho (English)',
    feedDescription: 'Front-end, CSS, career and AI.',
    homeTitle: 'Felipe Fialho: Staff Engineer, front-end and AI',
    photoAlt: 'Felipe Fialho speaking at a conference',
    homeDescription: 'Felipe Fialho, Staff Engineer. Front-end system architecture, AI-augmented development, blog and open source projects.',
    role: 'Staff Engineer',
    roleFocus: 'Front-end system architecture and AI-augmented development',
    contact: 'Contact',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    email: 'Email',
    youtube: 'YouTube',
    archiveDescription: 'Every post in English, about front-end, CSS, career and AI.',
    archiveLede: (count: number) => `${count} posts translated to English.`,
    tagTitle: (tag: string) => `Posts about ${tag}`,
    tagLede: (count: number, tag: string) => `${count} posts about ${tag}, newest first.`,
    tagDescription: (count: number, tag: string, titles: string[]) =>
      `${count} posts about ${tag}, including ${titles.join(' and ')}.`,
    morePostsOtherLang: 'More posts in Portuguese',
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

/** Month and year only, never the day: "setembro de 2026" or "September 2026". */
export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(HTML_LANG[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);

/** Abbreviated month for archive rows (the year is the section heading): "set" or "Sep". */
export const formatMonth = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(HTML_LANG[lang], { month: 'short', timeZone: 'UTC' }).format(date).replace('.', '');

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
