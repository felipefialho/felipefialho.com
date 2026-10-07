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

test.describe('Language preference', () => {
  const cases = [
    { from: '/en/', link: 'br: Português', lang: 'br', url: /\/$/, html: 'pt-BR' },
    { from: '/', link: 'en: English', lang: 'en', url: /\/en\/$/, html: 'en' },
  ];

  for (const { from, link, lang, url, html } of cases) {
    test(`remembers ${lang} after picking it with the switch on ${from}`, async ({ page, context }) => {
      await page.goto(from);

      await page.getByRole('banner').getByRole('link', { name: link }).click();

      await expect(page).toHaveURL(url);
      await expect(page.locator('html')).toHaveAttribute('lang', html);
      await expect.poll(async () => (await context.cookies()).find((cookie) => cookie.name === 'lang')).toMatchObject({
        value: lang,
        path: '/',
        sameSite: 'Lax',
      });
    });
  }
});
