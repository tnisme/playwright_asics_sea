import { test } from "@utility/Fixture";

test("Guest_CheckoutVisaCard_StandardDeliveryTestSpec", async ({
  homePage,
  productListPage,
  productDetailPage,
  shoppingCartPage,
  checkoutPage,
  worldPayPage,
  thankYouPage,
  randomCustomer,
  variantProduct1,
  randomAddress,
  shippingMethodStandard,
  paymentMethodCreditCard,
  visaCard,
}) => {
  await homePage.search(variantProduct1.getName());
  await productListPage.viewProductDetail(variantProduct1);
  await productDetailPage.addToCart(variantProduct1);

  await homePage.viewCart();
  // await calculate();
  await shoppingCartPage.checkout();

  await checkoutPage.fillInShippingInformation(randomAddress, randomCustomer);
  await checkoutPage.submitShipping();
  await checkoutPage.setShippingMethod(shippingMethodStandard);
  await checkoutPage.submitShippingMethod();
  await checkoutPage.setPaymentMethod(paymentMethodCreditCard);
  await checkoutPage.placeOrder(paymentMethodCreditCard);

  await worldPayPage.fillInCard(visaCard);
  await worldPayPage.makePayment();
  await thankYouPage.getOrderNumber();
});
