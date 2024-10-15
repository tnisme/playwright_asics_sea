import { Page, test } from "@playwright/test";
import HomeLocator from "../locator/HomeLocator";

export default class HomePage extends HomeLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
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
      await this.page.fill(this.searchLocator, key);
      await this.page.keyboard.press("Enter");
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
