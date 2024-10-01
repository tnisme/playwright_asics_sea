import {Page} from "@playwright/test";
import ThankYouLocator from "../locator/ThankYouLocator";

export default class ThankYouPage {

    constructor(private page: Page) {
    }

    async getOrderNumber(): Promise<string> {
        let orderNumber: string;
        orderNumber = await this.page.innerText(ThankYouLocator.orderNumber);
        return orderNumber;
    }
}