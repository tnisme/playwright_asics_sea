import { Page } from "@playwright/test";
import ThankYouLocator from "../locator/ThankYouLocator";

export default class ThankYouPage extends ThankYouLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.page.innerText(this.orderNumber);
    return orderNumber;
  }
}
