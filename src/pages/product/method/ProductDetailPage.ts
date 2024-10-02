import { Page } from "@playwright/test";
import ProductDetailLocator from "../locator/ProductDetailLocator";
import { Product } from "../../../entity/product/Product";

export default class ProductDetailPage extends ProductDetailLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async addToCart(product?: Product): Promise<void> {
    if (product) {
      //@ts-ignore
      await this.setColor(product.getColor());
      //@ts-ignore
      await this.setSize(product.getSize());
    }
    await this.page.click(this.addToCartButton);
    await this.closeCartDraw();
  }

  async setSize(size: string): Promise<void> {
    let localSize: string;
    if (size.includes("/")) {
      localSize = size.split("/")[0].replace("Men's | Women's", "").trim();
    } else {
      localSize = size;
    }
    await this.page.click(this.productSize(localSize));
  }

  async setColor(color: string): Promise<void> {
    await this.page.click(this.productColor(color));
  }

  async closeCartDraw(): Promise<void> {
    await this.page.click(this.closeCartDrawButton);
  }
}
