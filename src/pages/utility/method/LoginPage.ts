import {Page} from "@playwright/test";
import LoginLocator from "../locator/LoginLocator";
import {Customer} from "../../../entity/customer/Customer";
import HomePage from "./HomePage";

export default class LoginPage {
    constructor(private page: Page) {
    }

    async login(customer: Customer): Promise<HomePage> {
        await this.page.locator(LoginLocator.username).fill(customer.getEmail());
        await this.page.locator(LoginLocator.password).fill(customer.getPassword());
        await this.page.locator(LoginLocator.login).click();
        await this.page.waitForLoadState();
        return new HomePage(this.page);
    }
}