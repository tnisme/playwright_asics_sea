import { Page, test as base } from "@playwright/test";
import NavigateUtility from "@utility/NavigateUtility";
import HomePage from "@pages/utility/step/HomePage";
import ProductListPage from "@pages/product/step/ProductListPage";
import ProductDetailPage from "@pages/product/step/ProductDetailPage";
import ShoppingCartPage from "@pages/cart/step/ShoppingCartPage";
import CheckoutPage from "@pages/checkout/step/CheckoutPage";
import WorldPayPage from "@pages/worldPay/step/WorldPayPage";
import ThankYouPage from "@pages/checkout/step/ThankYouPage";
import MolpayPage from "@pages/molpay/step/MolpayPage";

type PageFixture = {
  page: Page;
  homePage: HomePage;
  productListPage: ProductListPage;
  productDetailPage: ProductDetailPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutPage: CheckoutPage;
  worldPayPage: WorldPayPage;
  molpayPage: MolpayPage;
  thankYouPage: ThankYouPage;
};

export const test = base.extend<PageFixture>({
  page: async ({ page }, use) => {
    await NavigateUtility.navigateToHomePage(page);
    await use(page);
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  worldPayPage: async ({ page }, use) => {
    await use(new WorldPayPage(page));
  },

  molpayPage: async ({ page }, use) => {
    await use(new MolpayPage(page));
  },

  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },
});
