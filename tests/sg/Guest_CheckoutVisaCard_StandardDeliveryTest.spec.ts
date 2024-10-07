import { test } from "@playwright/test";
import HomePage from "@pages/utility/method/HomePage";
import { Customer } from "@entity/customer/Customer";
import { Address } from "@entity/customer/Address";
import { DataTest } from "@utility/DataTest";
import { VariationProduct } from "@entity/product/VariationProduct";
import NavigateUtility from "@utility/NavigateUtility";
import ProductListPage from "@pages/product/method/ProductListPage";
import ProductDetailPage from "@pages/product/method/ProductDetailPage";
import ShoppingCartPage from "@pages/cart/method/ShoppingCartPage";
import CheckoutPage from "@pages/checkout/method/CheckoutPage";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { PaymentMethod } from "@entity/data/PaymentMethod";
import WorldPayPage from "@pages/worldPay/method/WorldPayPage";
import { CreditCard } from "@entity/customer/CreditCard";
import { CreditCardType } from "@entity/data/CreditCardType";
import ThankYouPage from "@pages/checkout/method/ThankYouPage";

let homePage: HomePage,
  customer: Customer,
  product: VariationProduct,
  address: Address,
  productListPage: ProductListPage,
  productDetailPage: ProductDetailPage,
  shoppingCartPage: ShoppingCartPage,
  checkoutPage: CheckoutPage,
  shippingMethod: ShippingMethod,
  paymentMethod: PaymentMethod,
  worldPayPage: WorldPayPage,
  card: CreditCard,
  thankYouPage: ThankYouPage,
  orderNumber: string,
  discount: number,
  subTotal: number,
  shippingFee: number,
  grandTotal: number;

async function calculate() {
  if (await shoppingCartPage.isHasDiscountOrder())
    discount = await shoppingCartPage.getDiscountOrderAmount();
  subTotal = product.getPrice() * product.getQuantity();
  shippingFee = ShippingMethodUtils.getFee(shippingMethod, subTotal);
  grandTotal = subTotal + shippingFee - discount;
}

test.beforeAll("init", async () => {
  customer = DataTest.getCustomerInformation();
  product = DataTest.getVariationProduct1();
  address = DataTest.getRandomAddress();
  shippingMethod = ShippingMethod.STANDARD;
  paymentMethod = PaymentMethod.CREDIT_CARD;
  card = DataTest.getCard(CreditCardType.VISA);
});

test("Guest_CheckoutVisaCard_StandardDeliveryTestSpec", async ({ page }) => {
  homePage = await NavigateUtility.navigateToHomePage(page);
  productListPage = await homePage.search(product.getName());
  productDetailPage = await productListPage.viewProductDetail(product);
  await productDetailPage.addToCart(product);

  shoppingCartPage = await homePage.viewCart();
  await calculate();
  checkoutPage = await shoppingCartPage.checkout();

  await checkoutPage.fillInShippingInformation(address, customer);
  await checkoutPage.submitShipping();
  await checkoutPage.setShippingMethod(shippingMethod);
  await checkoutPage.submitShippingMethod();
  await checkoutPage.setPaymentMethod(paymentMethod);
  worldPayPage = await checkoutPage.placeOrder(paymentMethod);

  await worldPayPage.fillInCard(card);
  thankYouPage = await worldPayPage.makePayment();
  orderNumber = await thankYouPage.getOrderNumber();
});
