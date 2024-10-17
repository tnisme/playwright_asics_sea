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
  calculated,
}) => {
  await homePage.search(variantProduct1.getName());
  await productListPage.viewProductDetail(variantProduct1);
  await productDetailPage.setSize(variantProduct1.getSize());
  variantProduct1.setPrice(await productDetailPage.getPrice());
  await productDetailPage.addToCart(variantProduct1);

  await homePage.viewCart();
  await shoppingCartPage.checkout();

  await checkoutPage.fillInShippingInformation(randomAddress, randomCustomer);
  await checkoutPage.submitShipping();
  await checkoutPage.setShippingMethod(shippingMethodStandard);
  await checkoutPage.isCreditCardMethodChecked();
  await checkoutPage.submitShippingMethod();
  await checkoutPage.setPaymentMethod(paymentMethodCreditCard);

  const { subTotal, shippingFee, grandTotal } = calculated.calculateTotal(
    shippingMethodStandard,
    variantProduct1
  );
  await checkoutPage.checkProduct(variantProduct1);
  await checkoutPage.checkShippingFee(shippingFee);
  await checkoutPage.checkSubtotalPrice(subTotal);
  await checkoutPage.checkGrandTotalPrice(grandTotal);

  await checkoutPage.placeOrder();

  await worldPayPage.fillInCard(visaCard);
  await worldPayPage.makePayment();
  await thankYouPage.getOrderNumber();

  await thankYouPage.checkProduct(variantProduct1);
  await thankYouPage.checkShippingFee(shippingFee);
  await thankYouPage.checkSummarySubtotalPrice(subTotal);
  await thankYouPage.checkSummaryGrandTotalPrice(grandTotal);
  await thankYouPage.checkShippingMethod(shippingMethodStandard);
  await thankYouPage.checkShippingAddress(randomAddress);
  await thankYouPage.checkBillingAddress(randomAddress);
  await thankYouPage.checkPaymentMethod(paymentMethodCreditCard);
  await thankYouPage.checkPaymentAmount(grandTotal);
});
