import { expect, test } from './fixtures';

const POST = '/blog/html-criando-um-componente-de-collapse-nativo-com-as-tags-details-e-summary/';

test.describe('Video embeds', () => {
  test('load nothing from YouTube until the reader clicks', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => {
      if (/youtube|ytimg/i.test(request.url())) requests.push(request.url());
    });

    await page.goto(POST);
    const video = page.getByTitle('Vídeo do YouTube');
    await video.scrollIntoViewIfNeeded();
    await expect(video).toBeVisible();
    await expect(page.frameLocator('iframe[title="Vídeo do YouTube"]').getByRole('link', { name: /Assistir vídeo/ })).toBeVisible();
    await page.waitForLoadState('networkidle');

    expect(requests).toEqual([]);
  });
});
