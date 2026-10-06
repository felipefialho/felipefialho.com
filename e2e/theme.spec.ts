import { expect, test } from './fixtures';

test.describe('Theme', () => {
  test('starts dark, toggles and persists after a reload', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('html');
    await expect(root).not.toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: 'Ativar modo claro' }).click();
    await expect(root).toHaveAttribute('data-theme', 'light');
    await expect(page.getByRole('button', { name: 'Ativar modo escuro' })).toBeVisible();

    await page.reload();
    await expect(root).toHaveAttribute('data-theme', 'light');
  });
});
