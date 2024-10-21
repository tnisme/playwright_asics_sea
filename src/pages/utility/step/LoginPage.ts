import { Page } from "@playwright/test";
import LoginLocator from "../locator/LoginLocator";
import { Customer } from "@entity/customer/Customer";
import { step } from "@fixture/Fixture";

export default class LoginPage extends LoginLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  @step("Login")
  async login(customer: Customer) {
    await this.page.locator(this.username).fill(customer.getEmail());
    await this.page.locator(this.password).fill(customer.getPassword());
    await this.page.locator(this.loginButton).click();
    await this.page.waitForLoadState("load");
  }
}
