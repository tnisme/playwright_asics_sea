import {Page} from "@playwright/test";
import ProductDetailLocator from "../locator/ProductDetailLocator";
import {Product} from "../../../entity/product/Product";
export default class ProductDetailPage {

    constructor(private page: Page) {
    }

    async addToCart(product?: Product): Promise<void> {
        if (product) {
            await this.setColor(product.getColor());
            await this.setSize(product.getSize());
        }
        await this.page.click(ProductDetailLocator.addToCartButton);
        await this.closeCartDraw();
    }

    async setSize(size: string): Promise<void> {
        let localSize: string;
        if (size.includes('/')) {
            localSize = size.split('/')[0].replace("Men's | Women's", "").trim();
        } else {
            localSize = size;
        }
        await this.page.click(ProductDetailLocator.productSize(localSize));
    }

    async setColor(color: string): Promise<void> {
        await this.page.click(ProductDetailLocator.productColor(color));
    }

    async closeCartDraw(): Promise<void> {
        await this.page.click(ProductDetailLocator.closeCartDrawButton);
    }
}