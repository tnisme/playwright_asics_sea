import { test as base } from "@playwright/test";
import NavigateUtility from "@utility/NavigateUtility";
import HomePage from "@pages/utility/step/HomePage";
import ProductListPage from "@pages/product/step/ProductListPage";
import ProductDetailPage from "@pages/product/step/ProductDetailPage";
import ShoppingCartPage from "@pages/cart/step/ShoppingCartPage";
import CheckoutPage from "@pages/checkout/step/CheckoutPage";
import WorldPayPage from "@pages/worldPay/step/WorldPayPage";
import { DataTest } from "@utility/DataTest";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { PaymentMethod } from "@entity/data/PaymentMethod";
import { CreditCardType } from "@entity/data/CreditCardType";
import ThankYouPage from "@pages/checkout/step/ThankYouPage";

export const test = base.extend({
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

  thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
  },

  defaultCustomer: async ({}, use) => {
    await use(DataTest.getCustomerInformation());
  },

  randomCustomer: async ({}, use) => {
    await use(DataTest.getRandomCustomerInformation());
  },

  variantProduct1: async ({}, use) => {
    await use(DataTest.getVariationProduct1());
  },

  defaultAddress: async ({}, use) => {
    await use(DataTest.getDefaultAddress());
  },

  randomAddress: async ({}, use) => {
    await use(DataTest.getRandomAddress());
  },

  shippingMethodStandard: async ({}, use) => {
    await use(ShippingMethod.STANDARD);
  },

  shippingMethodNextDay: async ({}, use) => {
    await use(ShippingMethod.NEXT_DAY);
  },

  paymentMethodCreditCard: async ({}, use) => {
    await use(PaymentMethod.CREDIT_CARD);
  },

  visaCard: async ({}, use) => {
    await use(DataTest.getCard(CreditCardType.VISA));
  },

  calculated: async ({ variantProduct1, shippingMethodStandard }, use) => {
    const subTotal = variantProduct1.getPrice() * variantProduct1.getQuantity();
    const shippingFee = ShippingMethodUtils.getFee(
      shippingMethodStandard,
      subTotal,
    );
    const grandTotal = subTotal + shippingFee;
    await use({ subTotal, shippingFee, grandTotal });
  },
});
