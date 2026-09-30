import { expect, test } from './fixtures';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

test.describe('404', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/essa-pagina-nao-existe/');
  });

  test('is a noindex page with a way back', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Esse link quebrou' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('button', { name: 'Buscar nos posts' })).toBeVisible();
  });

  test('rotates the joke', async ({ page }) => {
    const current = page.locator('.jokes > .current');
    const before = await current.textContent();

    await page.getByRole('button', { name: 'Outra piada' }).click();

    await expect(current).not.toHaveText(before ?? '');
  });

  test('toggles the 2013 mode with the Konami code', async ({ page }) => {
    const root = page.locator('html');

    for (const key of KONAMI) await page.keyboard.press(key);
    await expect(root).toHaveAttribute('data-y2013', '');
    await expect(page.getByRole('status').filter({ hasText: 'Modo 2013 ativado.' })).toBeAttached();

    for (const key of KONAMI) await page.keyboard.press(key);
    await expect(root).not.toHaveAttribute('data-y2013');
  });
});
