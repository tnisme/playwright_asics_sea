import { Page } from "@playwright/test";
import ProductDetailLocator from "../locator/ProductDetailLocator";
import { Product } from "@entity/product/Product";
import PriceUtility from "@utility/PriceUtility";
import { step } from "@fixture/Fixture";
import { VariationProduct } from "@entity/product/VariationProduct";

export default class ProductDetailPage extends ProductDetailLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  @step("Add product to cart")
  async addToCart(product?: Product) {
    if (product) {
      await this.setVariant(<VariationProduct>product);
    }
    await this.clickAddToCartButton();
  }

  @step("Set variant")
  async setVariant(variantProduct: VariationProduct) {
    await this.setColor(variantProduct.getColor());
    await this.setSize(variantProduct.getSize());
  }

  @step("Click add to cart button")
  async clickAddToCartButton() {
    await this.page.click(this.addToCartButton);
    await this.closeCartDraw();
  }

  @step("Set size")
  async setSize(size: string) {
    let localSize: string;
    if (size.includes("/")) {
      localSize = size.split("/")[0].replace("Men's | Women's", "").trim();
    } else {
      localSize = size;
    }
    await this.page.click(this.productSize(localSize));
  }

  @step("Set color")
  async setColor(color: string) {
    const localColor = this.page.locator(this.productColor(color));
    if (await localColor.isVisible()) {
      await this.page.click(this.productColor(color));
    }
  }

  @step("Close cart draw")
  async closeCartDraw() {
    await this.page.click(this.closeCartDrawButton);
  }

  async getPrice(): Promise<number> {
    return PriceUtility.convertStringToPrice(
      await this.page.innerText(this.price)
    );
  }
}
