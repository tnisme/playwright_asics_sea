import { Page, test } from "@playwright/test";
import { attachment } from "allure-js-commons";

export default class Allure {
  public static async logInfo(info: string) {
    await test.step(info, async () => {});
  }

  public static async logScreenshot(name: string, page: Page) {
    const screenshot = await page.screenshot();
    await test.step("Log screenshot", async () => {
      await attachment(name, screenshot, "image/png");
    });
  }
}
