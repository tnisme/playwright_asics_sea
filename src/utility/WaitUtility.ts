import {Locator, Page} from "@playwright/test";

export default class WaitUtility {

  constructor(private page: Page) {
  }

  private timeInSec: number = 1000;

  /**
   *
   * wait until element is visible
   * @param element
   * @param timeout millisecond (optional)
   *
   * if timeout is not specified, it will use TEST_TIMEOUT
   */

  async waitUntilVisibilityOf(element: Locator, timeout?: number) {
    const effectiveTimeout =
      timeout ?? Number.parseInt(process.env.TEST_TIMEOUT, 10) * this.timeInSec;
    await element.waitFor({ state: "visible", timeout: effectiveTimeout });
  }

  /**
   *
   * wait until url change
   * @param currentUrl
   * @param timeout millisecond (optional)
   *
   * if timeout is not specified, it will use TEST_TIMEOUT
   */

  async waitUrlChange(currentUrl: string, timeout?: number) {
    const effectiveTimeout =
      timeout ?? Number.parseInt(process.env.TEST_TIMEOUT, 10) * this.timeInSec;
    await this.page.waitForURL((url) => url.toString() !== currentUrl, {timeout: effectiveTimeout});
  }
}
