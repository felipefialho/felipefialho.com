import { expect, test } from './fixtures';

test.describe('Home', () => {
  test('leads with the name as a link to the about page', async ({ page }) => {
    await page.goto('/');

    const name = page.getByRole('heading', { level: 1 }).getByRole('link', { name: 'Felipe Fialho' });
    await expect(name).toHaveAttribute('href', '/hi/');
  });

  test('keeps "more about me" in the bio and X first among the profiles', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Mais sobre mim' })).toHaveAttribute('href', '/hi/');
    const profiles = page.getByRole('main').getByRole('list', { name: 'Contato' }).getByRole('link');
    await expect(profiles.first()).toHaveAccessibleName('X (Twitter) @felipefialho_');
    await expect(profiles).toHaveCount(4);
  });
});
