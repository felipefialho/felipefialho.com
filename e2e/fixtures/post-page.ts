import type { Locator, Page } from '@playwright/test';

export const POST_PATH = '/blog/css-grid-e-flexbox-quando-utilizar/';

export class PostPage {
  readonly header: Locator;
  readonly toc: Locator;
  readonly tocDisclosure: Locator;
  readonly tags: Locator;
  readonly adjacent: Locator;
  readonly previous: Locator;
  readonly next: Locator;

  constructor(private readonly page: Page) {
    this.header = page.getByRole('banner');
    this.toc = page.getByRole('navigation', { name: 'Neste post' });
    // Below the ToC breakpoint the same links live in a <details> (role group) above the article
    this.tocDisclosure = page.getByRole('group').filter({ hasText: 'Neste post' });
    this.tags = page.getByRole('list', { name: 'Tags' }).getByRole('link');
    this.adjacent = page.getByRole('navigation', { name: 'Posts vizinhos' });
    this.previous = this.adjacent.getByRole('link', { name: /Anterior/ });
    this.next = this.adjacent.getByRole('link', { name: /Próximo/ });
  }

  async goto(path = POST_PATH) {
    await this.page.goto(path);
  }

  copyButton(state: 'copiar' | 'copiado') {
    return this.page.getByRole('button', { name: state, exact: true });
  }

  /** The progress text is drawn with CSS counters; the integers behind it are the observable state. */
  readingProgress() {
    return this.page.getByTestId('reading-progress').evaluate((el) => {
      const style = getComputedStyle(el);
      return { pct: Number(style.getPropertyValue('--read')), left: Number(style.getPropertyValue('--left')) };
    });
  }

  async scrollToEnd() {
    await this.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  }

  clipboardText() {
    return this.page.evaluate(() => navigator.clipboard.readText());
  }
}
