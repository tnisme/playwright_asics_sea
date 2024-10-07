import { Page, test } from "@playwright/test";
import LoginLocator from "../locator/LoginLocator";
import { Customer } from "@entity/customer/Customer";
import HomePage from "./HomePage";

export default class LoginPage extends LoginLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async login(customer: Customer): Promise<HomePage> {
    await test.step("login", async () => {
      await this.page.locator(this.username).fill(customer.getEmail());
      await this.page.locator(this.password).fill(customer.getPassword());
      await this.page.locator(this.loginButton).click();
      await this.page.waitForLoadState("load");
    });
    return new HomePage(this.page);
  }
}
