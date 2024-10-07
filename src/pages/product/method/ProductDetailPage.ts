import { Page, test } from "@playwright/test";
import ProductDetailLocator from "../locator/ProductDetailLocator";
import { Product } from "@entity/product/Product";

export default class ProductDetailPage extends ProductDetailLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async addToCart(product?: Product): Promise<void> {
    if (product) {
      await test.step("Set variant", async () => {
        //@ts-expect-error: IDE can not reference to this method
        await this.setColor(product.getColor());
        //@ts-expect-error: IDE can not reference to this method
        await this.setSize(product.getSize());
      });
    }
    await test.step("Add product to cart", async () => {
      await this.page.click(this.addToCartButton);
      await this.closeCartDraw();
    });
  }

  async setSize(size: string): Promise<void> {
    let localSize: string;
    if (size.includes("/")) {
      localSize = size.split("/")[0].replace("Men's | Women's", "").trim();
    } else {
      localSize = size;
    }
    await test.step(`Set size ${size}`, async () => {
      await this.page.click(this.productSize(localSize));
    });
  }

  async setColor(color: string): Promise<void> {
    await test.step(`Set color ${color}`, async () => {
      await this.page.click(this.productColor(color));
    });
  }

  async closeCartDraw(): Promise<void> {
    await test.step("Close cart draw", async () => {
      await this.page.click(this.closeCartDrawButton);
    });
  }
}
