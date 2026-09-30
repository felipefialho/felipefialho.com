import type { Locator, Page } from '@playwright/test';

export class LabPage {
  readonly heading: Locator;
  readonly projects: Locator;
  readonly cartman: Locator;
  readonly moreOnGithub: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { level: 1 });
    this.projects = page.getByRole('region', { name: 'Lab' }).getByRole('listitem').getByRole('link');
    this.cartman = page.getByRole('region', { name: 'Eric Cartman' });
    this.moreOnGithub = page.getByRole('link', { name: 'mais projetos no github ↗' });
  }

  async goto() {
    await this.page.goto('/lab/');
  }

  project(name: RegExp) {
    return this.projects.filter({ hasText: name });
  }

  rebuiltPill(project: Locator) {
    return project.getByText('refeito em 2026', { exact: true });
  }
}
