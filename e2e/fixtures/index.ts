import { test as base } from '@playwright/test';
import { ConsentBanner } from './consent-banner';

export { expect } from '@playwright/test';

export const test = base.extend<{ consentBanner: ConsentBanner }>({
  consentBanner: async ({ page }, use) => {
    await use(new ConsentBanner(page));
  },
});
