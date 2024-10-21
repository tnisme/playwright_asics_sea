import ProductListLocator from "../locator/ProductListLocator";
import { Page } from "@playwright/test";
import { Product } from "@entity/product/Product";
import { step } from "@fixture/Fixture";

export default class ProductListPage extends ProductListLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  @step("View product detail")
  async viewProductDetail(product: Product) {
    if (!this.page.url().includes(product.getUrl())) {
      await this.page.click(this.productItem(product.getUrl()));
      await this.page.waitForLoadState("load");
    }
  }
}
