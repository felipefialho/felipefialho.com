import { defineConfig } from '@playwright/test';

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

// Expects a prior `pnpm build`: the preview serves dist/ and the search needs the pagefind index.
// Uses the locally installed Chrome so no browser download is needed. On CI (or a machine without
// Chrome) run `pnpm exec playwright install chromium` and switch `channel` to `undefined`.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    channel: 'chrome',
    locale: 'pt-BR',
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm astro preview --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
  },
});
