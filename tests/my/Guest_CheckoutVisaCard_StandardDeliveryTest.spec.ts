import { test } from "@fixture/Fixture";

test("Guest_CheckoutVisaCard_StandardDeliveryTestSpec", async ({
  homePage,
  productListPage,
  productDetailPage,
  shoppingCartPage,
  checkoutPage,
  molpayPage,
  thankYouPage,
  randomCustomerInformation,
  variantProduct1,
  randomAddress,
  shippingMethodStandard,
  paymentMethodCreditCard,
  visaCard,
  calculated,
}) => {
  const { subTotal, shippingFee, grandTotal } = calculated(
    shippingMethodStandard,
    variantProduct1
  );

  await test.step("Add product to cart", async () => {
    await homePage.search(variantProduct1.getName());
    await productListPage.viewProductDetail(variantProduct1);
    await productDetailPage.setSize(variantProduct1.getSize());
    variantProduct1.setPrice(await productDetailPage.getPrice());
    await productDetailPage.addToCart(variantProduct1);
  });

  await test.step("Checkout", async () => {
    await homePage.viewCart();
    await shoppingCartPage.checkout();

    await checkoutPage.fillInShippingInformation(
      randomAddress,
      randomCustomerInformation
    );
    await checkoutPage.submitShipping();
    await checkoutPage.setShippingMethod(shippingMethodStandard);
    await checkoutPage.isCreditCardMethodChecked();
    await checkoutPage.submitShippingMethod();
    await checkoutPage.setPaymentMethod(paymentMethodCreditCard);

    await checkoutPage.checkProduct(variantProduct1);
    await checkoutPage.checkShippingFee(shippingFee);
    await checkoutPage.checkSubtotalPrice(subTotal);
    await checkoutPage.checkGrandTotalPrice(grandTotal);
  });

  await test.step("Payment", async () => {
    await checkoutPage.placeOrder();

    await molpayPage.fillInCard(visaCard);
    await molpayPage.selectCountry();
    await molpayPage.fillBankInformation("Bank Name", "Description");
    await molpayPage.agreeTerms();
    await molpayPage.payOnline();
    await molpayPage.requestOTP();
    await molpayPage.fillInOTP();
    await molpayPage.payNow();

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
});
