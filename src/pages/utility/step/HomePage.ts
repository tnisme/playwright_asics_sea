import { Page, test } from "@playwright/test";
import HomeLocator from "../locator/HomeLocator";
import WaitUtility from "@utility/WaitUtility";

export default class HomePage extends HomeLocator {
  private page: Page;
  private waitUtility: WaitUtility;
  constructor(page: Page) {
    super();
    this.page = page;
    this.waitUtility = new WaitUtility(this.page);
  }

  async isGuest(): Promise<boolean> {
    return await this.page.isVisible(this.logout, { timeout: 2000 });
  }

  async goToLoginPage() {
    await test.step("go to login page", async () => {
      await this.page.click(this.myAccount);
      await this.page.waitForLoadState("load");
      await this.page.click(this.login);
      await this.page.waitForLoadState("load");
    });
  }

  async search(key: string) {
    await test.step(`search product: ${key}`, async () => {
      const currentUrl = this.page.url();
      await this.page.fill(this.searchLocator, key);
      await this.page.keyboard.press("Enter");
      await this.waitUtility.waitUrlChange(currentUrl);
      await this.page.waitForLoadState("load");
    });
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.page.isVisible(this.miniCartCounter, { timeout: 3000 });
  }

  async viewCart() {
    await test.step("view cart", async () => {
      await this.page.click(this.cart, { delay: 500 });
      await this.page.click(this.viewCartButton);
      await this.page.waitForLoadState("load");
    });
  }
}
