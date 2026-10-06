import { expect, test } from './fixtures';

const PAGES = [
  ['home', '/'],
  ['post', '/blog/css-grid-e-flexbox-quando-utilizar/'],
  ['lab', '/lab/'],
  ['404', '/essa-pagina-nao-existe/'],
] as const;

test.describe('Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const [name, path] of PAGES) {
    test(`${name} has no horizontal overflow`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('load');

      await expect.poll(() => page.evaluate(() => document.scrollingElement!.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    });
  }

  test('keeps the wordmark, search and theme in reach, and hides the social icons in the header', async ({ page }) => {
    await page.goto('/');
    const header = page.getByRole('banner');

    await expect(header.getByRole('link', { name: /felipefialho/ })).toBeVisible();
    await expect(header.getByRole('button', { name: 'Buscar' })).toBeVisible();
    await expect(header.getByRole('button', { name: 'Ativar modo claro' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'GitHub' })).toBeHidden();
  });
});
