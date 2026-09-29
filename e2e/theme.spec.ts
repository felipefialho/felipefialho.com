import { expect, test } from './fixtures';

test.describe('Theme', () => {
  test.use({ colorScheme: 'light' });

  test('toggles and persists after a reload', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('html');

    await page.getByRole('button', { name: 'Alternar tema' }).click();
    await expect(root).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(root).toHaveAttribute('data-theme', 'dark');
  });
});
