import { describe, expect, it } from 'vitest';
import { resolveLang } from '../locale.ts';

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
    expect(resolveLang('lang=pt', 'en-US')).toBe('pt');
    expect(resolveLang('theme=dark; lang=en', 'pt-BR')).toBe('en');
  });

  it('ignores unknown cookie values', () => {
    expect(resolveLang('lang=fr', 'en-US')).toBe('en');
    expect(resolveLang('xlang=en', 'pt-BR')).toBe('pt');
  });
});
