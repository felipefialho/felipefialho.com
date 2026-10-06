import { expect, test } from './fixtures';

const TAG_PATH = '/blog/tags/css/';

test.describe('Tag page', () => {
  test('lists the posts of the tag with a matching heading and lede', async ({ page }) => {
    await page.goto(TAG_PATH);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Posts sobre CSS');
    await expect(page.locator('.lede')).toContainText(/\d+ posts sobre CSS/);
    await expect(page.getByRole('link', { name: /css/i }).first()).toBeVisible();
    await expect(page.locator('main a[href^="/blog/"]:not([href*="/tags/"])').first()).toBeVisible();
  });

  test('links the language switch to the same topic in English', async ({ page }) => {
    await page.goto(TAG_PATH);

    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', /\/en\/blog\/tags\/css\/$/);
  });

  test('opens a post from the list', async ({ page }) => {
    await page.goto(TAG_PATH);
    const post = page.locator('main a[href^="/blog/"]:not([href*="/tags/"])').first();
    const href = await post.getAttribute('href');

    await post.click();

    await expect(page).toHaveURL(href ?? '');
  });
});
