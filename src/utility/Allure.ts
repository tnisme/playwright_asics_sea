import { Page, test } from "@playwright/test";

export default class Allure {
  public static async logInfo(name: string, info: string) {
    await test.info().attach(name, { contentType: "text/plain", body: info });
  }

  public static async logScreenshot(name: string, page: Page) {
    const screenshot = await page.screenshot();
    await test
      .info()
      .attach(name, { contentType: "image/png", body: screenshot });
  }
}
