import {Page} from "@playwright/test";
import CheckoutPage from "../../checkout/method/CheckoutPage";
import ShoppingCartLocator from "../locator/ShoppingCartLocator";

export default class ShoppingCartPage {

    constructor(private page: Page) {
    }

    async checkout(): Promise<CheckoutPage> {
        await this.page.click(ShoppingCartLocator.checkoutButton);
        await this.page.waitForLoadState();
        return new CheckoutPage(this.page);
    }
}