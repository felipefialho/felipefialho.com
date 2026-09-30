import { test as base } from '@playwright/test';
import { ConsentBanner } from './consent-banner';
import { HomePage } from './home-page';
import { LabPage } from './lab-page';
import { NotFoundPage } from './not-found-page';
import { PostPage } from './post-page';

export { expect } from '@playwright/test';
export { MISSING_PATH } from './not-found-page';
export { POST_PATH } from './post-page';

type Fixtures = {
  consentBanner: ConsentBanner;
  homePage: HomePage;
  labPage: LabPage;
  notFoundPage: NotFoundPage;
  postPage: PostPage;
};

export const test = base.extend<Fixtures>({
  consentBanner: async ({ page }, use) => {
    await use(new ConsentBanner(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  labPage: async ({ page }, use) => {
    await use(new LabPage(page));
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page));
  },
  postPage: async ({ page }, use) => {
    await use(new PostPage(page));
  },
});
