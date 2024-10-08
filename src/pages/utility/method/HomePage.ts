import { Page } from "@playwright/test";
import ProductListPage from "../../product/method/ProductListPage";
import LoginPage from "./LoginPage";
import ShoppingCartPage from "../../cart/method/ShoppingCartPage";
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

  async goToLoginPage(): Promise<LoginPage> {
    await this.page.click(this.myAccount);
    await this.page.waitForLoadState("load");
    await this.page.click(this.login);
    await this.page.waitForLoadState("load");
    return new LoginPage(this.page);
  }

  async search(key: string): Promise<ProductListPage> {
    await this.page.fill(this.searchLocator, key);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("load");
    return new ProductListPage(this.page);
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.page.isVisible(this.miniCartCounter, { timeout: 3000 });
  }

  async viewCart(): Promise<ShoppingCartPage> {
    await this.page.click(this.cart, { delay: 500 });
    await this.page.click(this.viewCartButton);
    await this.page.waitForLoadState("load");
    return new ShoppingCartPage(this.page);
  }
}
