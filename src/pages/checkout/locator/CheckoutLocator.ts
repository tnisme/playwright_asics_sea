export default class CheckoutLocator {
  protected shippingMethod = (shippingMethodId: string) =>
    `//input[contains(@id, 'shippingMethod-${shippingMethodId}')]`;
  protected paymentMethod = (paymentMethodId: string) =>
    `//div[@class='payment-method-options']//div[@class='field-wrapper']/input[@value='${paymentMethodId}']`;
  protected shippingFirstName = "#shippingFirstName";
  protected shippingLastName = "#shippingLastName";
  protected shippingAddress1 = "#shippingAddress1";
  protected shippingCity = "#shippingAddressCity";
  protected shippingState = "#shippingState";
  protected shippingBangaray = "#shippingAddressBarangay";
  protected shippingWard = "#shippingAddressWard";
  protected shippingPostalCode = "#shippingPostalCode";
  protected shippingCountry = "#shippingCountry";
  protected shippingPhoneNumber = "#shippingPhoneNumber";
  protected emailAddress = "#emailAddress";
  protected submitShippingAddress = '//button[@value="submit-shipping"]';
  protected submitShippingMethodButton =
    '//button[@value="submit-shipping-method"]';
  protected placeOrderButton = '//button[@value="place-order"]';
}
