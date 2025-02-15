export default class ThankYouLocator {
  protected product = (productId: string) => `//div[@data-sku='${productId}']`;
  protected productName = (productId: string) =>
    this.product(productId) + `//a`;
  protected productSubtotalPrice = (productId: string) =>
    this.product(productId) +
    `/ancestor::tr//td[@class[contains(., 'item-total')]]`;
  protected productColor = (productId: string) =>
    this.product(productId) +
    `/div[@data-attribute='color']/span[@class[contains(., 'value')]]`;
  protected productSize = (productId: string) =>
    this.product(productId) +
    `/div[@data-attribute='size']/span[@class[contains(., 'value')]]`;
  protected orderNumber = "div.order-number span.value";
  protected shippingFee = "#main div.order-shipping>div:nth-child(2)";
  protected summarySubtotalPrice = "#main div.order-subtotal div:nth-child(2)";
  protected summaryGrandTotalPrice = "#main div.order-total div:nth-child(2)";
  protected shippingMethod = "div.minishipments-method";
  protected shippingAddress = "div.mini-shipment div.address";
  protected billingAddress = "div.mini-billing-address div.address";
  protected paymentMethod = "div.mini-payment-instrument>div>div:nth-child(1)";
  protected paymentAmount = "span.minibillinginfo-amount";
}
