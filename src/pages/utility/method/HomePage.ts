import {Page} from "@playwright/test";
import HomeLocator from "../locator/HomeLocator";
import ProductListPage from "../../product/method/ProductListPage";
import LoginPage from "./LoginPage";
import ShoppingCartPage from "../../cart/method/ShoppingCartPage";

export default class HomePage {

    constructor(private page: Page) {
    }

    async isGuest(): Promise<boolean> {
        return await this.page.isVisible(HomeLocator.logout, {timeout: 2000});
    }

    async goToLoginPage(): Promise<LoginPage> {
        await this.page.click(HomeLocator.myAccount);
        await this.page.waitForLoadState('load')
        await this.page.click(HomeLocator.login);
        await this.page.waitForLoadState('load')
        return new LoginPage(this.page);
    }

    async search(key: string): Promise<ProductListPage> {
        await this.page.fill(HomeLocator.search, key);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('load');
        return new ProductListPage(this.page);
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.page.isVisible(HomeLocator.miniCartCounter, {timeout: 3000});
    }

    async viewCart(): Promise<ShoppingCartPage> {
        await this.page.click(HomeLocator.cart, {delay: 500});
        await this.page.click(HomeLocator.viewCart);
        await this.page.waitForLoadState('load');
        return new ShoppingCartPage(this.page);
    }
}