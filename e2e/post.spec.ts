import { POST_PATH, expect, test } from './fixtures';

test.describe('Post', () => {
  test.beforeEach(async ({ postPage }) => {
    await postPage.goto();
  });

  test.describe('Reading header', () => {
    test('continues the wordmark path and hides the nav on desktop', async ({ postPage }) => {
      const slug = POST_PATH.split('/').at(-2);

      await expect(postPage.header.getByRole('link', { name: `~/felipefialho/blog/${slug}` })).toHaveAttribute('href', '/');
      await expect(postPage.header.getByRole('navigation', { name: 'Principal' })).toBeHidden();
      await expect(postPage.header.getByRole('button', { name: 'Ativar modo claro' })).toBeHidden();
    });

    test('updates the reading progress while scrolling', async ({ postPage }) => {
      await expect.poll(async () => (await postPage.readingProgress()).pct).toBe(0);
      await expect.poll(async () => (await postPage.readingProgress()).left).toBeGreaterThan(0);
      const { left: minutesAtTop } = await postPage.readingProgress();

      await postPage.scrollToEnd();

      await expect.poll(async () => (await postPage.readingProgress()).pct).toBeGreaterThan(90);
      await expect.poll(async () => (await postPage.readingProgress()).left).toBeLessThan(minutesAtTop);
    });
  });

  test.describe('Table of contents', () => {
    test('jumps to headings and the active item follows the scroll', async ({ page, postPage }) => {
      const conclusion = postPage.toc.getByRole('link', { name: 'Conclusão' });
      const support = postPage.toc.getByRole('link', { name: 'Suporte' });

      await test.step('jump to the conclusion', async () => {
        await conclusion.click();
        await expect(page).toHaveURL(/#conclus/);
        await expect(page.getByRole('heading', { level: 2, name: 'Conclusão' })).toBeInViewport();
        await expect(conclusion).toHaveAttribute('aria-current', 'location');
      });

      await test.step('jump to support', async () => {
        await support.click();
        await expect(support).toHaveAttribute('aria-current', 'location');
        await expect(conclusion).not.toHaveAttribute('aria-current');
      });
    });

    test.describe('on a phone', () => {
      test.use({ viewport: { width: 390, height: 844 } });

      test('collapses into a disclosure above the article', async ({ postPage }) => {
        await expect(postPage.toc).toBeHidden();
        await expect(postPage.tocDisclosure).toBeVisible();
        await expect(postPage.tocDisclosure.getByRole('link', { name: 'Conclusão' })).toBeHidden();

        await postPage.tocDisclosure.getByText('Neste post', { exact: true }).click();

        await expect(postPage.tocDisclosure.getByRole('link', { name: 'Conclusão' })).toBeVisible();
      });
    });
  });

  test('copies a code block and shows the copied state', async ({ context, postPage }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const copy = postPage.copyButton('copiar').first();
    await copy.scrollIntoViewIfNeeded();

    await copy.click();

    await expect(postPage.copyButton('copiado')).toHaveCount(1);
    await expect.poll(() => postPage.clipboardText()).toMatch(/^\.card {/);
    // The label resets after a moment
    await expect(postPage.copyButton('copiado')).toHaveCount(0);
  });

  test('links to the previous and next posts', async ({ postPage }) => {
    await expect(postPage.previous).toContainText('← Anterior');
    await expect(postPage.previous).toHaveAttribute('href', /^\/blog\/[^/]+\/$/);
    await expect(postPage.next).toContainText('Próximo →');
    await expect(postPage.next).toHaveAttribute('href', /^\/blog\/[^/]+\/$/);
  });

  test('links tags to their tag pages', async ({ page, postPage }) => {
    const tag = postPage.tags.first();
    await expect(tag).toHaveAttribute('href', /^\/blog\/tags\/[^/]+\/$/);
    const href = await tag.getAttribute('href');

    await tag.click();

    await expect(page).toHaveURL(href ?? '');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
