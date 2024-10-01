import {Page} from "@playwright/test";
import CheckoutPage from "../../checkout/method/CheckoutPage";
import ShoppingCartLocator from "../locator/ShoppingCartLocator";

export default class ShoppingCartPage {

    constructor(private page: Page) {
    }

    async checkout(): Promise<CheckoutPage> {
        await this.page.click(ShoppingCartLocator.checkoutButton);
        await this.page.waitForLoadState('load');
        return new CheckoutPage(this.page);
    }

    async isHasDiscountOrder(): Promise<boolean> {
        return await this.page.isVisible(ShoppingCartLocator.discountOrder);
    }

    async getDiscountOrderAmount(): Promise<number> {
        return parseFloat(await this.page.innerText(ShoppingCartLocator.discountOrder));
    }
}