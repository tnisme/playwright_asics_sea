import { Page, test } from "@playwright/test";
import ThankYouLocator from "../locator/ThankYouLocator";
import { Product } from "@entity/product/Product";
import AssertUtility from "@utility/AssertUtility";
import PriceUtility from "@utility/PriceUtility";
import { ProductType } from "@entity/data/ProductType";
import {
  ShippingMethod,
  ShippingMethodUtils,
} from "@entity/data/ShippingMethod";
import { PaymentMethod, PaymentMethodUtils } from "@entity/data/PaymentMethod";
import { Address } from "@entity/customer/Address";
import { step } from "@fixture/Fixture";

export default class ThankYouPage extends ThankYouLocator {
  private page: Page;
  constructor(page: Page) {
    super();
    this.page = page;
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.page.innerText(this.orderNumber);
    return orderNumber;
  }

  @step("Check product")
  async checkProduct(product: Product) {
    await this.checkProductName(product);
    await this.checkProductSubtotalPrice(product);
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (product.getProductType() === ProductType.VARIATION) {
      await this.checkProductSize(product);
      await this.checkProductColor(product);
    }
  }

  @step("Check product name")
  private async checkProductName(product: Product) {
    const actual = await this.page.innerText(
      this.productName(product.getSku())
    );
    await AssertUtility.assertEqual(actual, product.getName());
  }

  @step("Check product subtotal price")
  private async checkProductSubtotalPrice(product: Product) {
    const actual = await this.page.innerText(
      this.productSubtotalPrice(product.getSku())
    );
    await AssertUtility.assertEqual(
      actual,
      PriceUtility.convertPriceToString(
        product.getPrice() * product.getQuantity()
      )
    );
  }

  @step("Check product size")
  private async checkProductSize(product: Product) {
    const actual = await this.page.innerText(
      this.productSize(product.getSku())
    );
    //@ts-expect-error: IDE can not reference to this method
    await AssertUtility.assertEqual(actual, product.getSize());
  }

  @step("Check product color")
  private async checkProductColor(product: Product) {
    const actual = await this.page.innerText(
      this.productColor(product.getSku())
    );
    //@ts-expect-error: IDE can not reference to this method
    await AssertUtility.assertEqual(actual, product.getColor());
  }

  @step("Check shipping fee")
  async checkShippingFee(fee: number) {
    const shippingFee = await this.page.innerText(this.shippingFee);
    const shippingFeeExpected =
      fee > 0
        ? PriceUtility.convertPriceToString(fee)
        : this.getShippingFeeText();
    await AssertUtility.assertEqual(shippingFee, shippingFeeExpected);
  }

  private getShippingFeeText(): string {
    switch (test.info().project.use.locale) {
      case "th-TH":
        return "ฟรี";
      case "vi-VN":
        return "Miễn phí";
      default:
        return "Free";
    }
  }

  @step("Check summary subtotal price")
  async checkSummarySubtotalPrice(price: number) {
    const subtotalPrice = await this.page.innerText(this.summarySubtotalPrice);
    await AssertUtility.assertEqual(
      subtotalPrice,
      PriceUtility.convertPriceToString(price)
    );
  }

  @step("Check summary grand total price")
  async checkSummaryGrandTotalPrice(price: number) {
    const totalPrice = await this.page.innerText(this.summaryGrandTotalPrice);
    await AssertUtility.assertEqual(
      totalPrice,
      PriceUtility.convertPriceToString(price)
    );
  }

  @step("Check shipping method")
  async checkShippingMethod(method: ShippingMethod) {
    const shippingMethod = await this.page.innerText(this.shippingMethod);
    await AssertUtility.assertEqual(
      shippingMethod,
      "Method " + ShippingMethodUtils.getName(method)
    );
  }

  @step("Check shipping address")
  async checkShippingAddress(address: Address) {
    const shippingAddress = (
      await this.page.innerText(this.shippingAddress)
    ).replace(/\n/g, "");
    const addressFormatted = this.formatAddress(address);
    await AssertUtility.assertEqual(shippingAddress, addressFormatted);
  }

  @step("Check billing address")
  async checkBillingAddress(address: Address) {
    const billingAddress = (
      await this.page.innerText(this.billingAddress)
    ).replace(/\n/g, "");
    const addressFormatted = this.formatAddress(address);
    await AssertUtility.assertEqual(billingAddress, addressFormatted);
  }

  @step("Check payment method")
  async checkPaymentMethod(method: PaymentMethod) {
    const paymentMethod = await this.page.innerText(this.paymentMethod);
    await AssertUtility.assertEqual(
      paymentMethod,
      PaymentMethodUtils.getName(method)
    );
  }

  @step("Check payment amount")
  async checkPaymentAmount(info: number) {
    const paymentInfo = await this.page.innerText(this.paymentAmount);
    await AssertUtility.assertEqual(
      paymentInfo,
      PriceUtility.convertPriceToString(info)
    );
  }

  private formatAddress(address: Address) {
    switch (test.info().project.use.locale) {
      case "en-SG":
        return this.formatAddressSG(address);
      case "en-MY":
        return this.formatAddressMY(address);
      case "vi-VN":
        return this.formatAddressVN(address);
      default:
        return "invalid";
    }
  }

  private formatAddressSG(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getCity() +
      ", " +
      address.getZipCode() +
      address.getCountry()
    );
  }

  private formatAddressMY(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getCity() +
      ", " +
      address.getState() +
      " " +
      address.getZipCode() +
      address.getCountry()
    );
  }

  private formatAddressVN(address: Address) {
    return (
      address.getFirstName() +
      " " +
      address.getLastName() +
      address.getAddress1() +
      address.getAddress2() +
      address.getWard() +
      ", " +
      address.getState() +
      ", " +
      address.getCity() +
      address.getCountry()
    );
  }
}
