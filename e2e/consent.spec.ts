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

  test('stores "necessary only" and confirms with a toast', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.necessaryOnly.click();

    await expect(consentBanner.root).toBeHidden();
    await expect(consentBanner.toast).toHaveText(/só os necessários\. de boa/);
    await consentBanner.expectStored({ analytics: false, ads: false });
  });

  test('customizes in the preferences dialog and saves', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.customize.click();

    await expect(consentBanner.prefs).toBeVisible();
    await expect(consentBanner.analytics).toBeFocused();

    await consentBanner.analytics.check();
    await consentBanner.save.click();

    await expect(consentBanner.prefs).toBeHidden();
    await expect(consentBanner.root).toBeHidden();
    await expect(consentBanner.toast).toHaveText(/escolhas salvas/);
    await consentBanner.expectStored({ analytics: true, ads: false });
  });

  test('closes the preferences dialog with Escape without a choice', async ({ page, consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.customize.click();
    await expect(consentBanner.prefs).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(consentBanner.prefs).toBeHidden();
    await expect(consentBanner.root).toBeVisible();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('consent'))).toBeNull();
  });

  test('reopens the preferences from the toast', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.accept.click();
    await expect(consentBanner.toast).toHaveText(/tudo aceito\. valeu!/);

    await consentBanner.toast.getByRole('button', { name: 'mudar' }).click();

    await expect(consentBanner.prefs).toBeVisible();
    await expect(consentBanner.analytics).toBeChecked();
    await expect(consentBanner.ads).toBeChecked();
  });

  test('reopens from the footer with the stored state and focus on the first switch', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.necessaryOnly.click();
    await expect(consentBanner.root).toBeHidden();

    await consentBanner.footerLink.click();

    await expect(consentBanner.prefs).toBeVisible();
    await expect(consentBanner.analytics).not.toBeChecked();
    await expect(consentBanner.ads).not.toBeChecked();
    await expect(consentBanner.analytics).toBeFocused();

    await consentBanner.ads.check();
    await consentBanner.save.click();
    await consentBanner.expectStored({ analytics: false, ads: true });
  });

  test('rejects everything from the preferences dialog', async ({ consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.customize.click();
    await consentBanner.rejectAll.click();

    await expect(consentBanner.prefs).toBeHidden();
    await consentBanner.expectStored({ analytics: false, ads: false });
  });

  test('stores an acceptance and stays closed after a reload', async ({ page, consentBanner }) => {
    await consentBanner.goto();
    await consentBanner.accept.click();
    await expect(consentBanner.toast).toHaveText(/tudo aceito\. valeu!/);
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
