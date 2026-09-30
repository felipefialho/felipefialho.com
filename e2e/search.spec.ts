import { expect, test } from './fixtures';

test.describe('Search', () => {
  test('finds a post by term and closes with Escape', async ({ page }) => {
    await page.goto('/');
    const dialog = page.getByRole('dialog', { name: 'Buscar nos posts' });

    await test.step('open the dialog from the header', async () => {
      await page.getByRole('button', { name: 'Buscar' }).click();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText('$ grep -r')).toBeVisible();
    });

    await test.step('type a term and see the matching post', async () => {
      await dialog.getByRole('textbox', { name: 'Buscar nos posts' }).fill('flexbox');
      const result = dialog.getByRole('link', { name: 'CSS Grid e Flexbox - Quando utilizar?', exact: true });
      await expect(result).toBeVisible();
      await expect(result).toHaveAttribute('href', /\/blog\/css-grid-e-flexbox-quando-utilizar\/$/);
    });

    await test.step('close with Escape', async () => {
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
    });
  });

  test('opens with the keyboard shortcut', async ({ page }) => {
    await page.goto('/');
    const dialog = page.getByRole('dialog', { name: 'Buscar nos posts' });
    await expect(dialog).toBeHidden();

    await page.keyboard.press('ControlOrMeta+k');

    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox', { name: 'Buscar nos posts' })).toBeFocused();
  });
});
