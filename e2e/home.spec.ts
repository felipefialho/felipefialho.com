import { expect, test } from './fixtures';

test.describe('Home', () => {
  test('leads with the heading, without a name link', async ({ homePage }) => {
    await homePage.goto();

    await expect(homePage.heading).toContainText('Oi, sou o Felipe. Escrevo sobre front-end, AI e carreira em tech');
    await expect(homePage.heading.getByRole('link')).toHaveCount(0);
  });

  test('keeps "more about me" in the bio', async ({ homePage }) => {
    await homePage.goto();

    await expect(homePage.moreAbout).toHaveAttribute('href', '/hi/');
  });

  test.describe('Posts', () => {
    let newestPost = '';

    test.beforeEach(async ({ homePage }) => {
      newestPost = await homePage.newestPostPath();
      await homePage.goto();
    });

    test('features the newest post as a single card', async ({ homePage }) => {
      await expect(homePage.featuredCard).toHaveAttribute('href', newestPost);
      await expect(homePage.featuredCard.getByRole('heading', { level: 2 })).not.toBeEmpty();
      await expect(homePage.featuredCard).toContainText('ler post →');
    });

    test('lists the latest posts after the featured one, with dates', async ({ homePage }) => {
      await expect(homePage.latestRows).toHaveCount(6);
      // Rows run newest first, so a leaked featured post would be the first one
      await expect(homePage.latestRows.first().getByRole('link')).not.toHaveAttribute('href', newestPost);
      await expect(homePage.latest.getByRole('link', { name: 'todos os posts →' })).toHaveAttribute('href', '/blog/');
      await expect(homePage.latestRows.first().getByRole('link')).toHaveAttribute('href', /^\/blog\/[^/]+\/$/);
      await expect(homePage.latestRows.first().getByRole('time')).toHaveText(/^\d{2} \p{L}+ \d{4}$/u);
    });
  });

  test('shows the labs section with the open source projects', async ({ homePage }) => {
    await homePage.goto();

    await expect(homePage.labs.getByRole('link', { name: /Front-End BR/ })).toHaveAttribute('href', '/lab/');
    await expect(homePage.labs.getByRole('link', { name: /Front-end Challenges/ })).toBeVisible();
    await expect(homePage.labs.getByRole('link', { name: /Awesome Made by Brazilians/ })).toBeVisible();
    await expect(homePage.labs.getByRole('link', { name: /Cartman/ })).toBeVisible();
  });

  test('marks the current section in the header nav', async ({ page, homePage }) => {
    await homePage.goto();

    await test.step('nothing is current on the home', async () => {
      await expect(homePage.navLink('blog')).toHaveAttribute('href', '/blog/');
      await expect(homePage.navLink('labs')).toHaveAttribute('href', '/lab/');
      await expect(homePage.navLink('sobre')).toHaveAttribute('href', '/hi/');
      for (const name of ['blog', 'labs', 'sobre'] as const) {
        await expect(homePage.navLink(name)).not.toHaveAttribute('aria-current');
      }
    });

    await test.step('"labs" is current on /lab/', async () => {
      await homePage.navLink('labs').click();
      await expect(page).toHaveURL(/\/lab\/$/);
      await expect(homePage.navLink('labs')).toHaveAttribute('aria-current', 'page');
      await expect(homePage.navLink('blog')).not.toHaveAttribute('aria-current');
    });
  });
});
