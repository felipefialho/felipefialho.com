import { MISSING_PATH, expect, test } from './fixtures';

test.describe('404', () => {
  test('is a noindex page with a hidden heading and a way back', async ({ page, notFoundPage }) => {
    await notFoundPage.goto();

    await expect(page.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeAttached();
    await expect(notFoundPage.robots).toHaveAttribute('content', /noindex/);
    await expect(notFoundPage.backHome).toHaveAttribute('href', '/');
    await expect(page.getByText('bash: cd: no such file or directory')).toBeVisible();
  });

  test('shows the requested path as plain text', async ({ notFoundPage }) => {
    await notFoundPage.goto('/%3Cb%3Ex%3C/b%3E/');

    // Rendered as markup, the tags would vanish from the text
    await expect(notFoundPage.requestedPath).toHaveText('/<b>x</b>/');
  });

  test.describe('Commands', () => {
    test.beforeEach(async ({ notFoundPage }) => {
      await notFoundPage.goto();
    });

    test('cd blog and cd labs append their output and link to the sections', async ({ notFoundPage }) => {
      const { log, bubble } = notFoundPage;
      await expect(bubble).toBeHidden();

      await test.step('cd blog', async () => {
        await notFoundPage.run('cd blog');
        await expect(log).toContainText('$ cd blog');
        await expect(log.getByRole('link', { name: 'ir pro blog →' })).toHaveAttribute('href', '/blog/');
        await expect(bubble).toHaveText('Finalmente alguém com bom gosto');
      });

      await test.step('cd labs keeps the earlier output', async () => {
        await notFoundPage.run('cd labs');
        await expect(log.getByRole('link', { name: 'ir pro labs →' })).toHaveAttribute('href', '/lab/');
        await expect(bubble).toHaveText(/projeto mais importante/);
        await expect(log).toContainText('$ cd blog');
      });
    });

    test('sudo answers with a warning and a bubble', async ({ notFoundPage }) => {
      await notFoundPage.run('sudo');

      await expect(notFoundPage.log).toContainText('Esse incidente será reportado ao Cartman');
      await expect(notFoundPage.bubble).toHaveText('Respeite minha autoridade!');
    });

    test('cartman walks away, and only that command does', async ({ notFoundPage }) => {
      await notFoundPage.run('sudo');
      await expect(notFoundPage.cartman).toHaveCSS('animation-name', 'none');

      await notFoundPage.run('cartman');
      await expect(notFoundPage.cartman).not.toHaveCSS('animation-name', 'none');
      await expect(notFoundPage.bubble).toHaveText(/going home/);
    });

    test('keeps only the last six commands in the log', async ({ notFoundPage }) => {
      for (let i = 0; i < 8; i++) await notFoundPage.run('sudo');

      await expect(notFoundPage.log.getByText('Esse incidente será reportado ao Cartman')).toHaveCount(6);
    });
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('cartman does not animate but the bubble still shows', async ({ notFoundPage }) => {
      await notFoundPage.goto();
      await notFoundPage.run('cartman');

      await expect(notFoundPage.bubble).toHaveText(/going home/);
      await expect(notFoundPage.cartman).toHaveCSS('animation-name', 'none');
    });
  });

  test.describe('Suggestions', () => {
    test('suggests the real post for a near-miss slug', async ({ notFoundPage }) => {
      await notFoundPage.goto('/blog/css-grid-e-flexbox-utilizar/');

      await expect(notFoundPage.log).toContainText('você quis dizer');
      await expect(notFoundPage.log.getByRole('link', { name: 'CSS Grid e Flexbox - Quando utilizar?' })).toHaveAttribute(
        'href',
        '/blog/css-grid-e-flexbox-quando-utilizar/',
      );
    });

    test('does not suggest anything for an unrelated path', async ({ notFoundPage }) => {
      await notFoundPage.goto(MISSING_PATH);

      await expect(notFoundPage.command('cd blog')).toBeVisible();
      await expect(notFoundPage.log).toBeEmpty();
    });
  });

  test('speaks English under /en/', async ({ page, notFoundPage }) => {
    await notFoundPage.goto('/en/blog/css-grid-and-flexbox-use-each/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeAttached();
    await expect(page.getByText('blog/  labs/  about/')).toBeVisible();
    await expect(notFoundPage.log).toContainText('did you mean');
    await expect(notFoundPage.backHome).toHaveAttribute('href', '/en/');

    await notFoundPage.run('cd labs');
    await expect(page.getByRole('link', { name: 'go to labs →' })).toHaveAttribute('href', '/en/lab/');
  });
});
