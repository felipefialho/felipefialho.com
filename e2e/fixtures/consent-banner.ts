import { expect, type Locator, type Page } from '@playwright/test';

export class ConsentBanner {
  readonly root: Locator;
  readonly accept: Locator;
  readonly reject: Locator;
  readonly analytics: Locator;
  readonly ads: Locator;
  readonly footerLink: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('region', { name: 'Preferências de cookies' });
    this.accept = this.root.getByRole('button', { name: 'Aceitar' });
    this.reject = this.root.getByRole('button', { name: 'Recusar' });
    this.analytics = this.root.getByRole('checkbox', { name: /^Análise/ });
    this.ads = this.root.getByRole('checkbox', { name: /^Anúncios personalizados/ });
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
