import { expect, test } from './fixtures';

const isExternal = (url: string) => /^https?:/.test(url) && new URL(url).hostname !== 'localhost';

test.describe('Consent banner', () => {
  test('shows on a fresh visit without any third-party request', async ({ page, consentBanner }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      if (isExternal(request.url())) external.push(request.url());
    });

    await consentBanner.gotoAndSettle();
    await expect(consentBanner.root).toBeVisible();
    await page.waitForLoadState('networkidle');

    expect(external).toEqual([]);
  });

  test('stores a rejection', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.reject.click();

    await expect(consentBanner.root).toBeHidden();
    await consentBanner.expectStored({ analytics: false, ads: false });
  });

  test('reopens from the footer with the stored state and focus inside', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.reject.click();
    await expect(consentBanner.root).toBeHidden();

    await consentBanner.footerLink.click();

    await expect(consentBanner.root).toBeVisible();
    await expect(consentBanner.analytics).not.toBeChecked();
    await expect(consentBanner.ads).not.toBeChecked();
    await expect(consentBanner.analytics).toBeFocused();
  });

  test('stores an acceptance and stays closed after a reload', async ({ page, consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.accept.click();
    await consentBanner.expectStored({ analytics: true, ads: true });

    await page.reload();
    await page.waitForLoadState('load');

    await expect(consentBanner.root).toBeHidden();
    await expect(consentBanner.footerLink).toBeVisible();
  });

  test.describe('in a region with Google CMP', () => {
    test.use({ timezoneId: 'Europe/Berlin' });

    test('does not show our banner', async ({ consentBanner }) => {
      await consentBanner.gotoAndSettle();

      await expect(consentBanner.footerLink).toBeVisible();
      await expect(consentBanner.root).toBeHidden();
    });
  });
});
