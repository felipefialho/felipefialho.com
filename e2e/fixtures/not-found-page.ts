import type { Locator, Page } from '@playwright/test';

export const MISSING_PATH = '/essa-pagina-nao-existe/';

export type Command = 'cd blog' | 'cd labs' | 'sudo' | 'cartman';

export class NotFoundPage {
  readonly heading: Locator;
  readonly robots: Locator;
  readonly log: Locator;
  readonly requestedPath: Locator;
  readonly bubble: Locator;
  readonly cartman: Locator;
  readonly backHome: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 });
    this.robots = page.locator('meta[name="robots"]');
    this.log = page.getByRole('log');
    this.requestedPath = page.getByTestId('requested-path');
    this.bubble = page.getByTestId('cartman-bubble');
    this.cartman = page.getByTestId('cartman');
    this.backHome = page.getByRole('link', { name: /voltar pro início|back to the start/ });
  }

  async goto(path = MISSING_PATH) {
    await this.page.goto(path);
  }

  command(name: Command) {
    return this.page.getByRole('button', { name, exact: true });
  }

  async run(name: Command) {
    await this.command(name).click();
  }
}
