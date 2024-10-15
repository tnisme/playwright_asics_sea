import ProductListLocator from "../locator/ProductListLocator";
import { Page, test } from "@playwright/test";
import { Product } from "@entity/product/Product";

export default class ProductListPage extends ProductListLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async viewProductDetail(product: Product) {
    if (!this.page.url().includes(product.getUrl())) {
      await test.step(`view product detail ${product.getName()}`, async () => {
        await this.page.click(this.productItem(product.getUrl()));
        await this.page.waitForLoadState("load");
      });
    }
  }
}
