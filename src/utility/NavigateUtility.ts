import { Page } from "@playwright/test";
import HomePage from "@pages/utility/step/HomePage";
import { test } from "@utility/Fixture";

export default class NavigateUtility {
  public static async navigateToHomePage(page: Page): Promise<HomePage> {
    await page.goto(process.env[test.info().project.use.locale.toUpperCase()]);
    await page.waitForLoadState("load");
    return new HomePage(page);
  }
}
