import { expect, test } from './fixtures';

test.describe('Language switch', () => {
  test('links a translated post to its English version', async ({ page }) => {
    await page.goto('/blog/css-grid-e-flexbox-quando-utilizar/');

    await page.getByRole('link', { name: 'Read in English' }).click();

    await expect(page).toHaveURL(/\/en\/blog\/css-grid-and-flexbox-when-to-use-each\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'Ler em português' })).toBeVisible();
  });
});
