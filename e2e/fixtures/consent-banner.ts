import { expect, type Locator, type Page } from '@playwright/test';

export class ConsentBanner {
  readonly root: Locator;
  readonly accept: Locator;
  readonly necessaryOnly: Locator;
  readonly customize: Locator;
  readonly prefs: Locator;
  readonly analytics: Locator;
  readonly ads: Locator;
  readonly rejectAll: Locator;
  readonly save: Locator;
  readonly toast: Locator;
  readonly footerLink: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('region', { name: 'Aviso de cookies' });
    this.accept = this.root.getByRole('button', { name: 'aceitar tudo' });
    this.necessaryOnly = this.root.getByRole('button', { name: 'só os necessários' });
    this.customize = this.root.getByRole('button', { name: 'personalizar' });
    this.prefs = page.getByRole('dialog', { name: 'Preferências de cookies' });
    this.analytics = this.prefs.getByRole('checkbox', { name: /^Análise/ });
    this.ads = this.prefs.getByRole('checkbox', { name: /^Anúncios/ });
    this.rejectAll = this.prefs.getByRole('button', { name: 'recusar tudo' });
    this.save = this.prefs.getByRole('button', { name: 'salvar escolhas' });
    this.toast = page.getByRole('status').filter({ hasText: '✓' });
    this.footerLink = page.getByRole('contentinfo').getByRole('button', { name: 'Preferências de cookies' });
  }

  async goto() {
    await this.page.goto('/');
  }

  /** Waits for the page scripts to run, so a hidden banner means "not shown" and not "not yet shown". */
  async gotoAndSettle() {
    await this.goto();
    await this.page.waitForLoadState('load');
  }

  async expectStored(choice: { analytics: boolean; ads: boolean }) {
    await expect
      .poll(async () => JSON.parse(await this.page.evaluate(() => localStorage.getItem('consent') ?? 'null')))
      .toMatchObject({ ...choice, v: 1 });
  }
}
