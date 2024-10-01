import ProductListLocator from "../locator/ProductListLocator";
import ProductDetailPage from "./ProductDetailPage";
import { Page } from "@playwright/test";
import {Product} from "../../../entity/product/Product";

export default class ProductListPage {

    constructor(private page: Page) {

    }

    async addProductToCart(productUrl: string) {
        await this.page.click(ProductListLocator.productName(productUrl));
        await this.page.click(ProductListLocator.btnAddToCart);
    }

    async viewProductDetail(product: Product): Promise<ProductDetailPage> {
        if (!this.page.url().includes(product.getUrl())) {
            await this.page.click(ProductListLocator.productItem(product.getUrl()));
            await this.page.waitForLoadState('load');
        }
        return new ProductDetailPage(this.page);
    }

}