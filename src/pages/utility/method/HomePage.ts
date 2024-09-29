import {Page} from "@playwright/test";
import HomeLocator from "../locator/HomeLocator";
import ProductListPage from "../../product/method/ProductListPage";
import LoginPage from "./LoginPage";

export default class HomePage {

    constructor(private page: Page) {
    }

    async isGuest(): Promise<boolean> {
        return await this.page.isVisible(HomeLocator.logout, {timeout: 2000});
    }

    async goToLoginPage(): Promise<LoginPage> {
        await this.page.click(HomeLocator.myAccount);
        await this.page.waitForLoadState()
        await this.page.click(HomeLocator.login);
        await this.page.waitForLoadState()
        return new LoginPage(this.page);
    }

    async search(key: string): Promise<ProductListPage> {
        await this.page.fill(HomeLocator.search, key);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState();
        return new ProductListPage(this.page);
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.page.isVisible(HomeLocator.miniCartCounter, {timeout: 3000});
    }
}