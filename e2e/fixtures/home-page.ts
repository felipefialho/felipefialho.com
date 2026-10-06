import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly heading: Locator;
  readonly moreAbout: Locator;
  readonly featured: Locator;
  readonly featuredCard: Locator;
  readonly latest: Locator;
  readonly latestRows: Locator;
  readonly labs: Locator;
  readonly nav: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 });
    this.moreAbout = page.getByRole('main').getByRole('link', { name: 'mais sobre mim →' });
    this.featured = page.getByRole('region', { name: 'novo' });
    this.featuredCard = this.featured.getByRole('link').first();
    this.latest = page.getByRole('region', { name: 'Últimos posts' });
    // Post rows are the list items with a date; the aside lists (topics, follow) have none
    this.latestRows = this.latest.getByRole('listitem').filter({ has: page.getByRole('time') });
    this.labs = page.getByRole('region', { name: /labs/i });
    this.nav = page.getByRole('navigation', { name: 'Principal' });
  }

  async goto() {
    await this.page.goto('/');
  }

  /** The archive lists newest first, so its first post is the one the home must feature. */
  async newestPostPath() {
    await this.page.goto('/blog/');
    const first = this.page.getByRole('main').getByRole('listitem').first().getByRole('link');
    return (await first.getAttribute('href')) ?? '';
  }

  navLink(name: 'blog' | 'labs' | 'sobre') {
    return this.nav.getByRole('link', { name, exact: true });
  }
}
