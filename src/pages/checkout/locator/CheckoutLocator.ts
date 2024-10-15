export default class CheckoutLocator {
  protected shippingMethod = (shippingMethodId: string) =>
    `//input[contains(@id, 'shippingMethod-${shippingMethodId}')]`;
  protected paymentMethod = (paymentMethodId: string) =>
    `//div[@class='payment-method-options']//div[@class='field-wrapper']/input[@value='${paymentMethodId}']`;
  protected product = (productId: string) => `//div[@data-sku='${productId}']`;
  protected productName = (productId: string) =>
    this.product(productId) + `//div[@class[contains(., 'name')]]/a`;
  protected productQuantity = (productId: string) =>
    this.product(productId) +
    `//div[@class='mini-cart-pricing']/span[contains(@class,'value')]`;
  protected productSize = (productId: string) =>
    this.product(productId) +
    `//div[@data-attribute='size']/span[contains(@class,'value')]`;
  protected productColor = (productId: string) =>
    this.product(productId) +
    `//div[@data-attribute='color']/span[contains(@class,'value')]`;
  protected productSubtotalPrice = (productId: string) =>
    this.product(productId) + `//span[contains(@class, 'mini-cart-price')]`;
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
  protected shippingFee = "span.shipping-total-cost";
  protected subtotal = "span.sub-total";
  protected grandTotal = "span.grand-total-sum";
}
