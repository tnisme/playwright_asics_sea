import { Page } from "@playwright/test";
import HomeLocator from "../locator/HomeLocator";
import WaitUtility from "@utility/WaitUtility";
import { step } from "@fixture/Fixture";

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

  @step("Go to login page")
  async goToLoginPage() {
    await this.page.click(this.myAccount);
    await this.page.waitForLoadState("load");
    await this.page.click(this.login);
    await this.page.waitForLoadState("load");
  }

  @step("Search product")
  async search(key: string) {
    const currentUrl = this.page.url();
    await this.page.fill(this.searchLocator, key);
    await this.page.keyboard.press("Enter");
    await this.waitUtility.waitUrlChange(currentUrl);
    await this.page.waitForLoadState("load");
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.page.isVisible(this.miniCartCounter, { timeout: 3000 });
  }

  @step("View cart")
  async viewCart() {
    await this.page.click(this.cart, { delay: 500 });
    await this.page.click(this.viewCartButton);
    await this.page.waitForLoadState("load");
  }
}
