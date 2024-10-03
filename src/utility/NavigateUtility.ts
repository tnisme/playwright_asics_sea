import { Page } from "@playwright/test";
import HomePage from "@pages/utility/method/HomePage";

export default class NavigateUtility {
  public static async navigateToHomePage(page: Page): Promise<HomePage> {
    await page.goto(process.env[process.env.LOCATE.toUpperCase()]);
    await page.waitForLoadState("load");
    return new HomePage(page);
  }
}
