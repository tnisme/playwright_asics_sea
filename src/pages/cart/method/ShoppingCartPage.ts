import { Page, test } from "@playwright/test";
import CheckoutPage from "../../checkout/method/CheckoutPage";
import ShoppingCartLocator from "../locator/ShoppingCartLocator";

export default class ShoppingCartPage extends ShoppingCartLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async checkout(): Promise<CheckoutPage> {
    await test.step("Checkout", async () => {
      await this.page.click(this.checkoutButton);
      await this.page.waitForLoadState("load");
    });
    return new CheckoutPage(this.page);
  }

  async isHasDiscountOrder(): Promise<boolean> {
    return await this.page.isVisible(this.discountOrder);
  }

  async getDiscountOrderAmount(): Promise<number> {
    return parseFloat(await this.page.innerText(this.discountOrder));
  }
}
