import { expect, test } from './fixtures';

test.describe('Lab', () => {
  test.beforeEach(async ({ labPage }) => {
    await labPage.goto();
  });

  test('lists projects with star counts and external links', async ({ labPage }) => {
    await expect(labPage.heading).toBeVisible();
    await expect(labPage.projects).toHaveCount(5);
    for (const project of await labPage.projects.all()) {
      await expect(project).toHaveAttribute('href', /^https:\/\//);
    }

    const frontendBr = labPage.project(/Front-End BR/);
    await expect(frontendBr).toHaveAttribute('href', 'https://github.com/frontendbr');
    await expect(frontendBr).toContainText('+20K');
    await expect(frontendBr).toContainText('estrelas no GitHub');
  });

  test('marks the rebuilt projects', async ({ labPage }) => {
    await expect(labPage.projects.getByText('refeito em 2026', { exact: true })).toHaveCount(2);
    await expect(labPage.rebuiltPill(labPage.project(/CSS Components/))).toBeVisible();
    await expect(labPage.rebuiltPill(labPage.project(/Piano/))).toBeVisible();
    await expect(labPage.rebuiltPill(labPage.project(/Front-End BR/))).toHaveCount(0);
  });

  test('features Cartman with a link to the CodePen', async ({ labPage }) => {
    await expect(labPage.cartman.getByRole('heading', { level: 2, name: 'Eric Cartman' })).toBeVisible();
    await expect(labPage.cartman.getByRole('link', { name: 'abrir no codepen ↗' })).toHaveAttribute('href', /codepen\.io/);
    await expect(labPage.moreOnGithub).toHaveAttribute('href', /github\.com\/felipefialho/);
  });
});
