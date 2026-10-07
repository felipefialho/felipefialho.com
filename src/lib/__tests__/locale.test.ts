import { describe, expect, it } from 'vitest';
import { resolveLang, routeHome } from '../locale.ts';

describe('resolveLang', () => {
  it('keeps pt for Portuguese variants', () => {
    expect(resolveLang(undefined, 'pt-BR,pt;q=0.9,en;q=0.8')).toBe('pt');
    expect(resolveLang(undefined, 'pt-PT')).toBe('pt');
    expect(resolveLang(undefined, 'PT')).toBe('pt');
  });

  it('keeps pt when the browser declares nothing', () => {
    expect(resolveLang()).toBe('pt');
    expect(resolveLang(undefined, '')).toBe('pt');
    expect(resolveLang(undefined, '*')).toBe('pt');
  });

  it('sends every other language to en', () => {
    expect(resolveLang(undefined, 'en-US,en;q=0.9')).toBe('en');
    expect(resolveLang(undefined, 'es-ES,es;q=0.9')).toBe('en');
    expect(resolveLang(undefined, 'ja')).toBe('en');
  });

  it('follows the highest quality, not the order', () => {
    expect(resolveLang(undefined, 'en;q=0.5,pt-BR;q=0.9')).toBe('pt');
    expect(resolveLang(undefined, 'pt;q=0.4,en;q=0.8')).toBe('en');
  });

  it('ignores languages refused with q=0', () => {
    expect(resolveLang(undefined, 'pt;q=0,en')).toBe('en');
  });

  it('lets the cookie beat the browser language', () => {
    expect(resolveLang('lang=br', 'en-US')).toBe('pt');
    expect(resolveLang('theme=dark; lang=en', 'pt-BR')).toBe('en');
  });

  it('ignores unknown cookie values', () => {
    expect(resolveLang('lang=fr', 'en-US')).toBe('en');
    expect(resolveLang('xlang=en', 'pt-BR')).toBe('pt');
  });

  it('breaks quality ties by order', () => {
    expect(resolveLang(undefined, 'en,pt')).toBe('en');
    expect(resolveLang(undefined, 'pt,en')).toBe('pt');
  });

  it('drops malformed quality values and falls back to the rest', () => {
    expect(resolveLang(undefined, 'en;q=1.5.2,pt;q=0.5')).toBe('pt');
  });

  it('falls back to pt when every language is refused', () => {
    expect(resolveLang(undefined, 'en;q=0,*;q=0')).toBe('pt');
  });

  it('reads the cookie anywhere in the header and ignores other casing', () => {
    expect(resolveLang('a=1; lang=en', 'pt')).toBe('en');
    expect(resolveLang('lang=en; a=1', 'pt')).toBe('en');
    expect(resolveLang('lang=BR', 'en')).toBe('en');
  });

  it('handles mixed-case tags', () => {
    expect(resolveLang(undefined, 'Pt-br')).toBe('pt');
  });
});

describe('routeHome', () => {
  const home = (headers: Record<string, string> = {}, path = '/') => new Request(`https://felipefialho.com${path}`, { headers });
  const next = async () => new Response('home');

  it('serves the page for pt and varies the cache', async () => {
    const response = await routeHome(home({ 'accept-language': 'pt-BR' }), next);

    expect(response.status).toBe(200);
    expect(response.headers.get('vary')).toBe('Accept-Language, Cookie');
  });

  it('serves the page when no language is declared', async () => {
    const response = await routeHome(home(), next);

    expect(response.status).toBe(200);
  });

  it('redirects other languages to /en/ keeping the query string', async () => {
    const response = await routeHome(home({ 'accept-language': 'en-US' }, '/?utm_source=x'), next);

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://felipefialho.com/en/?utm_source=x');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(response.headers.get('vary')).toBe('Accept-Language, Cookie');
  });

  it('lets the cookie override the browser language both ways', async () => {
    const stay = await routeHome(home({ 'accept-language': 'en-US', cookie: 'lang=br' }), next);
    const go = await routeHome(home({ 'accept-language': 'pt-BR', cookie: 'lang=en' }), next);

    expect(stay.status).toBe(200);
    expect(go.status).toBe(302);
  });
});
