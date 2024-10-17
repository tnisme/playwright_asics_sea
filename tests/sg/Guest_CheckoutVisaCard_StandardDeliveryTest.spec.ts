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
  calculated
}) => {
  await homePage.search(variantProduct1.getName());
  await productListPage.viewProductDetail(variantProduct1);
  await productDetailPage.addToCart(variantProduct1);

  await homePage.viewCart();
  await shoppingCartPage.checkout();

  await checkoutPage.fillInShippingInformation(randomAddress, randomCustomer);
  await checkoutPage.submitShipping();
  await checkoutPage.setShippingMethod(shippingMethodStandard);
  await checkoutPage.isCreditCardMethodChecked();
  await checkoutPage.submitShippingMethod();
  await checkoutPage.setPaymentMethod(paymentMethodCreditCard);

  const { subTotal, shippingFee, grandTotal } = calculated.calculateTotal(variantProduct1, shippingMethodStandard);
  await checkoutPage.checkProduct(variantProduct1);
  await checkoutPage.checkShippingFee(shippingFee);
  await checkoutPage.checkSubtotalPrice(subTotal);
  await checkoutPage.checkGrandTotalPrice(grandTotal);

  await checkoutPage.placeOrder();

  await worldPayPage.fillInCard(visaCard);
  await worldPayPage.makePayment();
  await thankYouPage.getOrderNumber();
});
